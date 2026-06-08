export interface Ecoregion {
  code: string;
  name: string;
  region: string; // broad grouping for the filter UI
}

export interface EcoregionGroup {
  slug: string;               // URL slug + Plants.nativeRegions filter value
  name: string;               // Display name
  nativeRegion: string;       // Matches Plants collection nativeRegions options
  nwfEcoregion: string;       // NWF Level I ecoregion name + number
  states: string;             // Representative states
  summary: string;            // 1–2 sentence editorial intro
  keystoneTrees: { genus: string; common: string; caterpillars: number }[];
  keystonePerennials: { genus: string; common: string; specialistBees: number }[];
}

// EPA Level III Ecoregions — major US regions
// Full list: https://www.epa.gov/eco-research/level-iii-and-iv-ecoregions-continental-united-states
export const ECOREGIONS: Ecoregion[] = [
  // --- Northeast ---
  { code: "8.1.1",  name: "Acadian Plains and Hills",         region: "Northeast" },
  { code: "8.1.3",  name: "Gulf of Maine Coast",              region: "Northeast" },
  { code: "8.1.4",  name: "Northeastern Highlands",           region: "Northeast" },
  { code: "8.1.7",  name: "Northeastern Coastal Zone",        region: "Northeast" },
  // --- Mid-Atlantic ---
  { code: "8.1.5",  name: "Adirondack Mountains",             region: "Mid-Atlantic" },
  { code: "8.1.6",  name: "New England/Acadian Forests",      region: "Mid-Atlantic" },
  { code: "8.2.1",  name: "Atlantic Coastal Pine Barrens",    region: "Mid-Atlantic" },
  { code: "8.3.4",  name: "Blue Ridge Mountains",             region: "Mid-Atlantic" },
  { code: "8.3.5",  name: "Ridge and Valley",                 region: "Mid-Atlantic" },
  { code: "8.4.1",  name: "Interior Plateau",                 region: "Mid-Atlantic" },
  // --- Southeast ---
  { code: "8.3.1",  name: "Eastern Corn Belt Plains",         region: "Southeast" },
  { code: "8.3.3",  name: "Southeastern Wisconsin Till Plains",region: "Southeast" },
  { code: "8.4.2",  name: "Interior River Valleys",           region: "Southeast" },
  { code: "8.5.1",  name: "Southeastern Plains",              region: "Southeast" },
  { code: "8.5.2",  name: "Mississippi Alluvial Plain",       region: "Southeast" },
  { code: "8.5.3",  name: "Southern Coastal Plain",           region: "Southeast" },
  { code: "8.5.4",  name: "Southern Florida Coastal Plain",   region: "Southeast" },
  { code: "8.6.1",  name: "Ozark Highlands",                  region: "Southeast" },
  { code: "8.6.2",  name: "Arkansas Valley",                  region: "Southeast" },
  { code: "8.6.3",  name: "Ouachita Mountains",               region: "Southeast" },
  // --- Midwest ---
  { code: "9.2.1",  name: "Central Tallgrass Prairie",        region: "Midwest" },
  { code: "9.2.2",  name: "Lake Erie Glaciated Plateau",      region: "Midwest" },
  { code: "9.2.3",  name: "Central Irregular Plains",         region: "Midwest" },
  { code: "9.2.4",  name: "Western Corn Belt Plains",         region: "Midwest" },
  { code: "9.3.1",  name: "Driftless Area",                   region: "Midwest" },
  { code: "9.3.2",  name: "Southeastern Wisconsin Moraine",   region: "Midwest" },
  { code: "9.4.1",  name: "Northern Lakes and Forests",       region: "Midwest" },
  { code: "9.4.2",  name: "Northern Minnesota Wetlands",      region: "Midwest" },
  // --- Great Plains ---
  { code: "9.4.3",  name: "Northwestern Glaciated Plains",    region: "Great Plains" },
  { code: "9.5.1",  name: "High Plains",                      region: "Great Plains" },
  { code: "9.5.2",  name: "Central Great Plains",             region: "Great Plains" },
  { code: "9.6.1",  name: "Flint Hills",                      region: "Great Plains" },
  { code: "9.6.2",  name: "Cross Timbers",                    region: "Great Plains" },
  { code: "9.6.3",  name: "Edwards Plateau",                  region: "Great Plains" },
  { code: "9.6.4",  name: "Texas Blackland Prairies",         region: "Great Plains" },
  // --- Rocky Mountains ---
  { code: "6.2.1",  name: "Wyoming Basin",                    region: "Rocky Mountains" },
  { code: "6.2.2",  name: "Colorado Plateaus",                region: "Rocky Mountains" },
  { code: "6.2.3",  name: "Southern Rockies",                 region: "Rocky Mountains" },
  { code: "6.2.4",  name: "Arizona/New Mexico Plateau",       region: "Rocky Mountains" },
  { code: "6.2.5",  name: "Arizona/New Mexico Mountains",     region: "Rocky Mountains" },
  { code: "6.2.6",  name: "Sierra Madre Occidental",          region: "Rocky Mountains" },
  { code: "6.2.14", name: "Northern Rockies",                 region: "Rocky Mountains" },
  { code: "6.2.15", name: "Middle Rockies",                   region: "Rocky Mountains" },
  // --- Pacific Northwest ---
  { code: "6.2.7",  name: "North Cascades",                   region: "Pacific Northwest" },
  { code: "6.2.8",  name: "Cascades",                         region: "Pacific Northwest" },
  { code: "6.2.9",  name: "Eastern Cascades Slopes and Foothills", region: "Pacific Northwest" },
  { code: "6.2.10", name: "Columbia Plateau",                 region: "Pacific Northwest" },
  { code: "6.2.11", name: "Blue Mountains",                   region: "Pacific Northwest" },
  { code: "7.1.7",  name: "Puget Lowland",                    region: "Pacific Northwest" },
  { code: "7.1.8",  name: "Coast Range",                      region: "Pacific Northwest" },
  { code: "7.1.9",  name: "Willamette Valley",                region: "Pacific Northwest" },
  // --- California ---
  { code: "6.1.1",  name: "Central California Foothills",     region: "California" },
  { code: "6.1.2",  name: "Central California Valley",        region: "California" },
  { code: "6.1.3",  name: "Southern California Mountains",    region: "California" },
  { code: "6.1.4",  name: "Southern California/Northern Baja", region: "California" },
  { code: "7.1.1",  name: "Klamath Mountains",                region: "California" },
  { code: "7.1.6",  name: "Sierra Nevada",                    region: "California" },
  // --- Southwest ---
  { code: "10.1.1", name: "Mojave Basin and Range",           region: "Southwest" },
  { code: "10.1.2", name: "Sonoran Desert",                   region: "Southwest" },
  { code: "10.1.3", name: "Chihuahuan Desert",                region: "Southwest" },
  { code: "10.2.1", name: "Western High Plains",              region: "Southwest" },
];

