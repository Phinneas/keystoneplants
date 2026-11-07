"use client";

import { useEffect, useRef, type ReactElement } from "react";

/**
 * A decorative, motion-safe SVG that gradually reveals its root paths as the
 * visitor moves down the page. It does not capture pointer input or alter the
 * document flow, so it can be mounted once in the shared frontend layout.
 */
export function RootSystemScroll(): ReactElement {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const paths = Array.from(svg?.querySelectorAll<SVGPathElement>("[data-root-path]") ?? []);

    if (!svg || reduceMotion.matches) {
      paths.forEach((path) => {
        path.style.strokeDasharray = "none";
        path.style.strokeDashoffset = "0";
      });
      return;
    }

    const measurements = paths.map((path) => ({
      path,
      length: path.getTotalLength(),
      start: Number(path.dataset.start ?? "0"),
      end: Number(path.dataset.end ?? "1"),
    }));

    measurements.forEach(({ path, length }) => {
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
    });

    let frameId = 0;

    function render() {
      frameId = 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));

      measurements.forEach(({ path, length, start, end }) => {
        const segmentProgress = Math.min(1, Math.max(0, (progress - start) / (end - start)));
        path.style.strokeDashoffset = `${length * (1 - segmentProgress)}`;
      });
    }

    function requestRender() {
      if (!frameId) frameId = window.requestAnimationFrame(render);
    }

    render();
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", requestRender);
    };
  }, []);

  return (
    <aside aria-hidden="true" className="root-system-scroll">
      <svg ref={svgRef} viewBox="0 0 160 960" preserveAspectRatio="none" role="presentation">
        <defs>
          <linearGradient id="root-gradient" x1="0" x2="0.85" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="65%" stopColor="var(--season-ink)" />
            <stop offset="100%" stopColor="var(--primary)" />
          </linearGradient>
        </defs>
        <path data-root-path data-start="0" data-end="0.33" d="M77 0C79 70 75 119 83 184C91 250 80 287 91 350" />
        <path data-root-path data-start="0.08" data-end="0.49" d="M83 185C59 212 54 244 31 268C16 284 9 305 5 337" />
        <path data-root-path data-start="0.15" data-end="0.6" d="M83 186C114 216 119 244 143 272C153 284 157 301 159 318" />
        <path data-root-path data-start="0.28" data-end="0.74" d="M91 350C79 402 83 442 65 486C48 527 47 580 49 634" />
        <path data-root-path data-start="0.36" data-end="0.82" d="M89 354C113 400 115 434 128 478C140 516 138 548 151 575" />
        <path data-root-path data-start="0.56" data-end="1" d="M49 634C60 692 50 736 67 794C77 828 76 885 68 960" />
        <path data-root-path data-start="0.66" data-end="1" d="M50 637C27 679 22 724 4 754" />
        <path data-root-path data-start="0.7" data-end="1" d="M67 793C100 812 119 842 148 862" />
        <circle className="root-system-node" cx="83" cy="185" r="5" />
        <circle className="root-system-node" cx="91" cy="350" r="4" />
        <circle className="root-system-node" cx="49" cy="634" r="4.5" />
      </svg>
    </aside>
  );
}
