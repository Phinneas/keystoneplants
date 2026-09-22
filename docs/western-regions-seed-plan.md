# Western Regions Seed Plan — APPLIED LOCALLY

**Status: applied 2026-09-21.** All 27 records are in the `plants` array of `src/seed.ts`, and the
local D1 database has been seeded and smoke-tested. The production database has **not** been seeded
(`pnpm run seed:remote` not run) and nothing is committed.

Verified after seeding — `/search` counts by region: northeast 3, southeast 4, midwest 6,
great-plains 4, mountain-west 14, northwest 11, california 9, southwest 12. `/plants` facets:
tree 17, shrub 4, annual 1, moisture=wet 7. Directory total 31 plants, 0 duplicate slugs.

**Still outstanding: decision 3 below.** Species picks, hardiness zones, and heights are editorial
judgment and should be checked against a botanical reference before this goes to production.

## Problem

Only 4 plants exist in the `Plants` collection, all eastern or prairie taxa. Four of the eight
`nativeRegions` values have zero plants, so 18 of 78 zips (23%) hit the `/search` empty state:

| Region | Zips resolving to it | Plants tagged |
|---|---|---|
| northwest | 7 | 0 |
| mountain-west | 5 | 0 |
| southwest | 4 | 0 |
| california | 2 | 0 |

## Approach

Promote taxa that are **already researched and coded** in `ECOREGION_GROUP_META`
(`src/lib/ecoregions.ts`) — 9 region groups carrying 35 keystone tree entries and 28 keystone
perennial entries with caterpillar / specialist-bee counts. That data powers `/ecoregions/[region]`
and the plant quiz but never reaches the filterable directory.

The source data is **genus-level**. Each entry below is a proposed species for that genus, chosen
for the region. Caterpillar and specialist-bee counts belong to the genus in that NWF ecoregion,
not to the species — descriptions are worded accordingly.

27 records proposed. Several taxa are native to more than one western region, so they carry
multiple `nativeRegions` tags (the existing eastern records already do this).

---

## mountain-west (Rocky Mountains — MT, WY, CO, UT, ID, northern NM)

Source: keystoneTrees Salix 289, Populus 249, Pinus 200, Betula 189; keystonePerennials
Helianthus 89, Solidago 56, Symphyotrichum 43.

| Common | Scientific | Type | Zones | Height (ft) | Sun | Moisture | Wildlife |
|---|---|---|---|---|---|---|---|
| Quaking Aspen | *Populus tremuloides* | tree | 1–7 | 20–80 | full-sun | medium | caterpillar-host, bird-food, cover |
| Ponderosa Pine | *Pinus ponderosa* | tree | 4–7 | 60–125 | full-sun | dry | caterpillar-host, bird-food, cover |
| Water Birch | *Betula occidentalis* | tree | 2–6 | 20–35 | full-sun | wet | caterpillar-host, bird-food |
| Peachleaf Willow | *Salix amygdaloides* | tree | 3–8 | 20–40 | full-sun | wet | caterpillar-host, pollinator-plant, nesting-material |
| Rocky Mountain Goldenrod | *Solidago multiradiata* | perennial | 3–7 | 1–2 | full-sun | dry | pollinator-plant, bird-food |
| Leafy Aster | *Symphyotrichum foliaceum* | perennial | 3–8 | 1–3 | full-sun | medium | pollinator-plant |
| Prairie Sunflower | *Helianthus petiolaris* | annual | 4–8 | 1–3 | full-sun | dry | pollinator-plant, bird-food |

## northwest (Pacific Northwest — WA, OR)

Source: keystoneTrees Salix 328, Quercus 275, Alnus 202, Pseudotsuga 116; keystonePerennials
Ericameria 45, Helianthus 41, Grindelia 38.

