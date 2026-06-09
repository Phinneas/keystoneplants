import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { NurseryCard } from "@/components/NurseryCard";
import { getNurseriesByState } from "@/lib/nurseries";

export const dynamic = 'force-dynamic'

const STATE_META: Record<string, { name: string; blurb: string; ecoregions: string }> = {
  PA: {
    name: "Pennsylvania",
    blurb:
      "Pennsylvania spans the Ridge and Valley Appalachians in the center, the Piedmont lowlands in the southeast, and the glaciated Allegheny Plateau in the north. This diversity supports a wide range of native plants — from oak-hickory forests in the valleys to hemlock ravines in the north.",
    ecoregions: "Ridge and Valley · Piedmont · Allegheny Plateau",
  },
  OH: {
    name: "Ohio",
    blurb:
      "Ohio sits within the Eastern Broadleaf Forest province, transitioning from the Erie lakeshore in the north to the unglaciated hill country of the southeast. Native oaks, maples, and wildflowers thrive across the state's mix of prairie remnants and deciduous forest.",
    ecoregions: "Erie Drift Plain · Till Plains · Unglaciated Allegheny Plateau",
  },
  NY: {
    name: "New York",
    blurb:
      "New York ranges from the coastal plain of Long Island through the Hudson Valley and Catskills to the Adirondack highlands. The state's varied topography creates distinct plant communities — maritime shrublands along the coast, rich floodplain forests inland, and boreal species at elevation.",
    ecoregions: "Northeastern Coastal Zone · Hudson Valley · Adirondack Highlands",
  },
  MI: {
    name: "Michigan",
    blurb:
      "Michigan's two peninsulas are defined by the Great Lakes, creating a distinctive maritime-moderated climate that allows species from both northern boreal forests and southern deciduous forests to coexist. Native oaks, native prairie remnants, and Great Lakes shoreline plant communities are conservation priorities.",
    ecoregions: "Southern Michigan/Northern Indiana Drift Plains · Northern Lakes and Forests",
  },
  IL: {
    name: "Illinois",
    blurb:
      "Illinois was once dominated by tallgrass prairie — one of the most biodiverse ecosystems in North America. Today less than 0.01% of native prairie remains, making native plant restoration especially urgent. Oak savannas, floodplain forests, and prairie pockets all depend on locally sourced native plants.",
    ecoregions: "Central Corn Belt Plains · Huron/Erie Lake Plains · Southern Illinois Plains and Hills",
  },
  CA: {
    name: "California",
    blurb:
      "California contains more native plant species than any other state — a product of its extraordinary range of climates, from coastal redwood forests and Central Valley grasslands to Sierra Nevada montane forests and southern chaparral. Local provenance matters enormously here: a plant native to the Bay Area may not be appropriate for San Diego, and vice versa.",
    ecoregions: "California Floristic Province · Sierra Nevada · Central California Valley · Southern California Mountains",
  },
  TX: {
    name: "Texas",
    blurb:
      "Texas is the most ecologically diverse state in the contiguous US, spanning the Piney Woods of East Texas, the Blackland Prairies of the east-central region, the Edwards Plateau Hill Country, the Trans-Pecos desert, and the Gulf Coastal Plain. Each of these regions has its own keystone native plant community — and plants sourced from one region are often poorly adapted to another.",
    ecoregions: "Texas Blackland Prairies · Edwards Plateau · Cross Timbers · East Texas Piney Woods",
  },
  WA: {
    name: "Washington",
    blurb:
      "The Cascades divide Washington into two ecologically distinct halves. West of the mountains, the Puget Lowland and Coast Range support dense Douglas-fir and western red cedar forests with a rich understory of native ferns and shrubs. East of the Cascades, the Columbia Plateau and Blue Mountains host drought-adapted bunchgrass prairie, ponderosa pine forests, and riparian corridors defined by native willow and alder.",
    ecoregions: "Puget Lowland · North Cascades · Columbia Plateau · Blue Mountains",
  },
  OR: {
    name: "Oregon",
    blurb:
      "Oregon's native plant communities reflect some of the sharpest ecological gradients in North America. The Willamette Valley — once a mosaic of prairie, oak savanna, and wetlands — is now one of the most altered landscapes in the Pacific Northwest and a priority for native plant restoration. The Cascades, Coast Range, and high desert of eastern Oregon each support distinct keystone species.",
    ecoregions: "Willamette Valley · Coast Range · Cascades · Eastern Cascades Slopes",
  },
  CO: {
    name: "Colorado",
    blurb:
      "Colorado's native plant communities range from shortgrass prairie on the eastern plains to montane meadows and subalpine forest in the Rockies. The Southern Rockies harbor some of the highest-elevation native plant diversity in North America, while the Colorado Plateau in the west supports drought-adapted shrublands and pinyon-juniper woodlands.",
    ecoregions: "Southern Rockies · Colorado Plateau · High Plains · Wyoming Basin",
  },
  NC: {
    name: "North Carolina",
    blurb:
      "North Carolina stretches from the Outer Banks barrier islands through the Piedmont to the southern Appalachians — one of the most botanically diverse regions in the eastern US. The Blue Ridge Escarpment is a global biodiversity hotspot, and the longleaf pine savannas of the Coastal Plain host dozens of rare native species found nowhere else.",
    ecoregions: "Blue Ridge Mountains · Piedmont · Southeastern Plains · Southern Coastal Plain",
  },
  GA: {
    name: "Georgia",
    blurb:
      "Georgia spans five distinct physiographic regions, from the Blue Ridge mountains in the north to the coastal barrier islands and longleaf pine flatwoods of the south. The Piedmont red clay hills and the Fall Line sandhills in between each support distinct native plant communities that have been severely reduced by development and agriculture.",
    ecoregions: "Blue Ridge · Piedmont · Southeastern Plains · Southern Coastal Plain",
  },
  MN: {
    name: "Minnesota",
    blurb:
      "Minnesota sits at the convergence of three major North American biomes: the eastern deciduous forest, the tallgrass prairie, and the boreal forest. The Boundary Waters region in the northeast is true boreal taiga — spruce, birch, and aspen over a carpet of Vaccinium and Labrador tea. The western prairie region was once dominated by big bluestem and prairie forbs that stretched to the horizon.",
    ecoregions: "Northern Lakes and Forests · Central Corn Belt Plains · Northern Minnesota Wetlands",
  },
  WI: {
    name: "Wisconsin",
    blurb:
      "Wisconsin's landscape is shaped by glacial history: the Driftless Area in the southwest escaped glaciation entirely, preserving ancient plant communities on steep coulees and bluffs, while the northern lake district supports a boreal forest transition zone. The state once had 2.1 million acres of native prairie; less than 12,000 remain, making prairie restoration one of the most urgent native plant priorities in the Midwest.",
    ecoregions: "Northern Lakes and Forests · Driftless Area · Southeastern Wisconsin Till Plains",
  },
  VA: {
    name: "Virginia",
    blurb:
      "Virginia's geography mirrors the full sweep of the central Appalachian system — from the barrier islands and tidal marshes of the Chesapeake coast, through the Piedmont clay hills, to the Ridge and Valley Appalachians and the high peaks of Shenandoah. Each region supports distinct native plant communities, and locally sourced stock performs measurably better than plants grown from out-of-region seed.",
    ecoregions: "Piedmont · Blue Ridge Mountains · Ridge and Valley · Coastal Plain",
  },
};

