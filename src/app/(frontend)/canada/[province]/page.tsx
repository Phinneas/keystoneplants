import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const PROVINCE_META: Record<string, { name: string; blurb: string; ecozones: string }> = {
  BC: {
    name: "British Columbia",
    blurb:
      "British Columbia contains more plant species than any other province in Canada — a result of its extraordinary range of ecosystems, from the temperate rainforests of the coast (the largest intact coastal temperate rainforest on Earth) to the dry interior plateau, the Rocky Mountain foothills, and the boreal forests of the north. Locally sourced native plants are essential in BC: a coastal Douglas-fir from the Cascades is genetically distinct from an interior Douglas-fir from the Okanagan, and they will not perform interchangeably.",
    ecozones: "Pacific Maritime · Montane Cordillera · Boreal Cordillera · Taiga Cordillera",
  },
  AB: {
    name: "Alberta",
    blurb:
      "Alberta's native plant communities range from the Rocky Mountain foothills — where lodgepole pine, trembling aspen, and native fescue grassland define the landscape — to the boreal forest that covers more than half the province, to the prairie and aspen parkland of the south. The aspen parkland ecozone, a transition belt between boreal forest and grassland, is one of the most ecologically productive and most threatened biomes in Canada.",
    ecozones: "Boreal Plains · Prairies · Montane Cordillera · Taiga Plains",
  },
  SK: {
    name: "Saskatchewan",
    blurb:
      "Saskatchewan's native grasslands — part of the Great Plains biome that once extended from Alberta to Texas — are among the most threatened ecosystems in North America. Less than 20% of Saskatchewan's native prairie remains unbroken, making native plant restoration in the province's agricultural landscape both more difficult and more urgent. The province's aspen parkland zone, between the boreal and the prairie, is a particular priority for native plant restoration.",
    ecozones: "Prairies · Boreal Plains · Taiga Shield",
  },
  MB: {
    name: "Manitoba",
    blurb:
      "Manitoba spans three major biomes: tallgrass prairie in the south (one of the most threatened ecosystems in Canada), boreal forest across the center, and the Hudson Bay Lowlands — a vast subarctic peatland that is one of the largest carbon stores on Earth. Manitoba's native plant restoration movement focuses heavily on prairie reconstruction, as the province retains only 1–2% of its original tallgrass prairie.",
    ecozones: "Prairies · Boreal Shield · Boreal Plains · Taiga Shield · Hudson Plains",
  },
  ON: {
    name: "Ontario",
    blurb:
      "Ontario's Carolinian zone — a small area in the extreme southwest that is the northernmost extension of the eastern deciduous forest biome — contains more at-risk plant and animal species than any other region of Canada. It transitions northward through the Great Lakes mixed forest to the vast Canadian Shield boreal and ultimately to the Hudson Bay Lowlands subarctic. Ontario native plant nurseries are among the most established in Canada.",
    ecozones: "Mixedwood Plains · Boreal Shield · Hudson Plains · Taiga Shield",
  },
  QC: {
    name: "Quebec",
    blurb:
      "Quebec's St. Lawrence Valley contains the most species-rich plant communities in eastern Canada, including the province's remnant Carolinian forest and its floodplain communities along the Richelieu and Ottawa Rivers. The province transitions northward through the Laurentian boreal forest — one of the largest intact boreal ecosystems in the world — to the Ungava tundra of the far north. Native plant seed provenance is critically important in Quebec given this range of climate zones.",
    ecozones: "Mixedwood Plains · Boreal Shield · Atlantic Maritime · Hudson Plains · Taiga Shield",
  },
  NB: {
    name: "New Brunswick",
    blurb:
      "New Brunswick lies entirely within the Acadian Forest Region — a biologically distinct zone that blends boreal and temperate tree species unique to the Atlantic Maritime ecozone. The Acadian forest is recognized as one of Canada's most ecologically distinct forest types, and its native plant communities differ meaningfully from the boreal forests of central Canada and the temperate forests of New England. The Bay of Fundy coastline supports particularly rare plant communities shaped by the world's highest tides.",
    ecozones: "Atlantic Maritime · Acadian Forest Region · Fundy Coastal",
  },
  NS: {
    name: "Nova Scotia",
    blurb:
      "Nova Scotia's Acadian forests, rocky Atlantic coastline, and distinctive red sandstone barrens create a set of native plant communities found nowhere else in the world. The province's Tusket River watershed contains the highest concentration of freshwater turtle species in Canada, and its native plant communities — particularly coastal heathlands and barrens — are shaped by salt spray, acidic soils, and frequent fog. Rare orchids and carnivorous plants are disproportionately well-represented in Nova Scotia.",
    ecozones: "Atlantic Maritime · Acadian Forest · Nova Scotia Highlands",
  },
  PE: {
    name: "Prince Edward Island",
    blurb:
      "Prince Edward Island is the smallest province in Canada and one of the most heavily agricultural, with native vegetation reduced to less than 10% of its pre-contact extent. The island's red sandstone soils and gentle topography once supported Acadian forest and extensive coastal wetlands. Remaining native plant communities are concentrated in protected areas, wetland edges, and stream corridors, and PEI's native plant restoration movement is focused on connecting these remnant fragments.",
    ecozones: "Atlantic Maritime · Acadian Forest Remnants · Coastal Wetlands",
  },
  NL: {
    name: "Newfoundland and Labrador",
    blurb:
      "Newfoundland and Labrador spans two very different worlds: the island of Newfoundland, with its maritime boreal forests, bog-covered interior, and dramatic fjord coastline, and Labrador, which transitions from the taiga of the south to subarctic barrens and ultimately Arctic landscape in the far north. Both regions have endemic plant communities shaped by glacial history, and native plant sourcing must account for the island's isolation — Newfoundland plants are genetically distinct from mainland populations of the same species.",
    ecozones: "Atlantic Maritime · Boreal Shield · Taiga Shield · Subarctic",
  },
  YT: {
    name: "Yukon",
    blurb:
      "The Yukon's native plant communities are among the most cold-adapted and ancient in North America — the territory's southwest was a glacial refugium during the last ice age, meaning some plant populations survived in place while the rest of the continent was under ice. The result is an unusually high rate of local endemism and genetic diversity. Yukon's boreal forest, alpine tundra, and subarctic shrublands are all connected to a food web of extraordinary density, including North America's largest migratory caribou herds.",
    ecozones: "Boreal Cordillera · Taiga Cordillera · Pacific Maritime (coastal fringe)",
  },
  NT: {
    name: "Northwest Territories",
    blurb:
      "The Northwest Territories encompasses the entire Mackenzie River watershed — the second-largest watershed in North America — and its native plant communities range from boreal forest in the south to subarctic shrub tundra and ultimately Arctic vegetation in the far north. The Mackenzie Delta is one of the most important waterfowl nesting areas in North America, and its native plant communities of sedge meadow, willow shrub, and peatland support some of the continent's most productive breeding habitat.",
    ecozones: "Taiga Plains · Taiga Shield · Taiga Cordillera · Southern Arctic",
  },
  NU: {
    name: "Nunavut",
    blurb:
      "Nunavut covers nearly 2 million square kilometers of Arctic landscape — more than any other Canadian province or territory — and its native plant communities are among the most specialized on Earth. Arctic plants survive conditions that would kill temperate species: permafrost, near-zero summer temperatures, 24-hour daylight in summer and polar night in winter, and nutrient-poor soils. Nunavut's plant communities are increasingly under pressure from climate change, which is transforming the Arctic faster than any other region on Earth.",
    ecozones: "Arctic Cordillera · Southern Arctic · Northern Arctic",
  },
};

