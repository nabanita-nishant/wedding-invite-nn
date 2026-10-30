# Nabanita & Nishant Wedding Invite

A Heritage Modern digital wedding invitation for 4–5 December 2026 in Tezpur, Assam.

The site is a static Astro project deployed to GitHub Pages. Wedding copy lives in `src/data/wedding.ts`. Layout is in `src/pages/index.astro` and the components in `src/components/`, and styling is in `src/styles/global.css`.

## Page structure

1. Hero with the couple's names, dates, an **RSVP now** button, and a countdown
2. Welcome message
3. Celebrations: each day shows its venue once, then a timeline of events with time of day, dress code (what to wear and what to avoid), and an expandable description
4. RSVP: what guests will be asked, the food and allergy note, and the Google Form
5. Closing message with the contact for questions

The header stays fixed at the top with an RSVP button at every screen size.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Astro. The RSVP section shows an "opening soon" state until the Google Form URL is configured.

To preview the form locally:

1. Copy `.env.example` to `.env`.
2. Set `PUBLIC_GOOGLE_FORM_EMBED_URL` to the full Google Form link, for example `https://docs.google.com/forms/d/e/<form-id>/viewform`. The embed link with `?embedded=true` also works. Short `forms.gle` links cannot be embedded.
3. Run `npm run dev` again.

Do not commit `.env`.

When the form is configured, phones get an **Open the RSVP form** button that opens Google Forms in a new tab. Larger screens also show the form embedded on the page.

## RSVP form design

Set up the Google Form with one response per household and branching for up to six guests:

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

Google Forms does not support unlimited repeated fields, so use branching sections for one through six guests. Link the responses to a Google Sheet and keep allergy details in their own columns so the caterer can review them easily.

## Content updates

Update `src/data/wedding.ts` for:

- Event times once confirmed (each event has a `time` field shown next to the time of day)
- Saturday venue name and address (`days[1].venue`)
- Family names
- RSVP deadline, if one is added
- Contact information for Koyel or the wider family
- Event copy or dress-code guidance

## GitHub Pages deployment

1. In the repository, open **Settings > Pages**. Under **Build and deployment**, set **Source** to **GitHub Actions**. This one-time switch is required: until it is set, the **Configure GitHub Pages** step fails with "Get Pages site failed". The workflow cannot turn Pages on by itself, because the default Actions token is not allowed to change repository settings.
2. Optional: add a repository variable named `PUBLIC_GOOGLE_FORM_EMBED_URL` under **Settings > Secrets and variables > Actions > Variables** once the form is ready.
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
