---
name: wedding-invite
description: Build and maintain the Nabanita and Nishant Heritage Modern wedding invitation
argument-hint: "[content-update|design-update|deployment|review]"
triggers:
  - user
  - model
---

# Nabanita and Nishant Wedding Invite Skill

Use this skill to build, review, or update the digital wedding invitation in this repository.

## Product brief

Create a warm, elegant, modern Indian Hindu wedding invitation for:

- Couple: Nabanita and Nishant
- Dates: 4-5 December 2026
- Location: Tezpur, Assam
- Language: English only for the current release
- Hosting: GitHub Pages
- Core RSVP: Google Form embedded in the site
- RSVP model: one household response with individual guest details
- Maximum planned household size: six guests

## Visual direction

Use a "Heritage Modern" design language:

- Ivory, maroon, vermilion, antique gold, blush pink, and saffron
- Spacious editorial composition with traditional floral, paisley, mandala, or alpana-inspired line motifs
- Romantic but restrained, never crowded or template-like
- Expressive display typography for the couple's names and headings
- Highly readable body text
- Subtle page-load and scroll-reveal motion with reduced-motion support
- No photography in the first release; use illustration, pattern, and typography

## Confirmed content

Welcome copy:

> A familiar beginning. A new chapter. A future together.
>
> From being school classmates to choosing to move forward together, life has brought us to a new beginning. We are delighted to celebrate this special chapter with our family and friends and look forward to sharing these intimate moments with the people who matter most to us.
>
> With love, Nabanita and Nishant

Friday, 4 December 2026:

1. Morning Mehendi ceremony
   - An intimate celebration with the women of both families
   - Dress code: pink, any shade of pink
2. Evening Haldi ceremony
   - An intimate Haldi celebration with the bride's family and friends
   - Dress code: yellow, any shade of yellow

Friday location:

`Shreebhumi Enclave, Tiger Hill Road, Lalmati, Tezpur, Assam`

Friday map:

`https://maps.app.goo.gl/7Q8EdLYiVf6ajSXP8`

Saturday, 5 December 2026:

1. Morning ring exchange and court marriage
   - A special morning as we exchange rings and begin our next chapter together
   - Dress code: soft pastels and light, subtle colours; avoid white
2. Afternoon wedding lunch
   - Good food, familiar faces, and time to enjoy being together
   - This is a timeline item, not a separate RSVP event
3. Evening Bengali wedding ceremony and dinner
   - An intimate Bengali wedding ceremony followed by dinner, celebrating love, family, and tradition
   - Dress code: any colour except red and maroon

Saturday map:

`https://maps.app.goo.gl/whE3vhVsqQGJEjyeA`

Food copy:

> We will have both vegetarian and non-vegetarian options for our guests. Please let us know in your RSVP if you have any food allergies, including nut allergies, dietary restrictions, intolerances, or ingredients you prefer to avoid. We will do our best to accommodate your needs.

Contact copy:

`For any questions, please reach out to Koyel.`

## Architecture

Use Astro with TypeScript and static output:

- `src/data/wedding.ts` is the content source of truth.
- `src/components/` contains focused reusable Astro components.
- `src/pages/index.astro` owns page composition and page-level client behavior.
- `src/styles/global.css` owns tokens, responsive layout, motion, and global element styles.
- `public/` contains only static assets such as favicon files.
- `PUBLIC_GOOGLE_FORM_EMBED_URL` controls whether the real Google Form iframe is rendered.

Do not use server-side rendering or Astro API routes. GitHub Pages cannot run them.

## Implemented repository map

The current implementation includes:

- `src/pages/index.astro` - one-page invitation composition, mobile navigation, countdown, reveal behavior, and RSVP state.
- `src/styles/global.css` - Heritage Modern tokens, responsive layout, typography, illustrations, motion, focus states, and reduced-motion rules.
- `src/components/EventCard.astro` - reusable event card with optional time, dress code, address, and map link.
- `src/components/SectionLabel.astro` and `src/components/FloralMark.astro` - repeated editorial labels and inline floral artwork.
- `src/data/wedding.ts` - the event and invitation content source of truth.
- `public/favicon.svg` - the N&N mark used as the favicon.
- `.github/workflows/deploy.yml` - GitHub Pages build and deployment workflow.
- `README.md` - local setup, Google Form field design, and deployment instructions.
- `AGENTS.md` - project rules for future agents and contributors.

The page renders a polished RSVP setup state until `PUBLIC_GOOGLE_FORM_EMBED_URL` is configured. It renders the real iframe only when that public URL is present.

The package overrides pin a small number of transitive packages to versions that include their published JavaScript entrypoints in the current npm mirror. Keep them unless dependency installation and CI are verified against a different registry.

## RSVP implementation

The first release uses a Google Form embed:

- Keep the surrounding RSVP section fully branded.
- Show an honest setup state when `PUBLIC_GOOGLE_FORM_EMBED_URL` is empty.
- Never claim a placeholder form submitted successfully.
- Document the Google Form field design for up to six guests.
- The form should collect household attendance and per-guest name, vegetarian/non-vegetarian choice, nut allergy status, and allergy or ingredient notes.
- Email and phone are optional.
- There is no RSVP deadline yet.
- Do not add event-by-event attendance restrictions yet.

Google Forms cannot dynamically create unlimited repeated fields. Prefer branching based on the number of attending guests, with a maximum of six, or clearly documented fixed guest sections.

## GitHub Pages deployment

Configure `astro.config.mjs` to read `BASE_PATH` and `SITE_URL` from the environment. The GitHub Actions workflow should:

1. Check out the repository.
2. Set up Node.
3. Run `npm ci`.
4. Run `npm run check`.
5. Run `npm run build` with `BASE_PATH=/${{ github.event.repository.name }}`.
6. Publish `dist/` with the official Pages actions.

Do not commit `.env`, form secrets, or private spreadsheet credentials.

## Working method

When asked to update this invitation:

1. Read `AGENTS.md`, `src/data/wedding.ts`, and the affected components.
2. Identify whether the request is content, design, RSVP, or deployment work.
3. Keep the source of truth and component output consistent.
4. Preserve mobile behavior and accessibility.
5. Run `npm run check` and `npm run build`.
6. Report changed files, verification results, and any content still marked as pending.

## Acceptance criteria

A complete first release must:

- Present Nabanita and Nishant's names and the 4-5 December 2026 date clearly.
- Explain the welcome story and all three Saturday/Friday celebration groups.
- Show optional event times without inventing missing times.
- Use the Friday address and both supplied map links.
- Include dress-code information without creating access restrictions.
- Explain vegetarian, non-vegetarian, and allergy information.
- Provide a clear RSVP section with a Google Form setup state or configured iframe.
- Work at mobile and desktop widths.
- Build successfully as a static site for GitHub Pages.
