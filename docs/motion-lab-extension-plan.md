# Motion Lab Field Guide Extension Plan

The route audit identified 14 public pages that require updates to match the approved Motion Lab field-guide art direction. These routes fall into three structural patterns: **Discovery**, **Detail**, and **Editorial**.

## 1. Discovery pattern (Lists and search)
**Routes:** `/plants`, `/ecoregions`, `/states`, `/canada`, `/search`, `/blog`
**Current state:** Generic grids, standard typography, functional but flat presentation.
**Field-guide redesign:**
- Replace standard container headers with the Motion Lab `Reveal` typography pattern.
- Update list cards (PlantCard, RegionCard, BlogCard) to use the `Micro` API (theme-aware surfaces, lift-on-hover, subtle scale).
- Replace utility-class filtering panels with the rounded, thematic field-guide search modules.
- Ensure the `SwayingMeadow` footer anchors all discovery lists.

## 2. Detail pattern (Individual entities)
**Routes:** `/nurseries/[slug]`, `/plants/[slug]`, `/ecoregions/[region]`, `/states/[state]`, `/canada/[province]`
**Current state:** Functional data dumps, stacked content, small utility images.
**Field-guide redesign:**
- Introduce a "Field Note" hero composition: large, immersive imagery (or thematic gradient placeholders where imagery is missing) paired with editorial typography.
- Restructure data tables and attribute lists into distinct field-guide panels using the Motion Lab palette.
- Apply the `SeedDispersal` transition when navigating between detail views and discovery lists.
- Ensure cross-links (e.g., "Nurseries in this state") use the redesigned `Micro` button language.

## 3. Editorial pattern (Long-form and interactive)
**Routes:** `/resources/top-20-keystone-plants`, `/quiz`
**Current state:** Standard blog layouts or functional forms.
**Field-guide redesign:**
- **Top 20:** Treat as a premium editorial feature. Add a cinematic hero, replace standard grids with staggered `Reveal` cards, and use the field-guide typography for long-form reading.
- **Quiz:** Elevate from a functional form to an interactive journey. Use the `Micro` API for selectable cards, apply the `SeedDispersal` transition between questions, and anchor the final recommendation in the Field Note detail pattern.

## Implementation Sequence
1. **Shared components:** Update `PlantCard`, `FilterPanel`, and `PlantQuiz` to use the `Micro` API and Motion Lab palette.
2. **Discovery routes:** Apply the `Reveal` header and updated cards to the listing pages.
3. **Detail routes:** Implement the Field Note hero and structured data panels for individual entities.
4. **Editorial routes:** Redesign the Top 20 guide and Quiz flow.
5. **Validation:** Build, type-check, and visually verify the extended experience before production deployment.

## Local visual validation notes

- **`/plants`**: The field-guide discovery treatment renders with a spacious botanical hero, contextual tags, field-filter panel, and intentional empty-state treatment. The first captured frame briefly showed the existing route-enter overlay; after the transition settled, the full daylight page rendered correctly.
- **`/quiz`**: The redesigned regional-selection content and field-exercise hierarchy are present in the browser accessibility tree. The settled frame confirms that the full field-exercise page renders correctly after the intended route-enter transition.
- **`/search`**: The ZIP search screen settles into a coherent field-guide landing page. Its large editorial headline, ZIP input, primary action, and three-step explanatory cards render correctly in daylight mode.
- **`/states`**: The state atlas renders a legible editorial hero and a responsive, evenly spaced grid of all 50 state field-note cards. The introductory action and state-card link structure are intact.
- **`/states/pa`**: The representative state detail page presents a strong editorial hero, concise ecoregion tags, and a polished zero-listings state with useful next actions. No clipping or hierarchy issues were observed.
- **`/ecoregions`**: The regional atlas has a consistent hero and readable grid of regional guides. Cards preserve the local descriptors, keystone-genera signals, and explicit paths to their corresponding dossiers.
- **`/ecoregions/mid-atlantic`**: The representative regional dossier renders its editorial profile, local ecoregion pills, ranked plant panels, empty-state prompt, and research note hierarchy correctly.
- **`/blog`**: The journal index renders its field-journal hero and deliberate no-articles state with good visual weight and an appropriate plant-quiz pathway.
- **`/canada`**: The Canada atlas renders an editorial northern-field-guide hero, readable provincial cards, and well-integrated US/ZIP discovery links without visual defects.
- **`/canada/on`**: The representative provincial detail page presents its regional context, ecological tags, and a useful contribution-oriented empty state correctly in the shared field-guide system.
- **`/nurseries`**: The primary nursery directory is aligned to the field-guide language, with a clear ZIP-search task and an illustrated lower-page landscape. The settled route has no clipping or layout defects. Its `19103` query state also renders cleanly; the local preview currently reports that regional data for this ZIP is unavailable, so a populated card-list state will be validated against the deployed data source after release.
- **`/resources/top-20-keystone-plants`**: The long-form guide successfully adopts the premium editorial art direction, including the high-contrast title treatment, evidence strip, and spacious scientific-reading hierarchy.

## Post-reset deployment note

- The deployed Worker remains reachable and its Pennsylvania directory correctly exposes four live nursery records, including populated nursery-card links.
- The deployed state route still reflects the prior dark directory presentation rather than the locally validated daylight field-guide redesign. The refreshed source tree must therefore be recovered or reconstructed before deployment; no production update has been made from the reset workspace.
- **Post-recovery `/states/pa` check:** The GitHub-restored Motion Lab branch now renders locally with its transition layer and expected Pennsylvania field-note content. The sandbox has no local nursery records, so this recovery check verifies the zero-listing variant; the earlier live Worker check confirms the corresponding populated-card data path.
- **Post-recovery `/resources/top-20-keystone-plants` check:** The recovered branch retains the approved premium editorial hero, research-stat strip, and long-form reading hierarchy without runtime errors.
- **Production verification:** `pnpm run build` completes successfully with all 25 static routes generated. `pnpm run test:int` completes successfully after moving the backend integration suite from `jsdom` to the Node runtime; the suite verifies Payload user queries against the configured local bindings.
