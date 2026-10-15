"use client";

import * as React from "react";

import { gsap } from "@/lib/gsap";

type CursorState = "default" | "link" | "cta" | "project";

const INTERACTIVE = "[data-cursor], a, button, [role='button'], summary, label";
const QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

/**
 * Fraction of the remaining distance covered per frame at 60fps.
 *
 * The small shapes stand in for the pointer itself, so they track almost
 * instantly — anything slower and the user is aiming with a stale dot. The
 * large shapes are forgiving of lag, so they keep the trailing feel.
 */
const SMOOTHING: Record<CursorState, number> = {
  default: 0.85,
  cta: 0.85,
  link: 0.3,
  project: 0.3,
};

function subscribe(onChange: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * Desktop-only cursor: a small dot that grows over links, turns into an accent
 * signal over calls to action, and carries a label over project visuals
 * (`data-cursor="project"` + `data-cursor-label`).
 *
 * Never mounted for touch, coarse pointers or reduced motion; the native
 * cursor stays in those cases.
 */
export function Cursor() {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const labelRef = React.useRef<HTMLSpanElement>(null);
  const enabled = React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );

  React.useEffect(() => {
    const root = rootRef.current;
    if (!enabled || !root) return;

    document.documentElement.classList.add("has-cursor");

    const setX = gsap.quickSetter(root, "x", "px") as (value: number) => void;
    const setY = gsap.quickSetter(root, "y", "px") as (value: number) => void;

    let pointerX = 0;
    let pointerY = 0;
    let renderedX = 0;
    let renderedY = 0;
    let smoothing = SMOOTHING.default;
    let visible = false;
    // Set when the page moved under the pointer, so the hover state is re-tested.
    let stale = false;

    const setState = (state: CursorState, label = "") => {
      if (root.dataset.state !== state) {
        root.dataset.state = state;
        smoothing = SMOOTHING[state];
      }
      const node = labelRef.current;
      if (node && node.textContent !== label) node.textContent = label;
    };

    const applyTarget = (node: EventTarget | null) => {
      // The listener sits on `document`, so the target is not always an Element.
      const target = node instanceof Element ? node : null;
      const tone = target?.closest("[data-nav='dark']") ? "light" : "dark";
      if (root.dataset.tone !== tone) root.dataset.tone = tone;

      const el = target?.closest<HTMLElement>(INTERACTIVE);
      if (!el) return setState("default");
      const state = (el.dataset.cursor as CursorState | undefined) ?? "link";
      setState(state, el.dataset.cursorLabel ?? "");
    };

    const tick = () => {
      if (!visible) return;

      if (stale) {
        stale = false;
        applyTarget(document.elementFromPoint(pointerX, pointerY));
      }

      // Exponential catch-up, normalised by frame time so 60Hz and 144Hz
      // displays settle over the same number of milliseconds.
      const step = 1 - Math.pow(1 - smoothing, gsap.ticker.deltaRatio(60));
      renderedX += (pointerX - renderedX) * step;
      renderedY += (pointerY - renderedY) * step;
      setX(renderedX);
      setY(renderedY);
    };

    const move = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (visible) return;
      renderedX = pointerX;
      renderedY = pointerY;
      setX(renderedX);
      setY(renderedY);
      root.dataset.visible = "true";
      visible = true;
    };

    const over = (event: PointerEvent) => applyTarget(event.target);
    // Scrolling changes what sits under a motionless pointer.
    const scroll = () => (stale = true);

    const leave = () => {
      root.dataset.visible = "false";
      visible = false;
    };
    const down = () => (root.dataset.pressed = "true");
    const up = () => (root.dataset.pressed = "false");

    gsap.ticker.add(tick);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("blur", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);

    return () => {
      document.documentElement.classList.remove("has-cursor");
      gsap.ticker.remove(tick);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("blur", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      data-state="default"
      data-tone="dark"
      data-visible="false"
      className="cursor pointer-events-none fixed left-0 top-0 z-[200]"
    >
      <div className="cursor-shape">
        <span ref={labelRef} className="cursor-label" />
      </div>
    </div>
  );
}

export default Cursor;
