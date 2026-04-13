# CODEX.md — Edmond Law Website Project Brief

> **You are OpenAI Codex working in VS Code on a production website for a real, paying client. Use Codex as a hands-on coding agent: read the brief end-to-end before writing a single line of code, inspect the existing files before changing them, then implement directly in the repo with disciplined, minimal edits. Re-read relevant sections before each new file. The client meeting is tomorrow. Do not improvise on requirements — execute them.**

---

## 0. Hard Constraints (non-negotiable)

1. **WCAG 2.2 Level AA compliance is mandatory** across every page. Test your work mentally against each success criterion before committing.
2. **Mobile-first, mobile-perfect.** Every page must feel premium on a 360px-wide Android phone before it feels good on desktop. Animations that hurt mobile (parallax on scroll, heavy blur, large transforms) must be disabled or replaced under 768px.
3. **Multi-page architecture.** This is NOT a single-page site. See Section 4 for the page list. Each page is its own `.html` file with shared header/footer markup (manually duplicated — no build step).
4. **Zero build tools.** No npm, no bundlers, no frameworks. Plain HTML + CSS + vanilla JS. The deliverable must be uploadable to GitHub Pages as static files.
5. **Single CSS file** at `/assets/css/styles.css` shared across every page. Single JS file at `/assets/js/main.js` shared across every page. No inline `<style>` blocks except for page-specific JSON-LD schemas.
6. **Every CTA on every page funnels to one of three actions:** book consultation (form on Contact page), call (`tel:+18768273362`), or WhatsApp (`https://wa.me/18768273362`).
7. **Respect `prefers-reduced-motion`** — wrap all non-essential animations in the media query.
8. **No Lorem Ipsum.** All copy must be real, written for Edmond Law, SEO-optimised. If you need filler, write actual content; don't placeholder it.

---

## 1. The Client

- **Name:** Edmond Law
- **Type:** Full-service Jamaican law firm
- **Location:** Suites 32-33, Big Buy Plaza, 16 West Trade Way, Portmore, St. Catherine, Jamaica
- **Phone / WhatsApp:** 876-827-3362 (international format `+18768273362`)
- **Email:** tamica@edmondlaw.org
- **Hours:** Monday–Thursday 8:30am–5:00pm · Friday 8:30am–4:00pm
- **Tagline:** *"Experience service with a difference."*
- **Domain:** edmondlaw.org (already owned, on GoDaddy)
- **Attorneys:**
  - Nicholas M.D. Edmond — Attorney-at-Law, Founding Partner
  - Tamica N. Edmond — Attorney-at-Law, Founding Partner
  - Michelle A. Daley — Attorney-at-Law
