// ───────────────────────────────────────────────────────────────
// 08a · Route-level loading UI
// Place at app/loading.tsx (or inside any route segment). Next.js
// renders this automatically as the Suspense fallback while a server
// component / data fetch resolves — perfect home for the seedling.
// ───────────────────────────────────────────────────────────────
import { Loader } from "@/components/Loader";

export default function Loading() {
  return (
    <div className="kn-loading-screen">
      <Loader />
    </div>
  );
}
