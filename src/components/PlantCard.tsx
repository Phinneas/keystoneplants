import Link from 'next/link'
import type { ParsedPlant } from '@/lib/plants'

const SUN_LABELS: Record<string, string> = {
  'full-sun': 'Full sun',
  'part-shade': 'Part shade',
  'full-shade': 'Full shade',
}

const WILDLIFE_LABELS: Record<string, string> = {
  'caterpillar-host': 'Caterpillar host',
  'pollinator-plant': 'Pollinator',
  'bird-food': 'Bird food',
  'nesting-material': 'Nesting',
  cover: 'Cover',
}

type PlantCardProps = Pick<
  ParsedPlant,
  'slug' | 'commonName' | 'scientificName' | 'sunRequirement' | 'wildlifeValue' |
  'heightInFeetMin' | 'heightInFeetMax' | 'photos'
>

export function PlantCard({
  slug,
  commonName,
  scientificName,
  sunRequirement,
  wildlifeValue,
  heightInFeetMin,
  heightInFeetMax,
  photos,
}: PlantCardProps) {
  return (
    <Link
      href={`/plants/${slug}`}
      className="group flex flex-col rounded-sm border border-[var(--kn-line)] bg-white overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="aspect-[4/3] bg-[var(--kn-surface)] overflow-hidden">
        {photos[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photos[0]}
            alt={commonName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--kn-muted)] text-sm">
            No photo
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <div>
          <h3 className="font-semibold text-[var(--kn-green)] group-hover:underline decoration-[#DDFC74] decoration-2 underline-offset-2">
            {commonName}
          </h3>
          <p className="text-sm italic text-[var(--kn-muted)]">{scientificName}</p>
        </div>

        <div className="flex flex-wrap gap-1 mt-auto pt-2">
          {sunRequirement && (
            <Badge variant="sun">{SUN_LABELS[sunRequirement] ?? sunRequirement}</Badge>
          )}
          {wildlifeValue.slice(0, 2).map((w) => (
            <Badge key={w} variant="wildlife">{WILDLIFE_LABELS[w] ?? w}</Badge>
          ))}
          {heightInFeetMax !== null && (
            <Badge variant="neutral">
              {heightInFeetMin ? `${heightInFeetMin}–${heightInFeetMax}` : `to ${heightInFeetMax}`} ft
            </Badge>
          )}
        </div>
      </div>
    </Link>
  )
}

function Badge({
  children,
  variant,
}: {
  children: React.ReactNode
  variant: 'sun' | 'wildlife' | 'neutral'
}) {
  const styles = {
    sun: 'bg-[var(--kn-surface)] text-[var(--kn-green)] border-[var(--kn-line)]',
    wildlife: 'bg-[#DDFC74]/20 text-[var(--kn-ink)] border-[#DDFC74]',
    neutral: 'bg-[var(--kn-surface)] text-[var(--kn-muted)] border-[var(--kn-line)]',
  }
  return (
    <span className={`text-xs px-2 py-0.5 rounded-sm border ${styles[variant]}`}>
      {children}
    </span>
  )
}