- **Practice Areas (7):** Civil & Criminal Litigation · Conveyancing & Real Estate · Estate Planning · Probate & Administration · Family Law · Personal Injury · Contracts & Labour/Employment Law
- **Goal of the site (client's words):** "More enquiries, look more credible, answer common questions, show work/results — all of the above. Showcase our team and features of our main service offerings."
- **Client preference:** "We are open to your expertise."

---

## 2. Brand & Visual Direction

### Colours (extracted from logo)
```css
--navy:        #0B1F3A   /* primary, headings, dark sections */
--navy-deep:   #061327   /* darkest backgrounds, footer */
--steel:       #2E7BB8   /* accent blue from logo shield */
--steel-light: #4A95D1   /* hover states, lighter accent */
--gold:        #C9A961   /* sparingly — punctuation, eyebrows, dividers */
--ivory:       #F7F4ED   /* page background — NOT pure white */
--bone:        #EFEAE0   /* alternate section background */
--ink:         #0A0A0A   /* body text */
--muted:       #5C6B7A   /* secondary text */
--line:        rgba(11,31,58,0.12)  /* hairline borders */
```

### Typography
- **Display (headings):** Cormorant Garamond — weights 500, 600. Use italic 500 for emphasis spans inside h1/h2 (e.g. `<h1>Counsel that earns <em>your trust</em></h1>`).
- **Body & UI:** Inter Tight — weights 300, 400, 500, 600.
- Load both via Google Fonts in `<head>` of every page with `preconnect`.
- **Never use:** Inter, Roboto, Arial, Open Sans, Poppins, Space Grotesk, system-ui as primary fonts.

### Aesthetic
- Editorial law firm. Think *The New York Times* meets a boutique Manhattan chambers. Mature, confident, restrained.
- Generous whitespace. Asymmetric grids where it adds elegance.
- Gold is a *condiment*, not a sauce. Use it for: eyebrow text on dark sections, 1px horizontal accent lines (32–40px wide), single decorative dots/dividers. Never for buttons or large blocks.
- Subtle noise/grain texture overlay on dark hero sections (SVG fractalNoise filter at low opacity).

### Motion
- Scroll-reveal: opacity 0 → 1 + translateY(30px) → 0, 0.9s ease, IntersectionObserver triggered, staggered.
- Hover lifts on cards: `translateY(-6px)` + soft shadow, 0.5s cubic-bezier(0.22,1,0.36,1).
- Nav link underline: width 0 → 100% on hover, 0.4s.
- **NO** parallax. **NO** marquee scrollers. **NO** typewriter effects. **NO** cursor followers.
- **All motion** wrapped in `@media (prefers-reduced-motion: no-preference)` OR globally disabled inside `@media (prefers-reduced-motion: reduce)`.

---

## 3. Asset Strategy

### Logo & Favicon (already exist)
- `/assets/logo.png` — Edmond Law logo (use in nav, hero, footer)
- `/assets/favicon.png` — site favicon

### Font Awesome (use sparingly, tastefully)
Add to `<head>` of every page:
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer">
```

**Where to use icons (and ONLY here):**
- Practice area cards: one thin icon per area, ~32px, in `--steel`. Suggested: `fa-thin` or `fa-light` if available, else `fa-regular`. Specifically:
  - Conveyancing → `fa-house`
  - Civil & Criminal Litigation → `fa-scale-balanced`
  - Estate Planning → `fa-file-signature`
  - Probate & Administration → `fa-shield-halved`
  - Family Law → `fa-people-roof`
  - Personal Injury → `fa-hand-holding-medical`
  - Contracts & Labour → `fa-handshake`
- Contact page info blocks: `fa-location-dot`, `fa-phone`, `fa-envelope`, `fa-clock` (16px, navy).
- Social footer links: `fa-brands fa-instagram`, `fa-brands fa-facebook`, `fa-brands fa-whatsapp`.
- Floating WhatsApp button: `fa-brands fa-whatsapp`.
- Form submit button: trailing `fa-arrow-right` (14px).

**Do NOT use icons for:** decorative flourishes, bullet points, navigation items, headings, anywhere else.

### Stock Photography (Unsplash hotlinks)
Unsplash CDN URLs are stable and hotlink-permitted under their license. Use these exact URLs. If you prefer to download them locally, run `curl -o assets/images/[name].jpg "[url]"` and update the `src`. **Always include descriptive alt text.**

**Hero (Home page) — Kingston/Caribbean legal context:**
- `https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=1600&q=80` — modern law office interior, warm tones
- Alt: "Modern law office interior with bookshelves and natural light"

**About page hero — handshake/professional:**
- `https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80` — professional handshake, business setting
- Alt: "Two professionals shaking hands, symbolising trust and partnership"

**Practice Areas page hero — gavel/courthouse (tasteful):**
- `https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1600&q=80` — courthouse columns, architectural
- Alt: "Classical courthouse architecture with columns"

**Team page — placeholder portraits (replace when client sends real photos):**
- `https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80` — professional woman portrait
- `https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&q=80` — professional man portrait
- `https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80` — professional woman portrait
- Alt: "Portrait of [Attorney Name], Attorney-at-Law at Edmond Law"

**Blog hero & sample post imagery:**
- `https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80` — open book with pen, scholarly
- `https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1600&q=80` — house keys on contract, conveyancing context

**Contact page — office exterior/interior feel:**
- `https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80` — clean modern office space

**About page — Jamaica/Caribbean context (use one):**
- `https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1600&q=80` — Caribbean coastline, atmospheric

> **Image performance rules:** every `<img>` gets `loading="lazy"` (except above-the-fold hero), explicit `width` and `height` attributes to prevent CLS, and meaningful alt text. Hero images use `fetchpriority="high"`.

---

## 4. Site Architecture (multi-page)

```
edmondlaw/
├── index.html                 ← Home
├── about.html                 ← About / Our Story
├── practice-areas.html        ← Overview of all 7 practice areas
├── team.html                  ← Attorneys
├── contact.html               ← Contact + form + map
├── blog/
│   ├── index.html             ← Blog landing (list of posts)
│   └── understanding-conveyancing-jamaica.html  ← Sample post + template
├── 404.html                   ← Custom 404 (GitHub Pages serves this)
├── assets/
│   ├── css/styles.css         ← shared stylesheet
│   ├── js/main.js             ← shared scripts (nav toggle, reveal observer, year)
│   ├── logo.png
│   ├── favicon.png
│   └── images/                ← downloaded stock + future client photos
├── CNAME                      ← contains: edmondlaw.org
├── robots.txt
├── sitemap.xml
└── README.md
```

### Page-by-page section spec

**A) `index.html` — Home**
1. **Sticky nav** (shared component) — logo left, links right (Home · About · Practice Areas · Attorneys · Insights · Contact), "Consult Now" CTA button at end. Hamburger under 980px.
2. **Hero** — full-viewport, navy gradient background, hero image right column at 40% opacity overlay, eyebrow + h1 with italic emphasis + sub + dual CTA (primary "Book a Consultation" → contact.html, ghost "Chat on WhatsApp"). Tagline pull-quote card on the right.
3. **Trust strip** — three or four small stat blocks (Years Combined Experience · Practice Areas · Parishes Served · Client Satisfaction). Subtle, navy on bone background.
4. **About preview** — 2-column: short "Our Story" teaser + image + "Learn more about us →" link to about.html.
5. **Practice areas grid** — 7 cards (3 columns desktop, 1 column mobile), each with Font Awesome icon, area name, 2-sentence description, "Learn more →" link to that section anchor on practice-areas.html.
6. **Why Edmond Law** — 3-column value-prop block: "Responsive" / "Rigorous" / "Respectful" (or similar — write real copy). Each with a small icon.
7. **Team preview** — 3 attorney cards with photo, name, role. "Meet the full team →" link.
8. **Testimonials** — 2-column grid of 2 quotes (placeholder Google reviews).
9. **CTA banner** — full-width navy section, large h2 "Tell us about your matter.", subtitle, primary button to contact.html.
10. **Footer** (shared) — 4-column: brand+tagline · quick links · practice areas · contact info + social icons. Bottom bar: copyright, disclaimer, "Site by [your name]".

**B) `about.html` — About / Our Story**
1. Sticky nav (shared)
2. Page hero — smaller than home hero, page title + breadcrumb-style eyebrow
3. **Our Story** — long-form 3-4 paragraph narrative about the firm's founding, philosophy, commitment to Jamaican clients
4. **Our Values** — 4-block grid (Integrity · Accessibility · Excellence · Discretion) with icons and short descriptions
5. **Our Approach** — 3-step process: "Listen → Plan → Execute" with icons and copy
6. **Why we exist** — pull quote section, large editorial typography
7. **Community / Mission** — short section about serving Portmore and St. Catherine
8. CTA banner → contact
9. Footer (shared)

**C) `practice-areas.html` — Practice Areas**
1. Sticky nav
2. Page hero with stock courthouse image
3. **Intro paragraph** — one paragraph framing the firm's full-service offering
4. **Practice area sections** — 7 long-form sections, one per area, each with:
   - Icon + h2
   - 2-3 paragraph description (SEO-optimised, real copy)
   - Bulleted "What we handle" list (4-6 items)
   - "Discuss your matter →" CTA link
   - Alternating background (ivory / bone) for visual rhythm
   - Anchor links (`#conveyancing`, `#litigation`, `#estate-planning`, `#probate`, `#family-law`, `#personal-injury`, `#contracts`)
5. CTA banner → contact
6. Footer

**D) `team.html` — Attorneys**
1. Sticky nav
2. Page hero
3. **Intro** — one paragraph about the team's collective experience
4. **Attorney cards** — large editorial layout, one per attorney, alternating image-left/image-right:
   - Nicholas M.D. Edmond — name, role, bio paragraph (write something dignified and plausible — founding partner, areas of focus), photo
   - Tamica N. Edmond — same structure
   - Michelle A. Daley — same structure
