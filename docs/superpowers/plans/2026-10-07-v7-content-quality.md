# V7 Content & Quality Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a visually frozen V5 personal site with correct multilingual metadata, real writing pages, authentic project covers, real contact links, and static-export quality checks.

**Architecture:** Keep authored site data in typed TypeScript modules. Add a metadata builder that owns canonical/alternate URL generation, a UI-copy dictionary for short interface labels, and a dynamic static note route driven by enriched note records. Build and serve `out/` for Playwright checks; no server runtime or visual redesign is introduced.

**Tech Stack:** Next.js 16 static export, React 19, TypeScript, Vitest, Playwright, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-10-07-v7-content-quality-design.md`

## Global Constraints

- Preserve the confirmed V5 blue/mint/firefly visual language, narrow layout, and homepage content sequence.
- Do not render a live status line, placeholder social account, dashboard, or generated project art.
- Keep static export and trailing-slash URLs.
- Use authentic, locally stored 5:3 project cover images from public project/site material.
- Homepage social destinations are GitHub, Discord profile, and mailto email only.

## Review Focus

- Metadata must never canonicalise an English or subpage URL to the Japanese homepage.
- Every localized route must use its own canonical path and expose three alternate language links.
- Article routes must be enumerated during static export for every locale and existing slug.
- A 320px viewport must have no horizontal overflow after navigation and content changes.
- External social icons must remain accessible without loading Font Awesome or another icon CDN.

### Task 1: Establish typed UI copy and metadata foundation

**Files:**
- Create: `i18n/ui.ts`, `lib/metadata.ts`, `tests/metadata.test.ts`, `tests/ui.test.ts`
- Modify: `app/[locale]/layout.tsx`, `app/[locale]/not-found.tsx`, `components/layout/content-page.tsx`, `components/layout/site-header.tsx`, `components/layout/theme-toggle.tsx`, `components/home/music-player.tsx`

**Interfaces:**
- Produces: `ui[locale]` typed UI strings and `buildPageMetadata(input): Metadata`.
- Consumes: `Locale`, `locales`, `profile`, and the public site URL.

- [ ] **Step 1: Write failing metadata and UI-copy tests**

Assert `/en/about/` and `/ja/notes/` receive exact self canonical paths and all three alternates; assert each locale supplies required shared UI strings.

- [ ] **Step 2: Run the focused tests and verify they fail**

Run: `npm test -- tests/metadata.test.ts tests/ui.test.ts`
Expected: FAIL because the modules do not exist.

- [ ] **Step 3: Implement typed `ui` and `buildPageMetadata`**

Use `/` only for Traditional Chinese home; all other paths retain locale prefixes. Set title/description, canonical, and language alternates from the supplied pathname.

- [ ] **Step 4: Migrate short UI labels to `ui[locale]`**

Replace locale ternaries in the named components; do not alter authored project/note/profile content.

- [ ] **Step 5: Run focused and full unit tests**

Run: `npm test`
Expected: PASS.

- [ ] **Step 6: Commit**

Commit message: `補齊三語 UI 與頁面 metadata`

### Task 2: Add discovery routes and structured data

**Files:**
- Create: `app/sitemap.ts`, `app/robots.ts`, `components/seo/json-ld.tsx`
- Modify: `app/layout.tsx`, locale page modules as needed
- Test: `tests/metadata.test.ts`

**Interfaces:**
- Consumes: `buildPageMetadata`, locales, public site URL, and page paths.
- Produces: sitemap entries, robots configuration, Person/WebSite JSON-LD.

- [ ] **Step 1: Extend the failing metadata test**

Assert that the sitemap contains root plus every localized top-level content route and that metadata JSON-LD uses the site URL.

- [ ] **Step 2: Run the focused test and verify it fails**

Run: `npm test -- tests/metadata.test.ts`
Expected: FAIL because sitemap/JSON-LD modules are absent.

- [ ] **Step 3: Implement sitemap, robots, and Person/WebSite JSON-LD**

Keep static URLs only; include GitHub, Discord profile, and email in Person contact/sameAs only when schema fields are appropriate.

- [ ] **Step 4: Run focused and full unit tests**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

Commit message: `補齊 sitemap robots 與結構化資料`

### Task 3: Turn Notes into statically generated article pages

**Files:**
- Modify: `content/types.ts`, `content/notes.ts`, `app/[locale]/notes/page.tsx`, `app/globals.css`
- Create: `app/[locale]/notes/[slug]/page.tsx`, `tests/notes.test.ts`

**Interfaces:**
- Produces: enriched `Note` records with localized sections and `getNote(slug)` lookup.
- Consumes: `Locale`, `localize`, `ui`, and `buildPageMetadata`.

- [ ] **Step 1: Write failing note-route/content tests**

Assert both existing note slugs have aligned zh-TW/en/ja section content, are linkable from the index, and produce static parameters for all locale/slug pairs.

- [ ] **Step 2: Run focused tests and verify they fail**

Run: `npm test -- tests/notes.test.ts`
Expected: FAIL because article sections and route generator are absent.

- [ ] **Step 3: Enrich note records with factual localized sections**

Write concise content only from existing profile/project claims; retain current title, excerpt, date, and category.

- [ ] **Step 4: Implement note list links and `[slug]` page**

Add static params, not-found handling, page-specific metadata, Article JSON-LD, and V5-consistent readable prose styles.

- [ ] **Step 5: Run focused and full unit tests**

Run: `npm test`
Expected: PASS.

- [ ] **Step 6: Commit**

Commit message: `新增三語文章頁`

### Task 4: Add authentic local Work covers and real contact icons

**Files:**
- Create: `public/assets/projects/*.png` or `.jpg`, `components/ui/social-icons.tsx`
- Modify: `content/projects.ts`, `components/home/home-page.tsx`, `app/layout.tsx`, `app/globals.css`, `package.json`, `package-lock.json`
- Test: `tests/content/content.test.ts`, `tests/smoke.test.tsx`

**Interfaces:**
- Produces: project `image` paths and accessible inline social icon components.
- Consumes: publicly accessible project/site material, project records, and real contact URLs.

- [ ] **Step 1: Write failing content/component tests**

Assert every project has a local `/assets/projects/` image path and the homepage has GitHub, Discord profile, and `mailto:chenmiki0925@gmail.com` links without Font Awesome classes or stylesheet URL.

- [ ] **Step 2: Run focused tests and verify they fail**

Run: `npm test -- tests/content/content.test.ts tests/smoke.test.tsx`
Expected: FAIL because images and local icons are absent.

- [ ] **Step 3: Collect and optimize authentic 5:3 captures**

Capture public GitHub repository surfaces for Firefly Bot and Minecraft Backup, and the deployed personal homepage for Miki’s Website. Store each as a local 5:3 raster asset; retain a source note in the content record.

- [ ] **Step 4: Implement project image rendering and local icons**

Render each cover with `img`, `object-fit: cover`, and existing restrained filter. Replace the Font Awesome link/CSS and classes with accessible local SVGs. Add the email icon and preserve GitHub/Discord links only.

- [ ] **Step 5: Remove verified-unused runtime dependencies**

After `rg` confirms no imports, remove unused packages from manifests with npm so lockfile remains valid.

- [ ] **Step 6: Run focused and full unit tests**

Run: `npm test`
Expected: PASS.

- [ ] **Step 7: Commit**

Commit message: `加入真實作品封面與聯絡方式`

### Task 5: Add exported-site E2E quality gate and documentation sync

**Files:**
- Create: `tests/e2e/site.spec.ts`
- Modify: `package.json`, `playwright.config.ts`, `README.md`, `PROJECT_GUIDE.md`, `docs/WORKFLOW.md`, `app/globals.css`
- Test: `tests/e2e/site.spec.ts`

**Interfaces:**
- Consumes: the exported `out/` site and static routes created by prior tasks.
- Produces: `npm run test:e2e` and up-to-date operator documentation.

- [ ] **Step 1: Write E2E checks against the exported static site**

Cover `/`, `/en/`, `/ja/`, all top-level pages, both note paths, language-route URLs, persisted dark theme, no 320px horizontal overflow, and the email/Discord contact links.

- [ ] **Step 2: Run E2E and verify it fails before runner/script support**

Run: `npm run test:e2e`
Expected: FAIL because the script/static serve configuration is absent.

- [ ] **Step 3: Configure static serving and Playwright command**

Build once before E2E and use a local static server for `out/`; do not test `next dev`.

- [ ] **Step 4: Add touch background fallback and synchronize documentation**

Set the fixed background to scroll on touch/small screens. Update docs with three locales, `npm ci`, test/build/E2E/deploy steps, V5 visual freeze, no status line, and genuine contact-link policy.

- [ ] **Step 5: Run final quality gate**

Run: `npm test && npm run build && npm run test:e2e && git diff --check`
Expected: PASS.

- [ ] **Step 6: Commit**

Commit message: `補齊靜態站品質驗證與文件`
