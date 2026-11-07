"use client";

import { useEffect, useRef, type ReactElement } from "react";

/**
 * Adds a brief, cursor-adjacent pollinator moment after a visitor pauses.
 * CSS chooses bees by day and moths/fireflies in night mode, which keeps the
 * behavior thematic without continuously following or obstructing the cursor.
 */
export function PollinatorField(): ReactElement {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!field || reducedMotion.matches) return;

    let dismissTimer = 0;
    let frameId = 0;
    let x = 0;
    let y = 0;

    function placePollinator() {
      frameId = 0;
      field?.style.setProperty("--pollinator-x", `${x}px`);
      field?.style.setProperty("--pollinator-y", `${y}px`);
      field?.classList.add("is-observing");
    }

    function onPointerMove(event: PointerEvent) {
      if (event.pointerType === "touch") return;

      x = Math.min(window.innerWidth - 42, Math.max(20, event.clientX + 14));
      y = Math.min(window.innerHeight - 42, Math.max(20, event.clientY - 12));

      if (!frameId) frameId = window.requestAnimationFrame(placePollinator);
      window.clearTimeout(dismissTimer);
      dismissTimer = window.setTimeout(() => field?.classList.remove("is-observing"), 1300);
    }

    document.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(dismissTimer);
      document.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div ref={fieldRef} className="pollinator-field" aria-hidden="true">
      <div className="pollinator-follower">
        <svg className="pollinator pollinator-day" viewBox="0 0 46 40" role="presentation">
          <path className="pollinator-wing" d="M22 19C8 19 2 10 5 4c3-5 12 0 17 13Z" />
          <path className="pollinator-wing" d="M25 18C35 6 42 8 43 13c1 7-8 12-18 10Z" />
          <path className="pollinator-body" d="M19 18c3-5 8-5 11 0 2 5 0 12-5 12s-8-7-6-12Z" />
          <path className="pollinator-stripe" d="M20 22h10M20 26h9" />
          <path className="pollinator-antenna" d="M22 18c-2-5-5-6-7-6M27 18c2-5 5-6 7-6" />
        </svg>
        <svg className="pollinator pollinator-night" viewBox="0 0 52 40" role="presentation">
          <path className="pollinator-moth-wing" d="M25 19C14 18 3 7 5 3c2-4 13 1 20 12Z" />
          <path className="pollinator-moth-wing" d="M27 18C39 17 49 8 48 4c-2-5-14 0-22 12Z" />
          <path className="pollinator-moth-wing" d="M25 21c-10 0-17 8-14 14 3 5 11-1 16-10Z" />
          <path className="pollinator-moth-wing" d="M27 21c9 1 15 8 12 14-3 5-10-1-14-10Z" />
          <path className="pollinator-moth-body" d="M23 17c2-4 5-4 7 0 2 5 1 12-3 12s-6-7-4-12Z" />
          <path className="pollinator-antenna" d="M24 18c-2-5-5-7-8-7M29 18c2-5 5-7 8-7" />
        </svg>
        <span className="pollinator-firefly pollinator-firefly-one" />
        <span className="pollinator-firefly pollinator-firefly-two" />
      </div>
    </div>
  );
}
