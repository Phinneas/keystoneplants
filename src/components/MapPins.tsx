"use client";
// ───────────────────────────────────────────────────────────────
// 05 · Map pin-drop & pulse
// Renders an overlay of nursery pins that drop + bounce into place
// (staggered spring), then ripple on hover. Position-only — drop it
// on top of whatever map you render. Feed it real, geocoded nursery
// data from Payload (x / y as % within the map box, or convert
// lat/lng with your projection).
// ───────────────────────────────────────────────────────────────
import { motion, useReducedMotion } from "framer-motion";
import { dropSpring } from "@/lib/motion";

export type Pin = {
  id: string;
  x: number; // 0–100 (% left within the map container)
  y: number; // 0–100 (% top)
  tone?: "green" | "ochre" | "terra";
  label?: string;
};

export function MapPins({ pins }: { pins: Pin[] }) {
  const reduce = useReducedMotion();

  return (
    <div className="kn-pins">
      {pins.map((p, i) => (
        <motion.button
          key={p.id}
          type="button"
          className={`kn-pin kn-pin--${p.tone ?? "terra"}`}
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          aria-label={p.label ?? "Nursery"}
          initial={reduce ? false : { y: -70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={reduce ? { duration: 0 } : { ...dropSpring, delay: i * 0.06 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.94 }}
        >
          <span className="kn-pin__ring" />
          <span className="kn-pin__body" />
        </motion.button>
      ))}
    </div>
  );
}
