"use client";
// ───────────────────────────────────────────────────────────────
// 02 · Hero entrance & drifting pollinator
// • Background photo "develops" from blur → focus
// • Headline rises word-by-word (stagger)
// • A butterfly drifts on a looping CSS offset-path (no plugin)
// • Subtle pointer parallax on image + copy
//
// Pass your own image + headline words as props. The butterfly and
// parallax disable cleanly under prefers-reduced-motion.
// ───────────────────────────────────────────────────────────────
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { PointerEvent } from "react";
import { stagger, riseItem, DUR, EASE_DEVELOP } from "@/lib/motion";

type HeroProps = {
  image: string;
  eyebrow?: string;
  words?: string[];
  sub?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function Hero({
  image,
  eyebrow = "Discover native plants",
  words = ["Plant", "what", "belongs", "here."],
  sub = "Find nurseries near you that grow real natives — one yard at a time.",
  ctaLabel = "Find nurseries",
  ctaHref = "#",
}: HeroProps) {
  const reduce = useReducedMotion();

  // pointer parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  const imgX = useTransform(sx, (v) => v * -16);
  const imgY = useTransform(sy, (v) => v * -12);
  const copyX = useTransform(sx, (v) => v * 12);
  const copyY = useTransform(sy, (v) => v * 7);

  function onMove(e: PointerEvent<HTMLElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section className="kn-hero" onPointerMove={onMove} onPointerLeave={onLeave}>
      <motion.div
        className="kn-hero__img"
        style={{ backgroundImage: `url(${image})`, x: reduce ? 0 : imgX, y: reduce ? 0 : imgY }}
        initial={reduce ? false : { filter: "blur(16px) saturate(0.55)", scale: 1.14 }}
        animate={{ filter: "blur(0px) saturate(1)", scale: 1 }}
        transition={{ duration: DUR.hero, ease: EASE_DEVELOP }}
      />
      <div className="kn-hero__scrim" />

      {!reduce && (
        <span className="kn-butterfly" aria-hidden>
          <span className="kn-butterfly__wing">
            <svg viewBox="0 0 30 30" width="30" height="30">
              <path d="M15 15 C6 4 0 8 3 16 C5 22 12 20 15 15Z" fill="#C98A3B" />
              <path d="M15 15 C24 4 30 8 27 16 C25 22 18 20 15 15Z" fill="#B5532F" />
              <rect x="14" y="9" width="2" height="13" rx="1" fill="#23291F" />
            </svg>
          </span>
        </span>
      )}

      <motion.div className="kn-hero__copy" style={{ x: reduce ? 0 : copyX, y: reduce ? 0 : copyY }}>
        <motion.p
          className="kn-hero__eyebrow"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: DUR.base }}
        >
          {eyebrow}
        </motion.p>

        <motion.h1
          className="kn-hero__title"
          variants={stagger(0.09, 0.3)}
          initial={reduce ? "show" : "hidden"}
          animate="show"
        >
          {words.map((w, i) => (
            <motion.span key={i} className="kn-hero__word" variants={riseItem}>
              {w}&nbsp;
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="kn-hero__sub"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: DUR.slow }}
        >
          {sub}
        </motion.p>

        <motion.a
          href={ctaHref}
          className="kn-hero__cta"
          initial={reduce ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, type: "spring", stiffness: 400, damping: 16 }}
        >
          {ctaLabel} →
        </motion.a>
      </motion.div>
    </section>
  );
}
