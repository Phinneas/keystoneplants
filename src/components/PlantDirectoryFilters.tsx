"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { ECOREGIONS, ECOREGION_GROUPS } from "@/lib/ecoregions";

const WILDLIFE_OPTIONS = [
  { value: "HIGH_BEE",        label: "High bee value" },
  { value: "MONARCH_HOST",    label: "Monarch host" },
  { value: "BUTTERFLY_HOST",  label: "Butterfly host" },
  { value: "BIRD_FOOD",       label: "Birds" },
  { value: "MOTH_HOST",       label: "Moth host" },
  { value: "HUMMINGBIRD",     label: "Hummingbirds" },
  { value: "NATIVE_BEE",      label: "Native bees" },
];

const SUN_OPTIONS = [
  { value: "FULL_SUN",    label: "Full sun" },
  { value: "PART_SHADE",  label: "Part shade" },
  { value: "FULL_SHADE",  label: "Full shade" },
];

const MOISTURE_OPTIONS = [
  { value: "DRY",    label: "Dry" },
  { value: "MEDIUM", label: "Medium" },
  { value: "WET",    label: "Wet" },
];

const TYPE_OPTIONS = [
  { value: "TREE",       label: "Tree" },
  { value: "SHRUB",      label: "Shrub" },
  { value: "PERENNIAL",  label: "Perennial" },
  { value: "GRASS",      label: "Grass" },
  { value: "VINE",       label: "Vine" },
  { value: "FERN",       label: "Fern" },
];

export function PlantDirectoryFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const toggle = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const existing = params.getAll(key);
      if (existing.includes(value)) {
        params.delete(key);
        existing.filter((v) => v !== value).forEach((v) => params.append(key, v));
      } else {
        params.append(key, value);
      }
      router.push(`/plants?${params.toString()}`);
    },
    [router, searchParams]
  );

  function isActive(key: string, value: string) {
    return searchParams.getAll(key).includes(value);
  }

  function clearAll() {
    router.push("/plants");
  }

  const hasFilters = searchParams.toString().length > 0;

  return (
    <aside className="w-56 shrink-0 space-y-6 text-sm">
      {hasFilters && (
        <button
          onClick={clearAll}
          className="text-xs text-[#BF6900] underline hover:text-[#CC5500] transition-colors"
        >
          Clear all filters
        </button>
      )}

      {/* Ecoregion */}
      <div>
        <p className="font-semibold text-[#3D0C11] mb-2">Ecoregion</p>
        <div className="space-y-3">
          {ECOREGION_GROUPS.map((group) => {
            const options = ECOREGIONS.filter((e) => e.region === group);
            return (
              <div key={group}>
                <p className="text-[#6b5b5d] font-medium mb-1">{group}</p>
                <div className="space-y-1 pl-2">
                  {options.map(({ code, name }) => (
                    <label key={code} className="flex items-start gap-2 cursor-pointer text-[#6b5b5d] hover:text-[#3D0C11] transition-colors leading-snug">
                      <input
                        type="checkbox"
                        checked={isActive("eco", code)}
                        onChange={() => toggle("eco", code)}
                        className="mt-0.5 accent-[#3D0C11] shrink-0"
                      />
                      <span>{name}</span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Wildlife */}
      <div>
        <p className="font-semibold text-[#3D0C11] mb-2">Wildlife supported</p>
        <div className="space-y-1.5">
          {WILDLIFE_OPTIONS.map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2 cursor-pointer text-[#6b5b5d] hover:text-[#3D0C11] transition-colors">
              <input
                type="checkbox"
                checked={isActive("wildlife", value)}
                onChange={() => toggle("wildlife", value)}
                className="accent-[#3D0C11]"
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Sun */}
      <div>
        <p className="font-semibold text-[#3D0C11] mb-2">Sun</p>
        <div className="space-y-1.5">
          {SUN_OPTIONS.map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2 cursor-pointer text-[#6b5b5d] hover:text-[#3D0C11] transition-colors">
              <input
                type="checkbox"
                checked={isActive("sun", value)}
                onChange={() => toggle("sun", value)}
                className="accent-[#3D0C11]"
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Moisture */}
      <div>
        <p className="font-semibold text-[#3D0C11] mb-2">Moisture</p>
        <div className="space-y-1.5">
          {MOISTURE_OPTIONS.map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2 cursor-pointer text-[#6b5b5d] hover:text-[#3D0C11] transition-colors">
              <input
                type="checkbox"
                checked={isActive("moisture", value)}
                onChange={() => toggle("moisture", value)}
                className="accent-[#3D0C11]"
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Plant type */}
      <div>
        <p className="font-semibold text-[#3D0C11] mb-2">Plant type</p>
        <div className="space-y-1.5">
          {TYPE_OPTIONS.map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2 cursor-pointer text-[#6b5b5d] hover:text-[#3D0C11] transition-colors">
              <input
                type="checkbox"
                checked={isActive("type", value)}
                onChange={() => toggle("type", value)}
                className="accent-[#3D0C11]"
              />
              {label}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
