// ───────────────────────────────────────────────────────────────
// 08a · Seed-to-sprout loader (ambient, pure-CSS)
// A seed drops, a stem grows, two leaves unfurl — loops. Use it as
// the Suspense fallback in app/loading.tsx, or anywhere you need a
// branded "working…" state. No JS, pauses under reduced motion.
// ───────────────────────────────────────────────────────────────
export function Loader({ label = "Growing your results…" }: { label?: string }) {
  return (
    <div className="kn-loader" role="status" aria-live="polite">
      <span className="kn-loader__pot">
        <span className="kn-loader__seed" />
        <span className="kn-loader__leaf kn-loader__leaf--l" />
        <span className="kn-loader__leaf kn-loader__leaf--r" />
        <span className="kn-loader__stem" />
      </span>
      <span className="kn-loader__label">{label}</span>
    </div>
  );
}
