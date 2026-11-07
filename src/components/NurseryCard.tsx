import Link from "next/link";
import type { ParsedNursery } from "@/lib/nurseries";
import { FavoriteHeart, LiftCard } from "@/components/micro/Micro";

export function NurseryCard({
  slug,
  name,
  city,
  state,
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
  | "isNativeOnly"
  | "specialties"
  | "photos"
  | "distanceMiles"
  | "verified"
>): React.ReactElement {
  return (
    <article className="nursery-card">
      <LiftCard>
        <Link href={`/nurseries/${slug}`} className="nursery-card__link" aria-label={`View ${name}`}>
          <div className="nursery-card__image">
            {photos[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photos[0]} alt="" />
            ) : (
              <div className="nursery-card__empty">A local source for native life</div>
            )}
          </div>

          <div className="nursery-card__content">
            <div>
              <div className="flex items-start justify-between gap-3">
                <h3 className="nursery-card__title">{name}</h3>
                {verified ? <span className="nursery-card__badge">Verified</span> : null}
              </div>
              <p className="nursery-card__place">
                {city}, {state}
                {distanceMiles !== undefined ? (
                  <span className="ml-2 font-semibold text-[var(--kn-green)]">
                    {distanceMiles < 10 ? `${distanceMiles.toFixed(1)} mi` : `${Math.round(distanceMiles)} mi`}
                  </span>
                ) : null}
              </p>
            </div>

            <div className="nursery-card__chips" aria-label="Nursery specialties">
              <span className={`nursery-card__chip ${isNativeOnly ? "nursery-card__chip--native" : ""}`}>
                {isNativeOnly ? "Native only" : "Native-friendly"}
              </span>
              {specialties.slice(0, 3).map((specialty) => (
                <span key={specialty} className="nursery-card__chip">
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        </Link>
      </LiftCard>
      <div className="nursery-card__save">
        <FavoriteHeart />
      </div>
    </article>
  );
}
