"use client";
// ───────────────────────────────────────────────────────────────
// 06 · Scroll reveal — "rise & settle"
// The connective tissue of the whole site. Wrap any group of items in
// <Reveal> and make each child a <RevealItem>. They animate in, once,
// when scrolled into view, with a staggered settle.
//
//   <Reveal className="grid">
//     {nurseries.map(n => <RevealItem key={n.id}><Card .../></RevealItem>)}
//   </Reveal>
//
// Honors prefers-reduced-motion (renders static, fully visible).
// ───────────────────────────────────────────────────────────────
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { stagger, settleItem } from "@/lib/motion";

type Props = { children: ReactNode; className?: string; amount?: number; gap?: number };

export function Reveal({ children, className, amount = 0.3, gap = 0.12 }: Props) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={stagger(gap)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={settleItem}>
      {children}
    </motion.div>
  );
}