| Common | Scientific | Type | Zones | Height (ft) | Sun | Moisture | Wildlife |
|---|---|---|---|---|---|---|---|
| Oregon White Oak | *Quercus garryana* | tree | 6–8 | 20–60 | full-sun | dry | caterpillar-host, pollinator-plant, bird-food |
| Pacific Willow | *Salix lucida* | tree | 4–9 | 15–35 | full-sun | wet | caterpillar-host, pollinator-plant, nesting-material |
| Red Alder | *Alnus rubra* | tree | 6–8 | 40–80 | full-sun | wet | caterpillar-host, bird-food |
| Douglas Fir | *Pseudotsuga menziesii* | tree | 4–7 | 60–120 | part-shade | medium | caterpillar-host, bird-food, cover |
| Nuttall's Sunflower | *Helianthus nuttallii* | perennial | 5–8 | 2–5 | full-sun | medium | pollinator-plant, bird-food |
| Puget Sound Gumweed | *Grindelia integrifolia* | perennial | 6–9 | 1–3 | full-sun | medium | pollinator-plant |

## california (Mediterranean California — CA)

Source: keystoneTrees Salix 328, Quercus 275, Prunus 262, Ceanothus 120; keystonePerennials
Ericameria 45, Helianthus 41, Chrysothamnus 40.

| Common | Scientific | Type | Zones | Height (ft) | Sun | Moisture | Wildlife |
|---|---|---|---|---|---|---|---|
| Coast Live Oak | *Quercus agrifolia* | tree | 8–10 | 30–60 | full-sun | dry | caterpillar-host, pollinator-plant, bird-food |
| Arroyo Willow | *Salix lasiolepis* | tree | 7–10 | 15–30 | full-sun | wet | caterpillar-host, pollinator-plant, nesting-material |
| Hollyleaf Cherry | *Prunus ilicifolia* | tree | 8–10 | 8–20 | full-sun | dry | caterpillar-host, bird-food |
| Blueblossom Ceanothus | *Ceanothus thyrsiflorus* | shrub | 7–10 | 6–15 | full-sun | dry | caterpillar-host, pollinator-plant, cover |
| California Sunflower | *Helianthus californicus* | perennial | 7–10 | 3–6 | full-sun | wet | pollinator-plant, bird-food |

## southwest (North American Deserts — AZ, NM, NV, southern UT, western TX)

Source: keystoneTrees Salix 214, Prosopis **0**, Quercus 253; keystonePerennials Helianthus 89,
Baileya 25, Encelia 29.

| Common | Scientific | Type | Zones | Height (ft) | Sun | Moisture | Wildlife |
|---|---|---|---|---|---|---|---|
| Arizona White Oak | *Quercus arizonica* | tree | 7–9 | 15–40 | full-sun | dry | caterpillar-host, bird-food, cover |
| Coyote Willow | *Salix exigua* | tree | 5–10 | 10–20 | full-sun | wet | caterpillar-host, pollinator-plant, nesting-material |
| Desert Willow | *Chilopsis linearis* | tree | 7–10 | 10–25 | full-sun | dry | pollinator-plant, cover |
| Honey Mesquite | *Prosopis glandulosa* | tree | 7–11 | 15–40 | full-sun | dry | bird-food, cover, nesting-material |
| Desert Marigold | *Baileya multiradiata* | perennial | 8–11 | 1–2 | full-sun | dry | pollinator-plant, bird-food |
| Brittlebush | *Encelia farinosa* | shrub | 8–11 | 2–4 | full-sun | dry | pollinator-plant, bird-food, cover |
| Western Sunflower | *Helianthus anomalus* | perennial | 6–9 | 1–3 | full-sun | dry | pollinator-plant, bird-food |

## Shared across western regions

| Common | Scientific | Type | Zones | Height (ft) | Sun | Moisture | Regions | Wildlife |
|---|---|---|---|---|---|---|---|---|
| Rubber Rabbitbrush | *Ericameria nauseosa* | shrub | 4–9 | 2–5 | full-sun | dry | california, northwest, mountain-west, southwest | pollinator-plant, bird-food, cover |
| Green Rabbitbrush | *Chrysothamnus viscidiflorus* | shrub | 4–9 | 1–3 | full-sun | dry | california, northwest, mountain-west, southwest | pollinator-plant, cover |

