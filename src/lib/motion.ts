// ───────────────────────────────────────────────────────────────
// Keystone Nurseries · shared motion tokens
// One source of truth for easings, durations, and reusable variants.
// Import these everywhere so the whole site moves with one personality.
// ───────────────────────────────────────────────────────────────
import type { Variants, Transition } from "framer-motion";

/** Easing curves (cubic-bezier control points). */
export const EASE = [0.2, 0.8, 0.2, 1] as const; // calm rise — the house default
export const EASE_SETTLE = [0.16, 0.9, 0.3, 1] as const; // slight overshoot, then settle
export const EASE_DEVELOP = [0.4, 0, 0.2, 1] as const; // photo "develop" / material standard

/** Durations in seconds. */
export const DUR = { fast: 0.3, base: 0.6, slow: 0.9, hero: 1.4 } as const;

/** A parent that staggers its children. */
export const stagger = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/** Word / line rise — used in the hero headline. */
export const riseItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE } },
};

/** Card "rise & settle" — used by <Reveal> for grids. */
export const settleItem: Variants = {
  hidden: { opacity: 0, y: 34, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE_SETTLE } },
};

/** Spring used for pins dropping and the favorite heart. */
export const dropSpring: Transition = { type: "spring", stiffness: 500, damping: 18 };
