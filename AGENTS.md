# Wedding Invite Project Rules

## Project purpose

This repository contains the digital wedding invitation for Nabanita and Nishant. It is a static Astro site intended for GitHub Pages.

## Source of truth

- Keep wedding copy, dates, venues, map links, event descriptions, dress codes, RSVP steps, food copy, and contact copy in `src/data/wedding.ts`.
- Venues belong to a day (`days[].venue`), not to individual events. Show each venue once per day.
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

## Guest experience rules

- RSVP must always be one tap away: keep the RSVP button in the fixed header at every screen width, the "RSVP now" button in the hero, the RSVP prompt after the schedule, and the closing RSVP button.
- Keep the section order Hero, Welcome, Celebrations, RSVP, Closing. Do not add sections between Celebrations and RSVP without a clear guest need.
- Event cards must show time of day, name, and dress code (wear and avoid) without interaction. Only the longer description sits in the `<details>` disclosure, which opens by default on screens wider than 820px.
- Content must never depend on JavaScript to become visible. Scroll animations use CSS `animation-timeline: view()` inside `@supports` so unsupported browsers simply show content.
- Small uppercase labels must be at least 12px (`0.75rem`); body copy at least 15px. Tap targets must be at least 44px tall.
- Use `--gold` only for lines and decoration. Use `--gold-text` for gold-toned text on light backgrounds and `--gold-light` on maroon. Never put `--gold-text` on blush; use maroon instead.
- Do not use `overflow: hidden` on an ancestor of the sticky day headers. Decorative sections use `overflow: hidden` followed by `overflow: clip`.
- When a Google Form is configured, phones get the "Open the RSVP form" button only. The embedded iframe is shown on wider screens.

## RSVP and secrets

- The website may embed a published Google Form through `PUBLIC_GOOGLE_FORM_EMBED_URL`. It accepts either the normal `docs.google.com/forms/.../viewform` link or the embed link; the page derives both the new-tab link and the `embedded=true` iframe URL. Short `forms.gle` links cannot be embedded.
- Do not add Google credentials, spreadsheet IDs, private form tokens, or account secrets to source files.
- Keep the form URL empty or use the documented placeholder until the real Google Form exists.
- The Google Form is the submission backend. The website must not pretend a placeholder form submitted successfully.
- Use the Google Form embed for the first release. A fully custom RSVP backend is a future enhancement.

## GitHub Pages rules

- The site must remain statically buildable with `npm run build`.
- Keep deployment configuration in `.github/workflows/deploy.yml`.
- Project-page paths must use Astro's `base` configuration. The workflow reads `base_path` and `origin` from `actions/configure-pages`, so renaming the repository, moving it to an organization, or adding a custom domain in Settings > Pages needs no code change.
- GitHub Pages must be enabled with **Source: GitHub Actions** for deployment to succeed. Until it is, `actions/configure-pages` fails with "Get Pages site failed". The default `GITHUB_TOKEN` cannot enable Pages, so this is a one-time manual setting for the repository owner.
- The site address cannot be set in `deploy.yml`. It comes from the owner name, the repository name, or the custom domain saved in Settings > Pages. Do not add CNAME files or hard-coded base paths; the Actions-based deployment ignores CNAME files.
- Do not assume server-side rendering, API routes, server secrets, or filesystem writes at runtime.
- True guest-specific link validation requires a future server-side service; do not expose a guest list in the static bundle.

## Dependency rules

- Every `resolved` URL in `package-lock.json` must use `https://registry.npmjs.org/`. This machine installs through Dell's internal Artifactory mirror, which GitHub Actions cannot reach; a lockfile pointing at `artifacts.dell.com` makes `npm ci` hang and fail with "Exit handler never called!". npm maps `registry.npmjs.org` to the configured mirror locally, so the public URLs work in both places.
- After any `npm install` or `npm update`, run `sed -i -E 's#https://artifacts\.dell\.com(:443)?/artifactory/api/npm/npm-remote/#https://registry.npmjs.org/#g' package-lock.json` and confirm `grep -c artifacts.dell.com package-lock.json` prints `0` before committing.
- Do not add npm `overrides` to work around missing files in `node_modules`. That symptom comes from two installs or dev servers running at once on Windows; stop every Astro/npm process for this project, then run `npm ci`.
- Run the local dev server on localhost only. Do not use `--host 0.0.0.0`: the Astro 5 toolchain's esbuild has a Windows dev-server file-read advisory.
- `npm audit` reports advisories in Astro 5 and its build-time dependencies (image optimization, SSR base handling, MDX rendering, dev server). This static site does not use those features. The fix is a major Astro upgrade, which should be done as its own tested change, never with `npm audit fix --force`.

## Verification

Before finishing a change:

1. Run `npm run check`.
2. Run `npm run build`.
3. Review the rendered page at mobile and desktop widths when possible. Headless Edge enforces a minimum window width of about 500px, so capture phone layouts by loading the page in a 390px-wide `<iframe>` and pass `--force-prefers-reduced-motion` so animations do not affect the capture.
4. Verify map links open in a new tab.
5. Verify the RSVP placeholder or configured Google Form state is honest and accessible.
6. Verify there is no horizontal scrolling at 390px and that the header RSVP button is visible on phones.

## Change discipline

- Prefer focused, maintainable changes over broad rewrites.
- Use semantic HTML and small reusable Astro components.
- Keep route-specific content out of global styles.
- Do not remove user-provided content or project rules without confirmation.
