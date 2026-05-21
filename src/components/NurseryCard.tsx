import Link from "next/link";
import type { ParsedNursery } from "@/lib/nurseries";

export function NurseryCard({
  slug,
  name,
  city,
  state,
  website,
  isNativeOnly,
  specialties,
  photos,
  distanceMiles,
  verified,
}: Pick<ParsedNursery, "slug" | "name" | "city" | "state" | "website" | "isNativeOnly" | "specialties" | "photos" | "distanceMiles" | "verified">) {
  return (
    <Link
      href={`/nurseries/${slug}`}
      className="group flex flex-col rounded-sm border border-[#e8f5d8] bg-white overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="aspect-[16/9] bg-[#f8fef3] overflow-hidden">
        {photos[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photos[0]}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[#6b5b5d] text-sm">No photo</span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-[#3D0C11] group-hover:underline decoration-[#DDFC74] decoration-2 underline-offset-2 transition-all leading-tight">
              {name}
            </h3>
            <p className="text-sm text-[#6b5b5d] mt-0.5">
              {city}, {state}
              {distanceMiles !== undefined && (
                <span className="ml-2 text-[#3D0C11] font-medium">
                  {distanceMiles < 10
                    ? `${distanceMiles.toFixed(1)} mi`
                    : `${Math.round(distanceMiles)} mi`}
                </span>
              )}
            </p>
          </div>
          {verified && (
            <span className="text-xs px-2 py-0.5 rounded-sm bg-[#DDFC74] text-[#3D0C11] font-medium shrink-0">
              Verified
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1 mt-auto">
          <span
            className={`text-xs px-2 py-0.5 rounded-sm border font-medium ${
              isNativeOnly
                ? "bg-[#3D0C11] text-[#DDFC74] border-[#3D0C11]"
                : "bg-[#f8fef3] text-[#6b5b5d] border-[#e8f5d8]"
            }`}
          >
            {isNativeOnly ? "Native only" : "Native friendly"}
          </span>
          {specialties.slice(0, 3).map((s) => (
            <span
              key={s}
              className="text-xs px-2 py-0.5 rounded-sm border border-[#e8f5d8] bg-[#f8fef3] text-[#6b5b5d] capitalize"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
