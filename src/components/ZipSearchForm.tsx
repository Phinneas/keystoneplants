"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface ZipSearchFormProps {
  defaultZip?: string;
  action?: string; // destination path, defaults to /nurseries
  placeholder?: string;
}

export function ZipSearchForm({
  defaultZip = "",
  action = "/nurseries",
  placeholder = "Enter zip code",
}: ZipSearchFormProps) {
  const [zip, setZip] = useState(defaultZip);
  const [error, setError] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\d{5}$/.test(zip)) {
      setError("Please enter a valid 5-digit zip code.");
      return;
    }
    setError("");
    router.push(`${action}?zip=${zip}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
      <div className="flex w-full max-w-sm gap-2">
        <input
          type="text"
          inputMode="numeric"
          pattern="\d{5}"
          maxLength={5}
          value={zip}
          onChange={(e) => {
            setZip(e.target.value.replace(/\D/g, ""));
            setError("");
          }}
          placeholder={placeholder}
          className="flex-1 rounded-sm border border-[#e8f5d8] px-4 py-3 text-base outline-none focus:border-[#3D0C11] focus:ring-2 focus:ring-[#D3F9B5] transition bg-white text-[#3D0C11]"
          aria-label="Zip code"
        />
        <button
          type="submit"
          className="rounded-sm bg-[#3D0C11] px-6 py-3 text-sm font-medium text-[#DDFC74] hover:bg-[#2d0a0d] transition-colors"
        >
          Search
        </button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
