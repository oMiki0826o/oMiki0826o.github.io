# V5 Quality Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Polish the existing V5 site for language completeness, reading hierarchy, accessibility and stable responsive presentation.

**Architecture:** Extend the current content and `ui` data layers with localized category and reading-time helpers. Reuse the existing Notes and ContentPage components, adding only small presentational components/styles. Keep static routes and data flow unchanged.

**Tech Stack:** Next.js static export, React, TypeScript, Vitest, Playwright, CSS.

**Spec:** `docs/superpowers/specs/2026-10-07-v5-quality-pass-design.md`

## Global Constraints

- Preserve the existing V5 palette, dark theme and compact personal-site layout.
- Do not add runtime dependencies.
- All new UI copy must exist in zh-TW, English and Japanese.
- Respect `prefers-reduced-motion` and work at 320px width.

## Review Focus

- A Notes filter must retain a usable featured/list view when only one matching entry exists.
- Dates must have valid `dateTime` attributes while display copy remains localized.
- Reading time must never show zero minutes for a populated article.
- Home project layout must remain balanced for two items and still work if later data adds more.
- English and Japanese note content must not retain the superseded story/copy.

### Task 1: Localized Notes metadata

**Files:**
- Modify: `i18n/ui.ts`, `lib/content.ts`, `content/notes.ts`, `tests/notes.test.ts`, `tests/ui.test.ts`

- [ ] Write failing tests for localized categories, date display and non-zero reading time.
- [ ] Run the focused tests and observe the expected failures.
- [ ] Add content helpers and three-language UI data; update the two older Notes to match current zh-TW content.
- [ ] Run focused tests and commit the metadata/content task.

### Task 2: Editorial Notes and About presentation

**Files:**
- Modify: `app/[locale]/notes/page.tsx`, `app/[locale]/notes/[slug]/page.tsx`, `app/[locale]/about/page.tsx`, `app/globals.css`
- Test: `tests/notes.test.ts`, `tests/smoke.test.tsx`

- [ ] Write failing rendering tests for Notes metadata and profile section markup.
- [ ] Run focused tests and observe expected failures.
- [ ] Add category navigation, metadata presentation and semantic About structure without changing routes.
- [ ] Run focused tests and commit the presentation task.

### Task 3: Responsive, accessibility and interaction refinement

**Files:**
- Modify: `app/globals.css`, `tests/e2e/site.spec.ts`

- [ ] Write a failing E2E assertion for Notes filter/navigation and two-card desktop layout.
- [ ] Run the targeted E2E spec and observe expected failure.
- [ ] Apply colour-token, spacing, project-grid and low-motion refinements.
- [ ] Run targeted E2E and commit the refinement task.

### Task 4: Full quality gate and deployment

**Files:**
- Modify only generated-file cleanup if needed: `next-env.d.ts`

- [ ] Restore unrelated generated-file drift.
- [ ] Run `npm test`, `npm run build` and `npm run test:e2e`.
- [ ] Review the final diff, commit the completed pass and push `main`.