interface StatePageProps {
  params: Promise<{ state: string }>;
}

export async function generateStaticParams() {
  return Object.keys(STATE_META).map((state) => ({ state: state.toLowerCase() }));
}

export async function generateMetadata({ params }: StatePageProps): Promise<Metadata> {
  const { state } = await params;
  const meta = STATE_META[state.toUpperCase()];
  if (!meta) return {};
  return {
    title: `Native plant nurseries in ${meta.name}`,
    description: `Find native plant nurseries in ${meta.name}. ${meta.blurb.slice(0, 120)}…`,
  };
}

export default async function StatePage({ params }: StatePageProps) {
  const { state } = await params;
  const stateCode = state.toUpperCase();
  const meta = STATE_META[stateCode];

  if (!meta) notFound();

  const nurseries = await getNurseriesByState(stateCode);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <div className="text-xs font-medium text-[#6b5b5d] uppercase tracking-widest">
          State Directory
        </div>
        <h1 className="text-3xl font-bold text-[#3D0C11] font-[var(--font-figtree)]">
          Native Plant Nurseries in {meta.name}
        </h1>
        <p className="text-base text-[#6b5b5d] max-w-2xl leading-relaxed">{meta.blurb}</p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-[#6b5b5d] font-medium">Ecoregions:</span>
          {meta.ecoregions.split(" · ").map((r) => (
            <span
              key={r}
              className="text-xs px-2 py-0.5 rounded-sm border border-[#e8f5d8] bg-[#f8fef3] text-[#6b5b5d]"
            >
              {r}
            </span>
          ))}
        </div>
      </div>

      {/* Nursery list */}
      <div>
        {nurseries.length === 0 ? (
          <div className="py-16 text-center space-y-3 border border-dashed border-[#e8f5d8] rounded-sm">
            <p className="text-[#3D0C11] font-medium">
              No nurseries listed in {meta.name} yet.
            </p>
            <p className="text-sm text-[#6b5b5d]">
              Know a good one?{" "}
              <a href="/suggest" className="underline hover:text-[#3D0C11]">
                Suggest a nursery
              </a>
              .
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-[#6b5b5d] mb-5">
              {nurseries.length} nurser{nurseries.length !== 1 ? "ies" : "y"} in {meta.name}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {nurseries.map((nursery) => (
                <NurseryCard key={nursery.id} {...nursery} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Cross-link to zip search */}
      <div className="border-t border-[#e8f5d8] pt-8">
        <p className="text-sm text-[#6b5b5d]">
          Looking for nurseries near a specific location?{" "}
          <Link href="/nurseries" className="text-[#3D0C11] font-medium underline decoration-[#DDFC74] underline-offset-2 hover:decoration-2">
            Search by zip code →
          </Link>
        </p>
      </div>
    </div>
  );
}
