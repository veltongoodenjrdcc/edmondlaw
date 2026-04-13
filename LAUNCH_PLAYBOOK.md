# Edmond Law — Build & Launch Playbook

Everything you need to ship the site, point the domain, hook up analytics, and add blog posts later. Written so you can do every step from your phone.

---

## 1. What's in this build

```
edmondlaw/
├── index.html                              ← main site
├── CNAME                                   ← tells GitHub Pages to serve edmondlaw.org
├── robots.txt                              ← lets search engines crawl + finds sitemap
├── sitemap.xml                             ← list of pages for Google
├── assets/
│   ├── logo.png                            ← Edmond Law logo
│   └── favicon.png                         ← browser tab icon
└── blog/
    ├── index.html                          ← blog landing page
    └── understanding-conveyancing-jamaica.html  ← sample post + template
```

**Built-in features:**
- WCAG 2.2 AA: skip link, semantic HTML, ARIA labels, keyboard-focusable cards, visible focus rings, `prefers-reduced-motion` support, sufficient colour contrast, alt text on every image, form labels.
- SEO: title/meta/canonical/OG/Twitter tags, JSON-LD `LegalService` + `BlogPosting` schema, sitemap, robots.txt, semantic headings, keyword-aware copy targeting "lawyer Portmore", "conveyancing Jamaica", "probate attorney", etc.
- Mobile-first: hamburger menu, stacked layouts under 980px, `viewport-fit=cover`, larger tap targets, animations disabled where they'd hurt mobile, floating WhatsApp button.
- Conversion-focused: every section ends in a CTA path that funnels to the contact form, phone, or WhatsApp.
- Restrained motion: scroll-reveals, hover lifts, navy gradient hero — no gimmicks.

---

## 2. Before you push — replace 2 things

Open `index.html` and search for:

1. **`REPLACE_WITH_YOUR_ID`** — paste your Formspree form ID (only the ID, not the whole URL). Get it at formspree.io → New Form → copy the part after `/f/`.
2. **`G-XXXXXXXXXX`** — won't be there yet. You'll add the GA4 snippet in Section 5.

That's it. The site works as-is.

---

## 3. Pushing to GitHub Pages (from your phone)

You'll use the **GitHub mobile app** or **Safari/Chrome on github.com**.

1. **Create the repo:** github.com → New repository → name it `edmondlaw` → Public → Create.
2. **Upload files:** On the new empty repo page, tap "uploading an existing file" (or Add file → Upload files). Upload **everything** from the `edmondlaw` folder, preserving the structure. The mobile web UI accepts folder uploads — if it doesn't on your device, upload `index.html`, `CNAME`, `robots.txt`, `sitemap.xml` at root, then use Add file → Create new file and type `assets/logo.png` as the filename to create the folder, then upload images. Same for `blog/`.
3. **Enable Pages:** Settings → Pages → Source: "Deploy from a branch" → Branch: `main` / `(root)` → Save. Wait 60 seconds.
4. **Custom domain:** still in Settings → Pages → Custom domain: type `edmondlaw.org` → Save. The `CNAME` file is already in the repo so it'll be respected.
5. After DNS propagates (Section 4), check **"Enforce HTTPS"** in the same Pages settings.

The site will first appear at `https://YOUR-USERNAME.github.io/edmondlaw/` — note that URL, you need it for the `www` CNAME below.

---

## 4. GoDaddy DNS — step by step (do this with the client)

You'll do this on **the client's device**, logged into their GoDaddy account. Have them log in first, then navigate to:

**My Products → Domains → edmondlaw.org → DNS** (or "Manage DNS")

You'll see a list of existing records. **Take a screenshot of the current state before changing anything** — that's your safety net.

### Records to add / replace

**A) Delete or edit any existing A records on `@`** (the apex). GoDaddy usually has one pointing to a parking page — get rid of those. Then add these four A records:

| Type | Name | Value             | TTL    |
|------|------|-------------------|--------|
| A    | @    | 185.199.108.153   | 1 Hour |
| A    | @    | 185.199.109.153   | 1 Hour |
| A    | @    | 185.199.110.153   | 1 Hour |
| A    | @    | 185.199.111.153   | 1 Hour |

**B) Add a CNAME for `www`:**