export async function generateStaticParams() {
  return Object.keys(PROVINCE_META).map((province) => ({
    province: province.toLowerCase(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ province: string }>;
}): Promise<Metadata> {
  const { province } = await params;
  const key = province.toUpperCase();
  const meta = PROVINCE_META[key];
  if (!meta) return { title: "Province Not Found" };
  return {
    title: `Native plant nurseries in ${meta.name}`,
    description: `Find native plant nurseries in ${meta.name}. Browse locally sourced, ecologically appropriate native plants for ${meta.ecozones.split(" · ")[0]} and surrounding regions.`,
  };
}

export default async function ProvincePage({
  params,
}: {
  params: Promise<{ province: string }>;
}) {
  const { province } = await params;
  const key = province.toUpperCase();
  const meta = PROVINCE_META[key];

  if (!meta) notFound();

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#6b5b5d]">
        <Link href="/canada" className="hover:text-[#3D0C11] transition-colors">
          Canada
        </Link>
        <span>/</span>
        <span className="text-[#3D0C11] font-medium">{meta.name}</span>
      </nav>

      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="text-xs font-medium text-[#6b5b5d] uppercase tracking-widest">
          Native Plant Nurseries
        </div>
        <h1 className="text-4xl font-bold text-[#3D0C11] font-[var(--font-figtree)] leading-tight">
          {meta.name}
        </h1>
        <div className="flex flex-wrap gap-2">
          {meta.ecozones.split(" · ").map((zone) => (
            <span
              key={zone}
              className="text-xs font-medium bg-[#e8f5d8] text-[#3D0C11] px-2.5 py-1 rounded-sm"
            >
              {zone}
            </span>
          ))}
        </div>
        <p className="text-base text-[#6b5b5d] leading-relaxed">{meta.blurb}</p>
      </div>

      {/* Nursery listings placeholder */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#3D0C11] font-[var(--font-figtree)]">
          Nurseries in {meta.name}
        </h2>
        <div className="rounded-sm border border-[#e8f5d8] bg-[#f9fef5] p-8 text-center space-y-3">
          <p className="text-[#6b5b5d] text-sm">
            Nursery listings for {meta.name} are being added. Know a nursery that should be here?
          </p>
          <a
            href="mailto:hello@keystonenurseries.com"
            className="inline-block text-sm font-medium text-[#3D0C11] underline decoration-[#DDFC74] underline-offset-2 hover:decoration-2"
          >
            Submit a nursery →
          </a>
        </div>
      </section>

      {/* Keystone plants CTA */}
      <section className="rounded-sm border border-[#e8f5d8] bg-white p-6 space-y-3">
        <h2 className="text-lg font-bold text-[#3D0C11] font-[var(--font-figtree)]">
          Find keystone plants for your region
        </h2>
        <p className="text-sm text-[#6b5b5d] leading-relaxed">
          Not sure which native plants to prioritize? Our quiz identifies the highest-impact
          keystone species for your specific ecoregion — the plants that do the most to support
          birds, bees, and butterflies where you live.
        </p>
        <Link
          href="/quiz"
          className="inline-block text-sm font-medium bg-[#3D0C11] text-[#DDFC74] px-4 py-2 rounded-sm hover:bg-[#BF6900] transition-colors"
        >
          Take the plant quiz
        </Link>
      </section>

      {/* Back link */}
      <div className="border-t border-[#e8f5d8] pt-6">
        <Link
          href="/canada"
          className="text-sm text-[#6b5b5d] hover:text-[#3D0C11] transition-colors"
        >
          ← All Canadian provinces
        </Link>
      </div>
    </div>
  );
}
