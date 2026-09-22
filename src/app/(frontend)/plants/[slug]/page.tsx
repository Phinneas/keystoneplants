import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'
import { getPlantBySlug, buildPlantDefinition } from '@/lib/plants'

export const dynamic = 'force-dynamic'

const SUN_LABELS: Record<string, string> = {
  'full-sun': 'Full sun',
  'part-shade': 'Part shade',
  'full-shade': 'Full shade',
}

const MOISTURE_LABELS: Record<string, string> = {
  dry: 'Dry',
  medium: 'Medium',
  wet: 'Wet',
  adaptable: 'Adaptable',
}

const WILDLIFE_LABELS: Record<string, string> = {
  'caterpillar-host': 'Caterpillar host plant',
  'pollinator-plant': 'Pollinator plant',
  'bird-food': 'Bird food source',
  'nesting-material': 'Nesting material',
  cover: 'Wildlife cover',
}

interface PlantPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PlantPageProps): Promise<Metadata> {
  const { slug } = await params
  const plant = await getPlantBySlug(slug)
  if (!plant) return { title: 'Plant not found' }
  return {
    title: `${plant.commonName} (${plant.scientificName})`,
    description: buildPlantDefinition(plant),
  }
}

export default async function PlantPage({ params }: PlantPageProps) {
  const { slug } = await params
  const plant = await getPlantBySlug(slug)
  if (!plant) notFound()

  const heightLabel =
    plant.heightInFeetMin && plant.heightInFeetMax
      ? `${plant.heightInFeetMin}–${plant.heightInFeetMax} ft`
      : plant.heightInFeetMax
        ? `Up to ${plant.heightInFeetMax} ft`
        : null

  const definition = buildPlantDefinition(plant)

  const schemaProperties = [
    plant.sunRequirement && { "@type": "PropertyValue", name: "Sun Requirement", value: SUN_LABELS[plant.sunRequirement] ?? plant.sunRequirement },
    plant.moistureRequirement && { "@type": "PropertyValue", name: "Moisture", value: MOISTURE_LABELS[plant.moistureRequirement] ?? plant.moistureRequirement },
    heightLabel && { "@type": "PropertyValue", name: "Height", value: heightLabel },
    plant.hardinessZoneMin && plant.hardinessZoneMax && { "@type": "PropertyValue", name: "Hardiness Zones", value: `${plant.hardinessZoneMin}–${plant.hardinessZoneMax}` },
    plant.plantType && { "@type": "PropertyValue", name: "Plant Type", value: plant.plantType },
  ].filter(Boolean)

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Thing",
        name: `${plant.commonName} (${plant.scientificName})`,
        description: definition,
        url: `https://www.keystonenurseries.com/plants/${plant.slug}`,
        dateModified: plant.updatedAt ?? undefined,
        additionalProperty: schemaProperties,
        ...(plant.photos[0] && { image: plant.photos[0] }),
      }} />
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-[var(--kn-ink)] font-[var(--font-figtree)]">
          {plant.commonName}
        </h1>
        <p className="text-xl italic text-[var(--kn-muted)]">{plant.scientificName}</p>
        {plant.updatedAt && (
          <p className="text-xs text-[var(--kn-muted)]">
            Last updated{" "}
            <time dateTime={plant.updatedAt}>
              {new Date(plant.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </p>
        )}
      </div>

      {/* Extractable definition — written for AI snippet extraction */}
      <p className="text-[var(--kn-ink)] leading-relaxed text-base">{definition}</p>

      {plant.photos[0] && (
        <div className="aspect-video rounded-sm overflow-hidden bg-[var(--kn-surface)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={plant.photos[0]} alt={plant.commonName} className="w-full h-full object-cover" />
        </div>
      )}

      {plant.description && (
        <p className="text-[var(--kn-muted)] leading-relaxed text-sm">{plant.description}</p>
      )}

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[var(--kn-ink)] font-[var(--font-figtree)]">
          Growing conditions
        </h2>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
          {plant.sunRequirement && (
            <Detail label="Sun" value={SUN_LABELS[plant.sunRequirement] ?? plant.sunRequirement} />
          )}
          {plant.moistureRequirement && (
            <Detail
              label="Moisture"
              value={MOISTURE_LABELS[plant.moistureRequirement] ?? plant.moistureRequirement}
            />
          )}
          {heightLabel && <Detail label="Height" value={heightLabel} />}
          {plant.hardinessZoneMin && plant.hardinessZoneMax && (
            <Detail
              label="Hardiness zones"
              value={`${plant.hardinessZoneMin}–${plant.hardinessZoneMax}`}
            />
          )}
        </dl>
      </section>

      {plant.wildlifeValue.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-[var(--kn-ink)] font-[var(--font-figtree)]">
            Ecological value
          </h2>
          <ul className="space-y-1.5">
            {plant.wildlifeValue.map((w) => (
              <li key={w} className="flex items-center gap-2 text-sm text-[var(--kn-ink)]">
                <span className="text-[var(--kn-green)]">✓</span>
                {WILDLIFE_LABELS[w] ?? w}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[var(--kn-muted)] font-medium">{label}</dt>
      <dd className="text-[var(--kn-ink)]">{value}</dd>
    </div>
  )
}