export const ECOREGION_GROUPS = [
  "Northeast",
  "Mid-Atlantic",
  "Southeast",
  "Midwest",
  "Great Plains",
  "Rocky Mountains",
  "Pacific Northwest",
  "California",
  "Southwest",
] as const;

// Full group config — slugs align with Plants.nativeRegions options
export const ECOREGION_GROUP_META: EcoregionGroup[] = [
  {
    slug: "northeast",
    name: "Northeast",
    nativeRegion: "northeast",
    nwfEcoregion: "Eastern Temperate Forests (Ecoregion 8)",
    states: "ME, NH, VT, MA, RI, CT, NY, NJ",
    summary:
      "The Northeast's dense deciduous and mixed forests support some of the highest caterpillar diversity in North America. Oaks, cherries, and willows anchor the food web; goldenrod and asters sustain the late-season pollinator community.",
    keystoneTrees: [
      { genus: "Quercus", common: "Oak", caterpillars: 436 },
      { genus: "Prunus", common: "Wild cherry / plum", caterpillars: 340 },
      { genus: "Salix", common: "Willow", caterpillars: 289 },
      { genus: "Betula", common: "Birch", caterpillars: 284 },
    ],
    keystonePerennials: [
      { genus: "Solidago", common: "Goldenrod", specialistBees: 42 },
      { genus: "Symphyotrichum", common: "Aster", specialistBees: 33 },
      { genus: "Helianthus", common: "Native sunflower", specialistBees: 50 },
    ],
  },
  {
    slug: "mid-atlantic",
    name: "Mid-Atlantic",
    nativeRegion: "northeast",
    nwfEcoregion: "Eastern Temperate Forests (Ecoregion 8)",
    states: "PA, MD, DE, VA, WV, DC",
    summary:
      "The Mid-Atlantic sits at a biodiversity crossroads — northern forest species overlap with southern Coastal Plain communities across the Appalachians, Piedmont, and tidal shores. Native oaks support more caterpillar species here than anywhere else on the continent.",
    keystoneTrees: [
      { genus: "Quercus", common: "Oak", caterpillars: 436 },
      { genus: "Prunus", common: "Wild cherry / plum", caterpillars: 340 },
      { genus: "Salix", common: "Willow", caterpillars: 289 },
      { genus: "Betula", common: "Birch", caterpillars: 284 },
    ],
    keystonePerennials: [
      { genus: "Solidago", common: "Goldenrod", specialistBees: 42 },
      { genus: "Symphyotrichum", common: "Aster", specialistBees: 33 },
      { genus: "Helianthus", common: "Native sunflower", specialistBees: 50 },
    ],
  },
  {
    slug: "southeast",
    name: "Southeast",
    nativeRegion: "southeast",
    nwfEcoregion: "Eastern Temperate Forests (Ecoregion 8)",
    states: "NC, SC, GA, FL, AL, MS, TN, KY",
    summary:
      "The Southeast's longleaf pine savannas, Appalachian coves, and Coastal Plain wetlands harbor more plant species than almost anywhere else in North America. Native oaks, cherries, and willows provide the same keystone function here as in the North — but a richer understory layer adds milkweed, pawpaw, and spicebush to the food web.",
    keystoneTrees: [
      { genus: "Quercus", common: "Oak", caterpillars: 436 },
      { genus: "Prunus", common: "Wild cherry / plum", caterpillars: 340 },
      { genus: "Salix", common: "Willow", caterpillars: 289 },
      { genus: "Pinus", common: "Longleaf / loblolly pine", caterpillars: 200 },
    ],
    keystonePerennials: [
      { genus: "Solidago", common: "Goldenrod", specialistBees: 42 },
      { genus: "Symphyotrichum", common: "Aster", specialistBees: 33 },
      { genus: "Helianthus", common: "Native sunflower", specialistBees: 50 },
    ],
  },
  {
    slug: "midwest",
    name: "Midwest",
    nativeRegion: "midwest",
    nwfEcoregion: "Eastern Temperate Forests / Great Plains (Ecoregions 8–9)",
    states: "OH, IN, MI, WI, MN, IA, MO",
    summary:
      "The Midwest transitions from the eastern deciduous forest to tallgrass prairie — the most biodiverse grassland ecosystem that ever existed in North America. Keystone oaks and willows anchor the forest edges; native sunflowers, goldenrod, and big bluestem anchor the prairie remnants.",
    keystoneTrees: [
      { genus: "Quercus", common: "Bur / white oak", caterpillars: 436 },
      { genus: "Salix", common: "Willow", caterpillars: 289 },
      { genus: "Betula", common: "Birch", caterpillars: 284 },
      { genus: "Populus", common: "Cottonwood / aspen", caterpillars: 249 },
    ],
    keystonePerennials: [
      { genus: "Helianthus", common: "Native sunflower", specialistBees: 50 },
      { genus: "Solidago", common: "Goldenrod", specialistBees: 42 },
      { genus: "Symphyotrichum", common: "Aster", specialistBees: 33 },
    ],
  },
  {
    slug: "great-plains",
    name: "Great Plains",
    nativeRegion: "great-plains",
    nwfEcoregion: "Great Plains (Ecoregion 9)",
    states: "ND, SD, NE, KS, OK, TX (western), MT (eastern)",
    summary:
      "The Great Plains once supported the largest grassland ecosystem on Earth. Today it's among the most endangered. Keystone perennials — native sunflowers, goldenrod, gumweed, and prairie clover — support up to 89 specialist bee species each and are the foundation of grassland food webs.",
    keystoneTrees: [
      { genus: "Quercus", common: "Bur oak", caterpillars: 253 },
      { genus: "Salix", common: "Peachleaf / sandbar willow", caterpillars: 214 },
      { genus: "Populus", common: "Cottonwood / aspen", caterpillars: 180 },
    ],
    keystonePerennials: [
      { genus: "Helianthus", common: "Plains / stiff sunflower", specialistBees: 89 },
      { genus: "Grindelia", common: "Curlycup gumweed", specialistBees: 68 },
      { genus: "Solidago", common: "Goldenrod", specialistBees: 56 },
    ],
  },
  {
    slug: "mountain-west",
    name: "Rocky Mountains",
    nativeRegion: "mountain-west",
    nwfEcoregion: "Northwestern Forested Mountains (Ecoregion 6)",
    states: "MT, WY, CO, UT, ID, NM (northern)",
    summary:
      "The Rocky Mountain ecoregion spans dramatically different elevations — from dry sagebrush valleys to subalpine meadows and spruce-fir forests. Native willows dominate riparian corridors; aspen groves support the highest caterpillar diversity at mid-elevations.",
    keystoneTrees: [
      { genus: "Salix", common: "Willow", caterpillars: 289 },
      { genus: "Populus", common: "Quaking aspen / cottonwood", caterpillars: 249 },
      { genus: "Pinus", common: "Ponderosa / lodgepole pine", caterpillars: 200 },
      { genus: "Betula", common: "Water birch", caterpillars: 189 },
    ],
    keystonePerennials: [
      { genus: "Helianthus", common: "Native sunflower", specialistBees: 89 },
      { genus: "Solidago", common: "Goldenrod", specialistBees: 56 },
      { genus: "Symphyotrichum", common: "Aster", specialistBees: 43 },
    ],
  },
  {
    slug: "northwest",
    name: "Pacific Northwest",
    nativeRegion: "northwest",
    nwfEcoregion: "Marine West Coast Forests (Ecoregion 7)",
    states: "WA, OR",
    summary:
      "The Pacific Northwest's maritime climate supports some of the most productive temperate rainforests on Earth. Native willows top the keystone rankings here; conifers (Douglas fir, western hemlock, Sitka spruce) support hundreds of caterpillar species in old-growth and second-growth forests.",
    keystoneTrees: [
      { genus: "Salix", common: "Willow", caterpillars: 328 },
      { genus: "Quercus", common: "Oregon white oak", caterpillars: 275 },
      { genus: "Alnus", common: "Red / white alder", caterpillars: 202 },
      { genus: "Pseudotsuga", common: "Douglas fir", caterpillars: 116 },
    ],
    keystonePerennials: [
      { genus: "Ericameria", common: "Goldenbush", specialistBees: 45 },
      { genus: "Helianthus", common: "Native sunflower", specialistBees: 41 },
      { genus: "Grindelia", common: "Gumweed", specialistBees: 38 },
    ],
  },
  {
    slug: "california",
    name: "California",
    nativeRegion: "northwest",
    nwfEcoregion: "Mediterranean California (Ecoregion 11)",
    states: "CA",
    summary:
      "California's Mediterranean climate is unique in North America — long dry summers, mild wet winters, and exceptional plant biodiversity. Native willows top the caterpillar rankings; coast live oak and valley oak support 270+ wildlife species. Ceanothus, found almost nowhere else, supports 120 caterpillar species.",
    keystoneTrees: [
      { genus: "Salix", common: "Arroyo / coyote willow", caterpillars: 328 },
      { genus: "Quercus", common: "Coast live / valley oak", caterpillars: 275 },
      { genus: "Prunus", common: "Oregon cherry / chokecherry", caterpillars: 262 },
      { genus: "Ceanothus", common: "California lilac", caterpillars: 120 },
    ],
    keystonePerennials: [
      { genus: "Ericameria", common: "Goldenbush", specialistBees: 45 },
      { genus: "Helianthus", common: "Native sunflower", specialistBees: 41 },
      { genus: "Chrysothamnus", common: "Rabbitbrush", specialistBees: 40 },
    ],
  },
  {
    slug: "southwest",
    name: "Southwest",
    nativeRegion: "southwest",
    nwfEcoregion: "North American Deserts (Ecoregion 10)",
    states: "AZ, NM, NV, UT (southern), TX (western)",
    summary:
      "The desert Southwest hosts a distinct and specialized native plant community adapted to heat, drought, and intense solar radiation. Native sunflowers support the most specialist bees of any plant genus in this ecoregion; desert willows and mesquite anchor riparian and wash habitats.",
    keystoneTrees: [
      { genus: "Salix", common: "Desert willow / coyote willow", caterpillars: 214 },
      { genus: "Prosopis", common: "Mesquite", caterpillars: 0 },
      { genus: "Quercus", common: "Arizona white oak / Emory oak", caterpillars: 253 },
    ],
    keystonePerennials: [
      { genus: "Helianthus", common: "Desert sunflower", specialistBees: 89 },
      { genus: "Baileya", common: "Desert marigold", specialistBees: 25 },
      { genus: "Encelia", common: "Brittlebush / desert encelia", specialistBees: 29 },
    ],
  },
];

export function getGroupBySlug(slug: string): EcoregionGroup | undefined {
  return ECOREGION_GROUP_META.find((g) => g.slug === slug);
}

export function getEcoregionsByGroup(groupName: string): Ecoregion[] {
  return ECOREGIONS.filter((e) => e.region === groupName);
}

export function getEcoregionByCode(code: string): Ecoregion | undefined {
  return ECOREGIONS.find((e) => e.code === code);
}
