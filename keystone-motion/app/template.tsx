"use client";
// ───────────────────────────────────────────────────────────────
// 08b · Route transition — leaf wipe
// app/template.tsx remounts on every navigation (unlike layout.tsx),
// which makes it the right place for an *enter* transition. On each
// route change we (a) fade/slide the new page in and (b) sweep a
// leaf-green panel across to mask the swap.
//
// Note on App Router: true *exit* animations for the outgoing route
// are not natively supported (the old tree unmounts immediately), so
// we lean on an enter-side wipe — which reads just as well and is far
// more robust. Honors prefers-reduced-motion.
// ───────────────────────────────────────────────────────────────
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <div className="kn-route" key={pathname}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1], delay: 0.25 }}
      >
        {children}
      </motion.div>

      {/* leaf-green wipe that sweeps across then off */}
      <motion.div
        className="kn-wipe"
        initial={{ x: "-101%" }}
        animate={{ x: ["-101%", "0%", "0%", "101%"] }}
        transition={{ duration: 1.1, ease: [0.7, 0, 0.3, 1], times: [0, 0.45, 0.55, 1] }}
      >
        <motion.svg
          viewBox="0 0 24 24"
          width="40"
          height="40"
          fill="#E4B877"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.1, times: [0.2, 0.45, 0.6, 0.8] }}
        >
          <path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14z" />
        </motion.svg>
      </motion.div>
    </div>
  );
}
