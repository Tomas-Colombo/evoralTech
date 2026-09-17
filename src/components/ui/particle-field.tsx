"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface ParticleFieldProps
  extends React.HTMLAttributes<HTMLCanvasElement> {
  /** Fill color of each node. */
  particleColor?: string;
  /** Base color of the links between nodes, as `r, g, b`. */
  linkColorRgb?: string;
  /** Link color used inside the pointer radius, as `r, g, b`. */
  linkHighlightRgb?: string;
  /** One particle per N square pixels. Lower means denser. */
  density?: number;
  /** Pointer influence radius, in CSS pixels. */
  pointerRadius?: number;
  /** Max distance at which two nodes are linked, in CSS pixels. */
  linkDistance?: number;
  /** Movement speed multiplier. */
  speed?: number;
  /**
   * Elements whose silhouette is cut out of the field. Their glyphs and alpha
   * are erased from the canvas, so no link is ever drawn behind them.
   */
  knockoutSelector?: string;
  /** How far the cut-out grows past the silhouette, in CSS pixels. */
  knockoutSpread?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

type MaskOp =
  | { kind: "text"; text: string; font: string; letterSpacing: string; x: number; y: number }
  | { kind: "image"; image: CanvasImageSource; x: number; y: number; w: number; h: number }
  | { kind: "rect"; x: number; y: number; w: number; h: number; radius: number };

/**
 * Animated particle network rendered on a canvas, sized to its parent element.
 *
 * Purely decorative: it is marked `aria-hidden` and falls back to a single
 * static frame when the user prefers reduced motion.
 */
export function ParticleField({
  className,
  particleColor = "227, 182, 103",
  linkColorRgb = "184, 125, 40",
  linkHighlightRgb = "255, 246, 227",
  density = 11000,
  pointerRadius = 180,
  linkDistance = 130,
  speed = 1,
  knockoutSelector = "[data-knockout]",
  knockoutSpread = 18,
  ...props
}: ParticleFieldProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement ?? canvas;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let particles: Particle[] = [];
    let maskOps: MaskOp[] = [];
    let frameId = 0;
    let width = 0;
    let height = 0;
    const pointer: { x: number | null; y: number | null } = { x: null, y: null };

    const seed = () => {
      const target = Math.min(
        Math.floor((width * height) / density),
        // Hard ceiling: link detection is O(n^2), so an unbounded count on
        // large displays would stall the main thread.
        220,
      );

      particles = Array.from({ length: target }, () => {
        const size = Math.random() * 1.6 + 0.8;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4 * speed,
          vy: (Math.random() - 0.5) * 0.4 * speed,
          size,
          alpha: Math.random() * 0.5 + 0.5,
        };
      });
    };

    /**
     * Walks the knockout elements and records how to reproduce their shape on
     * the canvas. Geometry is stored relative to the canvas, so it survives
     * scrolling and only needs rebuilding when the layout changes.
     */
    const buildMask = () => {
      const ops: MaskOp[] = [];
      const origin = canvas.getBoundingClientRect();

      for (const element of parent.querySelectorAll<HTMLElement>(knockoutSelector)) {
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_ALL);
        const nodes: Node[] = [element];
        while (walker.nextNode()) nodes.push(walker.currentNode);

        for (const node of nodes) {
          if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent?.trim();
            const parentElement = node.parentElement;
            if (!text || !parentElement) continue;

            const style = getComputedStyle(parentElement);
            if (style.display === "none") continue;

            const range = document.createRange();
            range.selectNodeContents(node);
            const rects = Array.from(range.getClientRects());
            range.detach();

            // A single rect means a single line, so the whole string belongs to
            // it. Wrapped text is cut as its line boxes instead of its glyphs.
            if (rects.length === 1) {
              const rect = rects[0];
              ops.push({
                kind: "text",
                text,
                font: `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`,
                letterSpacing: style.letterSpacing,
                x: rect.left - origin.left,
                y: rect.top + rect.height / 2 - origin.top,
              });
            } else {
              for (const rect of rects) {
                ops.push({
                  kind: "rect",
                  x: rect.left - origin.left,
                  y: rect.top - origin.top,
                  w: rect.width,
                  h: rect.height,
                  radius: Math.min(rect.height / 2, 10),
                });
              }
            }
            continue;
          }

          if (!(node instanceof HTMLElement) && !(node instanceof SVGElement)) continue;

          const rect = node.getBoundingClientRect();
          if (!rect.width || !rect.height) continue;

          // Images carry their own alpha, so they cut their exact outline.
          if (node instanceof HTMLImageElement && node.complete && node.naturalWidth) {
            ops.push({
              kind: "image",
              image: node,
              x: rect.left - origin.left,
              y: rect.top - origin.top,
              w: rect.width,
              h: rect.height,
            });
          } else if (node instanceof SVGSVGElement) {
            // Icons are small; a rounded box around them is indistinguishable.
            ops.push({
              kind: "rect",
              x: rect.left - origin.left,
              y: rect.top - origin.top,
              w: rect.width,
              h: rect.height,
              radius: Math.min(rect.width, rect.height) / 4,
            });
          }
        }
      }

      maskOps = ops;
    };

    /** Erases the recorded shapes, grown by `knockoutSpread`. */
    const applyMask = () => {
      if (!maskOps.length) return;

      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "#000";
      ctx.strokeStyle = "#000";
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      // Stroking the same shape at twice the spread grows it evenly in every
      // direction — a crisp dilation, where a blur would smear it into a blob.
      ctx.lineWidth = knockoutSpread * 2;

      for (const op of maskOps) {
        if (op.kind === "text") {
          ctx.font = op.font;
          ctx.textBaseline = "middle";
          ctx.textAlign = "left";
          if ("letterSpacing" in ctx) {
            (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
              op.letterSpacing === "normal" ? "0px" : op.letterSpacing;
          }
          ctx.strokeText(op.text, op.x, op.y);
          ctx.fillText(op.text, op.x, op.y);
        } else if (op.kind === "rect") {
          ctx.beginPath();
          ctx.roundRect(
            op.x - knockoutSpread,
            op.y - knockoutSpread,
            op.w + knockoutSpread * 2,
            op.h + knockoutSpread * 2,
            op.radius + knockoutSpread,
          );
          ctx.fill();
        } else {
          // Scaling the bitmap outward keeps the cut on its own silhouette.
          ctx.drawImage(
            op.image,
            op.x - knockoutSpread,
            op.y - knockoutSpread,
            op.w + knockoutSpread * 2,
            op.h + knockoutSpread * 2,
          );
        }
      }

      ctx.restore();
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = parent.getBoundingClientRect();

      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      seed();
      buildMask();
    };

    const drawLinks = () => {
      const maxDistanceSq = linkDistance * linkDistance;
      const pointerRadiusSq = pointerRadius * pointerRadius;

      ctx.lineWidth = 1;

      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distanceSq = dx * dx + dy * dy;
          if (distanceSq > maxDistanceSq) continue;

          const opacity = (1 - distanceSq / maxDistanceSq) * 0.55;
          let near = false;

          if (pointer.x !== null && pointer.y !== null) {
            const px = particles[a].x - pointer.x;
            const py = particles[a].y - pointer.y;
            near = px * px + py * py < pointerRadiusSq;
          }

          ctx.strokeStyle = `rgba(${near ? linkHighlightRgb : linkColorRgb}, ${opacity})`;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    };

    const step = (particle: Particle) => {
      if (particle.x > width || particle.x < 0) particle.vx = -particle.vx;
      if (particle.y > height || particle.y < 0) particle.vy = -particle.vy;

      if (pointer.x !== null && pointer.y !== null) {
        const dx = pointer.x - particle.x;
        const dy = pointer.y - particle.y;
        const distance = Math.hypot(dx, dy) || 1;

        if (distance < pointerRadius + particle.size) {
          const force = (pointerRadius - distance) / pointerRadius;
          particle.x -= (dx / distance) * force * 4;
          particle.y -= (dy / distance) * force * 4;
        }
      }

      particle.x += particle.vx;
      particle.y += particle.vy;
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const particle of particles) {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${particle.alpha})`;
        ctx.fill();
      }

      drawLinks();
      applyMask();
    };

    const animate = () => {
      for (const particle of particles) step(particle);
      render();
      frameId = requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    const handlePointerLeave = () => {
      pointer.x = null;
      pointer.y = null;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    resize();

    // Web fonts land after first paint and change every glyph's metrics.
    document.fonts?.ready.then(() => {
      buildMask();
      if (prefersReducedMotion) render();
    });

    if (prefersReducedMotion) {
      render();
    } else {
      window.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
      window.addEventListener("pointerleave", handlePointerLeave);
      animate();
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      cancelAnimationFrame(frameId);
    };
  }, [
    particleColor,
    linkColorRgb,
    linkHighlightRgb,
    density,
    pointerRadius,
    linkDistance,
    speed,
    knockoutSelector,
    knockoutSpread,
  ]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("absolute inset-0 h-full w-full", className)}
      {...props}
    />
  );
}

export default ParticleField;
