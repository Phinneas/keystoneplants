# Keystone Species List: Pillar Page Plan

## Route
`/resources/keystone-species` (sits alongside existing `/resources/top-20-keystone-plants`)

## SEO targets
| Priority | Keyword | Intent |
|----------|---------|--------|
| Primary | keystone species | Informational |
| Secondary | keystone species examples | Informational |
| Secondary | keystone species list | Informational |
| Secondary | what is a keystone species | Informational |
| Long-tail | keystone species plants | Informational |
| Long-tail | keystone species by ecoregion | Navigational |
| Long-tail | keystone species for pollinators | Transactional |

Featured-snippet target: the definition paragraph at the top ("A keystone species is any organism whose presence has an outsized effect on its ecosystem relative to its abundance...").

---

## Page architecture

### 1. Hero header
- Eyebrow: "A living reference"
- Title: "Keystone Species: Plants, Animals, and the Connections That Hold Ecosystems Together"
- Lede paragraph (the featured-snippet definition, ~40 words, kept short and factual)
- Two CTA pills: "Browse the plant guide" → `/plants` / "Find a nursery" → `/nurseries`

### 2. What is a keystone species?
- The arch analogy (one short paragraph)
- Robert Paine's 1960s tide pool experiment (one paragraph, cited)
- Doug Tallamy's update: 14% of native plant genera support 90% of caterpillar species
- "Low functional redundancy" explained in one sentence
- Internal links: → `/blog/what-are-keystone-plants` or first relevant blog post, → `/resources/top-20-keystone-plants`

### 3. Keystone species by ecosystem (the data table)
A filterable grid (or static cards) showing 7 ecosystems:

| Ecosystem | Top Keystone Plants | Keystone Animals | What they support |
|-----------|-------------------|-----------------|-------------------|
| Deciduous forest | Oaks, black cherry, willows | Black warbler, wood thrush | 500+ caterpillar spp. |
| Grassland / Prairie | Big bluestem, coneflower, milkweed | Monarch butterfly, bison | Pollinator networks |
| Wetlands | Sedges, willows, buttonbush | Red-winged blackbird, frogs | Water filtration, amphibian habitat |
| Coastal | Mangroves, beach grass, sea oats | Horseshoe crab, shorebirds | Erosion control, migratory stopover |
| Desert / Arid | Saguaro, mesquite, palo verde | Gila woodpecker, desert tortoise | Shade, water capture |
| Taiga / Boreal | Spruce, birch, larch | Caribou, boreal chickadee | Cold-climate food web |
| Urban | Native oaks, serviceberry, goldenrod | Native bees, songbirds | Wildlife corridors in cities |

Each ecosystem card links to the matching `/ecoregions/[slug]` page.
This section earns links from schools and conservation orgs (data-rich tables get cited).

### 4. Keystone plants by region (the internal-link engine)
7 regional panels (Northeast, Southeast, Midwest, Great Plains, Mountain West, Pacific NW, California). Each panel:

- Region name + count of keystone plants in the region (pulled from CMS)
- 3-5 featured species (from the Plants collection by `nativeRegions`)
- Each species: common name, scientific name, one-line value, wildlife icon
- CTA per region: "Browse all [region] plants" → `/plants?region=...` + "Explore [region] ecoregions" → `/ecoregions/[slug]`

Biggest internal-link section: 7 regions x 3-5 species x 2 outbound links = 35+ internal links.

### 5. Keystone animals and plant connections
A visual food-web section showing animal-plant pairings:

- Caterpillar hosts -> birds: "One clutch of chickadees needs 6,000-9,000 caterpillars. Those caterpillars eat oaks, willows, and cherries." Links to `/plants` (filter: caterpillar host).
- Pollinator plants -> bees & butterflies: "Monarch butterflies need milkweed. Native bees need goldenrod and asters." Links to `/plants` (filter: pollinator plant).
- Bird food plants -> songbirds: "Dogwood berries, serviceberry, and sumac feed overwintering birds." Links to `/plants` (filter: bird food).

Uses the `wildlifeValue` field from the Plants CMS collection.

### 6. How to support keystone species in your yard
4-step practical guide:

1. Know your ecoregion — `/ecoregions`
2. Choose keystone plants for your light — `/plant-spacing-calculator` + `/plants`
3. Buy from local growers — `/nurseries`
4. Reduce lawn, add layers — editorial (canopy -> understory -> groundcover -> leaf litter)

Each step: card with icon and links out.

### 7. The research behind this page (citations)
- Tallamy & Shropshire (2020), *Nature Communications* — 14% of genera -> 90% of Lepidoptera
- Narango, Tallamy & Shropshire (2020), *Nature Communications* — caterpillar host data
- National Wildlife Federation, "Keystone Plants by Ecoregion"
- Paine, R.T. (1969), original keystone concept
- Xerces Society — pollinator decline data

### 8. CTA band
"Ready to plant keystone species?"
- Primary: "Browse the plant guide" -> `/plants`
- Secondary: "Find a nursery near you" -> `/nurseries`

---

## Internal link map

### Links OUT from this page (35+)
| Target | Where on page | Count |
|--------|--------------|-------|
| `/plants` | Regional panels, food web, CTAs | ~12 |
| `/ecoregions/*` | Ecosystem cards, regional panels | ~10 |
| `/nurseries` | Hero CTAs, step 3, bottom CTA | 3 |
| `/plant-spacing-calculator` | Step 2 | 1 |
| `/resources/top-20-keystone-plants` | Intro, sidebar | 2 |
| `/quiz` | Bottom CTA | 1 |
| `/blog/*` | Research section, related reading | ~5 |

### Links INTO this page from existing pages (to add during build)
| Source page | Link text | Location |
|-------------|-----------|----------|
| Homepage | "Keystone species list" | Discovery paths or CTA section |
| `/plants` | "What is a keystone species?" | Intro text |
| `/ecoregions/*` | "Full keystone species list" | Intro or sidebar |
| `/resources/top-20-keystone-plants` | "Complete keystone species reference" | End of article |
| All 16 blog posts | "Keystone species overview" | End of article |

---

## Link magnet strategy (why others will link)

| Audience | What they link to | Why |
|----------|------------------|-----|
| Schools / educators | Species table + ecosystem grid | Structured data for lesson plans |
| Conservation orgs | Regional panels + research citations | Authoritative species-by-region ref |
| Garden bloggers | Plant-animal connection section | Shareable food-web graphics |
| News / science media | Tallamy data + the 14%/90% stat | Citable source for explainers |
| Wikipedia editors | Definition + species list | Comprehensive, well-cited list page |

---

## Implementation notes

- Static page (like `resources/top-20`), not a CMS post. Scoped CSS with `.ks-*` prefix.
- Region data pulled from CMS at build time via Plants collection (nativeRegions filter).
- Ecosystem grid is static editorial content (not from CMS).
- Food web section uses `wildlifeValue` field (caterpillar-host, pollinator-plant, bird-food).
- Mark `force-dynamic` or cache with revalidate (like other DB pages).
- Split into page + `KeystoneSpeciesGrid` client component for filterable ecosystem table.
- SEO metadata: title "Keystone Species List: Plants, Animals, and Ecosystem Connections", description from lede.