---

## Issues in the existing source data

Resolution status after applying:

| # | Issue | Status |
|---|---|---|
| 1 | "Desert willow" filed under genus *Salix* | Applied as proposed — split into two records. The `/ecoregions/southwest` page and quiz **still show the misleading combined label**; not fixed. |
| 2 | Mesquite listed as keystone with `caterpillars: 0` | Applied as proposed — kept, tagged `bird-food`/`cover`/`nesting-material`, not `caterpillar-host`. |
| 3 | Species picks, zones, and heights are editorial | **OPEN** — needs botanical verification before production. |
| 4 | `plantType: 'annual'` had no facet | Resolved — `annual` added to `TYPE_OPTIONS` in `src/lib/plant-facets.ts`. |
| 5 | `moistureRequirement: 'adaptable'` has no facet | Not changed — no plant uses it, so a facet would return zero results. |

**1. "Desert willow" is filed under genus *Salix*.** The southwest `keystoneTrees` entry reads
`{ genus: "Salix", common: "Desert willow / coyote willow", caterpillars: 214 }`. Desert willow is
*Chilopsis linearis*, in Bignoniaceae — not a willow. Coyote willow (*Salix exigua*) is a true
willow. The 214 caterpillar count belongs to *Salix*. This proposal therefore splits them into two
records and attributes `caterpillar-host` only to the true willow. The `/ecoregions/southwest` page
and the quiz still show the combined, misleading label.

**2. Mesquite is listed as a keystone tree with `caterpillars: 0`.** A keystone ranking entry with a
zero count is self-contradictory. Proposal keeps *Prosopis glandulosa* (it is ecologically important
for cover, nest sites, and food in desert washes) but tags it `bird-food`, `cover`,
`nesting-material` — **not** `caterpillar-host`. Alternative: drop it from the keystone list.

**3. Species choices are editorial, not sourced.** The genus→species picks, hardiness zones, and
heights above are my horticultural judgment. They should be checked against USDA plant guides or
regional native plant society references before seeding — particularly the zone ranges, which drive
whether a plant shows up for a given zip.

**4. `plantType: 'annual'` has no filter.** *Helianthus petiolaris* would be the first annual in the
directory, but `TYPE_OPTIONS` in `src/lib/plant-facets.ts` omits `annual` (the collection supports
it). Either add the facet or type it as `perennial` — it is often grown as an annual but can
behave as a short-lived perennial.

**5. `moistureRequirement: 'adaptable'` is also unused and unfilterable.** Not needed by this
proposal; noting for completeness.

---

## Paste-ready seed entries

Add to the `plants` array in `src/seed.ts`. Descriptions attribute counts to the genus, matching how
the existing four records and the blog content phrase it.

