import type { Metadata } from "next";
import { Reveal, RevealItem } from "@/components/Reveal";
import { NurseryCard } from "@/components/NurseryCard";
import { ZipSearchForm } from "@/components/ZipSearchForm";
import { getRegionsForZip, isValidZip } from "@/lib/regions";
import { getNurseriesNearZip } from "@/lib/nurseries";

export const dynamic = "force-dynamic";

interface NurserySearchPageProps {
  searchParams: Promise<{
    zip?: string;
    native?: string;
    specialty?: string;
    radius?: string;
  }>;
}

export async function generateMetadata({ searchParams }: NurserySearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  return {
    title: params.zip ? `Native plant nurseries near ${params.zip}` : "Find native plant nurseries",
  };
}

const SPECIALTY_OPTIONS = ["trees", "shrubs", "perennials", "grasses", "prairie", "pollinators", "wetland", "ferns", "vines"];

export default async function NurserySearchPage({ searchParams }: NurserySearchPageProps): Promise<React.ReactElement> {
  const params = await searchParams;
  const zip = params.zip ?? "";
  const radiusMiles = Number(params.radius ?? 100);
  const nativeOnly = params.native === "true";
  const specialty = params.specialty;

  let error: string | null = null;
  let nurseries: Awaited<ReturnType<typeof getNurseriesNearZip>> = [];
  let regionInfo: { state: string } | null = null;
  let userCoords: { lat: number; lng: number } | null = null;

  if (zip) {
    if (!isValidZip(zip)) {
      error = "That doesn't look like a valid ZIP code.";
    } else {
      const region = await getRegionsForZip(zip);
      if (!region) {
        error = `No region data for ZIP code ${zip} yet.`;
      } else {
        regionInfo = { state: region.state };
        if (region.lat && region.lng) {
          userCoords = { lat: region.lat, lng: region.lng };
          nurseries = await getNurseriesNearZip(region.lat, region.lng, radiusMiles, { nativeOnly, specialty });
        } else {
          error = `We don't have coordinates for ZIP code ${zip} yet.`;
        }
      }
    }
  }

  const title = zip && !error
    ? `Nurseries near ${zip}${regionInfo ? `, ${regionInfo.state}` : ""}`
    : "Find native plant nurseries";

  return (
    <div className="directory-page">
      <Reveal>
        <RevealItem>
          <section className="directory-intro" aria-labelledby="directory-title">
            <p className="field-section__eyebrow">Native plant directory</p>
            <h1 id="directory-title">{title}</h1>
            <p className="mt-5 max-w-2xl text-[1.04rem] leading-7 text-[var(--kn-muted)]">
              Search the field guide for growers who can help you plant with your local ecology in mind.
            </p>
            <div className="mt-7 max-w-xl">
              <ZipSearchForm defaultZip={zip} action="/nurseries" />
            </div>
            {error ? <p className="mt-3 text-sm font-medium text-[#a14026]" role="alert">{error}</p> : null}
          </section>
        </RevealItem>
      </Reveal>

      {!zip ? (
        <Reveal className="mt-14 max-w-2xl" amount={0.2}>
          <RevealItem>
            <div className="rounded-2xl border border-[var(--kn-line)] bg-[var(--kn-surface)] p-7">
              <p className="font-[var(--font-fraunces)] text-2xl text-[var(--kn-green)]">Where do you want to grow?</p>
              <p className="mt-2 leading-7 text-[var(--kn-muted)]">A ZIP code lets the guide start with nearby growers, regional conditions, and the nursery communities closest to your landscape.</p>
            </div>
          </RevealItem>
        </Reveal>
      ) : null}

      {zip && !error && userCoords ? (
        <Reveal className="directory-results" amount={0.12} gap={0.14}>
          <RevealItem>
            <aside className="directory-filter" aria-label="Filter nursery search results">
              <FilterGroup label="Growing source">
                <FilterLink href={buildUrl(zip, { native: "", specialty, radius: String(radiusMiles) })} active={!nativeOnly}>All nurseries</FilterLink>
                <FilterLink href={buildUrl(zip, { native: "true", specialty, radius: String(radiusMiles) })} active={nativeOnly}>Native only</FilterLink>
              </FilterGroup>
              <FilterGroup label="Specialty">
                <FilterLink href={buildUrl(zip, { native: nativeOnly ? "true" : "", radius: String(radiusMiles) })} active={!specialty}>All specialties</FilterLink>
                {SPECIALTY_OPTIONS.map((option) => (
                  <FilterLink
                    key={option}
                    href={buildUrl(zip, { native: nativeOnly ? "true" : "", specialty: option, radius: String(radiusMiles) })}
                    active={specialty === option}
                  >
                    {option}
                  </FilterLink>
                ))}
              </FilterGroup>
              <FilterGroup label="Search radius">
                {[25, 50, 100, 200].map((radius) => (
                  <FilterLink
                    key={radius}
                    href={buildUrl(zip, { native: nativeOnly ? "true" : "", specialty, radius: String(radius) })}
                    active={radiusMiles === radius}
                  >
                    {radius} miles
                  </FilterLink>
                ))}
              </FilterGroup>
            </aside>
          </RevealItem>

          <RevealItem>
            <section aria-label="Nursery results">
              {nurseries.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[var(--kn-line)] bg-[var(--kn-surface)] px-7 py-14 text-center">
                  <p className="font-[var(--font-fraunces)] text-2xl text-[var(--kn-green)]">No nurseries found in this range.</p>
                  <p className="mt-2 text-[var(--kn-muted)]">Try expanding your radius or clearing one of the filters.</p>
                  <a className="field-link mt-5 inline-block" href={buildUrl(zip, { radius: "200" })}>Search 200 miles <span aria-hidden>→</span></a>
                </div>
              ) : (
                <>
                  <p className="directory-count">
                    {nurseries.length} nurseri{nurseries.length === 1 ? "y" : "es"} within {radiusMiles} miles
                  </p>
                  <Reveal className="directory-grid" amount={0.08} gap={0.09}>
                    {nurseries.map((nursery) => (
                      <RevealItem key={nursery.id}>
                        <NurseryCard {...nursery} />
                      </RevealItem>
                    ))}
                  </Reveal>
                </>
              )}
            </section>
          </RevealItem>
        </Reveal>
      ) : null}
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }): React.ReactElement {
  return (
    <section className="directory-filter__group">
      <h2 className="directory-filter__label">{label}</h2>
      {children}
    </section>
  );
}

function FilterLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }): React.ReactElement {
  return (
    <a href={href} className={active ? "is-active" : undefined} aria-current={active ? "page" : undefined}>
      {children}
    </a>
  );
}

function buildUrl(zip: string, params: Record<string, string | undefined>): string {
  const search = new URLSearchParams({ zip });
  for (const [key, value] of Object.entries(params)) {
    if (value) search.set(key, value);
  }
  return `/nurseries?${search.toString()}`;
}
