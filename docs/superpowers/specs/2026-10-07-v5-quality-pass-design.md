# V5 Quality Pass — Design

## Goal

Keep Miki's existing soft blue, mint and firefly visual language while making the site easier to read, more complete across three languages, and more reliable as a static Next.js site.

## Constraints

- Preserve the V5 visual direction and the compact, personal-site homepage.
- Do not add dashboard widgets, skill bars, analytics cards, or a new design system.
- Keep the hamburger navigation, existing light/dark themes, and static export.
- Prefer small semantic improvements over new dependencies.

## Changes

1. Use localized category labels and locale-aware dates in Notes, including semantic `time` markup.
2. Add a deliberately quiet category filter to Notes. The latest post remains the featured entry; filtering never turns the page into a grid of cards.
3. Add estimated reading time to each Note and its article header, calculated from existing localised text.
4. Bring rewritten older Note content into English and Japanese parity with the current Traditional Chinese voice.
5. Rework About into readable profile sections with a restrained accent and safe tag spacing.
6. Fix the two-project home layout so it does not reserve a visually empty third column.
7. Make small-text colour tokens more legible without changing display colours or the overall palette.
8. Extend static/E2E coverage for locales, Notes filters and the home-project layout; run the full quality gate before pushing.

## Non-goals

- No project-detail subsystem, MDX migration, font migration, or repository-wide CSS split in this pass.
- Do not expose live status text or add an always-updated dashboard.
