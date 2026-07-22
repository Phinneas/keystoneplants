// ───────────────────────────────────────────────────────────────
// 03 · Swaying meadow  (ambient, pure-CSS — safe as a Server Component)
// A band of grasses + wildflowers breathing in the breeze. Use as a
// footer flourish or section divider. All motion is CSS keyframes, so
// there's no JS cost and it pauses under prefers-reduced-motion.
//
// Values are deterministic (no Math.random) to avoid SSR hydration
// mismatches. Tweak freely.
// ───────────────────────────────────────────────────────────────
import type { CSSProperties } from "react";

const GREENS = ["#4b6b47", "#5c7a4e", "#3f6048", "#6b8f5a", "#7ca866", "#557a4c"];
const HEADS = ["#C2769B", "#E6B422", "#B89AD0", "#D98452"]; // coneflower / susan / bergamot / helianthus

// [heightPx, swayDurSec, delaySec]
const BLADES: [number, number, number][] = [
  [64, 3.1, 0.0], [92, 3.6, 0.4], [48, 2.8, 0.2], [110, 4.0, 0.7], [72, 3.3, 0.1],
  [56, 2.9, 0.5], [98, 3.8, 0.3], [42, 2.7, 0.9], [120, 4.2, 0.2], [68, 3.2, 0.6],
  [80, 3.5, 0.0], [52, 2.8, 0.8], [104, 3.9, 0.35], [60, 3.0, 0.55], [88, 3.7, 0.15],
  [46, 2.75, 0.95], [116, 4.1, 0.25], [70, 3.25, 0.65], [58, 2.95, 0.45], [96, 3.85, 0.05],
];
// flower indexes (insert a bloom before these blades) → [headColorIdx, stemPx, headPx, delay]
const FLOWERS: [number, number, number, number][] = [
  [0, 96, 26, 0.2], [1, 120, 28, 0.6], [3, 84, 24, 1.0], [2, 108, 30, 0.4],
];

export function SwayingMeadow() {
  return (
    <div className="kn-meadow" aria-hidden>
      <span className="kn-meadow__sun" />
      <div className="kn-meadow__ground">
        {FLOWERS.map(([c, stem, head, dl], i) => (
          <span key={`f${i}`} className="kn-flower" style={{ "--dl": `${dl}s`, height: `${stem + head}px` } as CSSProperties}>
            <span className="kn-flower__stem" style={{ height: `${stem}px` }} />
            <span className="kn-flower__head" style={{ width: head, height: head, bottom: stem - 4, background: HEADS[c] }} />
          </span>
        ))}
        {BLADES.map(([h, dur, dl], i) => (
          <span
            key={`b${i}`}
            className="kn-blade"
            style={{ height: `${h}px`, background: GREENS[i % GREENS.length], "--dur": `${dur}s`, "--dl": `${dl}s` } as CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
