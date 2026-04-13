# Edmond Law Website

Static multi-page website for Edmond Law, built for plain GitHub Pages hosting with no build step.

## Stack

- HTML
- Shared stylesheet: `/assets/css/styles.css`
- Shared script: `/assets/js/main.js`
- Static hosting target: GitHub Pages with custom domain `edmondlaw.org`

## Page Structure

- `/` Home
- `/about/`
- `/practice-areas/`
- `/team/`
- `/contact/`
- `/blog/`
- `/blog/understanding-conveyancing-jamaica/`
- `/404.html`

## Deployment

1. Upload the repository contents to the GitHub Pages publishing branch.
2. Confirm `CNAME` contains `edmondlaw.org`.
3. In GitHub Pages settings, keep the custom domain set to `edmondlaw.org`.
4. Keep the site root intact so `/assets/`, `/404.html`, `robots.txt`, and `sitemap.xml` remain publicly reachable.

## Formspree Setup

The contact form and newsletter form both use the same Formspree placeholder endpoint.

1. Create or select the Formspree form you want to use.
2. Replace `REPLACE_WITH_FORMSPREE_ID` in:
   - `/contact/index.html`
   - `/blog/index.html`
3. Test one enquiry submission and one newsletter submission after publishing.

## Clean URL Routing

GitHub Pages serves `index.html` from each folder, so interior pages are directory-routed.

- Use trailing-slash internal links such as `/about/` and `/practice-areas/#conveyancing`.
- Keep asset paths root-relative, for example `/assets/css/styles.css`, so nested pages and `404.html` resolve correctly.

## Domain and SEO Notes

- `robots.txt` allows crawling and points to `https://edmondlaw.org/sitemap.xml`.
- `sitemap.xml` should be updated when pages are added or URLs change.
- Canonical URLs and JSON-LD schema are embedded in each public page.

## Content Notes

- Team photos currently use approved Unsplash placeholders until client photos are provided.
- The only intentional placeholder remaining is the Formspree form ID.