| Type  | Name | Value                          | TTL    |
|-------|------|--------------------------------|--------|
| CNAME | www  | YOUR-USERNAME.github.io        | 1 Hour |

(Replace `YOUR-USERNAME` with your actual GitHub username. **No `https://`, no trailing slash.**)

**C) Leave MX records alone** if Edmond Law uses email at `@edmondlaw.org` — those handle mail, don't touch them.

**D) Save** — GoDaddy will say "DNS updates in progress." Propagation is usually 10–60 minutes, sometimes a couple hours.

### Verify
On your phone, open `dnschecker.org`, enter `edmondlaw.org`, select A record. Once you see the GitHub IPs in green across most regions, go back to GitHub → Settings → Pages and tick **Enforce HTTPS**. Done.

---

## 5. GA4 + Search Console setup

### Google Analytics 4
1. Go to `analytics.google.com` → Admin → Create → Account → name it "Edmond Law".
2. Create a Property: name "edmondlaw.org", time zone Jamaica, currency JMD.
3. Pick "Web" as the platform → URL `https://edmondlaw.org` → Stream name "Main Site".
4. You'll get a **Measurement ID** like `G-ABC1234XYZ`. Copy it.
5. In `index.html`, paste this snippet **right before `</head>`** — replace the ID:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC1234XYZ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-ABC1234XYZ', { 'anonymize_ip': true });
</script>
```

6. Commit the change in GitHub. GA4 should show "data received" within an hour.

### Google Search Console
1. Go to `search.google.com/search-console` → Add Property → URL prefix → `https://edmondlaw.org`.
2. Verification: pick **HTML tag** method. It gives you a `<meta>` tag — paste it in `<head>` of `index.html`, commit, then click Verify. (Alternative: Google Analytics method works automatically once GA4 is live.)
3. Once verified: Sitemaps → enter `sitemap.xml` → Submit.
4. Google will start crawling within a few days.

### Recommended next-day actions
- Claim/update the **Google Business Profile** for Edmond Law — same address, hours, phone, website. This is the single biggest local-SEO win for a Jamaican law firm.
- Ask the first 5 happy clients for Google reviews. Replace the placeholder testimonials in `index.html` with real quoted reviews.

---

## 6. Adding blog posts later (the easy part)

The template is built so you can add a new post in 3 steps from your phone via github.com:

1. **Duplicate the sample.** In the repo, navigate to `blog/understanding-conveyancing-jamaica.html` → tap the "..." menu → "Copy" or just View raw, copy the content, then "Add file → Create new file" with name `blog/your-new-slug.html` and paste.
2. **Edit the four `★EDIT★` blocks** at the top of the file (clearly marked in comments): title/meta, post metadata line, body content, and any new schema dates.
3. **Add a card to `blog/index.html`** — duplicate an existing `<a class="post-card">` block and update the link, title, and excerpt. Then add a `<url>` line to `sitemap.xml`. Commit.

That's it. New post live in under 10 minutes.

---

## 7. Things still to swap when assets arrive

- **Team photos:** in `index.html`, find each `<div class="team-photo" data-initials="...">` and replace with `<img src="assets/nicholas.jpg" alt="Nicholas M.D. Edmond, Attorney-at-Law" style="width:100%;height:100%;object-fit:cover">`. Drop the photos in `assets/`.
- **Office photo for the About section:** the `.about-visual` div currently shows a navy gradient with a quote. Swap it for a real office or attorney photo the same way.
- **Real testimonials:** scrape 2 from the Google Business Profile, replace the placeholder quotes in the testimonials section, update the "Verified Google Review" attribution to a first name + initial.

---

## 8. Pre-launch checklist

- [ ] Formspree ID pasted in
- [ ] All files pushed to GitHub
- [ ] GitHub Pages enabled, custom domain set
- [ ] GoDaddy DNS records updated
- [ ] HTTPS enforced (after propagation)
- [ ] GA4 snippet added
- [ ] Search Console verified, sitemap submitted
- [ ] Tested on actual phone (iOS Safari + Android Chrome)
- [ ] Form tested with a real submission
- [ ] WhatsApp float button tested
- [ ] Map loads correctly
- [ ] All nav links scroll to right sections
- [ ] Client has seen and approved

You've got this.
