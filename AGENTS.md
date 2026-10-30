# Wedding Invite Project Rules

## Project purpose

This repository contains the digital wedding invitation for Nabanita and Nishant. It is a static Astro site intended for GitHub Pages.

## Source of truth

- Keep wedding copy, dates, locations, map links, event descriptions, dress codes, food copy, and contact copy in `src/data/wedding.ts`.
- Do not duplicate event facts in components or styles.
- Times are intentionally omitted until the couple provides them. Do not invent times.
- The Saturday venue currently has only a map link. Do not invent a Saturday venue name or street address.
- The RSVP deadline and family names are intentionally not published yet.

## Content rules

- Use English-only copy for the current release.
- Preserve the couple's meaning when polishing grammar and spelling.
- Keep the tone warm, intimate, elegant, and culturally respectful.
- Treat event access as open for now. Do not add invite restrictions or authentication.
- The RSVP is one response per household, with individual guest names, food preferences, and allergy details.
- Support up to six guests per household in the planned RSVP flow.
- Food choices are vegetarian and non-vegetarian.
- Nut allergies, dietary restrictions, intolerances, and ingredients to avoid must remain clearly separated from food preference.
- Use "Mehendi" and "Haldi" consistently.

## Design rules

- Follow the Heritage Modern direction: ivory, maroon, vermilion, antique gold, blush, saffron, floral and paisley-inspired line motifs.
- Keep the design modern and spacious instead of densely ornamental.
- Do not add stock photography or unrelated imagery. The first release uses illustration, floral patterns, and typography.
- Use expressive display typography for names and headings and a highly readable body typeface.
- Respect `prefers-reduced-motion`, keyboard navigation, responsive layouts, and readable color contrast.
- Decorative SVGs must be marked as hidden or given an appropriate accessible label.

## RSVP and secrets

- The website may embed a published Google Form through `PUBLIC_GOOGLE_FORM_EMBED_URL`.
- Do not add Google credentials, spreadsheet IDs, private form tokens, or account secrets to source files.
- Keep the form URL empty or use the documented placeholder until the real Google Form exists.
- The Google Form is the submission backend. The website must not pretend a placeholder form submitted successfully.
- Use the Google Form embed for the first release. A fully custom RSVP backend is a future enhancement.

## GitHub Pages rules

- The site must remain statically buildable with `npm run build`.
- Keep deployment configuration in `.github/workflows/deploy.yml`.
- Project-page paths must use Astro's `base` configuration. The deployment workflow supplies `BASE_PATH`.
- Do not assume server-side rendering, API routes, server secrets, or filesystem writes at runtime.
- True guest-specific link validation requires a future server-side service; do not expose a guest list in the static bundle.

## Verification

Before finishing a change:

1. Run `npm run check`.
2. Run `npm run build`.
3. Review the rendered page at mobile and desktop widths when possible.
4. Verify map links open in a new tab.
5. Verify the RSVP placeholder or configured Google Form state is honest and accessible.

## Change discipline

- Prefer focused, maintainable changes over broad rewrites.
- Use semantic HTML and small reusable Astro components.
- Keep route-specific content out of global styles.
- Do not remove user-provided content or project rules without confirmation.
