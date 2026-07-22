"use client";

import { useEffect, useState, type ReactElement } from "react";

type ThemeMode = "day" | "night";
type Season = "spring" | "summer" | "autumn" | "winter";

const THEME_STORAGE_KEY = "keystone-theme-mode";

function getCurrentSeason(date = new Date()): Season {
  const month = date.getMonth();

  if (month >= 2 && month <= 4) return "spring";
  if (month >= 5 && month <= 7) return "summer";
  if (month >= 8 && month <= 10) return "autumn";
  return "winter";
}

function getSuggestedTheme(): ThemeMode {
  const hour = new Date().getHours();
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;

  return prefersDark || hour >= 19 || hour < 6 ? "night" : "day";
}

function applyTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme === "night" ? "dark" : "light";
}

/**
 * Mount once in the frontend layout. It sets the current seasonal palette and
 * uses a remembered preference (or evening/system preference) for night mode.
 */
export function LivingEnvironment(): null {
  useEffect(() => {
    document.documentElement.dataset.season = getCurrentSeason();

    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const theme: ThemeMode = storedTheme === "day" || storedTheme === "night" ? storedTheme : getSuggestedTheme();
    applyTheme(theme);
  }, []);

  return null;
}

export function NightModeToggle(): ReactElement {
  const [theme, setTheme] = useState<ThemeMode>("day");

  useEffect(() => {
    const currentTheme = document.documentElement.dataset.theme;
    setTheme(currentTheme === "night" ? "night" : "day");
  }, []);

  const isNight = theme === "night";

  function toggleTheme() {
    const nextTheme: ThemeMode = isNight ? "day" : "night";
    applyTheme(nextTheme);
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    setTheme(nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isNight}
      aria-label={isNight ? "Switch to daylight theme" : "Switch to night theme"}
      title={isNight ? "Switch to daylight theme" : "Switch to night theme"}
      className="field-theme-toggle relative inline-flex shrink-0 items-center justify-center overflow-hidden transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kn-ochre)]"
    >
      <span className="sr-only">{isNight ? "Daylight theme enabled" : "Night theme enabled"}</span>
      {isNight ? (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="3.5" />
          <path d="M12 2.5v2M12 19.5v2M21.5 12h-2M4.5 12h-2M18.72 5.28l-1.42 1.42M6.7 17.3l-1.42 1.42M18.72 18.72l-1.42-1.42M6.7 6.7 5.28 5.28" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M20.4 15.1A8.25 8.25 0 0 1 8.9 3.6 8.25 8.25 0 1 0 20.4 15.1Z" />
          <path d="m16.8 4 .25.72L17.8 5l-.75.28L16.8 6l-.25-.72L15.8 5l.75-.28.25-.72Z" fill="currentColor" stroke="none" />
        </svg>
      )}
    </button>
  );
}
