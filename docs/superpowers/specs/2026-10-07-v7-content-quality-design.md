# V7 Content & Quality Design

## Intent

Evolve the existing V5-inspired personal website into a reliable, three-language site that can accumulate writing and project work. The existing warm blue-and-mint visual language, homepage sequence, music treatment, fireflies, and narrow layout are frozen.

The owner explicitly excludes the proposed live `status` line. Social icons remain on the homepage; only genuine account links are shown. GitHub, Discord, and `chenmiki0925@gmail.com` are the known real contact destinations.

## Scope

### 1. Locale, metadata, and discovery

Create one typed metadata helper that accepts `locale`, `pathname`, title, and description. It must generate a canonical URL for the exact page, plus the three `hreflang` alternates. The `/` entry remains Traditional Chinese; `/zh-TW/` canonicals to `/`; `/en/` and `/ja/` canonical to themselves. Every locale page and future note detail page owns its page-specific metadata rather than inheriting the locale-home canonical.

Add a static sitemap and robots route. Add JSON-LD for the person/site globally and for individual notes on article pages. The site domain is `https://omiki0826o.github.io`.

### 2. Complete UI localisation

Add a typed `i18n/ui.ts` copy dictionary for all short UI strings: navigation-adjacent labels, back links, section subtitles, more links, note labels, player accessibility labels, theme labels, and not-found copy. Components read the dictionary instead of using locale ternaries for UI strings. Content records continue using `LocalizedText`.

### 3. Notes as real content

Replace the notes index’s non-interactive summaries with links to `/[locale]/notes/[slug]/`. Keep the content in typed TypeScript records (not MDX) so each of the three translations stays structurally aligned and static export needs no runtime parser. Seed the two existing notes with concise, factual sections based only on existing project and profile claims; they must not claim unverified events or personal facts. A note page includes return navigation, date/category, headline, lead, readable sections, correct metadata, and Article JSON-LD.

### 4. Project cover assets

Use real material collected from the public GitHub repositories and the currently deployed personal site, never generated art. Store optimized local 5:3 images in `public/assets/projects/` and add a typed image path to each project record. Project card covers render those images with `object-fit: cover`, preserving the existing card composition, filter, colors, and 5:3 crop. If a public repository does not provide an authentic screenshot, use a restrained capture of its public GitHub project surface rather than inventing a mock interface.

### 5. Reliability, performance, and documentation

Add a `test:e2e` script and Playwright static-export checks that exercise all three locale home pages, primary content routes, language URLs, narrow viewport overflow, and theme persistence. Add focused unit tests for the metadata helper and UI dictionary use.

Replace Font Awesome’s runtime stylesheet with local inline SVG icons for GitHub, Discord, and email, then remove the external stylesheet. Email uses `mailto:chenmiki0925@gmail.com`. Replace CSS font `@import` with preconnected stylesheet links in the document head so stylesheets do not block CSS parsing. On touch/small viewports use `background-attachment: scroll`.

Remove packages only after a repository-wide usage check proves they are unused. Keep `@next/mdx` only if there is a near-term MDX migration need; otherwise remove it with the other unused runtime packages. Update README, PROJECT_GUIDE, and the workflow/status document so that they describe zh-TW/en/ja, `npm ci`, current deploy steps, no status line, true social-link policy, and the V5 visual freeze.

## Non-goals

- No palette, font, layout, homepage-order, or component-system redesign.
- No dashboard, status feed, analytics panel, GitHub metrics, generated project art, or placeholder social accounts.
- No fabricated Discord invite; the existing numeric Discord profile URL remains the contact route.
- No CMS, database, or server runtime; static export remains mandatory.

## Acceptance criteria

1. Each generated locale/page URL has an exact canonical and all three alternate language links.
2. English and Japanese expose no Traditional-Chinese fallback UI labels outside authored content that intentionally remains untranslated.
3. Both existing notes can be opened in zh-TW, English, and Japanese, and build as static pages.
4. Every Work card has a local, authentic 5:3 cover image.
5. Home social icons contain only valid real destinations.
6. Unit tests, E2E checks against the exported site, and production build pass in CI.
7. Existing V5 visual appearance and homepage information sequence remain intact.
