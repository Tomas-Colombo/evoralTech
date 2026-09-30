"use client";

import * as React from "react";

import { gsap } from "@/lib/gsap";

type CursorState = "default" | "link" | "cta" | "project";

const INTERACTIVE = "[data-cursor], a, button, [role='button'], summary, label";
const QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

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
    const xTo = gsap.quickTo(root, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(root, "y", { duration: 0.35, ease: "power3.out" });
    let visible = false;

    const setState = (state: CursorState, label = "") => {
      root.dataset.state = state;
      if (labelRef.current) labelRef.current.textContent = label;
    };

    const move = (event: PointerEvent) => {
      if (!visible) {
        gsap.set(root, { x: event.clientX, y: event.clientY });
        root.dataset.visible = "true";
        visible = true;
      }
      xTo(event.clientX);
      yTo(event.clientY);
    };

    const over = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const el = target?.closest<HTMLElement>(INTERACTIVE);
      root.dataset.tone = target?.closest("[data-nav='dark']") ? "light" : "dark";
      if (!el) return setState("default");
      const state = (el.dataset.cursor as CursorState | undefined) ?? "link";
      setState(state, el.dataset.cursorLabel ?? "");
    };

    const leave = () => {
      root.dataset.visible = "false";
      visible = false;
    };
    const down = () => (root.dataset.pressed = "true");
    const up = () => (root.dataset.pressed = "false");

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
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
