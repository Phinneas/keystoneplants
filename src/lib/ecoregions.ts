export interface Ecoregion {
  code: string;
  name: string;
  region: string; // broad grouping for the filter UI
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

export function getEcoregionByCode(code: string): Ecoregion | undefined {
  return ECOREGIONS.find((e) => e.code === code);
}