5. **Join us / Careers** — small section ("We're always interested in meeting talented Jamaican legal professionals. Send your CV to careers@edmondlaw.org" or similar — confirm email with client)
6. CTA banner → contact
7. Footer

**E) `contact.html` — Contact**
1. Sticky nav
2. Page hero — "Begin the Conversation"
3. **Contact grid** — 2 columns:
   - Left: 4 info blocks with icons (Visit · Call · Email · Hours), each with full details
   - Right: enquiry form with fields: Name · Email · Phone · Area of Law (select with all 7 areas + Other) · Message · Submit. Form action: `https://formspree.io/f/REPLACE_WITH_FORMSPREE_ID` (leave placeholder, document in README)
4. **Map** — embedded Google Map iframe of Big Buy Plaza, full-width strip, 400px tall on desktop / 280px on mobile
5. **FAQ accordion** — 5-6 common questions (consultation cost, response time, parking, after-hours, confidentiality, do you handle X). Use `<details>` / `<summary>` for native accessibility.
6. Footer

**F) `blog/index.html` — Insights landing**
1. Sticky nav (paths adjusted for `../`)
2. Page hero — "Insights & Guides — Jamaican law, in plain language."
3. **Featured post** — large card with image, eyebrow category, title, excerpt, read time
4. **Post grid** — 2-column grid of post cards (initially 1-3 posts, easy to add more)
5. **Newsletter signup** — small section with email input → Formspree (optional, can stub for now)
6. Footer

