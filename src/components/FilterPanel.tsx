"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const SUN_OPTIONS = [
  { value: "FULL_SUN", label: "Full sun" },
  { value: "PART_SHADE", label: "Part shade" },
  { value: "FULL_SHADE", label: "Full shade" },
];

const MOISTURE_OPTIONS = [
  { value: "DRY", label: "Dry" },
  { value: "MEDIUM", label: "Medium" },
  { value: "WET", label: "Wet" },
];

const TYPE_OPTIONS = [
  { value: "TREE", label: "Tree" },
  { value: "SHRUB", label: "Shrub" },
  { value: "PERENNIAL", label: "Perennial" },
  { value: "GRASS", label: "Grass" },
  { value: "VINE", label: "Vine" },
  { value: "FERN", label: "Fern" },
];

const WILDLIFE_OPTIONS = [
  { value: "HIGH_BEE", label: "High bee value" },
  { value: "MONARCH_HOST", label: "Monarch host" },
  { value: "BUTTERFLY_HOST", label: "Butterfly host" },
  { value: "BIRD_FOOD", label: "Birds" },
  { value: "MOTH_HOST", label: "Moth host" },
  { value: "HUMMINGBIRD", label: "Hummingbirds" },
  { value: "NATIVE_BEE", label: "Native bees" },
];

export function FilterPanel({ zip }: { zip: string }) {
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
      params.set("zip", zip);
      router.push(`/search?${params.toString()}`);
    },
    [router, searchParams, zip]
  );

  function isActive(key: string, value: string) {
    return searchParams.getAll(key).includes(value);
  }

  return (
    <aside className="w-56 shrink-0 space-y-6 text-sm">
      <FilterGroup label="Sun" options={SUN_OPTIONS} filterKey="sun" isActive={isActive} toggle={toggle} />
      <FilterGroup label="Moisture" options={MOISTURE_OPTIONS} filterKey="moisture" isActive={isActive} toggle={toggle} />
      <FilterGroup label="Plant type" options={TYPE_OPTIONS} filterKey="type" isActive={isActive} toggle={toggle} />
      <FilterGroup label="Wildlife value" options={WILDLIFE_OPTIONS} filterKey="wildlife" isActive={isActive} toggle={toggle} />

      <div>
        <p className="font-medium text-stone-700 mb-2">Deer resistant</p>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={searchParams.get("deer") === "true"}
            onChange={(e) => {
              const params = new URLSearchParams(searchParams.toString());
              if (e.target.checked) params.set("deer", "true");
              else params.delete("deer");
              params.set("zip", zip);
              router.push(`/search?${params.toString()}`);
            }}
            className="accent-green-700"
          />
          Only deer-resistant plants
        </label>
      </div>
    </aside>
  );
}

function FilterGroup({
  label,
  options,
  filterKey,
  isActive,
  toggle,
}: {
  label: string;
  options: { value: string; label: string }[];
  filterKey: string;
  isActive: (key: string, value: string) => boolean;
  toggle: (key: string, value: string) => void;
}) {
  return (
    <div>
      <p className="font-medium text-stone-700 mb-2">{label}</p>
      <div className="space-y-1.5">
        {options.map(({ value, label: optLabel }) => (
          <label key={value} className="flex items-center gap-2 cursor-pointer text-stone-600">
            <input
              type="checkbox"
              checked={isActive(filterKey, value)}
              onChange={() => toggle(filterKey, value)}
              className="accent-green-700"
            />
            {optLabel}
          </label>
        ))}
      </div>
    </div>
  );
}
