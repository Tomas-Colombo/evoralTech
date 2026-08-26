"use client";

import * as React from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

import { cn } from "@/lib/utils";
import { ProjectCard } from "@/components/ui/project-card";
import type { Project } from "@/data/projects";

/** Neighbours rendered on each side of the active card. */
const VISIBLE_NEIGHBOURS = 2;
/** Horizontal step between cards, as a share of the card's own width. */
const STEP = 62;
const DRAG_THRESHOLD = 70;
/** Maximum lean, in degrees. */
const MAX_TILT = 14;
/**
 * Distance at which the lean maxes out, in card widths. Both axes share this
 * radius — normalising Y by the card's own height would flatten the vertical
 * response, since cards are tall and the pointer travels less vertically.
 */
const TILT_REACH = 1.15;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

interface PointerTracker {
  position: React.RefObject<{ x: number; y: number }>;
  /** Bumped once per animation frame the pointer moved, for cards to react to. */
  tick: ReturnType<typeof useMotionValue<number>>;
}

/** Tracks the pointer anywhere on the page, throttled to one update per frame. */
function usePointerTracker(): PointerTracker {
  const position = React.useRef({ x: 0, y: 0 });
  const tick = useMotionValue(0);

  React.useEffect(() => {
    let frame = 0;

    const handleMove = (event: PointerEvent) => {
      position.current = { x: event.clientX, y: event.clientY };
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        tick.set(tick.get() + 1);
      });
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
      cancelAnimationFrame(frame);
    };
  }, [tick]);

  return { position, tick };
}

/**
 * Leans its child toward the pointer, wherever the pointer is on the page —
 * the card watches the cursor rather than waiting to be hovered.
 */
function TiltCard({
  tracker,
  disabled,
  children,
}: {
  tracker: PointerTracker;
  disabled: boolean;
  children: React.ReactNode;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const spring = { stiffness: 120, damping: 20, mass: 0.7 };
  const smoothX = useSpring(rotateX, spring);
  const smoothY = useSpring(rotateY, spring);

  const { position, tick } = tracker;

  React.useEffect(() => {
    if (disabled) {
      rotateX.set(0);
      rotateY.set(0);
      return;
    }

    const update = () => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const dx = position.current.x - (rect.left + rect.width / 2);
      const dy = position.current.y - (rect.top + rect.height / 2);
      const radius = rect.width * TILT_REACH;

      rotateY.set(clamp(dx / radius, -1, 1) * MAX_TILT);
      rotateX.set(clamp(dy / radius, -1, 1) * -MAX_TILT);
    };

    update();
    return tick.on("change", update);
  }, [disabled, position, tick, rotateX, rotateY]);

  return (
    <motion.div
      ref={ref}
      style={disabled ? undefined : { rotateX: smoothX, rotateY: smoothY }}
      className="relative h-full"
    >
      {children}
    </motion.div>
  );
}

export interface ProjectCarouselProps {
  projects: Project[];
  className?: string;
}

/**
 * Coverflow-style carousel: one card in front, its neighbours receding behind.
 *
 * Wraps around, so the list stays navigable in both directions no matter how
 * many projects there are. Cards share one grid cell, which means the track
 * takes the height of the tallest card without a hard-coded value.
 */
export function ProjectCarousel({ projects, className }: ProjectCarouselProps) {
  const [active, setActive] = React.useState(0);
  const prefersReducedMotion = useReducedMotion();
  const tracker = usePointerTracker();
  const count = projects.length;

  /** Signed distance from the active card, taking the shorter way around. */
  const offsetOf = React.useCallback(
    (index: number) => {
      let offset = index - active;
      if (offset > count / 2) offset -= count;
      if (offset < -count / 2) offset += count;
      return offset;
    },
    [active, count],
  );

  const go = React.useCallback(
    (direction: number) => setActive((current) => (current + direction + count) % count),
    [count],
  );

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    }
  };

  if (count === 0) return null;

  return (
    <div className={cn("w-full", className)}>
      <motion.div
        role="region"
        aria-roledescription="carrusel"
        aria-label="Proyectos. Usá las flechas del teclado para recorrer."
        tabIndex={0}
        onKeyDown={handleKeyDown}
        drag={count > 1 ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragEnd={(_, info) => {
          if (info.offset.x < -DRAG_THRESHOLD) go(1);
          else if (info.offset.x > DRAG_THRESHOLD) go(-1);
        }}
        style={{ perspective: 1400 }}
        className="grid cursor-grab touch-pan-y place-items-center rounded-3xl outline-none focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-gold-300 active:cursor-grabbing"
      >
        {projects.map((project, index) => {
          const offset = offsetOf(index);
          const distance = Math.abs(offset);
          const isActive = offset === 0;
          const isHidden = distance > VISIBLE_NEIGHBOURS;

          return (
            <motion.div
              key={project.slug}
              // One shared grid cell: the track inherits the tallest card.
              className={cn(
                "col-start-1 row-start-1 w-[min(86vw,25rem)]",
                isHidden && "pointer-events-none",
              )}
              animate={{
                x: `${offset * STEP}%`,
                scale: 1 - distance * 0.12,
                opacity: isHidden ? 0 : isActive ? 1 : 0.45 - (distance - 1) * 0.18,
                filter: isActive ? "blur(0px)" : `blur(${distance * 1.5}px)`,
              }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.15 }
                  : { type: "spring", stiffness: 210, damping: 30, mass: 0.9 }
              }
              style={{ zIndex: count - distance }}
            >
              <TiltCard tracker={tracker} disabled={isHidden || Boolean(prefersReducedMotion)}>
                {/* Only the front card is reachable; the rest are scenery... */}
                <div inert={!isActive} aria-hidden={!isActive}>
                  <ProjectCard
                    project={project}
                    className={cn(
                      "h-full transition-shadow duration-500",
                      isActive && "shadow-[0_24px_70px_-30px_var(--glow)]",
                    )}
                  />
                </div>

                {/* ...until you click one, which brings it to the front. */}
                {!isActive && !isHidden && (
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={`Ver ${project.name}`}
                    className="absolute inset-0 cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300"
                  />
                )}
              </TiltCard>
            </motion.div>
          );
        })}
      </motion.div>

      {count > 1 && (
        <div className="mt-10 flex items-center justify-center gap-3">
          {projects.map((project, index) => {
            const isActive = index === active;
            return (
              <button
                key={project.slug}
                type="button"
                onClick={() => setActive(index)}
                aria-label={project.name}
                aria-current={isActive}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300",
                  isActive ? "w-8 bg-gold-300" : "w-1.5 bg-white/20 hover:bg-white/40",
                )}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProjectCarousel;
