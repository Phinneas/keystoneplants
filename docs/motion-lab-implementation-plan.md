# Keystone Nurseries Motion Lab Implementation Plan

This document translates the supplied **Keystone Motion** design package into the existing Next.js, Payload, Tailwind, and Cloudflare Workers application. The package is the visual and interaction source of truth for this redesign.

## Visual direction

The redesigned experience should read as a contemporary **native-plant field guide**, not as a generic directory. It uses a warm paper base, deep botanical greens, ochre highlights, and restrained terracotta accents. Display typography is Fraunces; body typography is Inter. The atmosphere is editorial, tactile, and calm, with motion used to reveal content and reward exploration rather than constantly compete for attention.

| Design token | Approved value | Intended role |
|---|---:|---|
| Paper | `#FBF7EE` | Primary page background |
| Ink | `#23291F` | Primary text |
| Botanical green | `#2E4A35` | Header, controls, major anchors |
| Deep green | `#16271B` | High-contrast route wipe and rich background moments |
| Ochre | `#C98A3B` | Calls to action and active emphasis |
| Terracotta | `#B5532F` | Saved state and map-pin accent |
| Display font | Fraunces | Headlines and botanical identity |
| Body font | Inter | Navigation, filters, utility content |

## Motion language

The approved movement system has four tiers. Every motion treatment must fall back to a stable, visible state when `prefers-reduced-motion` is active.

| Tier | Approved behavior | Primary placement |
|---|---|---|
| Arrival | A hero image develops from soft blur to focus while its headline rises word by word. | Homepage hero |
| Ambient | A butterfly follows a slow flight path; the meadow gently sways. | Hero and footer/dividers |
| Discovery | Sections and directory cards reveal in staggered, settled groups; map pins drop into place. | Homepage sections and directory result grid |
| Touch | Buttons ripple on press, cards lift on hover, saved items pop with a small spark burst, navigation gains a growing underline, and search expands on focus. | Shared controls |
| Navigation | A leaf-green enter-side wipe masks route changes, with a seed-to-sprout loader for loading states. | App Router template and loading UI |

## Integration decisions

1. Install and use `framer-motion` rather than adding ad-hoc CSS/JavaScript animation logic.
2. Move the supplied motion utilities and components into the application’s `src` structure, preserving the repository path alias.
3. Import the supplied motion stylesheet from the frontend global layout, then reconcile it with the existing site stylesheet.
4. Replace the current minimal homepage with the supplied image-led hero composition, integrated with the real ZIP-code directory search.
5. Replace the current header wordmark/navigation treatment with the grow-in logo and underlined navigation links.
6. Use the supplied reveal and lift patterns for directory listings, without changing existing Payload schema or search URLs.
7. Adopt the supplied route template and loader, which are appropriate for the Next.js App Router.
8. Retire or disable the earlier experimental global effects where they conflict with the approved Motion Lab system; the approved design package takes precedence.

## Content and asset requirement

The design package expects a hero meadow image. The existing repository does not contain a suitable locally stored public image asset, so the implementation should either use an approved existing Keystone Plants image URL or add a user-owned botanical image before final production release. The page structure and motion can be implemented independently of that asset decision.

## Acceptance criteria

The redesign is complete when the production homepage has the specified hero, header, typography, palette, and motion behavior; directory cards use the approved discovery/touch interactions; route transitions and loading states work; controls remain usable with keyboard navigation and reduced motion; and the public site remains functional on mobile and desktop.
