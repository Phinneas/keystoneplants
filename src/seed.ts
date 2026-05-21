/* eslint-disable @typescript-eslint/no-explicit-any */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

async function seed() {
  const payload = await getPayload({ config: await config })

  // ── Plants ────────────────────────────────────────────────────────────────
  const plants = [
    {
      slug: 'quercus-rubra',
      commonName: 'Northern Red Oak',
      scientificName: 'Quercus rubra',
      description:
        'One of the most important keystone trees in eastern North America. Supports over 500 species of caterpillars alone.',
      plantType: 'tree',
      hardinessZoneMin: 4,
      hardinessZoneMax: 8,
      heightInFeetMin: 60,
      heightInFeetMax: 90,
      sunRequirement: 'full-sun',
      moistureRequirement: 'medium',
      nativeRegions: ['northeast', 'midwest', 'southeast'],
      wildlifeValue: ['caterpillar-host', 'pollinator-plant', 'bird-food'],
      photos: [] as { url: string }[],
    },
    {
      slug: 'prunus-serotina',
      commonName: 'Black Cherry',
      scientificName: 'Prunus serotina',
      description:
        'A fast-growing native tree that ranks among the top five keystone plants in the eastern US. Hosts over 450 species of caterpillars.',
      plantType: 'tree',
      hardinessZoneMin: 3,
      hardinessZoneMax: 9,
      heightInFeetMin: 50,
      heightInFeetMax: 80,
      sunRequirement: 'full-sun',
      moistureRequirement: 'medium',
      nativeRegions: ['northeast', 'midwest', 'southeast'],
      wildlifeValue: ['caterpillar-host', 'bird-food'],
      photos: [] as { url: string }[],
    },
    {
      slug: 'asclepias-tuberosa',
      commonName: 'Butterfly Weed',
      scientificName: 'Asclepias tuberosa',
      description:
        'A drought-tolerant milkweed with brilliant orange blooms. The only larval host plant for monarch butterflies.',
      plantType: 'perennial',
      hardinessZoneMin: 3,
      hardinessZoneMax: 9,
      heightInFeetMin: 1,
      heightInFeetMax: 2,
      sunRequirement: 'full-sun',
      moistureRequirement: 'dry',
      nativeRegions: ['northeast', 'midwest', 'southeast', 'great-plains'],
      wildlifeValue: ['caterpillar-host', 'pollinator-plant'],
      photos: [] as { url: string }[],
    },
    {
      slug: 'echinacea-purpurea',
      commonName: 'Purple Coneflower',
      scientificName: 'Echinacea purpurea',
      description:
        'An iconic prairie perennial with bold purple-pink daisy blooms. Long-lasting seedheads feed goldfinches through winter.',
      plantType: 'perennial',
      hardinessZoneMin: 3,
      hardinessZoneMax: 9,
      heightInFeetMin: 2,
      heightInFeetMax: 4,
      sunRequirement: 'full-sun',
      moistureRequirement: 'medium',
      nativeRegions: ['midwest', 'southeast', 'great-plains'],
      wildlifeValue: ['pollinator-plant', 'bird-food'],
      photos: [] as { url: string }[],
    },
  ]

  for (const plant of plants) {
    const existing = await payload.find({
      collection: 'plants',
      where: { slug: { equals: plant.slug } },
      limit: 1,
    })
    if (existing.docs[0]) {
      await payload.update({ collection: 'plants', id: existing.docs[0].id, data: plant as any })
    } else {
      await payload.create({ collection: 'plants', data: plant as any })
    }
    console.log(`Seeded plant: ${plant.commonName}`)
  }

  // ── Zip Regions ───────────────────────────────────────────────────────────
  const zips = [
    { zip: '10001', state: 'NY', ecoregions: [{ code: '8.1.4' }], hardinessZone: 7, lat: 40.7484, lng: -73.9967 },
    { zip: '60601', state: 'IL', ecoregions: [{ code: '8.3.1' }], hardinessZone: 6, lat: 41.8858, lng: -87.6181 },
    { zip: '30301', state: 'GA', ecoregions: [{ code: '8.5.1' }], hardinessZone: 8, lat: 33.7490, lng: -84.3880 },
    { zip: '80202', state: 'CO', ecoregions: [{ code: '6.2.3' }], hardinessZone: 6, lat: 39.7527, lng: -104.9998 },
    { zip: '98101', state: 'WA', ecoregions: [{ code: '6.2.7' }], hardinessZone: 9, lat: 47.6062, lng: -122.3321 },
    { zip: '02101', state: 'MA', ecoregions: [{ code: '8.1.7' }], hardinessZone: 7, lat: 42.3601, lng: -71.0589 },
    { zip: '19101', state: 'PA', ecoregions: [{ code: '8.1.4' }], hardinessZone: 7, lat: 39.9526, lng: -75.1652 },
    { zip: '55401', state: 'MN', ecoregions: [{ code: '9.2.3' }], hardinessZone: 5, lat: 44.9778, lng: -93.2650 },
    // PA
    { zip: '17517', state: 'PA', ecoregions: [{ code: '8.1.4' }], hardinessZone: 6, lat: 40.2348, lng: -76.1355 },
    { zip: '18951', state: 'PA', ecoregions: [{ code: '8.1.4' }], hardinessZone: 6, lat: 40.4418, lng: -75.3410 },
    { zip: '18655', state: 'PA', ecoregions: [{ code: '8.1.7' }], hardinessZone: 6, lat: 41.1546, lng: -76.1505 },
    // OH
    { zip: '45371', state: 'OH', ecoregions: [{ code: '8.3.1' }], hardinessZone: 6, lat: 39.9609, lng: -84.2380 },
    { zip: '44256', state: 'OH', ecoregions: [{ code: '8.3.1' }], hardinessZone: 6, lat: 41.1445, lng: -81.8638 },
    { zip: '43062', state: 'OH', ecoregions: [{ code: '8.3.1' }], hardinessZone: 6, lat: 39.9978, lng: -82.6837 },
    { zip: '44028', state: 'OH', ecoregions: [{ code: '8.3.1' }], hardinessZone: 6, lat: 41.3145, lng: -81.9307 },
    // NY
    { zip: '12446', state: 'NY', ecoregions: [{ code: '8.1.7' }], hardinessZone: 6, lat: 41.7724, lng: -74.2951 },
    { zip: '14437', state: 'NY', ecoregions: [{ code: '8.1.7' }], hardinessZone: 5, lat: 42.5606, lng: -77.6969 },
    { zip: '11565', state: 'NY', ecoregions: [{ code: '8.1.4' }], hardinessZone: 7, lat: 40.6765, lng: -73.6718 },
    { zip: '11941', state: 'NY', ecoregions: [{ code: '8.1.4' }], hardinessZone: 7, lat: 40.8426, lng: -72.7354 },
    // MI
    { zip: '48854', state: 'MI', ecoregions: [{ code: '8.3.1' }], hardinessZone: 6, lat: 42.5795, lng: -84.4430 },
    { zip: '48334', state: 'MI', ecoregions: [{ code: '8.3.1' }], hardinessZone: 6, lat: 42.4851, lng: -83.3821 },
    { zip: '48875', state: 'MI', ecoregions: [{ code: '8.3.1' }], hardinessZone: 5, lat: 42.8645, lng: -84.9005 },
    // IL
    { zip: '60034', state: 'IL', ecoregions: [{ code: '8.3.1' }], hardinessZone: 5, lat: 42.4764, lng: -88.4372 },
    { zip: '61701', state: 'IL', ecoregions: [{ code: '8.3.1' }], hardinessZone: 5, lat: 40.4842, lng: -88.9937 },
    { zip: '61489', state: 'IL', ecoregions: [{ code: '8.3.1' }], hardinessZone: 5, lat: 40.9259, lng: -90.0390 },
  ]

  for (const z of zips) {
    const existing = await payload.find({
      collection: 'zip-regions',
      where: { zip: { equals: z.zip } },
      limit: 1,
    })
    if (existing.docs[0]) {
      await payload.update({ collection: 'zip-regions', id: existing.docs[0].id, data: z as any })
    } else {
      await payload.create({ collection: 'zip-regions', data: z as any })
    }
  }
  console.log(`Seeded ${zips.length} zip regions`)

  // ── Nurseries ─────────────────────────────────────────────────────────────
  const nurseries = [
    {
      slug: 'earth-sangha-native-nursery',
      name: 'Earth Sangha Native Nursery',
      description: 'A nonprofit native plant nursery focused on ecological restoration in the mid-Atlantic region.',
      address: '7216 Signal Hill Rd',
      city: 'Manassas',
      state: 'VA',
      zip: '20111',
      website: 'https://earthsangha.org',
      isNativeOnly: true,
      specialties: ['trees', 'shrubs', 'perennials'],
      photos: [] as { url: string }[],
      lat: 38.7223,
      lng: -77.4753,
      verified: true,
    },
    {
      slug: 'prairie-nursery',
      name: 'Prairie Nursery',
      description: 'One of the pioneering native plant nurseries in the US, specializing in prairie plants and wildflowers.',
      address: 'W4263 Jondal Rd',
      city: 'Westfield',
      state: 'WI',
      zip: '53964',
      website: 'https://prairienursery.com',
      isNativeOnly: true,
      specialties: ['prairie', 'grasses', 'perennials', 'pollinators'],
      photos: [] as { url: string }[],
      lat: 43.8894,
      lng: -89.4984,
      verified: true,
    },
    {
      slug: 'izel-native-plants',
      name: 'Izel Native Plants',
      description: 'Mail-order native plant nursery with one of the largest selections in the eastern US.',
      city: 'Online',
      state: 'VA',
      zip: '22901',
      website: 'https://izelnativeplants.com',
      isNativeOnly: true,
      specialties: ['trees', 'shrubs', 'perennials', 'pollinators'],
      photos: [] as { url: string }[],
      lat: 38.0293,
      lng: -78.4767,
      verified: true,
    },
    {
      slug: 'possibility-place-nursery',
      name: 'Possibility Place Nursery',
      description: 'Wholesale and retail native plant nursery serving the Chicago region.',
      address: '7548 W Monee-Manhattan Rd',
      city: 'Monee',
      state: 'IL',
      zip: '60449',
      website: 'https://possibilityplace.com',
      isNativeOnly: true,
      specialties: ['trees', 'shrubs', 'prairie', 'grasses'],
      photos: [] as { url: string }[],
      lat: 41.4167,
      lng: -87.7436,
      verified: true,
    },
    {
      slug: 'nearly-native-nursery',
      name: 'Nearly Native Nursery',
      description: 'Georgia-based native plant nursery with a strong selection for the Southeast.',
      address: '776 McBride Rd',
      city: 'Fayetteville',
      state: 'GA',
      zip: '30214',
      website: 'https://nearlynativenursery.com',
      isNativeOnly: false,
      specialties: ['perennials', 'shrubs', 'trees', 'pollinators'],
      photos: [] as { url: string }[],
      lat: 33.4476,
      lng: -84.4549,
      verified: true,
    },
    {
      slug: 'native-plant-trust-garden',
      name: 'Native Plant Trust Garden in the Woods',
      description: 'The largest native plant nursery in New England, with over 400 species.',
      address: '180 Hemenway Rd',
      city: 'Framingham',
      state: 'MA',
      zip: '01701',
      website: 'https://nativeplants.org',
      isNativeOnly: true,
      specialties: ['perennials', 'shrubs', 'ferns', 'trees', 'wetland'],
      photos: [] as { url: string }[],
      lat: 42.3251,
      lng: -71.4354,
      verified: true,
    },
    // PA
    {
      slug: 'good-host-plants',
      name: 'Good Host Plants',
      description: 'Philadelphia-based native plant nursery supplying straight-species plants of local Mid-Atlantic provenance.',
      city: 'Philadelphia',
      state: 'PA',
      zip: '19119',
      website: 'https://www.goodhostplants.com',
      isNativeOnly: true,
      specialties: ['perennials', 'shrubs', 'trees', 'pollinators'],
      photos: [] as { url: string }[],
      lat: 40.0509,
      lng: -75.1864,
      verified: true,
    },
    {
      slug: 'high-five-farms-native-nursery',
      name: 'High-Five Farms Native Nursery',
      description: 'Family-run nursery on 35 acres in Lancaster County growing Mid-Atlantic native plants from seed.',
      address: '390 Mountain Rd',
      city: 'Denver',
      state: 'PA',
      zip: '17517',
      website: 'https://high-fivefarms.com',
      isNativeOnly: true,
      specialties: ['perennials', 'trees', 'shrubs', 'pollinators'],
      photos: [] as { url: string }[],
      lat: 40.2348,
      lng: -76.1355,
      verified: true,
    },
    {
      slug: 'bluet-native-plant-nursery',
      name: 'Bluet Native Plant Nursery',
      description: 'Small-batch retail nursery in Luzerne County growing native plants entirely from seed.',
      city: 'Shickshinny',
      state: 'PA',
      zip: '18655',
      website: 'https://bluetnativenursery.com',
      isNativeOnly: true,
      specialties: ['perennials', 'ferns', 'grasses'],
      photos: [] as { url: string }[],
      lat: 41.1546,
      lng: -76.1505,
      verified: true,
    },
    {
      slug: 'archewild',
      name: 'ArcheWild Native Plant Nurseries',
      description: 'Wholesale grower specializing in open-pollinated, local ecotype native plants for the mid-Atlantic.',
      city: 'Quakertown',
      state: 'PA',
      zip: '18951',
      website: 'https://archewild.com',
      isNativeOnly: true,
      specialties: ['trees', 'shrubs', 'grasses', 'perennials'],
      photos: [] as { url: string }[],
      lat: 40.4418,
      lng: -75.3410,
      verified: true,
    },
    // OH
    {
      slug: 'native-ohio-plants',
      name: 'Native Ohio Plants',
      description: 'Nursery specializing in container-grown trees, shrubs, and wildflowers native to Ohio.',
      address: '2680 West Charleston Rd',
      city: 'Tipp City',
      state: 'OH',
      zip: '45371',
      website: 'https://nativeohioplants.com',
      isNativeOnly: true,
      specialties: ['trees', 'shrubs', 'perennials'],
      photos: [] as { url: string }[],
      lat: 39.9609,
      lng: -84.2380,
      verified: true,
    },
    {
      slug: 'native-roots-inc',
      name: 'Native Roots Inc.',
      description: 'Northeast Ohio native plant nursery growing local Ohio ecotypes for home gardeners and restoration projects.',
      address: '3316 Hamlin Road',
      city: 'Medina',
      state: 'OH',
      zip: '44256',
      website: 'https://www.nativerootsinc.com',
      isNativeOnly: true,
      specialties: ['perennials', 'grasses', 'shrubs', 'wetland'],
      photos: [] as { url: string }[],
      lat: 41.1445,
      lng: -81.8638,
      verified: true,
    },
    {
      slug: 'monarch-meadows-native-nursery',
      name: 'Monarch Meadows Native Plant Nursery',
      description: 'Central Ohio native plant nursery specializing in natives for pollinators and birds.',
      address: '9399 Morse Rd',
      city: 'Pataskala',
      state: 'OH',
      zip: '43062',
      website: 'https://monarchmeadowsnatives.com',
      isNativeOnly: true,
      specialties: ['perennials', 'pollinators', 'grasses'],
      photos: [] as { url: string }[],
      lat: 39.9978,
      lng: -82.6837,
      verified: true,
    },
    {
      slug: 'nodding-onion-gardens',
      name: 'Nodding Onion Gardens',
      description: 'Family-owned nursery in the Cleveland metro area growing Ohio native plants with organic practices.',
      city: 'Columbia Station',
      state: 'OH',
      zip: '44028',
      website: 'https://noddingoniongardens.com',
      isNativeOnly: true,
      specialties: ['perennials', 'grasses', 'pollinators'],
      photos: [] as { url: string }[],
      lat: 41.3145,
      lng: -81.9307,
      verified: true,
    },
    // NY
    {
      slug: 'catskill-native-nursery',
      name: 'Catskill Native Nursery',
      description: 'Nursery devoted to plants native to eastern North America, operating since 1999 in the Catskill Mountains.',
      address: '607 Samsonville Road',
      city: 'Kerhonkson',
      state: 'NY',
      zip: '12446',
      website: 'https://catskillnativenursery.com',
      isNativeOnly: true,
      specialties: ['perennials', 'shrubs', 'trees'],
      photos: [] as { url: string }[],
      lat: 41.7724,
      lng: -74.2951,
      verified: true,
    },
    {
      slug: 'amandas-native-garden',
      name: "Amanda's Native Garden",
      description: 'NYS-certified women-owned business propagating native perennial wildflowers, ferns, grasses, and sedges for 30+ years.',
      address: '8030 Story Rd',
      city: 'Dansville',
      state: 'NY',
      zip: '14437',
      website: 'https://amandagarden.com',
      isNativeOnly: true,
      specialties: ['perennials', 'ferns', 'grasses', 'wetland'],
      photos: [] as { url: string }[],
      lat: 42.5606,
      lng: -77.6969,
      verified: true,
    },
    {
      slug: 'dropseed-native-landscapes-li',
      name: 'Dropseed Native Landscapes',
      description: 'Long Island native plant nursery and ecological design firm.',
      address: '480 Hempstead Ave',
      city: 'Malverne',
      state: 'NY',
      zip: '11565',
      website: 'https://www.dropseednativelandscapesli.com',
      isNativeOnly: true,
      specialties: ['perennials', 'shrubs', 'trees', 'grasses'],
      photos: [] as { url: string }[],
      lat: 40.6765,
      lng: -73.6718,
      verified: true,
    },
    {
      slug: 'long-island-natives',
      name: 'Long Island Natives',
      description: '50-acre nursery in Eastport focused on native vegetation for the northeastern US.',
      city: 'Eastport',
      state: 'NY',
      zip: '11941',
      website: 'https://longislandnatives.com',
      isNativeOnly: true,
      specialties: ['trees', 'shrubs', 'grasses', 'wetland'],
      photos: [] as { url: string }[],
      lat: 40.8426,
      lng: -72.7354,
      verified: true,
    },
    // MI
    {
      slug: 'wildtype-native-plants',
      name: 'Wildtype Native Plants',
      description: "Michigan's most established native plant nursery, growing Michigan-genotype trees, shrubs, grasses, and wildflowers for 29+ years.",
      address: '900 N. Every Road',
      city: 'Mason',
      state: 'MI',
      zip: '48854',
      website: 'https://www.wildtypeplants.com',
      isNativeOnly: true,
      specialties: ['trees', 'shrubs', 'grasses', 'perennials', 'wetland'],
      photos: [] as { url: string }[],
      lat: 42.5795,
      lng: -84.4430,
      verified: true,
    },
    {
      slug: 'detroit-wildflower-nursery',
      name: 'Detroit Wildflower Nursery',
      description: 'Retail backyard nursery in Farmington Hills specializing in Michigan native wildflowers grown from seed.',
      address: '27220 Bramwell St',
      city: 'Farmington Hills',
      state: 'MI',
      zip: '48334',
      website: 'https://www.detroitwildflowers.com',
      isNativeOnly: true,
      specialties: ['perennials', 'pollinators', 'grasses'],
      photos: [] as { url: string }[],
      lat: 42.4851,
      lng: -83.3821,
      verified: true,
    },
    {
      slug: 'feral-flora',
      name: 'Feral Flora',
      description: 'Ann Arbor nursery and garden design firm offering 200+ species of principally Michigan-genotype native plants.',
      city: 'Ann Arbor',
      state: 'MI',
      zip: '48103',
      website: 'https://www.feral-flora.com',
      isNativeOnly: false,
      specialties: ['perennials', 'grasses', 'shrubs', 'trees'],
      photos: [] as { url: string }[],
      lat: 42.2808,
      lng: -83.7430,
      verified: true,
    },
    {
      slug: 'michigan-wildflower-farm',
      name: 'Michigan Wildflower Farm',
      description: 'Working farm in Portland operating since 1988, producing documented Michigan-genotype wildflower and grass seed.',
      address: '11770 Cutler Rd',
      city: 'Portland',
      state: 'MI',
      zip: '48875',
      website: 'https://michiganwildflowerfarm.com',
      isNativeOnly: true,
      specialties: ['grasses', 'perennials'],
      photos: [] as { url: string }[],
      lat: 42.8645,
      lng: -84.9005,
      verified: true,
    },
    // IL
    {
      slug: 'red-buffalo-nursery',
      name: 'Red Buffalo Nursery',
      description: 'Northeastern Illinois native plant nursery on 20 acres of protected land including a remnant sedge meadow.',
      address: '10502 Seaman Rd',
      city: 'Hebron',
      state: 'IL',
      zip: '60034',
      website: 'https://www.redbuffalonursery.com',
      isNativeOnly: true,
      specialties: ['prairie', 'grasses', 'perennials', 'shrubs'],
      photos: [] as { url: string }[],
      lat: 42.4764,
      lng: -88.4372,
      verified: true,
    },
    {
      slug: 'coneflower-and-company',
      name: 'Coneflower & Company',
      description: 'Bloomington-based nursery growing pollinator-safe, neonicotinoid-free native plants for the Illinois Midwest.',
      city: 'Bloomington',
      state: 'IL',
      zip: '61701',
      website: 'https://www.coneflowerandcompany.com',
      isNativeOnly: true,
      specialties: ['perennials', 'prairie', 'pollinators', 'grasses'],
      photos: [] as { url: string }[],
      lat: 40.4842,
      lng: -88.9937,
      verified: true,
    },
    {
      slug: 'pleasant-prairie-nursery',
      name: 'Pleasant Prairie Nursery',
      description: 'Illinois native plant nursery on a Peoria County farmstead growing over 100 species of native grasses, wildflowers, and trees.',
      city: 'Williamsfield',
      state: 'IL',
      zip: '61489',
      website: 'https://www.pleasantprairienursery.com',
      isNativeOnly: true,
      specialties: ['grasses', 'prairie', 'perennials', 'trees'],
      photos: [] as { url: string }[],
      lat: 40.9259,
      lng: -90.0390,
      verified: true,
    },
  ]

  for (const n of nurseries) {
    const existing = await payload.find({
      collection: 'nurseries',
      where: { slug: { equals: n.slug } },
      limit: 1,
    })
    if (existing.docs[0]) {
      await payload.update({ collection: 'nurseries', id: existing.docs[0].id, data: n as any })
    } else {
      await payload.create({ collection: 'nurseries', data: n as any })
    }
    console.log(`Seeded nursery: ${n.name}`)
  }
  console.log(`Seeded ${nurseries.length} nurseries`)

  // ── Posts ─────────────────────────────────────────────────────────────────
  const posts = [
    {
      slug: 'what-are-keystone-plants',
      title: "What Are Keystone Plants? The Science Behind Nature's Most Powerful Native Species",
      excerpt:
        "Just 14% of native plant species support 90% of caterpillars. Douglas Tallamy's research reveals why a small group of powerhouse native plants — keystones — does nearly all the ecological work.",
      publishedAt: '2026-05-01T00:00:00.000Z',
      body: '<p>Keystone plants are native plant species that support a disproportionately large share of local wildlife.</p>',
    },
    {
      slug: 'how-to-find-trustworthy-native-plant-nursery',
      title: 'How to Find a Trustworthy Native Plant Nursery',
      excerpt:
        'Not all native plants are created equal. Here is what to look for when sourcing plants from a nursery.',
      publishedAt: '2026-05-10T00:00:00.000Z',
      body: '<p>When shopping for native plants, provenance matters as much as species.</p>',
    },
  ]

  for (const p of posts) {
    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: p.slug } },
      limit: 1,
    })
    if (existing.docs[0]) {
      await payload.update({ collection: 'posts', id: existing.docs[0].id, data: p as any })
    } else {
      await payload.create({ collection: 'posts', data: p as any })
    }
    console.log(`Seeded post: ${p.title}`)
  }

  console.log('\nSeed complete.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
