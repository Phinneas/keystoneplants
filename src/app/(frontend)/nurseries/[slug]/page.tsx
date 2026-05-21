import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getNurseryBySlug } from "@/lib/nurseries";

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
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <span
            className={`text-xs px-2 py-0.5 rounded-sm font-medium ${
              nursery.isNativeOnly
                ? "bg-[#3D0C11] text-[#DDFC74]"
                : "bg-[#f8fef3] text-[#6b5b5d] border border-[#e8f5d8]"
            }`}
          >
            {nursery.isNativeOnly ? "Native plants only" : "Native friendly"}
          </span>
          {nursery.verified && (
            <span className="text-xs px-2 py-0.5 rounded-sm bg-[#DDFC74] text-[#3D0C11] font-medium">
              Verified listing
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold text-[#3D0C11]">{nursery.name}</h1>
        <p className="text-[#6b5b5d]">
          {nursery.address && <>{nursery.address}, </>}
          {nursery.city}, {nursery.state} {nursery.zip}
        </p>
      </div>

      {/* Photo */}
      {nursery.photos[0] && (
        <div className="aspect-video rounded-sm overflow-hidden bg-[#f8fef3]">
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
        <p className="text-[#3D0C11] leading-relaxed">{nursery.description}</p>
      )}

      {/* Details */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-[#3D0C11]">Details</h2>
        <dl className="space-y-3 text-sm">
          {nursery.website && (
            <Detail label="Website">
              <a
                href={nursery.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#BF6900] underline hover:text-[#CC5500] transition-colors"
              >
                {nursery.website.replace(/^https?:\/\//, "")}
              </a>
            </Detail>
          )}
          {nursery.phone && (
            <Detail label="Phone">
              <a href={`tel:${nursery.phone}`} className="text-[#BF6900] hover:text-[#CC5500] transition-colors">
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
                    className="text-xs px-2 py-0.5 rounded-sm border border-[#e8f5d8] bg-[#f8fef3] text-[#6b5b5d] capitalize"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Detail>
          )}
        </dl>
      </section>

      <div className="pt-4 border-t border-[#e8f5d8]">
        <a
          href={`/nurseries?zip=${nursery.zip}`}
          className="text-sm text-[#6b5b5d] hover:text-[#3D0C11] transition-colors"
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
      <dt className="w-24 shrink-0 text-[#6b5b5d] font-medium">{label}</dt>
      <dd className="text-[#3D0C11]">{children}</dd>
    </div>
  );
}
