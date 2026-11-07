"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { RippleButton } from "@/components/micro/Micro";

interface ZipSearchFormProps {
  defaultZip?: string;
  action?: string;
  placeholder?: string;
}

export function ZipSearchForm({
  defaultZip = "",
  action = "/nurseries",
  placeholder = "Enter a 5-digit ZIP code",
}: ZipSearchFormProps): React.ReactElement {
  const [zip, setZip] = useState(defaultZip);
  const [error, setError] = useState("");
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (!/^\d{5}$/.test(zip)) {
      setError("Please enter a valid 5-digit ZIP code.");
      return;
    }

    setError("");
    router.push(`${action}?zip=${zip}`);
  }

  return (
    <form onSubmit={handleSubmit} className="zip-search" noValidate>
      <div className="zip-search__row">
        <input
          type="text"
          inputMode="numeric"
          pattern="\d{5}"
          maxLength={5}
          value={zip}
          onChange={(event) => {
            setZip(event.target.value.replace(/\D/g, ""));
            setError("");
          }}
          placeholder={placeholder}
          className="zip-search__input"
          aria-label="ZIP code"
          aria-describedby={error ? "zip-search-error" : undefined}
        />
        <RippleButton type="submit" className="zip-search__button">
          Find nurseries
        </RippleButton>
      </div>
      {error ? (
        <p id="zip-search-error" className="zip-search__error" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
