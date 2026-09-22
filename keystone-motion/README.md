# Keystone Nurseries — Motion Components (Next.js + Framer Motion)

Production-ready animation components for the Keystone homepage, matching the approved **Motion Lab**. Built for the confirmed stack: **Next.js App Router + Payload CMS**, using **Framer Motion**. Everything honors `prefers-reduced-motion`.

> The **sprout counters** specimen was intentionally left out per your call. Everything else from the Lab is here.

---

## 1. Install

```bash
npm i framer-motion
# or: pnpm add framer-motion / yarn add framer-motion
```

Framer Motion ≥ 11 (also published as the `motion` package — imports here use `framer-motion`, the most common name; swap if you prefer `motion/react`).

## 2. Drop the files in

```
lib/motion.ts                     ← shared easings / durations / variants
components/
  LogoGrowIn.tsx                  ← 01 header logo
  Hero.tsx                        ← 02 hero entrance + butterfly + parallax
  SwayingMeadow.tsx               ← 03 ambient meadow (Server Component, CSS)
  MapPins.tsx                     ← 05 nursery pin-drop overlay
  Reveal.tsx                      ← 06 scroll-reveal wrappers (use everywhere)
  Loader.tsx                      ← 08a seedling loader (Server Component, CSS)
  micro/Micro.tsx                 ← 07 RippleButton/LiftCard/FavoriteHeart/NavLink/SearchField
app/
  loading.tsx                     ← 08a route loading UI (uses Loader)
  template.tsx                    ← 08b route-change leaf wipe
styles/keystone-motion.css        ← all supporting CSS (import once, globally)
```

Paths assume the `@/*` import alias (the Next.js default in `tsconfig.json`). Adjust imports if your alias differs.

## 3. Global setup

Import the stylesheet once (e.g. in `app/layout.tsx`):

```tsx
import "@/styles/keystone-motion.css";
```

The CSS defaults to the Field Guide palette via `--kn-*` custom properties — **remap them to your existing design tokens** at the top of `keystone-motion.css` if you have them. Fonts referenced: **Fraunces** (display) + **Inter** (body); load them however you already do (next/font recommended).

---

## 4. Usage

**01 · Logo (header)**
```tsx
import { LogoGrowIn } from "@/components/LogoGrowIn";
// <header><LogoGrowIn /> …nav… </header>
```

**02 · Hero**
```tsx
import { Hero } from "@/components/Hero";

<Hero
  image="/images/hero-meadow.jpg"
  words={["Plant", "what", "belongs", "here."]}
  sub="Find nurseries near you that grow real natives — one yard at a time."
  ctaLabel="Find nurseries"
  ctaHref="/nurseries"
/>
```

**03 · Swaying meadow (footer flourish)**
```tsx
import { SwayingMeadow } from "@/components/SwayingMeadow";
// <SwayingMeadow /> just above the footer
```

**06 · Scroll reveal — wrap any grid/section**
```tsx
import { Reveal, RevealItem } from "@/components/Reveal";

<Reveal className="grid grid-cols-3 gap-5">
  {nurseries.map((n) => (
    <RevealItem key={n.id}><NurseryCard data={n} /></RevealItem>
  ))}
</Reveal>
```

**05 · Map pins (overlay your map)** — `x`/`y` are percentages inside the map box. Convert Payload lat/lng with whatever projection your map uses.
```tsx
import { MapPins, type Pin } from "@/components/MapPins";

const pins: Pin[] = nurseries.map((n) => ({ id: n.id, x: n.mapX, y: n.mapY, tone: "green", label: n.name }));
// <div style={{ position: "relative" }}> <YourMap/> <MapPins pins={pins} /> </div>
```

**07 · Micro-interactions**
```tsx
import { RippleButton, LiftCard, FavoriteHeart, NavLink, SearchField } from "@/components/micro/Micro";
```

**08 · Loader + route wipe** — `app/loading.tsx` and `app/template.tsx` are wired automatically by the App Router; just place the files. `template.tsx` plays an enter-side leaf wipe on every navigation.

---

## 5. Notes

- **Reduced motion:** every component checks `useReducedMotion()` (or a CSS media query) and resolves to a static, fully-visible state. Nothing to configure.
- **Performance:** animations touch only `transform`/`opacity` (GPU-friendly, no layout thrash). `Reveal` fires once (`viewport={{ once: true }}`).
- **Payload:** these are presentational/front-end only — no schema changes. The only data-driven piece is `MapPins` (feed it your nursery collection).
- **Tailwind / CSS Modules:** components use plain class names from `keystone-motion.css`. If you're on Tailwind, you can replace those classes with utilities — the motion logic (props/variants) stays identical.
- **App Router caveat:** true *exit* animations for an outgoing route aren't natively supported; `template.tsx` uses a robust enter-side wipe instead (documented inline).
