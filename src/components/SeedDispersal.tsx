"use client";

import type { CSSProperties, ReactElement } from "react";
import { useEffect, useMemo, useRef } from "react";

const TRANSITION_DURATION = 560;

type Seed = {
  id: number;
  x: number;
  y: number;
  driftX: number;
  driftY: number;
  scale: number;
  delay: number;
  duration: number;
  rotation: number;
};

function createSeeds(count: number): Seed[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    x: 12 + Math.random() * 76,
    y: 18 + Math.random() * 62,
    driftX: -26 + Math.random() * 68,
    driftY: -18 - Math.random() * 32,
    scale: 0.65 + Math.random() * 0.9,
    delay: Math.random() * 0.22,
    duration: 0.72 + Math.random() * 0.45,
    rotation: -30 + Math.random() * 60,
  }));
}

function canAnimateNavigation(event: MouseEvent, anchor: HTMLAnchorElement) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  if (anchor.target === "_blank" || anchor.hasAttribute("download") || anchor.dataset.disableSeedTransition !== undefined) return false;

  const destination = new URL(anchor.href, window.location.href);
  const current = new URL(window.location.href);

  if (destination.origin !== current.origin) return false;
  if (destination.protocol !== "http:" && destination.protocol !== "https:") return false;
  if (destination.pathname === current.pathname && destination.search === current.search && destination.hash) return false;

  return destination.href !== current.href;
}

/**
 * This client component captures ordinary same-origin link clicks and briefly
 * disperses a field of milkweed-style seeds before handing navigation back to
 * the browser. Links with data-disable-seed-transition bypass this effect.
 */
export function SeedDispersal(): ReactElement {
  const layerRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef(false);
  const seeds = useMemo(() => createSeeds(24), []);

  useEffect(() => {
    const layer = layerRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!layer || reduceMotion.matches) return;

    let navigationTimer = 0;
    let resetTimer = 0;

    function clearTransition() {
      isTransitioningRef.current = false;
      layer?.classList.remove("is-dispersing");
    }

    function onDocumentClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || !canAnimateNavigation(event, anchor) || isTransitioningRef.current) return;

      event.preventDefault();
      isTransitioningRef.current = true;

      const bounds = anchor.getBoundingClientRect();
      layer.style.setProperty("--seed-origin-x", `${bounds.left + bounds.width / 2}px`);
      layer.style.setProperty("--seed-origin-y", `${bounds.top + bounds.height / 2}px`);
      layer.classList.remove("is-dispersing");
      // Force the class change to be observed before replaying the animation.
      void layer.offsetWidth;
      layer.classList.add("is-dispersing");

      navigationTimer = window.setTimeout(() => {
        window.location.assign(anchor.href);
      }, TRANSITION_DURATION);
      resetTimer = window.setTimeout(clearTransition, TRANSITION_DURATION + 800);
    }

    function onPageHide() {
      window.clearTimeout(navigationTimer);
      window.clearTimeout(resetTimer);
      clearTransition();
    }

    document.addEventListener("click", onDocumentClick, true);
    window.addEventListener("pagehide", onPageHide);

    return () => {
      document.removeEventListener("click", onDocumentClick, true);
      window.removeEventListener("pagehide", onPageHide);
      window.clearTimeout(navigationTimer);
      window.clearTimeout(resetTimer);
    };
  }, []);

  return (
    <div ref={layerRef} className="seed-dispersal" aria-hidden="true">
      {seeds.map((seed) => {
        const style = {
          "--seed-x": `${seed.x}vw`,
          "--seed-y": `${seed.y}vh`,
          "--seed-drift-x": `${seed.driftX}vw`,
          "--seed-drift-y": `${seed.driftY}vh`,
          "--seed-scale": seed.scale,
          "--seed-delay": `${seed.delay}s`,
          "--seed-duration": `${seed.duration}s`,
          "--seed-rotation": `${seed.rotation}deg`,
        } as CSSProperties;

        return (
          <span key={seed.id} className="seed-particle" style={style}>
            <span className="seed-fluff" />
            <span className="seed-kernel" />
          </span>
        );
      })}
    </div>
  );
}
