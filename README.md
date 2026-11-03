# Nabanita & Nishant Wedding Invite

A Heritage Modern digital wedding invitation for 4–5 December 2026 in Tezpur, Assam.

The site is a static Astro project deployed to GitHub Pages. Wedding copy lives in `src/data/wedding.ts`. Layout is in `src/pages/index.astro` and the components in `src/components/`, and styling is in `src/styles/global.css`.

## Page structure

1. Hero with a marigold toran, an arch around the couple's names, falling petals, the dates, an **RSVP now** button, and a countdown
2. Welcome message
3. Celebrations: a mini December calendar with clickable dates, then each day's timeline of events with time of day, dress code (what to wear and what to avoid), an expandable description, and day-specific scroll markers
4. RSVP: a custom multi-step form with personalised links, food preference, nut allergy, and +1 guest support
5. Quick questions: the couple's answers about guests, RSVPs, dress code, and changes of plan
6. Locations: embedded Google Maps for both venues with live-directions buttons
7. Closing message with the contact for questions

The header stays fixed at the top with an RSVP button at every screen size. Animations are gentle, turn off when a guest's phone is set to reduce motion, and never hide content if JavaScript fails.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Astro. The configured Google Apps Script endpoint is stored in `src/data/wedding.ts`. To test a different endpoint locally, copy `.env.example` to `.env`, set `PUBLIC_RSVP_ENDPOINT`, and restart `npm run dev`. The environment value overrides the configured endpoint.

Do not commit `.env`.

## Set up the RSVP backend

The RSVP form submits to a Google Apps Script web app that writes responses to Google Sheets.

1. Create a new Google Sheet in the Google account that should receive RSVPs.
2. Open **Extensions > Apps Script**.
3. Delete the sample code and paste in `tools/rsvp-backend.gs`.
4. Click **Deploy > New deployment**. Choose **Web app**, set **Execute as** to **Me**, and **Who has access** to **Anyone**.
5. Copy the deployment URL (ends with `/exec`).
6. Set it as `PUBLIC_RSVP_ENDPOINT` in your `.env` file locally, or as a GitHub repository variable under **Settings > Secrets and variables > Actions > Variables**, then rebuild.

The script creates two sheets automatically on first use:
- **Households**: one row per submission (household name, attending yes/no, guest count, timestamp)
- **Guests**: one row per attending guest (household, guest name, food preference, nut allergy, timestamp)

## Personalised RSVP links

Each guest gets a unique link with their name prefilled. Open `tools/generate-links.html` in a browser, enter the site URL and guest names (one per line), and it generates copyable links like:

```
https://nabanita-nishant.github.io/wedding-invite-nn/?name=Rahul+Kumar#rsvp
```

When a guest opens this link, the RSVP form greets them by name and skips the name-entry step. Links without the `?name=` parameter still work; the form asks for the name first.

## Content updates

Update `src/data/wedding.ts` for:

- Event times once confirmed (each event has a `time` field shown next to the time of day)
- Saturday venue name and address (`days[1].venue`)
- Family names
- RSVP deadline, if one is added
- Contact information for Nabanita and Nishant or the wider family
- Event copy or dress-code guidance, including the swatch colours
- Quick questions (`faq.items`)
If the celebrations or the guest limit change, update `tools/rsvp-backend.gs` to match.

## GitHub Pages deployment

1. In the repository, open **Settings > Pages**. Under **Build and deployment**, set **Source** to **GitHub Actions**. This one-time switch is required: until it is set, the **Configure GitHub Pages** step fails with "Get Pages site failed". The workflow cannot turn Pages on by itself, because the default Actions token is not allowed to change repository settings.
2. Optional: add a repository variable named `PUBLIC_RSVP_ENDPOINT` under **Settings > Secrets and variables > Actions > Variables** once the Google Apps Script backend is deployed.
3. Push to `main` or run the **Deploy wedding invite** workflow manually from the **Actions** tab.

Do not add Google credentials, private spreadsheet IDs, or other secrets to the repository.

## Changing the site address

The address cannot be set in the workflow file. GitHub decides it from the account or organization name, the repository name, or a custom domain saved in **Settings > Pages**. The workflow reads whichever address is configured and builds the site to match, so none of these options need code changes:

The repository lives in the free `nabanita-nishant` GitHub organization: `https://github.com/nabanita-nishant/wedding-invite-nn`.

| Option | Address | Cost | How |
| --- | --- | --- | --- |
| Current | `https://nabanita-nishant.github.io/wedding-invite-nn/` | Free | Nothing to do |
| Rename to `wedding-invite` | `https://nabanita-nishant.github.io/wedding-invite/` | Free | **Settings > General > Repository name** |
| Rename to `nabanita-nishant.github.io` | `https://nabanita-nishant.github.io/` | Free | **Settings > General > Repository name** |
| Custom domain | `https://nabanitaandnishant.com/` | Domain fee, paid yearly to a registrar | See below |

After a rename, GitHub redirects the old repository URL, but the old `github.io` address stops working. Run the workflow once from the **Actions** tab, and check that **Settings > Pages > Source** is still **GitHub Actions**. Update your local copy with `git remote set-url origin https://github.com/nabanita-nishant/<new-name>.git`.

## Custom domain

The invite can be served from its own domain, for example `nabanitaandnishant.com`, at the domain root. A domain cannot be invented in a file: it has to be bought from a registrar and pointed at GitHub through DNS.

Follow these steps in order. GitHub recommends adding the domain to the repository before creating DNS records so nobody else can claim it.

1. Make sure GitHub Pages is enabled with **Source: GitHub Actions** (see above).
2. Buy the domain from any domain registrar.
3. Recommended: verify the domain in your GitHub account under **Settings > Pages > Add a domain**. GitHub shows a TXT record to add at your registrar, which stops anyone else from using the domain.
4. In this repository, open **Settings > Pages**, enter the domain under **Custom domain**, and save.
5. In the registrar's DNS settings, remove any default parking or forwarding records for `@` and `www`, then add:

   | Type | Name | Value |
   | --- | --- | --- |
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | AAAA | @ | 2606:50c0:8000::153 |
   | AAAA | @ | 2606:50c0:8001::153 |
   | AAAA | @ | 2606:50c0:8002::153 |
   | AAAA | @ | 2606:50c0:8003::153 |
   | CNAME | www | nabanita-nishant.github.io |

   Do not add wildcard (`*`) records.
6. When GitHub's DNS check passes in **Settings > Pages**, tick **Enforce HTTPS**. DNS changes and the HTTPS certificate can take up to 24 hours.
7. Re-run the **Deploy wedding invite** workflow. The site moves from its `github.io` path to the domain root, so it must be rebuilt for the asset paths to match.

After that, the `nabanita-nishant.github.io` address redirects to the domain automatically. No CNAME file is needed because the site deploys through GitHub Actions.

## Dependencies and the lockfile

Every `resolved` URL in `package-lock.json` must point at `https://registry.npmjs.org/`. If your machine installs packages through a private mirror, rewrite the URLs to the public registry before committing, or GitHub Actions cannot install the dependencies. `AGENTS.md` has the exact command.

## Checks

```sh
npm run check
npm run build
```

Project-specific working rules are in `AGENTS.md`. The reusable Devin skill is in `.devin/skills/wedding-invite/SKILL.md`.