**G) `blog/understanding-conveyancing-jamaica.html` — Sample post + template**
- Must contain clearly-marked `<!-- ★EDIT★ -->` comment blocks for: title/meta/schema, post metadata line, body content
- Sticky nav, breadcrumb (Home / Insights / Post Title), hero image, h1, lede paragraph, body with h2 subheadings, pull quote, end-of-post CTA card linking to contact, related posts strip (can stub), footer
- JSON-LD `BlogPosting` schema in head
- ~800-1000 words of real content on conveyancing in Jamaica

**H) `404.html`** — branded, friendly: "This page took a wrong turn. Let's get you back." Logo, message, button to home. Match site styling.

---

## 5. SEO Strategy

### On-page (every page)
- Unique `<title>`: `[Page-specific] | Edmond Law — Attorneys-at-Law, Portmore Jamaica`
- Unique `<meta name="description">` 150-160 chars, includes target keyword + location
- Canonical URL
- OG + Twitter cards
- One `<h1>` per page, multiple `<h2>` for sections
- Semantic HTML throughout (`<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`)
- Internal linking: every page links to contact, practice-areas, and home in nav + footer

### Schema (JSON-LD in `<head>`)
- **All pages:** `Organization` schema with NAP (name/address/phone)
- **Home + Contact:** `LegalService` schema with full details, opening hours, geo coordinates, services list
- **Team page:** `Person` schema for each attorney
- **Blog posts:** `BlogPosting` schema with headline, author, datePublished, image
- **All pages:** `BreadcrumbList` schema

### Target keywords
- Primary: "lawyer Portmore", "attorney St Catherine Jamaica", "Edmond Law"
- Practice-specific: "conveyancing lawyer Jamaica", "probate attorney Portmore", "personal injury lawyer Kingston", "family law attorney Jamaica", "criminal defence lawyer Portmore", "real estate attorney Jamaica"
- Long-tail: "how to buy property in Jamaica", "what does a probate attorney do Jamaica", "Edmond Law Portmore reviews"

### Files
- `robots.txt` — allow all, point to sitemap
- `sitemap.xml` — list every public page with `<lastmod>`, `<priority>`
- Submit to Google Search Console after launch

---

