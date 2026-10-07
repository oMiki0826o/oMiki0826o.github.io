# V5 Detail System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add refined navigation, reading, motion and discovery interactions while preserving the existing V5 visual identity.

**Architecture:** Build small client-side interaction components around the existing static Next.js content pages. CSS remains token-driven in `app/globals.css`; content, locale routing and ripmiki’s independent experience remain unchanged.

**Tech Stack:** Next.js 16 static export, React 19, TypeScript, CSS, Vitest, Playwright.

**Spec:** `docs/superpowers/specs/2026-10-07-v5-detail-system-design.md`

## Global Constraints

- Preserve the light-blue, mint, warm-firefly V5 visual language and the existing content model.
- Do not add a backend, analytics, UI framework or runtime third-party dependency.
- Keep ripmiki visually and behaviorally independent from the main site.
- Respect `prefers-reduced-motion`; content must never remain hidden without animation support.
- Support 320px mobile through desktop with no horizontal overflow.
- Final verification runs once: unit tests, static build, E2E and `git diff --check`.

## Review Focus

- Keyboard-only navigation: Escape closes the drawer and focus does not become trapped behind it; Task 2 E2E covers this.
- JavaScript-free/unsupported animation environments: all reveal targets remain readable; Task 3 unit coverage checks the non-observer state.
- Short article pages: reading progress is finite and the return control does not cover footer text; Task 4 browser coverage checks visibility thresholds.
- Touch devices: image effects do not rely on hover and all controls remain within the viewport at 320px; Task 5 E2E covers it.
- Separate ripmiki route: its page does not acquire the main-site progress/reveal/click effects; Task 6 checks route isolation.

---

### Task 1: Preserve the current content and navigation corrections

**Files:**
- Modify: `components/layout/site-header.tsx`
- Modify: `content/profile.ts`
- Modify: `content/notes.ts`
- Test: `tests/site-header.test.tsx`
- Test: `tests/content/content.test.ts`
- Test: `tests/notes.test.ts`

**Interfaces:**
- Consumes: existing `ui[locale].navigation`, `profile.aboutDetails`, `notes` exports.
- Produces: a committed, tested baseline with the centered `Miki` header, portable personal profile copy and public research article copy free of editorial-facing disclaimers.

- [ ] **Step 1: Confirm baseline test coverage includes the centered-menu affordance, profile Japanese-learning text, and public research article text**

- [ ] **Step 2: Run the targeted tests to verify the current correction set passes**

Run: `npm test -- tests/site-header.test.tsx tests/content/content.test.ts tests/notes.test.ts`
Expected: PASS.

- [ ] **Step 3: Commit the completed baseline corrections**

```bash
git add app/'[locale]'/about/page.tsx app/globals.css components/layout/site-header.tsx content/notes.ts content/profile.ts i18n/ui.ts tests/content/content.test.ts tests/e2e/site.spec.ts tests/notes.test.ts tests/site-header.test.tsx
git commit -m "調整導覽與個人介紹"
```

### Task 2: Accessible navigation drawer

**Files:**
- Modify: `components/layout/site-header.tsx`
- Modify: `i18n/ui.ts`
- Modify: `app/globals.css`
- Test: `tests/site-header.test.tsx`
- Test: `tests/e2e/site.spec.ts`

**Interfaces:**
- Consumes: `SiteHeader({locale}: {locale: Locale})` and localised navigation copy.
- Produces: a `SiteHeader` drawer which closes on Escape, overlay click and route selection, and identifies the current route with `aria-current="page"`.

- [ ] **Step 1: Add failing header and browser tests for Escape, current-page state, and overlay close**

- [ ] **Step 2: Run the targeted header test to verify it fails**

Run: `npm test -- tests/site-header.test.tsx`
Expected: FAIL because the drawer does not yet expose the required close behavior.

- [ ] **Step 3: Implement drawer state, document Escape handling and current-path labelling in `SiteHeader`**

Keep the header grid and V5 controls unchanged; use a semantic button, navigation and overlay.

- [ ] **Step 4: Add token-based drawer, overlay, focus and touch CSS**

- [ ] **Step 5: Run target tests and commit**

Run: `npm test -- tests/site-header.test.tsx && npm run test:e2e -- --grep "menu"`
Expected: PASS.

### Task 3: Shared reveal and timeline fallback

**Files:**
- Create: `components/ui/scroll-reveal.tsx`
- Modify: `components/home/home-page.tsx`
- Modify: `components/layout/content-page.tsx`
- Modify: `app/globals.css`
- Test: `tests/scroll-reveal.test.tsx`
- Test: `tests/e2e/site.spec.ts`

