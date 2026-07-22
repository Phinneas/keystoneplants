import Link from "next/link";
import type { ParsedNursery } from "@/lib/nurseries";

export function NurseryCard({
  slug,
  name,
  city,
  state,
  website: _website,
  isNativeOnly,
  specialties,
  photos,
  distanceMiles,
  verified,
}: Pick<
  ParsedNursery,
  | "slug"
  | "name"
  | "city"
  | "state"
  | "website"
  | "isNativeOnly"
  | "specialties"
  | "photos"
  | "distanceMiles"
  | "verified"
>) {
  return (
    <Link
      href={`/nurseries/${slug}`}
      className="nursery-card group relative flex flex-col overflow-visible rounded-sm border living-surface"
    >
      <div className="relative z-10 aspect-[16/9] overflow-hidden rounded-t-sm living-surface-soft">
        {photos[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photos[0]}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="living-copy-muted text-sm">No photo</span>
          </div>
        )}
      </div>

      <div className="relative z-10 flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="leading-tight font-semibold text-[var(--primary)] decoration-2 underline-offset-2 transition-all group-hover:underline group-hover:decoration-[var(--accent)]">
              {name}
            </h3>
            <p className="mt-0.5 text-sm living-copy-muted">
              {city}, {state}
              {distanceMiles !== undefined && (
                <span className="ml-2 font-medium text-[var(--primary)]">
                  {distanceMiles < 10
                    ? `${distanceMiles.toFixed(1)} mi`
                    : `${Math.round(distanceMiles)} mi`}
                </span>
              )}
            </p>
          </div>
          {verified && (
            <span className="shrink-0 rounded-sm bg-[var(--accent)] px-2 py-0.5 text-xs font-medium text-[var(--accent-foreground)]">
              Verified
            </span>
          )}
        </div>

        <div className="mt-auto flex flex-wrap gap-1">
          <span
            className={`rounded-sm border px-2 py-0.5 text-xs font-medium ${
              isNativeOnly
                ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--accent)]"
                : "living-surface-soft text-[var(--muted-foreground)]"
            }`}
          >
            {isNativeOnly ? "Native only" : "Native friendly"}
          </span>
          {specialties.slice(0, 3).map((specialty) => (
            <span
              key={specialty}
              className="rounded-sm border px-2 py-0.5 text-xs capitalize living-surface-soft text-[var(--muted-foreground)]"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>

      <svg className="nursery-card-growth" viewBox="0 0 86 70" aria-hidden="true" role="presentation">
        <path d="M43 69C42 49 44 35 48 12" />
        <path d="M47 41C30 42 18 32 15 20C28 18 42 25 47 41Z" />
        <path d="M47 31C59 32 70 24 74 13C62 10 50 18 47 31Z" />
        <path d="M44 53C31 54 23 47 20 37C31 34 41 41 44 53Z" />
      </svg>
    </Link>
  );
}
