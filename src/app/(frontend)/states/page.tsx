import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Native plant nurseries by state",
  description:
    "Browse native plant nurseries by state. Find locally sourced, regionally appropriate native plants near you.",
};

const STATES = [
  {
    code: "IL",
    name: "Illinois",
    tagline: "Tallgrass prairie restoration · Oak savannas · Floodplain forests",
  },
  {
    code: "MI",
    name: "Michigan",
    tagline: "Great Lakes shoreline · Northern boreal forest · Prairie remnants",
  },
  {
    code: "NY",
    name: "New York",
    tagline: "Hudson Valley · Adirondack highlands · Long Island coastal plain",
  },
  {
    code: "OH",
    name: "Ohio",
    tagline: "Erie lakeshore · Till plains · Unglaciated hill country",
  },
  {
    code: "PA",
    name: "Pennsylvania",
    tagline: "Ridge and Valley Appalachians · Piedmont · Allegheny Plateau",
  },
];

export default function StatesIndexPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      <div className="space-y-3">
        <div className="text-xs font-medium text-[#6b5b5d] uppercase tracking-widest">
          State Directory
        </div>
        <h1 className="text-3xl font-bold text-[#3D0C11] font-[var(--font-figtree)]">
          Native Plant Nurseries by State
        </h1>
        <p className="text-base text-[#6b5b5d] max-w-2xl leading-relaxed">
          Browse nurseries specializing in locally sourced native plants by state. Each listing
          includes nurseries verified to stock plants native to their region.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {STATES.map(({ code, name, tagline }) => (
          <Link
            key={code}
            href={`/states/${code.toLowerCase()}`}
            className="group flex flex-col gap-2 rounded-sm border border-[#e8f5d8] bg-white p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-[#3D0C11] font-[var(--font-figtree)] group-hover:underline decoration-[#DDFC74] decoration-2 underline-offset-2">
                {name}
              </span>
              <span className="text-xs font-mono text-[#6b5b5d] border border-[#e8f5d8] px-1.5 py-0.5 rounded-sm">
                {code}
              </span>
            </div>
            <p className="text-xs text-[#6b5b5d] leading-relaxed">{tagline}</p>
          </Link>
        ))}
      </div>

      <div className="border-t border-[#e8f5d8] pt-6">
        <p className="text-sm text-[#6b5b5d]">
          More states coming soon. In the meantime,{" "}
          <Link
            href="/nurseries"
            className="text-[#3D0C11] font-medium underline decoration-[#DDFC74] underline-offset-2 hover:decoration-2"
          >
            search by zip code
          </Link>{" "}
          to find nurseries anywhere.
        </p>
      </div>
    </div>
  );
}