**Interfaces:**
- Produces: `ScrollReveal({children, className?}: PropsWithChildren<{className?: string}>)` which applies its visible state only after browser capability checks.
- Consumes: server-rendered sections and the existing `timeline-reveal` class.

- [ ] **Step 1: Write failing tests for observer activation and immediate visibility when motion is reduced or the observer is unavailable**

- [ ] **Step 2: Run the new unit test to verify it fails**

Run: `npm test -- tests/scroll-reveal.test.tsx`
Expected: FAIL because `ScrollReveal` does not exist.

- [ ] **Step 3: Implement `ScrollReveal` with `IntersectionObserver` and safe fallback behavior**

- [ ] **Step 4: Mark home and content-page visual sections as reveal targets and add restrained CSS transitions**

- [ ] **Step 5: Run target tests and commit**

Run: `npm test -- tests/scroll-reveal.test.tsx && npm run test:e2e -- --grep "reveal"`
Expected: PASS.

### Task 4: Article reading affordances

**Files:**
- Create: `components/ui/reading-progress.tsx`
- Create: `components/ui/back-to-top.tsx`
- Modify: `app/[locale]/notes/[slug]/page.tsx`
- Modify: `app/globals.css`
- Test: `tests/reading-tools.test.tsx`
- Test: `tests/e2e/site.spec.ts`

**Interfaces:**
- Produces: `ReadingProgress()` and `BackToTop({label}: {label: string})` client components that derive state only from the current document.
- Consumes: note-detail route and localised UI copy for accessible labels.

- [ ] **Step 1: Add failing component tests for zero-height-safe progress values and the return control visibility threshold**

- [ ] **Step 2: Run target tests to verify they fail**

Run: `npm test -- tests/reading-tools.test.tsx`
Expected: FAIL because the components do not exist.

- [ ] **Step 3: Implement reading progress and return control with reduced-motion behavior**

- [ ] **Step 4: Compose them only in note detail pages and style as restrained page furniture**

- [ ] **Step 5: Run target tests and commit**

Run: `npm test -- tests/reading-tools.test.tsx && npm run test:e2e -- --grep "article"`
Expected: PASS.

### Task 5: Firefly interaction and tactile polish

**Files:**
- Modify: `components/ui/fireflies.tsx`
- Modify: `components/layout/site-chrome.tsx`
- Modify: `app/globals.css`
- Test: `tests/fireflies.test.tsx`
- Test: `tests/e2e/site.spec.ts`

**Interfaces:**
- Consumes: existing `Fireflies` background component and main `SiteChrome` only.
- Produces: a bounded, pointer-safe firefly burst on empty background space and refined hover/focus/active feedback for supported input types.

- [ ] **Step 1: Write failing tests proving interactive bursts use bounded coordinates and never render on the ripmiki page**

- [ ] **Step 2: Run the firefly test to verify it fails**

Run: `npm test -- tests/fireflies.test.tsx`
Expected: FAIL because interactive bursts are not implemented.

- [ ] **Step 3: Add a bounded transient-light state to `Fireflies` and attach it only through `SiteChrome`**

- [ ] **Step 4: Add hover-capable-only image/card lift and touch active CSS; preserve reduced-motion override**

- [ ] **Step 5: Run target tests and commit**

Run: `npm test -- tests/fireflies.test.tsx && npm run test:e2e -- --grep "mobile|ripmiki"`
Expected: PASS.

### Task 6: Final quality gate and delivery

**Files:**
- Modify: `tests/e2e/site.spec.ts`
- Modify: `README.md`

**Interfaces:**
- Consumes: all features from Tasks 1–5.
- Produces: a documented interaction inventory and one full verification result suitable for deployment.

- [ ] **Step 1: Add E2E coverage for three locales, navigation close paths, article affordances, motion fallback, 320px layout and ripmiki isolation**

- [ ] **Step 2: Update README with the non-obvious interaction and accessibility behavior**

- [ ] **Step 3: Run the one complete final verification**

Run: `npm test && npm run build && npm run test:e2e && git diff --check`
Expected: all commands exit 0.

- [ ] **Step 4: Commit the interaction system and push `main`**

```bash
git add app components content i18n lib tests README.md docs/superpowers
git commit -m "完善網站互動細節"
git push origin main
```

## Self-Review

- Spec coverage: Tasks 2–5 respectively cover navigation, homepage motion/timeline fallback, reading, and the firefly easter egg; Task 6 covers the required full quality gate.
- Type consistency: all newly named components have explicit props and are used only from stated routes/layouts.
- Review focus coverage: each listed failure condition is assigned to the indicated task’s tests.
- Scope: no content model, backend, external library, visual-system rewrite or ripmiki redesign is included.
