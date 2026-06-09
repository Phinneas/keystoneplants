import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Native plant nurseries by state",
  description:
    "Browse native plant nurseries by state. Find locally sourced, regionally appropriate native plants near you.",
};

const STATES = [
  { code: "AK", name: "Alaska", tagline: "Tongass rainforest · Interior boreal taiga · Arctic tundra" },
  { code: "AL", name: "Alabama", tagline: "Longleaf pine savannas · Ridge and Valley · Cumberland Plateau" },
  { code: "AR", name: "Arkansas", tagline: "Ozark Highlands · Ouachita Mountains · Mississippi delta bottomlands" },
  { code: "AZ", name: "Arizona", tagline: "Sonoran Desert · Chihuahuan Desert · Sky island forests" },
  { code: "CA", name: "California", tagline: "California Floristic Province · Sierra Nevada · Coastal redwoods · Chaparral" },
  { code: "CO", name: "Colorado", tagline: "Southern Rockies · Colorado Plateau · Shortgrass prairie · Montane meadows" },
  { code: "CT", name: "Connecticut", tagline: "Northeastern Coastal Zone · New England forests · Long Island Sound shore" },
  { code: "DE", name: "Delaware", tagline: "Atlantic Coastal Plain · Piedmont fall line · Delaware Bay watershed" },
  { code: "FL", name: "Florida", tagline: "Flatwoods · Scrub · Cypress domes · Mangroves · Everglades" },
  { code: "GA", name: "Georgia", tagline: "Blue Ridge · Piedmont red clay hills · Longleaf pine flatwoods" },
  { code: "HI", name: "Hawaii", tagline: "Tropical rainforest · Montane dry forest · Coastal strand · Endemic species" },
  { code: "IA", name: "Iowa", tagline: "Tallgrass prairie remnants · Oak savanna · Riparian corridors" },
  { code: "ID", name: "Idaho", tagline: "Northern Rockies · Columbia Plateau · Bunchgrass prairie · Snake River Plain" },
  { code: "IL", name: "Illinois", tagline: "Tallgrass prairie restoration · Oak savannas · Floodplain forests" },
  { code: "IN", name: "Indiana", tagline: "Indiana Dunes · Central Corn Belt · Oak savanna transition" },
  { code: "KS", name: "Kansas", tagline: "Flint Hills tallgrass · Mixed-grass prairie · High Plains shortgrass" },
  { code: "KY", name: "Kentucky", tagline: "Mixed mesophytic forest · Limestone cedar glades · Cumberland Plateau" },
  { code: "LA", name: "Louisiana", tagline: "Cypress-tupelo swamps · Coastal marshes · Mississippi bottomlands" },
  { code: "MA", name: "Massachusetts", tagline: "Pitch pine barrens · Granite outcrops · Cape Cod coastal strand" },
  { code: "MD", name: "Maryland", tagline: "Piedmont · Blue Ridge · Chesapeake watershed · Coastal Plain" },
  { code: "ME", name: "Maine", tagline: "Spruce-fir boreal · Acadian forests · Gulf of Maine coastline" },
  { code: "MI", name: "Michigan", tagline: "Great Lakes shoreline · Northern boreal forest · Prairie remnants" },
  { code: "MN", name: "Minnesota", tagline: "Boundary Waters boreal · Tallgrass prairie · Northern lake district" },
  { code: "MO", name: "Missouri", tagline: "Ozark Highlands · Tallgrass prairie · Mississippi bottomland forest" },
  { code: "MS", name: "Mississippi", tagline: "Longleaf pine belt · Mississippi delta · Gulf Coastal Plain" },
  { code: "MT", name: "Montana", tagline: "Northern Rockies · Northern Great Plains · Undivided wilderness" },
  { code: "NC", name: "North Carolina", tagline: "Blue Ridge Escarpment · Piedmont · Longleaf pine savannas" },
  { code: "ND", name: "North Dakota", tagline: "Prairie pothole country · Mixed-grass prairie · Missouri Plateau" },
  { code: "NE", name: "Nebraska", tagline: "Sandhills grasslands · Tallgrass to shortgrass transition · Platte River" },
  { code: "NH", name: "New Hampshire", tagline: "White Mountains alpine · Northern hardwoods · Boreal spruce-fir" },
  { code: "NJ", name: "New Jersey", tagline: "Pine Barrens · Atlantic coastal plain · Piedmont" },
  { code: "NM", name: "New Mexico", tagline: "Chihuahuan Desert · Sky islands · Southern Rockies · Rio Grande" },
  { code: "NV", name: "Nevada", tagline: "Great Basin sagebrush steppe · Mojave Desert · Basin and Range" },
  { code: "NY", name: "New York", tagline: "Hudson Valley · Adirondack highlands · Long Island coastal plain" },
  { code: "OH", name: "Ohio", tagline: "Erie lakeshore · Till plains · Unglaciated hill country" },
  { code: "OK", name: "Oklahoma", tagline: "Cross Timbers savanna · Tallgrass prairie · Ouachita Mountains" },
  { code: "OR", name: "Oregon", tagline: "Willamette Valley · Coast Range · Cascades · Columbia Plateau" },
  { code: "PA", name: "Pennsylvania", tagline: "Ridge and Valley Appalachians · Piedmont · Allegheny Plateau" },
  { code: "RI", name: "Rhode Island", tagline: "Narragansett Bay · Maritime forests · Atlantic coast heathlands" },
  { code: "SC", name: "South Carolina", tagline: "Blue Ridge · Piedmont · Longleaf pine · ACE Basin estuary" },
  { code: "SD", name: "South Dakota", tagline: "Black Hills ponderosa pine · Prairie potholes · Mixed-grass plains" },
  { code: "TN", name: "Tennessee", tagline: "Smoky Mountains · Mixed mesophytic forest · Limestone cedar glades" },
  { code: "TX", name: "Texas", tagline: "Blackland Prairie · Edwards Plateau Hill Country · Piney Woods · Gulf Coast" },
  { code: "UT", name: "Utah", tagline: "Colorado Plateau · Great Basin · Wasatch Range · Red rock canyon country" },
  { code: "VA", name: "Virginia", tagline: "Shenandoah · Piedmont · Blue Ridge · Chesapeake coastal plain" },
  { code: "VT", name: "Vermont", tagline: "Green Mountains · Northern hardwoods · Champlain Valley" },
  { code: "WA", name: "Washington", tagline: "Puget Lowland · North Cascades · Columbia Plateau · Blue Mountains" },
  { code: "WI", name: "Wisconsin", tagline: "Driftless Area · Northern lake district · Native prairie remnants" },
  { code: "WV", name: "West Virginia", tagline: "Central Appalachians · Mixed mesophytic forest · Allegheny Plateau" },
  { code: "WY", name: "Wyoming", tagline: "Greater Yellowstone · Wyoming Basin sagebrush · Middle Rockies" },
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
          More states being added regularly. Can&rsquo;t find yours?{" "}
          <Link
            href="/nurseries"
            className="text-[#3D0C11] font-medium underline decoration-[#DDFC74] underline-offset-2 hover:decoration-2"
          >
            Search by zip code
          </Link>{" "}
          to find nurseries anywhere in the US.
        </p>
      </div>
    </div>
  );
}
