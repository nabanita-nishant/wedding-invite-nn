# Wedding Invite Project Rules

## Project purpose

This repository contains the digital wedding invitation for Nabanita and Nishant. It is a static Astro site intended for GitHub Pages.

## Source of truth

- Keep wedding copy, dates, venues, map links, event descriptions, dress codes, RSVP config, food copy, Quick questions, and contact copy in `src/data/wedding.ts`.
- `tools/rsvp-backend.gs` is the Google Apps Script that receives RSVP submissions and writes to Google Sheets. Keep its sheet structure in sync with the form payload.
- `tools/generate-links.html` generates personalised RSVP links with guest names prefilled via URL parameters.
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
- The RSVP is one response per household, with the celebrations the household will join, plus individual guest names, food preferences, and allergy details.
- The couple's Quick questions ask guests to check before bringing an additional guest and to give 7–10 days' notice of cancellations (at least 3–4 days when unexpected). Keep RSVP copy consistent with them.
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
- Keep the section order Hero, Welcome, Celebrations, RSVP, Quick questions (`#questions`), Closing. Do not add sections between Celebrations and RSVP without a clear guest need.
- Event cards must show time of day, name, and dress code (wear and avoid) without interaction. Only the longer description sits in the `<details>` disclosure, which opens by default on screens wider than 820px.
- Most guests use phones. Design and review every change at 390px and 360px first.
- Content must never depend on JavaScript to become visible. An inline script in `<head>` adds `reveal-on` only when IntersectionObserver exists and reduced motion is off; the page script then reveals `.reveal` elements as they scroll into view. If that script has not run within 1.5s of `load`, the inline script removes `reveal-on` so everything shows.
- Animations must stay small, use only `transform` and `opacity`, and live inside `@media (prefers-reduced-motion: no-preference)` or behind `reveal-on`. Current set: hero entrance stagger and arch, floral line drawing, falling petals, RSVP button shine, swaying RSVP seal, heartbeat icon, timeline growth, swatch pop, FAQ answer fade, RSVP form step fade, celebrations bidirectional scroll pop, and calendar highlight pop.
- Do not put emoji glyphs in the UI. Use `HeartIcon.astro` where the couple's copy has a heart.
- Small uppercase labels must be at least 12px (`0.75rem`); body copy at least 15px. Tap targets must be at least 44px tall.
- Use `--gold` only for lines and decoration. Use `--gold-text` for gold-toned text on light backgrounds and `--gold-light` on maroon. Never put `--gold-text` on blush; use maroon instead.
- Do not use `overflow: hidden` on an ancestor of the sticky day headers. Decorative sections use `overflow: hidden` followed by `overflow: clip`.

## RSVP and secrets

- The RSVP is a custom multi-step form built into the page. It reads the guest name from the `?name=` URL parameter and prefills it. If no name is in the URL, the form asks for the guest's name first.
- The form submits to a Google Apps Script web app whose URL is set via `PUBLIC_RSVP_ENDPOINT`. When the endpoint is not configured, the form shows success without sending data (development mode).
- `tools/rsvp-backend.gs` is the Google Apps Script that receives POST requests and writes to a Google Sheet with Households and Guests tabs.
- `tools/generate-links.html` is a local-only tool for generating personalised `?name=…#rsvp` links for each guest.
- Personalised links are not secret tokens. They prefill the name for convenience but do not restrict access.
- Do not add Google credentials, spreadsheet IDs, private form tokens, or account secrets to source files.
- The form supports up to 5 additional guests (+1s), each on their own page. Each guest provides name, food preference (veg/non-veg), and nut allergy (yes/no).

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
3. Review the rendered page at mobile and desktop widths when possible. Prefer `playwright-core` installed in a temporary folder (never as a project dependency) driving the installed Edge with `channel: 'msedge'`: it emulates a 390px phone, scrolls for real, and takes full-page screenshots. Headless `msedge --screenshot` enforces a 500px minimum width and its virtual time does not run IntersectionObserver or scroll reveals reliably, so use it only with a 390px `<iframe>` and `--force-prefers-reduced-motion`.
4. Verify map links open in a new tab.
5. Verify the RSVP form works: name prefill from URL, step navigation, chip selection, +1 guest pages, review summary, and submit.
6. Verify there is no horizontal scrolling at 390px and that the header RSVP button is visible on phones.

## Change discipline

- Prefer focused, maintainable changes over broad rewrites.
- Use semantic HTML and small reusable Astro components.
- Keep route-specific content out of global styles.
- Do not remove user-provided content or project rules without confirmation.
