"use client";

import { useMemo, useState } from "react";

interface SpacingResult {
  area: number;
  spacingIn: number;
  plantCount: number;
  perSqFt: number;
}

function fmtIn(v: number): string {
  const rounded = Math.round(v * 10) / 10;
  return Number.isInteger(rounded) ? rounded.toFixed(0) : rounded.toFixed(1);
}

function fmtFtIn(totalIn: number): string {
  const total = Math.round(totalIn);
  const ft = Math.floor(total / 12);
  const inch = total % 12;
  return `${ft} ft ${inch} in`;
}

export function PlantSpacingCalculator(): React.ReactElement {
  const [length, setLength] = useState("12");
  const [width, setWidth] = useState("4");
  const [count, setCount] = useState("12");

  const result: SpacingResult | null = useMemo(() => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const c = parseInt(count, 10);
    if (!Number.isFinite(l) || !Number.isFinite(w) || !Number.isFinite(c)) return null;
    if (l <= 0 || w <= 0 || c < 1) return null;
    const area = l * w;
    return {
      area,
      spacingIn: Math.sqrt(area / c) * 12,
      plantCount: c,
      perSqFt: c / area,
    };
  }, [length, width, count]);

  const isComplete = length !== "" && width !== "" && count !== "";

  return (
    <div className="psc-calc">
      <div className="psc-calc__grid">
        <label className="psc-field">
          <span className="psc-field__label">Bed length</span>
          <span className="psc-field__unit">
            <input
              className="psc-input"
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              placeholder="12"
              aria-label="Bed length in feet"
            />
            <span className="psc-field__suffix">ft</span>
          </span>
        </label>

        <label className="psc-field">
          <span className="psc-field__label">Bed width</span>
          <span className="psc-field__unit">
            <input
              className="psc-input"
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="4"
              aria-label="Bed width in feet"
            />
            <span className="psc-field__suffix">ft</span>
          </span>
        </label>

        <label className="psc-field">
          <span className="psc-field__label">Number of plants</span>
          <span className="psc-field__unit">
            <input
              className="psc-input"
              type="number"
              inputMode="numeric"
              min="1"
              step="1"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              placeholder="12"
              aria-label="Number of plants"
            />
            <span className="psc-field__suffix">plants</span>
          </span>
        </label>
      </div>

      <div className="psc-result" aria-live="polite">
        {result ? (
          <>
            <p className="psc-result__label">Plant them</p>
            <p className="psc-result__value">{fmtIn(result.spacingIn)} in</p>
            <p className="psc-result__note">≈ {fmtFtIn(result.spacingIn)} · center to center</p>
            <p className="psc-result__meta">
              {result.plantCount} plants across {fmtIn(result.area)} sq ft · about{" "}
              {result.perSqFt.toFixed(2)} plants per sq ft
            </p>
          </>
        ) : (
          <p className="psc-result__empty">
            {isComplete
              ? "Enter a bed size and plant count to see the spacing."
              : "Add a positive length, width, and plant count to see the spacing."}
          </p>
        )}
      </div>
    </div>
  );
}
