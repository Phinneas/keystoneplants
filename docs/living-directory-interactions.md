# Living Directory Interactions

The directory now has a **living interaction layer** that turns ordinary browsing into a lightly animated native-plant experience. The implementation is intentionally dependency-free and is mounted once from the shared frontend layout, so it remains usable across the current Next.js and Payload CMS routes.

| Experience | Component or location | Behavior |
|---|---|---|
| Seasonal environment | `LivingEnvironment.tsx` and `globals.css` | Applies spring, summer, autumn, or winter design tokens from the visitor’s current month. |
| Day and night themes | `NightModeToggle` in `LivingEnvironment.tsx` | Supports a persistent visitor-controlled theme toggle, with an evening/system default on the first visit. |
| Root System Scroll | `RootSystemScroll.tsx` | Progressively reveals a decorative root network along large-screen page margins as the visitor scrolls. |
| Dynamic pollinators | `PollinatorField.tsx` | Presents a brief cursor-adjacent bee by day and a moth with fireflies at night. |
| Growth on hover | `NurseryCard.tsx` and `globals.css` | Lets a native foliage illustration emerge when a nursery card is hovered or receives keyboard focus. |
| Seed transitions | `SeedDispersal.tsx` | Briefly disperses milkweed-style seeds before ordinary same-origin navigation. |

## Integration notes

The frontend layout mounts the global components once, directly below the `<body>` element. This means new public pages inherit the seasonal environment, night toggle, root-system layer, pollinator field, and navigation transition without per-page setup. The visible visual system is controlled by CSS custom properties such as `--background`, `--surface`, `--primary`, `--accent`, and `--season-ink`.

> The interactive layers are decorative. They never capture pointer input, change the content hierarchy, or replace standard navigation behavior.

The seed-transition layer only intercepts normal same-origin primary-button clicks. To opt out for a specific link, add `data-disable-seed-transition` to the anchor element. External links, downloads, `target="_blank"` links, modifier-key clicks, and same-page anchor links keep their default browser behavior.

## Accessibility and performance

All animation is disabled when a visitor has `prefers-reduced-motion: reduce` enabled. The nursery-card growth effect also responds to `:focus-within`, so keyboard users receive the same contextual feedback as pointer users. The night-mode control uses an accessible button label and persists the visitor’s choice in `localStorage`.

The root system is hidden below the large-screen breakpoint to preserve space on smaller layouts. The animation work is bounded: scroll and pointer handlers use `requestAnimationFrame`, and the seed layer creates a fixed set of 24 lightweight particles rather than adding DOM elements on each interaction.

## Extending the system

New cards can adopt the hover-growth effect by using the `nursery-card` class and including a `nursery-card-growth` SVG. Additional seasonal palettes belong in `globals.css` under a new `html[data-season="…"]` selector. If a future filter or directory search updates results client-side without a URL change, it can trigger `is-dispersing` on the existing `.seed-dispersal` layer before applying the new result set.
