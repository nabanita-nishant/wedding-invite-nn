# Nabanita & Nishant Wedding Invite

A Heritage Modern digital wedding invitation for 4 - 5 December 2026 in Tezpur, Assam.

The site is a static Astro project designed for GitHub Pages. Wedding copy lives in `src/data/wedding.ts`, while the first release's layout and styling are in `src/pages/index.astro` and `src/styles/global.css`.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Astro. The RSVP section intentionally shows a setup state until the published Google Form URL is configured.

To preview the embedded form locally:

1. Copy `.env.example` to `.env`.
2. Set `PUBLIC_GOOGLE_FORM_EMBED_URL` to the published Google Form URL with `?embedded=true`.
3. Run `npm run dev` again.

Do not commit `.env`.

## RSVP form design

The Google Form should be configured with one household response and branching for up to six guests:

1. Household name - required
2. Respondent name - required
3. Email - optional
4. Phone - optional
5. Is your household attending? - required
6. Number of attending guests - required when attending
7. Guest details for the selected number of guests:
   - Guest name - required
   - Food preference: vegetarian or non-vegetarian - required
   - Nut allergy: yes or no - required
   - Allergy, intolerance, or ingredient details - optional unless nut allergy is yes
8. Additional message - optional

Google Forms does not support unlimited repeated fields, so use branching sections for one through six guests. Link the form responses to a Google Sheet. Keep allergy details in their own response columns so they are easy for the caterer to review.

## Content updates

Update `src/data/wedding.ts` for:

- Event times once confirmed
- Family names
- RSVP deadline, if one is added
- Saturday venue details
- Contact information for Koyel or the wider family
- Updated event copy or dress-code guidance

Event times are empty by design and are hidden from the event cards until supplied.

## GitHub Pages deployment

1. Create a GitHub repository and push this project to the `main` branch.
2. In repository settings, set Pages to use **GitHub Actions**.
3. Add a repository variable named `PUBLIC_GOOGLE_FORM_EMBED_URL` with the published Google Form URL. This is optional until the form is ready.
4. Push to `main` or run the `Deploy wedding invite` workflow manually.

The workflow configures the GitHub project-page base path automatically. Do not add Google credentials, private spreadsheet IDs, or other secrets to the repository.

## Checks

```sh
npm run check
npm run build
```

Project-specific working rules are in `AGENTS.md`. The reusable Devin skill is in `.devin/skills/wedding-invite/SKILL.md`.
