"use client";
// ───────────────────────────────────────────────────────────────
// 07 · Micro-interactions
// Small, reusable, everywhere. Exports:
//   <RippleButton>   — press ripple + tap scale
//   <LiftCard>       — hover lift + shadow bloom
//   <FavoriteHeart>  — toggle with pop + spark burst
//   <NavLink>        — growing underline (CSS)
//   <SearchField>    — focus-expand search (CSS)
// All respect prefers-reduced-motion.
// ───────────────────────────────────────────────────────────────
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useState, type ReactNode, type PointerEvent } from "react";

/* ---- Ripple button ---- */
type Ripple = { id: number; x: number; y: number };
export function RippleButton({
  children,
  className = "",
  onClick,
  type = "button",
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}) {
  const reduce = useReducedMotion();
  const [ripples, setRipples] = useState<Ripple[]>([]);

  function handle(e: PointerEvent<HTMLButtonElement>) {
    if (!reduce) {
      const r = e.currentTarget.getBoundingClientRect();
      const id = Date.now();
      setRipples((rs) => [...rs, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
      setTimeout(() => setRipples((rs) => rs.filter((x) => x.id !== id)), 650);
    }
    onClick?.();
  }

  return (
    <motion.button type={type} className={`kn-btn ${className}`} onPointerDown={handle} whileTap={reduce ? undefined : { scale: 0.96 }}>
      <span className="kn-btn__label">{children}</span>
      {ripples.map((r) => (
        <span key={r.id} className="kn-btn__ripple" style={{ left: r.x, top: r.y }} />
      ))}
    </motion.button>
  );
}

/* ---- Lift card ---- */
export function LiftCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`kn-lift ${className}`}
      whileHover={reduce ? undefined : { y: -8, boxShadow: "0 22px 40px -22px rgba(46,74,53,0.6)" }}
      transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---- Favorite heart ---- */
const SPARKS = [
  { tx: -22, ty: -20 }, { tx: 20, ty: -22 }, { tx: -24, ty: 14 }, { tx: 22, ty: 16 },
];
export function FavoriteHeart({ defaultOn = false, onChange }: { defaultOn?: boolean; onChange?: (on: boolean) => void }) {
  const reduce = useReducedMotion();
  const [on, setOn] = useState(defaultOn);

  function toggle() {
    const next = !on;
    setOn(next);
    onChange?.(next);
  }

  return (
    <button type="button" className={`kn-heart ${on ? "is-on" : ""}`} aria-pressed={on} aria-label="Save plant" onClick={toggle}>
      <motion.svg viewBox="0 0 24 24" width="24" height="24" animate={on && !reduce ? { scale: [0.6, 1.35, 1] } : { scale: 1 }} transition={{ duration: 0.5, ease: [0.2, 1.6, 0.4, 1] }}>
        <path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5.5 6 5.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.5 0 5 3.5 3.5 6.5C19 16.5 12 21 12 21z" />
      </motion.svg>
      <AnimatePresence>
        {on && !reduce &&
          SPARKS.map((s, i) => (
            <motion.span
              key={i}
              className="kn-heart__spark"
              initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              animate={{ opacity: 0, x: s.tx, y: s.ty, scale: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            />
          ))}
      </AnimatePresence>
    </button>
  );
}

/* ---- Nav link (CSS underline) ---- */
export function NavLink({ children, href = "#" }: { children: ReactNode; href?: string }) {
  return (
    <a className="kn-navlink" href={href}>
      {children}
    </a>
  );
}

/* ---- Search field (CSS focus-expand) ---- */
export function SearchField({ placeholder = "City or ZIP" }: { placeholder?: string }) {
  return (
    <label className="kn-search">
      <svg className="kn-search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
      <input placeholder={placeholder} aria-label="Search by location" />
    </label>
  );
}