## 6. Accessibility (WCAG 2.2 AA Checklist)

Test every page against this list before marking it done:

- [ ] Skip-to-main-content link as first focusable element
- [ ] All images have meaningful `alt` (decorative images use `alt=""` and `aria-hidden="true"`)
- [ ] All form fields have associated `<label>` elements (not placeholder-as-label)
- [ ] All form fields have appropriate `autocomplete` attributes
- [ ] Form errors announced via `aria-live="polite"` region
- [ ] Color contrast ≥ 4.5:1 for body text, ≥ 3:1 for large text and UI components (verify navy on ivory, steel on ivory, ivory on navy)
- [ ] Focus indicator visible on every interactive element (`:focus-visible` outline 2px steel-light, offset 3px)
- [ ] Logical tab order
- [ ] All functionality keyboard-accessible (test by tabbing through every page)
- [ ] Mobile menu uses `aria-expanded`, `aria-controls`
- [ ] Accordion uses semantic `<details>`/`<summary>`
- [ ] Headings in logical order — never skip levels
- [ ] Language declared: `<html lang="en">`
- [ ] Page title unique and descriptive
- [ ] No content relies on color alone to convey meaning
- [ ] Touch targets ≥ 44×44px on mobile
- [ ] `prefers-reduced-motion` respected
- [ ] Font sizes scalable (use `rem`, never `px` for text)
- [ ] No autoplay media
- [ ] Embedded iframe (map) has `title` attribute

---

## 7. Mobile-First Implementation Rules

- Write CSS mobile-first: base styles target mobile, use `@media (min-width: 768px)` and `@media (min-width: 1024px)` to scale up.
- **Breakpoints:** `540px` (large phone), `768px` (tablet), `980px` (small laptop), `1200px` (desktop).
- Hamburger menu under 980px. Slide-down panel from nav, full-width links, large tap targets.
- Hero collapses to single column under 980px. Hero image moves above text on mobile, but kept simple — no heavy overlay.
- Practice grid: 3 cols → 2 cols (768px) → 1 col (540px).
- Team grid: 3 cols → 1 col (768px), max-width 380px centered.
- Disable scroll-reveal stagger on mobile (just fade-in, no translate).
- Disable any background-attachment: fixed (broken on iOS).
- Floating WhatsApp button: 60px desktop, 54px mobile, bottom-right with safe-area-inset.
- Forms: full-width inputs, larger padding on mobile (16px font minimum to prevent iOS zoom).
- Test mentally on: iPhone SE (375px), iPhone 14 (390px), Pixel (412px), iPad (768px), desktop (1440px).

---

## 8. Conversion / CTA Strategy

Every page must have at minimum:
1. **Primary CTA in hero** — "Book a Consultation" or page-appropriate variant
2. **Secondary CTA in nav** — "Consult Now" button always visible
3. **Mid-page CTA** — at least one inline link or button funneling to contact
4. **End-of-page CTA banner** — full-width navy section before footer with large h2 and primary button
5. **Floating WhatsApp button** — present on every page

