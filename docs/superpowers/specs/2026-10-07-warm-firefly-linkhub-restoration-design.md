# Warm Firefly Link Hub Restoration

## Goal

Restore Miki's original warm, firefly-like personality while retaining the
new Next.js static-site foundation. The home page remains a short, mobile-first
link hub rather than expanding into a portfolio layout.

## Explicit decisions

- Keep only Traditional Chinese and Japanese. English routes and controls are
  removed from the public navigation.
- Use a clean sans-serif (black-body) typeface throughout. No calligraphic,
  handwritten, or display font treatment.
- Reuse the old site's palette: pale sky blue, soft mint, apricot highlights,
  warm lime fireflies, and dark neutral text. Do not use the new navy-first
  theme or generic dark glass look.
- Keep light and dark themes, but both inherit the warm firefly palette:
  light is misty daylight; dark is twilight blue-green, never near-black.
- The top-level experience is one centered column: avatar, short identity,
  social/utility links, and compact link cards. Detailed pages remain
  available but do not make the home page visually dense.
- Use only subtle interaction: drifting fireflies, card lift and glow on
  hover/focus, and reduced-motion support. No decorative animations that
  compete with reading.

## Layout

1. A compact top control row has the Miki wordmark, Chinese/Japanese switch,
   and theme toggle.
2. The hero presents the supplied avatar, status, name, subtitle, and one
   signature line with generous vertical space.
3. Link cards are the focal point: full-width, rounded, immediately tappable,
   with a small icon and right arrow. The card stack is readable at 320px and
   constrained to a comfortable desktop width.
4. The music cue and a small rotating quote remain optional, low-emphasis
   details beneath the links.

## Assets and publication

All browser-visible image assets live under `public/assets/` so Next.js copies
them into the static export. The supplied avatar is used locally; no critical
image depends on Discord or another third-party CDN. The custom cursor is
desktop-only and falls back to the operating-system cursor on touch devices.

## Internationalization

`zh-TW` is the default public locale and `ja` is the alternate locale. Each
home and detail page uses locale-specific text. Locale switching preserves the
current pathname. The removed English route is not linked or generated.

## Validation

- Automated content and component tests pass.
- The static build generates Chinese and Japanese home/detail routes.
- Visual review checks the 320px mobile layout plus a desktop viewport in both
  themes, including a successful local avatar request.