```ts
    // ── Rocky Mountains ───────────────────────────────────────────────────
    {
      slug: 'populus-tremuloides',
      commonName: 'Quaking Aspen',
      scientificName: 'Populus tremuloides',
      description:
        'The most widely distributed native tree in North America. The Populus genus supports 249 caterpillar species in the Northwestern Forested Mountains ecoregion.',
      plantType: 'tree',
      hardinessZoneMin: 1,
      hardinessZoneMax: 7,
      heightInFeetMin: 20,
      heightInFeetMax: 80,
      sunRequirement: 'full-sun',
      moistureRequirement: 'medium',
      nativeRegions: ['mountain-west', 'northwest', 'midwest'],
      wildlifeValue: ['caterpillar-host', 'bird-food', 'cover'],
      photos: [] as { url: string }[],
    },
    {
      slug: 'pinus-ponderosa',
      commonName: 'Ponderosa Pine',
      scientificName: 'Pinus ponderosa',
      description:
        'Dominant conifer of dry Rocky Mountain slopes. Pinus supports 200 caterpillar species in this ecoregion and its seeds feed crossbills, nuthatches, and squirrels.',
      plantType: 'tree',
      hardinessZoneMin: 4,
      hardinessZoneMax: 7,
      heightInFeetMin: 60,
      heightInFeetMax: 125,
      sunRequirement: 'full-sun',
      moistureRequirement: 'dry',
      nativeRegions: ['mountain-west', 'southwest'],
      wildlifeValue: ['caterpillar-host', 'bird-food', 'cover'],
      photos: [] as { url: string }[],
    },
    {
      slug: 'betula-occidentalis',
      commonName: 'Water Birch',
      scientificName: 'Betula occidentalis',
      description:
        'A riparian birch of Rocky Mountain streams and wet meadows. Betula supports 189 caterpillar species in the Northwestern Forested Mountains ecoregion.',
      plantType: 'tree',
      hardinessZoneMin: 2,
      hardinessZoneMax: 6,
      heightInFeetMin: 20,
      heightInFeetMax: 35,
      sunRequirement: 'full-sun',
      moistureRequirement: 'wet',
      nativeRegions: ['mountain-west', 'northwest'],
      wildlifeValue: ['caterpillar-host', 'bird-food'],
      photos: [] as { url: string }[],
    },
    {
      slug: 'salix-amygdaloides',
      commonName: 'Peachleaf Willow',
      scientificName: 'Salix amygdaloides',
      description:
        'A Rocky Mountain and Great Plains riparian willow. Salix is the top keystone genus here at 289 caterpillar species, and its early catkins are a critical pollen source for emerging native bees.',
      plantType: 'tree',
      hardinessZoneMin: 3,
      hardinessZoneMax: 8,
      heightInFeetMin: 20,
      heightInFeetMax: 40,
      sunRequirement: 'full-sun',
      moistureRequirement: 'wet',
      nativeRegions: ['mountain-west', 'great-plains', 'midwest'],
      wildlifeValue: ['caterpillar-host', 'pollinator-plant', 'nesting-material'],
      photos: [] as { url: string }[],
    },
    {
      slug: 'solidago-multiradiata',
      commonName: 'Rocky Mountain Goldenrod',
      scientificName: 'Solidago multiradiata',
      description:
        'A low, mat-forming goldenrod of alpine and subalpine sites. Solidago supports 56 specialist bee species in the Rocky Mountain ecoregion.',
      plantType: 'perennial',
      hardinessZoneMin: 3,
      hardinessZoneMax: 7,
      heightInFeetMin: 1,
      heightInFeetMax: 2,
      sunRequirement: 'full-sun',
      moistureRequirement: 'dry',
      nativeRegions: ['mountain-west'],
      wildlifeValue: ['pollinator-plant', 'bird-food'],
      photos: [] as { url: string }[],
    },
    {
      slug: 'symphyotrichum-foliaceum',
      commonName: 'Leafy Aster',
      scientificName: 'Symphyotrichum foliaceum',
      description:
        'A late-season aster of Rocky Mountain meadows. Symphyotrichum supports 43 specialist bee species in this ecoregion and blooms when little else is open.',
      plantType: 'perennial',
      hardinessZoneMin: 3,
      hardinessZoneMax: 8,
      heightInFeetMin: 1,
      heightInFeetMax: 3,
      sunRequirement: 'full-sun',
      moistureRequirement: 'medium',
      nativeRegions: ['mountain-west', 'northwest'],
      wildlifeValue: ['pollinator-plant'],
      photos: [] as { url: string }[],
    },
    {
      slug: 'helianthus-petiolaris',
      commonName: 'Prairie Sunflower',
      scientificName: 'Helianthus petiolaris',
      description:
        'A dry-site annual sunflower of the Plains and Intermountain West. Helianthus supports 89 specialist bee species in the Rocky Mountain ecoregion.',
      plantType: 'annual',
      hardinessZoneMin: 4,
      hardinessZoneMax: 8,
      heightInFeetMin: 1,
      heightInFeetMax: 3,
      sunRequirement: 'full-sun',
      moistureRequirement: 'dry',
      nativeRegions: ['mountain-west', 'great-plains', 'southwest'],
      wildlifeValue: ['pollinator-plant', 'bird-food'],
      photos: [] as { url: string }[],
    },
    // ── Pacific Northwest ─────────────────────────────────────────────────
    {
      slug: 'quercus-garryana',
      commonName: 'Oregon White Oak',
      scientificName: 'Quercus garryana',
      description:
        'The signature tree of Pacific Northwest oak savanna. Quercus supports 275 caterpillar species in the Marine West Coast Forests ecoregion.',
      plantType: 'tree',
      hardinessZoneMin: 6,
      hardinessZoneMax: 8,
      heightInFeetMin: 20,
      heightInFeetMax: 60,
      sunRequirement: 'full-sun',
      moistureRequirement: 'dry',
      nativeRegions: ['northwest'],
      wildlifeValue: ['caterpillar-host', 'pollinator-plant', 'bird-food'],
      photos: [] as { url: string }[],
    },
    {
      slug: 'salix-lucida',
      commonName: 'Pacific Willow',
      scientificName: 'Salix lucida',
      description:
        'A streamside willow of the Pacific Northwest. Salix tops this ecoregion at 328 caterpillar species, and its catkins are among the first pollen sources of the year.',
      plantType: 'tree',
      hardinessZoneMin: 4,
      hardinessZoneMax: 9,
      heightInFeetMin: 15,
      heightInFeetMax: 35,
      sunRequirement: 'full-sun',
      moistureRequirement: 'wet',
      nativeRegions: ['northwest', 'mountain-west'],
      wildlifeValue: ['caterpillar-host', 'pollinator-plant', 'nesting-material'],
      photos: [] as { url: string }[],
    },
    {
      slug: 'alnus-rubra',
      commonName: 'Red Alder',
      scientificName: 'Alnus rubra',
      description:
        'A fast-growing riparian nitrogen-fixer of Pacific Northwest floodplains. Alnus supports 202 caterpillar species in this ecoregion.',
      plantType: 'tree',
      hardinessZoneMin: 6,
      hardinessZoneMax: 8,
      heightInFeetMin: 40,
      heightInFeetMax: 80,
      sunRequirement: 'full-sun',
      moistureRequirement: 'wet',
      nativeRegions: ['northwest'],
      wildlifeValue: ['caterpillar-host', 'bird-food'],
      photos: [] as { url: string }[],
    },
    {
      slug: 'pseudotsuga-menziesii',
      commonName: 'Douglas Fir',
      scientificName: 'Pseudotsuga menziesii',
      description:
        'The dominant conifer of Pacific Northwest forests. Pseudotsuga supports 116 caterpillar species and its seeds and cavities shelter dozens of bird species.',
      plantType: 'tree',
      hardinessZoneMin: 4,
      hardinessZoneMax: 7,
      heightInFeetMin: 60,
      heightInFeetMax: 120,
      sunRequirement: 'part-shade',
      moistureRequirement: 'medium',
      nativeRegions: ['northwest', 'mountain-west'],
      wildlifeValue: ['caterpillar-host', 'bird-food', 'cover'],
      photos: [] as { url: string }[],
    },
    {
      slug: 'helianthus-nuttallii',
      commonName: "Nuttall's Sunflower",
      scientificName: 'Helianthus nuttallii',
      description:
        'A moist-site perennial sunflower native to the Pacific Northwest. Helianthus supports 41 specialist bee species in the Marine West Coast Forests ecoregion.',
      plantType: 'perennial',
      hardinessZoneMin: 5,
      hardinessZoneMax: 8,
      heightInFeetMin: 2,
      heightInFeetMax: 5,
      sunRequirement: 'full-sun',
      moistureRequirement: 'medium',
      nativeRegions: ['northwest', 'california'],
      wildlifeValue: ['pollinator-plant', 'bird-food'],
      photos: [] as { url: string }[],
    },
    {
      slug: 'grindelia-integrifolia',
      commonName: 'Puget Sound Gumweed',
      scientificName: 'Grindelia integrifolia',
      description:
        'A resinous coastal gumweed of the Puget Trough and Willamette Valley. Grindelia supports 38 specialist bee species in this ecoregion.',
      plantType: 'perennial',
      hardinessZoneMin: 6,
      hardinessZoneMax: 9,
      heightInFeetMin: 1,
      heightInFeetMax: 3,
      sunRequirement: 'full-sun',
      moistureRequirement: 'medium',
      nativeRegions: ['northwest'],
      wildlifeValue: ['pollinator-plant'],
      photos: [] as { url: string }[],
    },
    // ── California ────────────────────────────────────────────────────────
    {
      slug: 'quercus-agrifolia',
      commonName: 'Coast Live Oak',
      scientificName: 'Quercus agrifolia',
      description:
        'The backbone of California oak woodland. Quercus supports 275 caterpillar species in Mediterranean California, with more than 270 bird and wildlife species depending on it.',
      plantType: 'tree',
      hardinessZoneMin: 8,
      hardinessZoneMax: 10,
      heightInFeetMin: 30,
      heightInFeetMax: 60,
      sunRequirement: 'full-sun',
      moistureRequirement: 'dry',
      nativeRegions: ['california'],
      wildlifeValue: ['caterpillar-host', 'pollinator-plant', 'bird-food'],
      photos: [] as { url: string }[],
    },
    {
      slug: 'salix-lasiolepis',
      commonName: 'Arroyo Willow',
      scientificName: 'Salix lasiolepis',
      description:
        'A streamside willow of California arroyos. Salix tops Mediterranean California at 328 caterpillar species and blooms early enough to feed newly emerged native bees.',
      plantType: 'tree',
      hardinessZoneMin: 7,
      hardinessZoneMax: 10,
      heightInFeetMin: 15,
      heightInFeetMax: 30,
      sunRequirement: 'full-sun',
      moistureRequirement: 'wet',
      nativeRegions: ['california', 'southwest'],
      wildlifeValue: ['caterpillar-host', 'pollinator-plant', 'nesting-material'],
      photos: [] as { url: string }[],
    },
    {
      slug: 'prunus-ilicifolia',
      commonName: 'Hollyleaf Cherry',
      scientificName: 'Prunus ilicifolia',
      description:
        'An evergreen chaparral cherry unique to California. Prunus supports 262 caterpillar species in this ecoregion and its fruit feeds migrating and resident birds.',
      plantType: 'tree',
      hardinessZoneMin: 8,
      hardinessZoneMax: 10,
      heightInFeetMin: 8,
      heightInFeetMax: 20,
      sunRequirement: 'full-sun',
      moistureRequirement: 'dry',
      nativeRegions: ['california'],
      wildlifeValue: ['caterpillar-host', 'bird-food'],
      photos: [] as { url: string }[],
    },
    {
      slug: 'ceanothus-thyrsiflorus',
      commonName: 'Blueblossom Ceanothus',
      scientificName: 'Ceanothus thyrsiflorus',
      description:
        'A coastal chaparral shrub found almost nowhere else in North America. Ceanothus supports 120 caterpillar species and is a major early-spring bee plant.',
      plantType: 'shrub',
      hardinessZoneMin: 7,
      hardinessZoneMax: 10,
      heightInFeetMin: 6,
      heightInFeetMax: 15,
      sunRequirement: 'full-sun',
      moistureRequirement: 'dry',
      nativeRegions: ['california'],
      wildlifeValue: ['caterpillar-host', 'pollinator-plant', 'cover'],
      photos: [] as { url: string }[],
    },
    {
      slug: 'helianthus-californicus',
      commonName: 'California Sunflower',
      scientificName: 'Helianthus californicus',
      description:
        'A rhizomatous sunflower of California seeps and marsh margins. Helianthus supports 41 specialist bee species in Mediterranean California.',
      plantType: 'perennial',
      hardinessZoneMin: 7,
      hardinessZoneMax: 10,
      heightInFeetMin: 3,
      heightInFeetMax: 6,
      sunRequirement: 'full-sun',
      moistureRequirement: 'wet',
      nativeRegions: ['california'],
      wildlifeValue: ['pollinator-plant', 'bird-food'],
      photos: [] as { url: string }[],
    },
    // ── Southwest ─────────────────────────────────────────────────────────
    {
      slug: 'quercus-arizonica',
      commonName: 'Arizona White Oak',
      scientificName: 'Quercus arizonica',
      description:
        'An evergreen oak of Arizona and New Mexico sky islands and canyon slopes. Quercus supports 253 caterpillar species in the North American Deserts ecoregion.',
      plantType: 'tree',
      hardinessZoneMin: 7,
      hardinessZoneMax: 9,
      heightInFeetMin: 15,
      heightInFeetMax: 40,
      sunRequirement: 'full-sun',
      moistureRequirement: 'dry',
      nativeRegions: ['southwest', 'mountain-west'],
      wildlifeValue: ['caterpillar-host', 'bird-food', 'cover'],
      photos: [] as { url: string }[],
    },
    {
      slug: 'salix-exigua',
      commonName: 'Coyote Willow',
      scientificName: 'Salix exigua',
      description:
        'A sandbar willow of desert washes and riverbanks. Salix supports 214 caterpillar species in the North American Deserts ecoregion.',
      plantType: 'tree',
      hardinessZoneMin: 5,
      hardinessZoneMax: 10,
      heightInFeetMin: 10,
      heightInFeetMax: 20,
      sunRequirement: 'full-sun',
      moistureRequirement: 'wet',
      nativeRegions: ['southwest', 'mountain-west', 'california'],
      wildlifeValue: ['caterpillar-host', 'pollinator-plant', 'nesting-material'],
      photos: [] as { url: string }[],
    },
    {
      slug: 'chilopsis-linearis',
      commonName: 'Desert Willow',
      scientificName: 'Chilopsis linearis',
      description:
        'A desert wash tree with orchid-like flowers. Not a true willow — it belongs to the bignonia family — but one of the most heavily visited native plants by desert bees and hummingbirds.',
      plantType: 'tree',
      hardinessZoneMin: 7,
      hardinessZoneMax: 10,
      heightInFeetMin: 10,
      heightInFeetMax: 25,
      sunRequirement: 'full-sun',
      moistureRequirement: 'dry',
      nativeRegions: ['southwest'],
      wildlifeValue: ['pollinator-plant', 'cover'],
      photos: [] as { url: string }[],
    },
    {
      slug: 'prosopis-glandulosa',
      commonName: 'Honey Mesquite',
      scientificName: 'Prosopis glandulosa',
      description:
        'A deep-rooted legume of desert washes and grasslands. Provides critical shade, nest sites, and protein-rich pods for desert wildlife.',
      plantType: 'tree',
      hardinessZoneMin: 7,
      hardinessZoneMax: 11,
      heightInFeetMin: 15,
      heightInFeetMax: 40,
      sunRequirement: 'full-sun',
      moistureRequirement: 'dry',
      nativeRegions: ['southwest'],
      wildlifeValue: ['bird-food', 'cover', 'nesting-material'],
      photos: [] as { url: string }[],
    },
    {
      slug: 'baileya-multiradiata',
      commonName: 'Desert Marigold',
      scientificName: 'Baileya multiradiata',
      description:
        'A long-blooming silver-leafed desert perennial. Baileya supports 25 specialist bee species in the North American Deserts ecoregion.',
      plantType: 'perennial',
      hardinessZoneMin: 8,
      hardinessZoneMax: 11,
      heightInFeetMin: 1,
      heightInFeetMax: 2,
      sunRequirement: 'full-sun',
      moistureRequirement: 'dry',
      nativeRegions: ['southwest'],
      wildlifeValue: ['pollinator-plant', 'bird-food'],
      photos: [] as { url: string }[],
    },
    {
      slug: 'encelia-farinosa',
      commonName: 'Brittlebush',
      scientificName: 'Encelia farinosa',
      description:
        'A silver-gray Sonoran Desert shrub that blooms after winter rain. Encelia supports 29 specialist bee species in this ecoregion.',
      plantType: 'shrub',
      hardinessZoneMin: 8,
      hardinessZoneMax: 11,
      heightInFeetMin: 2,
      heightInFeetMax: 4,
      sunRequirement: 'full-sun',
      moistureRequirement: 'dry',
      nativeRegions: ['southwest'],
      wildlifeValue: ['pollinator-plant', 'bird-food', 'cover'],
      photos: [] as { url: string }[],
    },
    {
      slug: 'helianthus-anomalus',
      commonName: 'Western Sunflower',
      scientificName: 'Helianthus anomalus',
      description:
        'A desert-adapted sunflower of sand dunes and washes in the Four Corners region. Helianthus supports 89 specialist bee species in the North American Deserts ecoregion.',
      plantType: 'perennial',
      hardinessZoneMin: 6,
      hardinessZoneMax: 9,
      heightInFeetMin: 1,
      heightInFeetMax: 3,
      sunRequirement: 'full-sun',
      moistureRequirement: 'dry',
      nativeRegions: ['southwest', 'mountain-west'],
      wildlifeValue: ['pollinator-plant', 'bird-food'],
      photos: [] as { url: string }[],
    },
    // ── Shared across the West ────────────────────────────────────────────
    {
      slug: 'ericameria-nauseosa',
      commonName: 'Rubber Rabbitbrush',
      scientificName: 'Ericameria nauseosa',
      description:
        'A resinous late-blooming shrub of dry western sites. Ericameria supports 45 specialist bee species in both the Marine West Coast and Mediterranean California ecoregions.',
      plantType: 'shrub',
      hardinessZoneMin: 4,
      hardinessZoneMax: 9,
      heightInFeetMin: 2,
      heightInFeetMax: 5,
      sunRequirement: 'full-sun',
      moistureRequirement: 'dry',
      nativeRegions: ['california', 'northwest', 'mountain-west', 'southwest'],
      wildlifeValue: ['pollinator-plant', 'bird-food', 'cover'],
      photos: [] as { url: string }[],
    },
    {
      slug: 'chrysothamnus-viscidiflorus',
      commonName: 'Green Rabbitbrush',
      scientificName: 'Chrysothamnus viscidiflorus',
      description:
        'A compact rabbitbrush of western sagebrush and open woodland. Chrysothamnus supports 40 specialist bee species in Mediterranean California.',
      plantType: 'shrub',
      hardinessZoneMin: 4,
      hardinessZoneMax: 9,
      heightInFeetMin: 1,
      heightInFeetMax: 3,
      sunRequirement: 'full-sun',
      moistureRequirement: 'dry',
      nativeRegions: ['california', 'northwest', 'mountain-west', 'southwest'],
      wildlifeValue: ['pollinator-plant', 'cover'],
      photos: [] as { url: string }[],
    },
```

## Resulting coverage if all 27 are added

Counts tallied from the `nativeRegions` arrays above; directory total goes from 4 plants to 31.

| Region | Before | After |
|---|---|---|
| northeast | 3 | 3 |
| southeast | 4 | 4 |
| midwest | 4 | 6 |
| great-plains | 2 | 4 |
| mountain-west | 0 | 14 |
| northwest | 0 | 11 |
| california | 0 | 9 |
| southwest | 0 | 12 |

All 78 seeded zips would return results. AK, HI, and WY remain uncovered because they have no
`zip-regions` rows at all.

## Verification plan once approved

1. Add the entries to the `plants` array in `src/seed.ts`
2. `pnpm run seed` against local D1, then re-run the `/search` smoke test across one zip per region
   (04101, 57501, 84101, 97201, 92101, 89101) and confirm non-zero counts
3. `pnpm run test:int` — the facet parity test already asserts every `wildlifeValue`,
   `sunRequirement`, `moistureRequirement`, and `plantType` used matches a collection option;
   extend it to assert `nativeRegions` values too
4. `npx tsc --noEmit` and `pnpm run lint`
5. Confirm `/plants?type=shrub`, `?type=annual`, and `?moisture=wet` now return results
