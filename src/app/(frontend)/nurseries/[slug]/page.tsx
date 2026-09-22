import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { getNurseryBySlug } from "@/lib/nurseries";

export const dynamic = 'force-dynamic'

interface NurseryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: NurseryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const nursery = await getNurseryBySlug(slug);
  if (!nursery) return { title: "Nursery not found" };
  return {
    title: nursery.name,
    description: nursery.description ?? `Native plant nursery in ${nursery.city}, ${nursery.state}`,
  };
}

export default async function NurseryPage({ params }: NurseryPageProps) {
  const { slug } = await params;
  const nursery = await getNurseryBySlug(slug);
  if (!nursery) notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: nursery.name,
        description: nursery.description ?? `Native plant nursery in ${nursery.city}, ${nursery.state}`,
        url: `https://www.keystonenurseries.com/nurseries/${nursery.slug}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: nursery.address ?? undefined,
          addressLocality: nursery.city,
          addressRegion: nursery.state,
          postalCode: nursery.zip,
          addressCountry: "US",
        },
        ...(nursery.phone && { telephone: nursery.phone }),
        ...(nursery.website && { sameAs: nursery.website }),
        ...(nursery.lat && nursery.lng && {
          geo: {
            "@type": "GeoCoordinates",
            latitude: nursery.lat,
            longitude: nursery.lng,
          },
        }),
        ...(nursery.photos[0] && { image: nursery.photos[0] }),
      }} />
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <span
            className={`text-xs px-2 py-0.5 rounded-sm font-medium ${
              nursery.isNativeOnly
                ? "bg-[var(--kn-green-deep)] text-[#DDFC74]"
                : "bg-[var(--kn-surface)] text-[var(--kn-muted)] border border-[var(--kn-line)]"
            }`}
          >
            {nursery.isNativeOnly ? "Native plants only" : "Native friendly"}
          </span>
          {nursery.verified && (
            <span className="text-xs px-2 py-0.5 rounded-sm bg-[#DDFC74] text-[var(--kn-ink)] font-medium">
              Verified listing
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold text-[var(--kn-ink)]">{nursery.name}</h1>
        <p className="text-[var(--kn-muted)]">
          {nursery.address && <>{nursery.address}, </>}
          {nursery.city}, {nursery.state} {nursery.zip}
        </p>
      </div>

      {/* Photo */}
      {nursery.photos[0] && (
        <div className="aspect-video rounded-sm overflow-hidden bg-[var(--kn-surface)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={nursery.photos[0]}
            alt={nursery.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Description */}
      {nursery.description && (
        <p className="text-[var(--kn-ink)] leading-relaxed">{nursery.description}</p>
      )}

      {/* Details */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-[var(--kn-ink)]">Details</h2>
        <dl className="space-y-3 text-sm">
          {nursery.website && (
            <Detail label="Website">
              <a
                href={nursery.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--kn-ochre)] underline hover:text-[var(--kn-ochre-soft)] transition-colors"
              >
                {nursery.website.replace(/^https?:\/\//, "")}
              </a>
            </Detail>
          )}
          {nursery.phone && (
            <Detail label="Phone">
              <a href={`tel:${nursery.phone}`} className="text-[var(--kn-ochre)] hover:text-[var(--kn-ochre-soft)] transition-colors">
                {nursery.phone}
              </a>
            </Detail>
          )}
          {nursery.specialties.length > 0 && (
            <Detail label="Specialties">
              <div className="flex flex-wrap gap-1.5 mt-1">
                {nursery.specialties.map((s) => (
                  <span
                    key={s}
                    className="text-xs px-2 py-0.5 rounded-sm border border-[var(--kn-line)] bg-[var(--kn-surface)] text-[var(--kn-muted)] capitalize"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Detail>
          )}
        </dl>
      </section>

      <div className="pt-4 border-t border-[var(--kn-line)]">
        <a
          href={`/nurseries?zip=${nursery.zip}`}
          className="text-sm text-[var(--kn-muted)] hover:text-[var(--kn-ink)] transition-colors"
        >
          ← More nurseries near {nursery.zip}
        </a>
      </div>
    </div>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <dt className="w-24 shrink-0 text-[var(--kn-muted)] font-medium">{label}</dt>
      <dd className="text-[var(--kn-ink)]">{children}</dd>
    </div>
  );
}
