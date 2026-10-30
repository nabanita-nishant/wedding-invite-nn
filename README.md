# Nabanita & Nishant Wedding Invite

A Heritage Modern digital wedding invitation for 4–5 December 2026 in Tezpur, Assam.

The site is a static Astro project deployed to GitHub Pages. Wedding copy lives in `src/data/wedding.ts`. Layout is in `src/pages/index.astro` and the components in `src/components/`, and styling is in `src/styles/global.css`.

## Page structure

1. Hero with a marigold toran, an arch around the couple's names, falling petals, the dates, an **RSVP now** button, and a countdown
2. Welcome message with a rotating "schoolmates · soulmates" seal on phones
3. Celebrations: a "Dress code at a glance" colour guide, then each day's venue and a timeline of events with time of day, dress code (what to wear and what to avoid), and an expandable description
4. RSVP: the invitation-style RSVP card, what guests will be asked, and the food and allergy note
5. Quick questions: the couple's answers about guests, RSVPs, dress code, and changes of plan
6. Closing message with the contact for questions

The header stays fixed at the top with an RSVP button at every screen size. Animations are gentle, turn off when a guest's phone is set to reduce motion, and never hide content if JavaScript fails.

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

## Create the RSVP form

`tools/create-rsvp-form.gs` builds the whole Google Form and its response spreadsheet in about a minute:

1. Sign in to the Google account that should own the RSVPs and open https://script.google.com.
2. Click **New project**, delete the sample code, and paste in the contents of `tools/create-rsvp-form.gs`.
3. Click **Run** with `createWeddingRsvpForm` selected. Approve the permission prompt: choose your account, then **Advanced > Go to project (unsafe)**. The warning appears because the script is your own and not published by Google.
4. Open **Execution log**. It prints the form link for the website, the link to edit the form, and the responses spreadsheet.
5. Open the form once. If Google Forms shows a **Publish** button, click it and make sure responders are set to **Anyone with the link**. Do not turn on "Limit to 1 response": it forces guests to sign in to Google.

The form asks, in order:

1. Household or family name, your name, and optional phone and email
2. Will your household be joining us? "Sorry, we can't make it" skips to the last section
3. Which celebrations will your household join? (Friday Mehendi, Friday Haldi, Saturday ring exchange and lunch, Saturday Bengali wedding and dinner)
4. Guest 1 to Guest 6, one section each: full name, vegetarian or non-vegetarian, nut allergy yes/no, and other allergies or ingredients to avoid. After each guest: "Is anyone else from your household coming?"
5. Anything else you'd like us to know?

Each guest's answers land in their own spreadsheet columns, so meal counts and allergies are easy to share with the caterer.

To connect the form to the website, put the form link in `rsvp.formUrl` in `src/data/wedding.ts` and push. Use the full `docs.google.com/forms/.../viewform` link, not a `forms.gle` short link. Alternatively, set the `PUBLIC_GOOGLE_FORM_EMBED_URL` repository variable; it takes priority over `rsvp.formUrl`.

## Content updates

Update `src/data/wedding.ts` for:

- Event times once confirmed (each event has a `time` field shown next to the time of day)
- Saturday venue name and address (`days[1].venue`)
- Family names
- RSVP deadline, if one is added
- Contact information for Koyel or the wider family
- Event copy or dress-code guidance, including the swatch colours
- Quick questions (`faq.items`)
- The RSVP form link (`rsvp.formUrl`)

If the celebrations or the guest limit change, update `tools/create-rsvp-form.gs` to match before creating the form.

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