CTA copy bank (rotate, don't repeat):
- "Book a Consultation"
- "Tell Us About Your Matter"
- "Begin the Conversation"
- "Speak with an Attorney"
- "Discuss Your Case"
- "Get in Touch"

---

## 9. Code Quality Standards

- HTML: 2-space indentation, semantic tags, ARIA only when semantic HTML can't express it
- CSS: BEM-ish naming (`.practice-card`, `.practice-card__icon`, `.practice-card--featured`), CSS custom properties for all colors and key sizes, mobile-first media queries, no `!important` except for utility overrides
- JS: vanilla ES6+, no dependencies, defer-loaded, IntersectionObserver for reveals, event delegation where sensible
- Comments: file headers explain purpose, complex sections have brief inline comments
- All file paths relative, no leading slashes (so it works on GitHub Pages subpaths during preview)
- LF line endings, UTF-8

---

## 10. Build Order (do it in this sequence)

1. `assets/css/styles.css` — establish all design tokens, base typography, shared components (nav, footer, buttons, cards)
2. `assets/js/main.js` — nav toggle, reveal observer, footer year
3. `index.html` — Home page (use this to validate your shared components)
4. Shared nav and footer markup — once you nail it on Home, copy-paste to every other page (yes, manually; no template engine)
5. `about.html`
6. `practice-areas.html`
7. `team.html`
8. `contact.html`
9. `blog/index.html`
10. `blog/understanding-conveyancing-jamaica.html`
11. `404.html`
12. `robots.txt`, `sitemap.xml`, `CNAME`
13. `README.md` — deployment + Formspree + DNS notes (the human will provide a separate launch playbook)

After each page: re-read Section 6 (accessibility checklist) and Section 7 (mobile rules). Do not skip this.

---

## 11. Things That Are NOT in Scope (do not invent)

- No e-commerce, no payment processing
- No client portal or login system
- No appointment booking calendar (Calendly etc.) — the contact form is the entry point
- No live chat widget — the WhatsApp float button is the live channel
- No multi-language support
- No dark mode toggle
- No newsletter system beyond a basic form-stub

---

## 12. Final Reminder

The client meets with my human collaborator tomorrow. This site needs to make them say *"this looks more expensive than what I paid."* Restraint is the brief. Premium is the brief. Trust is the brief.

Sweat the details. Read this file twice. Build it once.

---

# ═══════════════════════════════════════════════════
# ADDENDUM v2 — MANAGING DIRECTOR REVISIONS
# This section OVERRIDES anything above that conflicts.
# Read this section every time you touch the project.
# ═══════════════════════════════════════════════════

## A1. Clean URLs — directory-based routing (mandatory)

GitHub Pages serves `index.html` from any folder as the folder URL. Restructure so URLs have no `.html` suffix:

```
edmondlaw/
├── index.html                       → edmondlaw.org/
├── about/index.html                 → edmondlaw.org/about/
├── practice-areas/index.html        → edmondlaw.org/practice-areas/
├── team/index.html                  → edmondlaw.org/team/
├── contact/index.html               → edmondlaw.org/contact/
├── blog/index.html                  → edmondlaw.org/blog/
├── blog/understanding-conveyancing-jamaica/index.html
├── 404.html                         (GitHub Pages serves this verbatim — keep flat)
```

**Consequences:**
- Every internal link uses trailing-slash form: `href="/about/"`, `href="/practice-areas/#conveyancing"`, `href="/blog/"`
- Asset paths from nested pages: use **root-relative paths** everywhere (`/assets/css/styles.css`, `/assets/logo.png`) so the same markup works at any depth. GitHub Pages with a custom domain serves from root, so this works.
- Update `sitemap.xml` to reflect trailing-slash URLs.
- Update canonical tags on each page to the trailing-slash form.
- Test 404 page path resolution — 404.html stays at project root.

## A2. Font Awesome — FREE TIER ONLY

The previous icon list pulled from Pro tiers that 404 on the free CDN. Use **only** Font Awesome Free 6 Solid and Brands. Verified-free replacements:

| Where | Icon class (verified free) |
|---|---|
| Conveyancing & Real Estate | `fa-solid fa-house-chimney` |
| Civil & Criminal Litigation | `fa-solid fa-scale-balanced` |
| Estate Planning | `fa-solid fa-file-signature` |
| Probate & Administration | `fa-solid fa-shield-halved` |
| Family Law | `fa-solid fa-people-group` |
| Personal Injury | `fa-solid fa-briefcase-medical` |
| Contracts & Labour | `fa-solid fa-handshake` |
| Contact — Visit | `fa-solid fa-location-dot` |
| Contact — Call | `fa-solid fa-phone` |
| Contact — Email | `fa-solid fa-envelope` |
| Contact — Hours | `fa-solid fa-clock` |
| Star rating | `fa-solid fa-star` |
| Form submit arrow | `fa-solid fa-arrow-right` |
| WhatsApp float & social | `fa-brands fa-whatsapp` |
| Instagram | `fa-brands fa-instagram` |
| Facebook | `fa-brands fa-facebook-f` |
| Menu (hamburger) | `fa-solid fa-bars` / `fa-solid fa-xmark` |
| Quote accent on testimonials | `fa-solid fa-quote-left` |

**Do NOT use** any `fa-thin`, `fa-light`, `fa-duotone`, or `fa-sharp` prefixes — those are Pro-only. If an icon doesn't render, the fallback is always `fa-solid` with a different glyph from the free set.

CDN stays as specified in Section 3 (cdnjs Font Awesome 6.5.1).

## A3. Hero image carousel (background)

Replace the static hero treatment on `/` with a crossfading image carousel that sits BEHIND the navy gradient, not in front.

**Implementation:**
- Stack of `<img>` elements absolutely positioned inside `.hero`, filling it, `object-fit: cover`.
- Navy gradient from Section 2 remains as a `::before` overlay ON TOP of the images, at `opacity: 0.82` so images are subtly visible through it.
- Images themselves render at `opacity: 0.35` (behind the gradient, so effective visibility is ~18% — atmospheric, not competing with text).
- CSS-only crossfade: 4 images, each with a `@keyframes` animation running 32s total (8s visible + crossfade), staggered with `animation-delay`. No JS carousel library.
- `animation-play-state: paused` inside `@media (prefers-reduced-motion: reduce)` — show only first image.
- Mobile: still runs but use only 3 images (lighter), and each image is `loading="eager"` for the first one only, rest `loading="lazy"`.
- Hero text (`h1`, sub, CTAs) sits at `z-index: 2` with the navy overlay at `z-index: 1` and images at `z-index: 0`. Text remains fully readable — verify contrast of ivory text against the darkened overlay is ≥ 7:1.

**Carousel images (Unsplash, verified):**
```
https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=80  (law books)
https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80  (handshake)
https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1600&q=80  (courthouse columns)
https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80  (office interior)
```

All get `alt=""` and `aria-hidden="true"` since they're decorative.

## A4. Testimonials — real reviews from Google Business Profile

**Summary stat block** (place above the testimonial grid on Home page and at the top of the testimonials section on any page that features them):

```
★★★★★  4.9  ·  Based on 27 Google Reviews
```

Render as: 5 filled gold (`--gold`) `fa-star` icons, "4.9" in large Cormorant Garamond 2.5rem, then "Based on 27 Google Reviews" in Inter Tight uppercase eyebrow style. Link the whole block to the Google Business Profile: `https://share.google/NLSxKn3SosNcQP3cL` (opens in new tab, `rel="noopener"`).

**Use these 6 real reviews** (all 5★, trimmed to ~40-55 words each for uniform card heights — do NOT fabricate or embellish; only shorten with ellipses where marked):

1. **Camile Edwards** — "It's not very often that you truly feel you've received excellent value for your money, but that was absolutely the case with this legal service. We worked directly with Mrs. Tamica Edmond, who was professional, attentive, and highly accommodating throughout the process."

2. **Kevern Edwards** — "I sought legal representation recently from Edmond Law. They were easily reached by way of telephone. They were understanding, clear and acted promptly with deliverables. Mrs. Tamica Edmond can be described as a consummate professional in service delivery."

3. **Natalee Campbell** — "I would highly recommend anyone to use Edmond Law services. They explained the entire process of the transaction before we began and were very meticulous throughout. Mrs. Edmond was very professional and took care of me like family."

4. **Howard Angus** — "I have had the most unbelievable service with Edmond Law Firm over the last 2 years. The communication and professionalism was of very high standard… Tamica was always quite reassuring which made me less apprehensive. World class service."

5. **Grantley Christie** — "The level of service we experienced from Ms Edmond was top class. She responded to WhatsApp messages sent on weekends, provided answers to all our queries, and remained calm and professional throughout. For real estate transactions, check Edmond Law."

6. **N. B.** — "Tamica Edmond has helped me through a very difficult and stressful situation. She was always available at short notice and never failed to listen attentively… She's been a tireless advocate for me and I could not have wished for a better lawyer."

**Home page:** show 3 reviews (cards 1, 3, 4).
**Create a dedicated testimonials section on Contact page** OR **add a fuller testimonials block to About page** showing all 6.

**Review CTA block** (place directly after the testimonial grid on every page that shows testimonials):

```
Worked with us? We'd love to hear about your experience.
[ Leave a Google Review → ]  ← button, secondary style
```

Button links to: `https://share.google/NLSxKn3SosNcQP3cL` with `target="_blank"` and `rel="noopener"`. Font Awesome `fa-solid fa-star` icon leading the button label.

## A5. Remove team photo initials placeholder

The previous `.team-photo[data-initials]` pseudo-element that rendered "NE / TE / MD" letters must be **removed entirely**. Team cards should show actual `<img>` elements using the Unsplash placeholder portraits from Section 3 (or real photos when client provides them). If an image fails, background gradient shows — do not overlay initials. Update CSS to remove the `::after { content: attr(data-initials) }` rule.

## A6. Final QA pass — hunt these specific issues

Before declaring any page done, walk through this list:

1. **Text collision:** Inspect every heading that uses clamp()-sized typography — on narrow viewports, does any `h1` or `h2` collide with adjacent elements? Particularly check the hero pull-quote card on iPhone SE (375px).
2. **Stray `text-decoration`:** Nav links should never show default browser underlines; only the animated hover underline. Check all `<a>` resets.
3. **Double margins collapsing wrong:** Between sections, verify you're not doubling vertical padding. Use one `section { padding: clamp(...) 0 }` rule and don't add top margin to first children.
4. **Font Awesome render check:** If any icon shows a square glyph or question mark, the class name is wrong or the icon is Pro-only. Swap from the A2 table.
5. **Form label alignment:** On the contact form, verify labels, inputs, and validation messages stack cleanly on mobile without overlap.
6. **Footer social icons:** Must be actual anchors with `aria-label`, not bare icons.
7. **Focus ring consistency:** Tab through every page — every interactive element should show the same `--steel-light` outline. Buttons inside dark sections need a lighter outline for visibility.
8. **Map iframe:** Must have `title` attribute and `loading="lazy"`. On mobile, ensure the iframe doesn't overflow horizontally.
9. **Carousel on mobile:** Verify the hero carousel doesn't cause horizontal scroll. `overflow: hidden` on `.hero`.
10. **WhatsApp float vs. footer:** On short pages, the floating button can collide with footer content. Add `padding-bottom: 100px` on mobile to the last section before footer, or hide the float when the footer is in view via IntersectionObserver.
11. **`aria-current="page"`** on the active nav link of every page — needed for screen readers and useful for CSS styling the current page.
12. **Blog post "template markers":** Ensure the `★EDIT★` comment blocks are present, clearly labelled, and that a developer can duplicate the file and ship a new post in under 10 minutes.
13. **Schema validation:** Paste each page's JSON-LD into Google's Rich Results Test mentally — ensure no required fields missing, LegalService has address + telephone + openingHours, BlogPosting has datePublished + author + headline + image.
14. **Duplicate IDs:** Make sure no element ID is repeated within a page (IntersectionObserver and anchor scrolling both break otherwise).
15. **Meta description lengths:** Each page 140–160 chars. Cut or pad as needed.
16. **No TODO / FIXME / placeholder copy** remaining in any file except the Formspree ID placeholder.

## A7. Build order override

Because of the directory restructure, adjust Section 10 build order:

1. `assets/css/styles.css` and `assets/js/main.js` first
2. `index.html` (root)
3. Once Home validates: create `about/`, `practice-areas/`, `team/`, `contact/`, `blog/` directories and drop an `index.html` into each
4. Blog sample post goes inside its own subfolder: `blog/understanding-conveyancing-jamaica/index.html`
5. `404.html` stays flat at root
6. Regenerate `sitemap.xml` with trailing-slash URLs

## A8. Summary for the developer

You are implementing a directory-routed multi-page static site with: free-tier-only Font Awesome icons, a crossfading hero background carousel under the navy gradient, a real Google review system with aggregate rating badge and a "Leave a Review" CTA linking to `https://share.google/NLSxKn3SosNcQP3cL`, real attorney photos (no initials fallback), and a rigorous 16-point final QA pass. The addendum overrides any conflicting instruction above. The client meeting is tomorrow. Ship it clean.
