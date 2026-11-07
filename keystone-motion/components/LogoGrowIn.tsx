"use client";
// ───────────────────────────────────────────────────────────────
// 01 · Logo grow-in
// The leaf strokes itself on, the body pops, the wordmark rises.
// Drop into the header; it plays once on mount (first paint).
// ───────────────────────────────────────────────────────────────
import { motion, useReducedMotion } from "framer-motion";

const LEAF = "M6 34 C6 16 20 6 34 6 C34 24 20 34 6 34 Z";

export function LogoGrowIn() {
  const reduce = useReducedMotion();

  return (
    <div className="kn-logo">
      <span className="kn-logo__mark">
        <svg viewBox="0 0 40 40" width="42" height="42" aria-hidden>
          {/* filled leaf body — pops in after the stroke draws */}
          <motion.path
            d={LEAF}
            fill="#FBF7EE"
            style={{ transformOrigin: "center" }}
            initial={reduce ? false : { opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: reduce ? 0 : 0.65, duration: reduce ? 0 : 0.55, ease: [0.2, 1.4, 0.4, 1] }}
          />
          {/* drawn outline */}
          <motion.path
            d={LEAF}
            fill="none"
            stroke="#E4B877"
            strokeWidth={1.6}
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: reduce ? 0 : 1.05, ease: [0.6, 0, 0.2, 1] }}
          />
          {/* center vein */}
          <motion.path
            d="M6 34 C12 26 20 20 30 16"
            fill="none"
            stroke="#2E4A35"
            strokeWidth={1.2}
            strokeLinecap="round"
            opacity={0.5}
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: reduce ? 0 : 0.85, duration: reduce ? 0 : 0.5, ease: "easeOut" }}
          />
        </svg>
      </span>
      <motion.span
        className="kn-logo__word"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduce ? 0 : 0.75, duration: reduce ? 0 : 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      >
        Keystone
        <small>Nurseries</small>
      </motion.span>
    </div>
  );
}
