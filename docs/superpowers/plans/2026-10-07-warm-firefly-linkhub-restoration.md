# Warm Firefly Link Hub Restoration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the warm firefly visual identity on a simple Chinese/Japanese Next.js link hub and ship all visual assets reliably.

**Architecture:** Keep the existing static App Router application and content-localization utilities. Consolidate visual tokens and shared navigation around the two supported locales, then render the home page as a focused single-column link hub. Browser assets move to `public/assets`, which Next.js includes in `out` during static export.

**Tech Stack:** Next.js static export, React 19, TypeScript, CSS custom properties, Vitest.

**Spec:** `docs/superpowers/specs/2026-10-07-warm-firefly-linkhub-restoration-design.md`

## Global Constraints

- Support only `zh-TW` and `ja`; `zh-TW` is the default public locale.
- Use clean sans-serif typography only; no display, handwritten, or calligraphic font.
- Reuse pale sky blue, soft mint, apricot, warm lime firefly, and neutral-text tokens.
- Both themes must remain warm: misty daylight and twilight blue-green, never near-black.
- Home stays a centered, mobile-first, single-column link hub.
- Browser-visible assets live in `public/assets/`.
- Respect `prefers-reduced-motion` and use the system cursor on touch devices.

## Review Focus

- A direct request to `/ja/projects` preserves Japanese content and Japanese navigation state.
- The generated static `out/` folder contains the avatar and cursor assets at their root-relative URLs.
- At a 320px viewport, language/theme controls and every link card remain reachable without horizontal scrolling.
- Dark theme uses readable warm contrast rather than a near-black navy surface.
- A touch-only device receives the native cursor because the custom cursor is inside a fine-pointer media query.

---

### Task 1: Restrict the locale model and verify localized routes

**Files:**
- Modify: `i18n/config.ts`
- Modify: `components/layout/locale-switcher.tsx`
- Modify: `app/[locale]/layout.tsx`
- Modify: locale-specific pages and content sources that expose English-only copy
- Test: `tests/content/profile.test.ts`

**Interfaces:**
- Consumes: `locales`, `Locale`, `resolveLocale()` from `i18n/config.ts`.
- Produces: `Locale = 'zh-TW' | 'ja'` and links that preserve the active non-English pathname.

- [ ] **Step 1: Write failing tests for the two supported locale list and Japanese content selection.**
- [ ] **Step 2: Run the targeted content test and confirm it fails against the three-locale configuration.**
- [ ] **Step 3: Change the locale configuration and locale switcher to expose only `zh-TW` and `ja`; remove English static params and public locale links.**
- [ ] **Step 4: Localize headings, notes, and route metadata for both remaining locales.**
- [ ] **Step 5: Run `npm test -- tests/content/profile.test.ts` and confirm it passes.**

### Task 2: Publish avatar and cursor assets correctly

**Files:**
- Create: `public/assets/miki-avatar-2026.jpg`
- Create: `public/assets/cursor-v2.png`
- Modify: `content/profile.ts`
- Modify: `app/globals.css`
- Test: `tests/content/profile.test.ts`

**Interfaces:**
- Consumes: profile `avatar` as a root-relative public asset URL.
- Produces: `/assets/miki-avatar-2026.jpg` and `/assets/cursor-v2.png` in static export output.

- [ ] **Step 1: Add a failing assertion that the configured avatar uses a public root-relative asset path.**
- [ ] **Step 2: Move or copy approved binary assets to `public/assets/` and delete obsolete private-source copies only after verifying their public replacements.**
- [ ] **Step 3: Keep the cursor CSS under `@media (pointer: fine)` with a visible top-left hotspot and system fallbacks.**
- [ ] **Step 4: Run the targeted test and a production build; assert `out/assets/miki-avatar-2026.jpg` and `out/assets/cursor-v2.png` exist.**

### Task 3: Restore warm firefly visual tokens and shared controls

**Files:**
- Modify: `app/globals.css`
- Modify: `components/layout/site-chrome.tsx`
- Modify: `components/layout/theme-toggle.tsx`
- Test: `tests/components/theme-toggle.test.tsx`

**Interfaces:**
- Consumes: `SiteChrome({locale: Locale})` and `ThemeToggle()`.
- Produces: warm light/dark CSS custom-property themes and a compact reachable control row.

- [ ] **Step 1: Add or update a theme-toggle test for accessible control text and light/dark state action.**
- [ ] **Step 2: Run the component test and confirm the intended assertion fails before CSS/control updates.**
- [ ] **Step 3: Replace navy-first and display-font tokens with warm daylight/twilight token sets and a sans-serif stack.**
- [ ] **Step 4: Implement a restrained firefly field through CSS pseudo-elements or a lightweight decorative component; disable motion under `prefers-reduced-motion`.**
- [ ] **Step 5: Size and wrap language/theme controls so they remain usable at 320px.**
- [ ] **Step 6: Run the theme component test and confirm it passes.**

### Task 4: Recompose the home page as the simple link hub

**Files:**
- Modify: `app/[locale]/page.tsx`
- Modify: `components/home/music-card.tsx`
- Modify: `app/globals.css`
- Test: `tests/components/home-page.test.tsx`

**Interfaces:**
- Consumes: `getProfile(locale)`, `getLinkHubItems(locale)`, and `getQuote(locale, random)`.
- Produces: a semantic `<main className="home-shell">` with hero, primary link navigation, optional music cue, and quote.

- [ ] **Step 1: Write a home-page test that checks the avatar alt text, link-hub navigation, and the localized primary cards.**
- [ ] **Step 2: Run the new test and confirm it fails before the layout restoration.**
- [ ] **Step 3: Recompose the hero and link cards to the single-column, tap-first arrangement specified in the design; keep the music cue visually secondary.**
- [ ] **Step 4: Apply only restrained card lift/glow feedback, keyboard focus styling, and reduced-motion alternatives.**
- [ ] **Step 5: Run the home-page test and confirm it passes.**

### Task 5: Verify the shipped site and deployment inputs

**Files:**
- Modify: `.github/workflows/static.yml` only if the static asset/output contract requires it.
- Test: full test suite and static build output inspection.

**Interfaces:**
- Consumes: `npm test`, `npm run build`, and the repository-root Pages workflow.
- Produces: a valid `out/` directory deployable by GitHub Pages.

- [ ] **Step 1: Run `npm test` and require all suites to pass.**
- [ ] **Step 2: Run `npm run build` and require static routes for `zh-TW` and `ja`, with no English route generation.**
- [ ] **Step 3: Inspect `out/` for `assets/miki-avatar-2026.jpg`, `assets/cursor-v2.png`, and both locale home pages.**
- [ ] **Step 4: Run `git diff --check` and inspect the Pages workflow paths relative to the repository root.**
