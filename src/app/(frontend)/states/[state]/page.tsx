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
  AK: {
    name: "Alaska",
    blurb:
      "Alaska spans more ecological variation than any other state — from the temperate rainforests of the Tongass (the largest national forest in the US) along the southeast coast, to the interior boreal taiga dominated by white spruce, paper birch, and quaking aspen, to the tundra of the Arctic Slope. Native plant restoration in Alaska focuses on locally sourced seed stock adapted to the state's extreme cold and short growing seasons.",
    ecoregions: "Interior Boreal Taiga · Tongass Coastal Rainforest · Arctic Tundra · Alaska Range",
  },
  AL: {
    name: "Alabama",
    blurb:
      "Alabama's native plant communities range from the longleaf pine savannas and coastal plain flatwoods of the south to the ridge-and-valley forests and Cumberland Plateau of the north. The state was once blanketed by longleaf pine — a keystone ecosystem that supported more than 900 plant species and is now reduced to less than 3% of its original extent, making Alabama a priority region for native plant restoration.",
    ecoregions: "Southeastern Plains · Ridge and Valley · Cumberland Plateau · Coastal Plain",
  },
  AR: {
    name: "Arkansas",
    blurb:
      "Arkansas sits at the convergence of the Ozark Highlands, the Ouachita Mountains, the Mississippi Alluvial Plain, and the Gulf Coastal Plain — giving the state remarkable ecological diversity for its size. The Ozarks support rich oak-hickory forest with high endemism, while the delta bottomlands harbor cypress-tupelo swamps and bottomland hardwood communities that are among the most productive wildlife habitats in North America.",
    ecoregions: "Ozark Highlands · Arkansas Valley · Ouachita Mountains · Mississippi Alluvial Plain",
  },
  AZ: {
    name: "Arizona",
    blurb:
      "Arizona's ecological range is extraordinary — from the Sonoran Desert floor below sea level to 12,000-foot sky island peaks that support boreal forest species. The sky islands of southeastern Arizona are a global biodiversity hotspot, with plant communities that blend Rocky Mountain, Mexican Sierra Madre, and Chihuahuan Desert elements found nowhere else in the US. Native plant sourcing by elevation and ecoregion is especially critical here.",
    ecoregions: "Sonoran Desert · Chihuahuan Desert · Arizona/New Mexico Mountains · Colorado Plateau",
  },
  CT: {
    name: "Connecticut",
    blurb:
      "Connecticut is one of the most densely developed states in the US, making urban and suburban native plant restoration especially impactful. The state's forests are primarily oak-hickory with a transition toward northern hardwoods in higher elevations, and its coastal communities — Long Island Sound shore, tidal marshes, and barrier beaches — support distinct native plant assemblages that are increasingly threatened by sea-level rise.",
    ecoregions: "Northeastern Coastal Zone · New England/Acadian Forests",
  },
  DE: {
    name: "Delaware",
    blurb:
      "Delaware occupies the fall line between the Piedmont and the Atlantic Coastal Plain — a narrow but ecologically distinct zone where Appalachian flora meets coastal plain species. The state's Christina River watershed and Delaware Bay shoreline are priorities for native plant restoration, and Delaware's Atlantic white cedar swamps and freshwater tidal marshes support rare plant communities found at few other locations on the East Coast.",
    ecoregions: "Atlantic Coastal Plain · Piedmont · Delaware Bay Watershed",
  },
  FL: {
    name: "Florida",
    blurb:
      "Florida's native plant communities are unlike those of any other state — subtropical flatwoods, scrub, cypress domes, mangroves, and coastal strand communities form a patchwork of habitats shaped by fire, water, and sand. Florida's scrub communities, found only on ancient sand ridges in the peninsular interior, are among the most endangered ecosystems in North America and home to dozens of rare endemic plant species.",
    ecoregions: "Southern Florida Coastal Plain · Southeastern Plains · Florida Flatwoods · Everglades",
  },
  HI: {
    name: "Hawaii",
    blurb:
      "Hawaii's native plants evolved in complete isolation for millions of years, resulting in extraordinary endemism — more than 90% of native plant species are found nowhere else on Earth. Invasive species and habitat destruction have made Hawaii the endangered species capital of the US. Planting true Hawaiian native species — sourced from appropriate island and elevation — is one of the most direct actions available to support the state's critically threatened ecosystems.",
    ecoregions: "Hawaiian Tropical Rainforest · Montane Dry Forest · Alpine Shrubland · Coastal Strand",
  },
  IA: {
    name: "Iowa",
    blurb:
      "Iowa was once covered by one of the most expansive tallgrass prairie ecosystems on Earth. Today less than 0.1% of Iowa's native prairie survives, and the state's native plant restoration movement focuses heavily on reconstructing prairie remnants, oak savanna edges, and riparian corridors. Native plants sourced from Iowa's own seed stocks are adapted to the state's extreme temperature swings and heavy clay soils.",
    ecoregions: "Western Corn Belt Plains · Central Irregular Plains · Driftless Area",
  },
  ID: {
    name: "Idaho",
    blurb:
      "Idaho's native plant communities span an extraordinary range — from the sagebrush steppe of the Snake River Plain to the Northern Rockies forests of the Panhandle and the Columbia Plateau bunchgrass prairies of the west. The state contains the largest roadless wilderness area in the contiguous US, and its native plant communities are an important baseline for restoration across the Intermountain West.",
    ecoregions: "Northern Rockies · Columbia Plateau · Blue Mountains · Snake River Plain",
  },
  IN: {
    name: "Indiana",
    blurb:
      "Indiana lies within the Central Corn Belt Plains, where native tallgrass prairie once covered the northwestern third of the state and oak-dominated savanna occupied the transition zones. The state's remaining native plant communities are concentrated in protected areas like the Indiana Dunes — a globally significant biodiversity hotspot where plant communities from five biomes converge on the southern shore of Lake Michigan.",
    ecoregions: "Central Corn Belt Plains · Eastern Corn Belt Plains · Indiana Dunes",
  },
  KS: {
    name: "Kansas",
    blurb:
      "Kansas sits at the heart of the Great Plains, transitioning from tallgrass prairie in the east — including the Flint Hills, the largest remaining tract of unplowed tallgrass prairie in North America — through the mixed-grass prairie of the center to the shortgrass prairie of the west. Native forbs and grasses sourced from Kansas provenance are essential for any restoration work in the state's agricultural landscape.",
    ecoregions: "Flint Hills · Central Great Plains · High Plains · Cross Timbers",
  },
  KY: {
    name: "Kentucky",
    blurb:
      "Kentucky's Cumberland Plateau and Interior Plateau support some of the most diverse temperate forest in the world — the mixed mesophytic forest of the central Appalachian region has more tree species per acre than any other temperate forest on Earth. The state's karst topography, cave systems, and limestone barrens support rare native plant communities that depend on specific soil chemistry and disturbance regimes.",
    ecoregions: "Interior Plateau · Cumberland Plateau · Ridge and Valley · Bluegrass Region",
  },
  LA: {
    name: "Louisiana",
    blurb:
      "Louisiana's native plant communities are shaped by water — the Mississippi River delta, coastal marshes, cypress-tupelo swamps, and bottomland hardwood forests create a layered mosaic of wetland habitats found nowhere else in North America. The Atchafalaya Basin is the largest river swamp in the US, and Louisiana's coastal marshes are disappearing at one of the fastest rates in the world, making native plant restoration a conservation priority.",
    ecoregions: "Mississippi Alluvial Plain · Southeastern Plains · Gulf Coastal Plain · Coastal Marshes",
  },
  MA: {
    name: "Massachusetts",
    blurb:
      "Massachusetts was largely deforested by the 19th century and has since reforested substantially, but much of that forest consists of invasive plants and early-successional species that lack the ecological relationships of pre-settlement plant communities. The state's pitch pine plains of Cape Cod, granite barrens of the Berkshires, and Atlantic coast barrier beaches all support distinct native plant assemblages that require species-specific restoration approaches.",
    ecoregions: "Northeastern Coastal Zone · New England/Acadian Forests · Cape Cod · Berkshires",
  },
  MD: {
    name: "Maryland",
    blurb:
      "Maryland spans five distinct physiographic provinces in just 12,000 square miles — from the Allegheny Plateau in the west through the Ridge and Valley, Blue Ridge, Piedmont, and Coastal Plain to the Chesapeake Bay. The Chesapeake watershed is the largest estuary system in the US, and native plant restoration in Maryland's riparian and coastal zones is directly tied to water quality in the Bay.",
    ecoregions: "Piedmont · Blue Ridge · Ridge and Valley · Chesapeake Coastal Plain",
  },
  ME: {
    name: "Maine",
    blurb:
      "Maine is the most forested state in the continental US — more than 89% of its land is covered by trees, primarily the spruce-fir and northern hardwood forests of the boreal transition zone. The state's Downeast coast supports a globally rare maritime boreal community, and northern Maine's vast unbroken forest is among the most important breeding habitat in the eastern US for neotropical migratory songbirds.",
    ecoregions: "Northeastern Highlands · Gulf of Maine Coast · Acadian Plains and Hills",
  },
  MO: {
    name: "Missouri",
    blurb:
      "Missouri is a biological crossroads — eastern deciduous forest, tallgrass prairie, Ozark plateau, and the bottomland forests of the Mississippi and Missouri rivers all converge here. The Ozark Highlands are one of the oldest continuously exposed landmasses in North America, and their ancient karst topography supports plant communities with some of the highest levels of endemism in the Midwest.",
    ecoregions: "Ozark Highlands · Central Corn Belt Plains · Interior River Valleys · Mississippi Alluvial Plain",
  },
  MS: {
    name: "Mississippi",
    blurb:
      "Mississippi's landscape is defined by the Mississippi River to the west and the longleaf pine belt to the south and east. The delta bottomland hardwood forests are among the most productive wildlife habitats in North America, while the state's coastal longleaf pine savannas — once the dominant ecosystem across the Deep South — have been reduced to scattered remnants that are priorities for native plant restoration.",
    ecoregions: "Southeastern Plains · Mississippi Alluvial Plain · East Gulf Coastal Plain",
  },
  MT: {
    name: "Montana",
    blurb:
      "Montana spans the transition from the Northern Rocky Mountains in the west to the Northern Great Plains in the east — two of the least-fragmented landscapes remaining in the lower 48. Western Montana's dense Douglas-fir and ponderosa pine forests give way to mixed-grass prairie as you cross the Continental Divide, and the state's native plant communities are some of the most intact in the country.",
    ecoregions: "Northern Rockies · Middle Rockies · Northwestern Glaciated Plains · Missouri Plateau",
  },
  NE: {
    name: "Nebraska",
    blurb:
      "Nebraska's most distinctive ecosystem is the Sandhills — a 20,000-square-mile landscape of grass-stabilized sand dunes that is the largest sand dune formation in the Western Hemisphere and one of the most intact grassland ecosystems in North America. Nebraska's native plant communities range from tallgrass prairie in the east to shortgrass and mixed-grass prairie in the west, with riparian cottonwood-willow corridors along the Platte River.",
    ecoregions: "Sand Hills · Western Corn Belt Plains · Central Great Plains · High Plains",
  },
  NH: {
    name: "New Hampshire",
    blurb:
      "New Hampshire's White Mountains contain some of the most severe weather in the world above treeline, where native alpine plant communities survive conditions that rival Arctic tundra. Below treeline, the state supports northern hardwood and spruce-fir forest communities adapted to short growing seasons and acidic, nutrient-poor soils. New Hampshire's native plants are among the most cold-hardy in the eastern US.",
    ecoregions: "Northeastern Highlands · White Mountains · Gulf of Maine Coast",
  },
  NJ: {
    name: "New Jersey",
    blurb:
      "New Jersey's Pine Barrens — a 1.1 million-acre expanse of pitch pine and scrub oak on sandy, acidic soils in the center of the most densely developed state in the country — is a globally unique ecosystem and the largest area of open land on the Eastern Seaboard south of Maine. Pinelands native plants are highly specialized and will not thrive outside their specific soil and hydrological conditions.",
    ecoregions: "Atlantic Coastal Pine Barrens · Piedmont · Northeastern Coastal Zone",
  },
  NM: {
    name: "New Mexico",
    blurb:
      "New Mexico's sky islands, desert grasslands, and Chihuahuan Desert support one of the most floristically diverse arid landscapes in North America. The state's elevation gradient — from desert basin to 13,000-foot peaks — creates a stacked series of biomes in which native plant communities change dramatically over short distances. Rio Grande cottonwood-willow riparian corridors are among the most important wildlife corridors in the Southwest.",
    ecoregions: "Chihuahuan Desert · Arizona/New Mexico Mountains · Southern Rockies · Colorado Plateau",
  },
  NV: {
    name: "Nevada",
    blurb:
      "Nevada is the most arid state in the US and almost entirely covered by the Great Basin — a vast cold desert of sagebrush steppe, salt flats, and isolated mountain ranges. Native Great Basin plants evolved under a specific disturbance and precipitation regime, and their relationship with native bee and pollinator communities is highly specialized. Sagebrush habitat, the keystone ecosystem of the Great Basin, has declined by more than 50%.",
    ecoregions: "Great Basin · Mojave Basin and Range · Northern Basin and Range",
  },
  ND: {
    name: "North Dakota",
    blurb:
      "North Dakota sits at the center of the prairie pothole region — a landscape of shallow glacial lakes and wetlands that is the most important waterfowl breeding habitat in North America. The state's mixed-grass prairie and pothole wetlands are both severely degraded by agriculture, and native plant restoration in North Dakota focuses on prairie reconstruction and wetland buffer plantings that support breeding ducks, shorebirds, and pollinators.",
    ecoregions: "Northwestern Glaciated Plains · Missouri Plateau · Red River Valley",
  },
  OK: {
    name: "Oklahoma",
    blurb:
      "Oklahoma is one of the most ecologically diverse states in the country, spanning tallgrass and mixed-grass prairie in the north, Cross Timbers post oak savanna across the center, the Ouachita Mountains in the southeast, and shortgrass plains in the Panhandle. The state contains more distinct ecoregions than any other Great Plains state, and locally sourced native plants are essential for matching the specific growing conditions of each zone.",
    ecoregions: "Cross Timbers · Central Great Plains · Ouachita Mountains · Southeastern Plains",
  },
  RI: {
    name: "Rhode Island",
    blurb:
      "Rhode Island is the smallest state in the US, but its coastal geography gives it an outsized ecological profile — Narragansett Bay, Atlantic coast barrier beaches, and freshwater ponds create a diversity of native plant habitats in a very small area. Rhode Island's maritime forests and coastal heathlands are particularly vulnerable to invasive species and development, making native plant restoration one of the most direct conservation tools available to gardeners.",
    ecoregions: "Northeastern Coastal Zone · Narragansett Bay Watershed",
  },
  SC: {
    name: "South Carolina",
    blurb:
      "South Carolina transitions from the Blue Ridge mountains in the northwest through the Piedmont's red clay hills to the Sandhills and the Coastal Plain, reaching the barrier islands and ACE Basin estuary on the Atlantic coast. The ACE Basin — one of the largest undeveloped estuaries on the East Coast — depends on intact native plant communities in its upland buffer zones, and South Carolina's longleaf pine restoration is among the most active in the Southeast.",
    ecoregions: "Blue Ridge · Piedmont · Sandhills · Southern Coastal Plain",
  },
  SD: {
    name: "South Dakota",
    blurb:
      "South Dakota spans the Missouri River divide between the glaciated eastern plains — where native mixed-grass prairie and prairie potholes define the landscape — and the unglaciated West, including the Black Hills ponderosa pine forest, the Badlands, and the shortgrass High Plains. The Black Hills are a botanical island of Rocky Mountain flora surrounded by prairie, supporting species found nowhere else on the Great Plains.",
    ecoregions: "Northwestern Glaciated Plains · High Plains · Black Hills · Missouri Plateau",
  },
  TN: {
    name: "Tennessee",
    blurb:
      "Tennessee's Cumberland Plateau and Great Smoky Mountains are globally recognized for their temperate forest biodiversity — the Smokies have more tree species than all of northern Europe combined. The state's mixed mesophytic forests, limestone cedar glades (a globally rare community found almost exclusively in Tennessee and Kentucky), and Tennessee River watershed wetlands all harbor native plant communities of exceptional conservation value.",
    ecoregions: "Ridge and Valley · Cumberland Plateau · Interior Plateau · Blue Ridge",
  },
  UT: {
    name: "Utah",
    blurb:
      "Utah's red rock Colorado Plateau, Great Basin desert, and Wasatch Range create one of the most visually dramatic — and ecologically diverse — landscapes in the western US. The state's native plants are highly adapted to alkaline soils, intense UV exposure, and extreme temperature swings. Utah has the lowest keyword competition of the western states, and local native plant nurseries serving the Wasatch Front and southern Utah communities are actively growing.",
    ecoregions: "Colorado Plateau · Great Basin · Southern Rockies · Wyoming Basin",
  },
  VT: {
    name: "Vermont",
    blurb:
      "Vermont's northern hardwood and boreal forest covers more than 75% of the state, making it one of the most forested states in the eastern US. The Green Mountains support a classic northern forest of sugar maple, yellow birch, and American beech above 2,500 feet, giving way to spruce-fir communities at higher elevations. Vermont's native plant communities are among the most intact in New England.",
    ecoregions: "Northeastern Highlands · Green Mountains · Champlain Valley",
  },
  WV: {
    name: "West Virginia",
    blurb:
      "West Virginia is the most heavily forested state east of the Mississippi — more than 78% of its land is forested, primarily with central Appalachian hardwoods including red oak, tulip poplar, sugar maple, and black cherry. The state's rugged topography and relative inaccessibility have preserved some of the most intact mixed mesophytic forest in the eastern US, and West Virginia nurseries are an important source of locally adapted Appalachian native plant stock.",
    ecoregions: "Unglaciated Allegheny Plateau · Ridge and Valley · Central Appalachians",
  },
  WY: {
    name: "Wyoming",
    blurb:
      "Wyoming's wide open spaces encompass the Wyoming Basin sagebrush steppe, the Middle Rockies, the Northern Rockies in Yellowstone and the Tetons, and the High Plains of the east. The Greater Yellowstone Ecosystem — the largest intact temperate ecosystem in the lower 48 — depends on the native plant communities that surround the park's core. Wyoming's harsh winters and short growing seasons demand native plants sourced from high-elevation, cold-adapted provenance.",
    ecoregions: "Wyoming Basin · Middle Rockies · Northern Rockies · High Plains",
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
