import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Native plant nurseries by Canadian province",
  description:
    "Browse native plant nurseries by Canadian province and territory. Find locally sourced, ecologically appropriate native plants near you.",
};

const PROVINCES = [
  {
    code: "BC",
    name: "British Columbia",
    tagline: "Pacific Maritime rainforest · Montane Cordillera · Interior plateau · Pacific flyway",
  },
  {
    code: "AB",
    name: "Alberta",
    tagline: "Rocky Mountain foothills · Boreal Plains · Prairies · Aspen parkland",
  },
  {
    code: "SK",
    name: "Saskatchewan",
    tagline: "Prairie grasslands · Aspen parkland · Boreal forest transition",
  },
  {
    code: "MB",
    name: "Manitoba",
    tagline: "Tallgrass prairie · Boreal Shield · Hudson Bay Lowlands",
  },
  {
    code: "ON",
    name: "Ontario",
    tagline: "Great Lakes forests · Canadian Shield · Carolinian zone · Hudson Plains",
  },
  {
    code: "QC",
    name: "Quebec",
    tagline: "St. Lawrence Valley · Boreal Shield · Acadian forests · Subarctic taiga",
  },
  {
    code: "NB",
    name: "New Brunswick",
    tagline: "Acadian forests · Atlantic coast · Fundy tidal marsh",
  },
  {
    code: "NS",
    name: "Nova Scotia",
    tagline: "Acadian forests · Atlantic Maritime coast · Annapolis Valley",
  },
  {
    code: "PE",
    name: "Prince Edward Island",
    tagline: "Acadian forest remnants · Red sandstone coast · Island wetlands",
  },
  {
    code: "NL",
    name: "Newfoundland and Labrador",
    tagline: "Maritime boreal · Taiga Shield · Subarctic barrens · Fjords",
  },
  {
    code: "YT",
    name: "Yukon",
    tagline: "Boreal Cordillera · Taiga Cordillera · Subarctic · Kluane alpine",
  },
  {
    code: "NT",
    name: "Northwest Territories",
    tagline: "Taiga Plains · Taiga Shield · Mackenzie Delta · Subarctic transition",
  },
  {
    code: "NU",
    name: "Nunavut",
    tagline: "Arctic Cordillera · Southern Arctic · Northern Arctic tundra",
  },
];

export default function CanadaIndexPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      <div className="space-y-3">
        <div className="text-xs font-medium text-[#6b5b5d] uppercase tracking-widest">
          Province Directory
        </div>
        <h1 className="text-3xl font-bold text-[#3D0C11] font-[var(--font-figtree)]">
          Native Plant Nurseries in Canada
        </h1>
        <p className="text-base text-[#6b5b5d] max-w-2xl leading-relaxed">
          Browse native plant nurseries by Canadian province and territory. Canada spans eleven
          ecozones from temperate Pacific rainforest to Arctic tundra — locally sourced native
          plants are critical to matching the right species to the right place.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROVINCES.map(({ code, name, tagline }) => (
          <Link
            key={code}
            href={`/canada/${code.toLowerCase()}`}
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
          Looking for US nurseries?{" "}
          <Link
            href="/states"
            className="text-[#3D0C11] font-medium underline decoration-[#DDFC74] underline-offset-2 hover:decoration-2"
          >
            Browse by US state
          </Link>{" "}
          or{" "}
          <Link
            href="/nurseries"
            className="text-[#3D0C11] font-medium underline decoration-[#DDFC74] underline-offset-2 hover:decoration-2"
          >
            search by zip code
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
