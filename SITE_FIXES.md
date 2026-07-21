# DevHouse Site — Fix Spec

Ordered by impact. Each item states the problem, the file, and what to do.

---

## P0 — Costs leads today

### 1. Wrong phone number on the contact page

`src/app/contact/page.tsx:387` renders `+2011434584929`. That's 12 digits after the country code — one too many. The correct number, used by the WhatsApp button (`src/components/WhatsAppButton.tsx:8`), is `+201143584929`.

It's also plain text, so nobody can tap it on mobile.

**Fix:** correct the digits and make both contact rows tappable links:
- Phone → `<a href="tel:+201143584929">`
- Email → `<a href="mailto:contact@devhouse.dev">`

Add a WhatsApp row too, linking to `https://wa.me/201143584929`, since that's the primary channel.

---

### 2. The free-audit lead is stored nowhere

`src/app/api/free-audit/route.ts` emails the submission to `contact@devhouse.dev` and nothing else. If SMTP fails, times out, or the mail lands in spam, that lead is gone permanently — there is no record of it anywhere.

The project already has Mongoose models for other forms (`src/app/models/Contact.ts`, `src/app/models/BuildWebsite.ts`) and a connection helper at `src/lib/mongodb.ts`. The free-audit route uses none of it.

**Fix:**
- Create `src/app/models/FreeAudit.ts` following the existing model pattern, with fields: `name`, `businessName`, `businessType`, `websiteUrl`, `whatsapp`, `frustration`, `createdAt`.
- In the route, save to MongoDB **first**, then send the email.
- Wrap the email send in its own try/catch. If the email fails but the DB write succeeded, still return `{ success: true }` — the lead is safe, and losing the notification is not worth showing the prospect an error.
- Only return a 500 if the DB write itself fails.

---

### 3. No analytics anywhere

No Google Analytics, no Meta pixel, no Vercel Analytics, no conversion tracking. There is currently no way to know whether anyone reaches `/free-audit`, how far they scroll, or where they drop off. Every marketing decision from here is guesswork until this exists.

**Fix:** add Vercel Analytics (simplest, since the site already deploys on Vercel):
- `npm i @vercel/analytics`
- Render `<Analytics />` from `@vercel/analytics/next` inside `<body>` in `src/app/layout.tsx`.

Then fire a conversion event on successful free-audit submission in `src/app/free-audit/page.tsx`, right before `router.push('/free-audit/thank-you')`.

If a Meta pixel is wanted later for ads, add it via `next/script` with `strategy="afterInteractive"`.

---

## P1 — SEO, on a site that sells SEO

### 4. Every page shares one title and one description

`src/app/layout.tsx:9-12` sets a single global title `"DevHouse"` and description `"Your cosmic journey in web development starts here"` — legacy copy that describes nothing the site now offers.

The root cause is bigger than the wording: **every page is a `'use client'` component**, and client components cannot export Next.js `metadata`. So `/pricing`, `/projects`, `/about`, and `/contact` all inherit that same generic title and description. Google sees five near-identical pages.

**Fix — per page** (`/home`, `/about`, `/projects`, `/pricing`, `/contact`, `/free-audit`):
1. Rename the existing client component to `PageNameClient` and move it to its own file (e.g. `src/app/pricing/PricingClient.tsx`), keeping `'use client'` at the top.
2. Make `page.tsx` a server component that exports `metadata` and renders the client component.

Give each page a distinct, keyword-bearing title and description. Suggested:

| Page | Title | Description |
|---|---|---|
| `/home` | Web Design & Development in Egypt \| DevHouse | We build fast, professional websites for businesses in Egypt — online booking, WhatsApp integration, and Google-ready SEO. Delivered in 2 weeks. |
| `/pricing` | Website Design Packages & Pricing in Egypt \| DevHouse | Clear, fixed website packages for Egyptian businesses. No hidden fees. Delivered in 10–21 days. |
| `/projects` | Our Work — Websites We've Built \| DevHouse | Real websites we've delivered for businesses across Egypt, from e-commerce to real estate. |
| `/about` | About DevHouse — Web Developers in Egypt | Three developers building modern, conversion-focused websites for businesses across Egypt. |
| `/contact` | Contact DevHouse — Web Design in Egypt | Talk to us on WhatsApp about your website. Based in Egypt. |
| `/free-audit` | Free Website Audit for Egyptian Businesses \| DevHouse | Get a free personalized video audit of your website within 48 hours. No cost, no commitment. |

Also in `layout.tsx`, add a `metadataBase` of `https://devhouse.dev`, a `title.template` of `%s | DevHouse`, and default `openGraph` / `twitter` card data so shared links render properly on WhatsApp and social — currently they render bare.

---

### 5. No sitemap, no robots.txt

Neither exists, so search engines have no crawl guidance.

**Fix:** add `src/app/sitemap.ts` and `src/app/robots.ts` using Next's built-in file conventions. List all public routes in the sitemap. In robots, allow everything except `/dashboard` and `/build-website` (see item 9).

---

### 6. Local SEO is missing entirely

The site sells "Found on Google" and Google Business Profile setup, but has no `LocalBusiness` structured data of its own.

**Fix:** add a JSON-LD `<script type="application/ld+json">` block in `layout.tsx` describing DevHouse as a `ProfessionalService` — name, url, logo, telephone `+201143584929`, `areaServed: EG`, and the Instagram/LinkedIn/X profiles as `sameAs`.

---

## P2 — Bugs and cleanup

### 7. Error messages are styled green

On the contact page, three validation errors render in `text-green-500` — the success colour:
- `src/app/contact/page.tsx:263` — email errors
- `src/app/contact/page.tsx:319` — phone errors
- `src/app/contact/page.tsx:365` — submit errors

A user who enters a bad phone number sees green text and reasonably assumes it worked. The OTP error at line 297 is correctly red.

**Fix:** change all three to `text-red-500`.

---

### 8. `Footer.tsx` is dead code

`src/components/Footer.tsx` is never imported anywhere in the project. Its LinkedIn and GitHub links point at bare `linkedin.com` and `github.com` homepages, which is why they look broken — but no user has ever seen them.

**Fix — pick one:**
- **Delete the file**, or
- **Wire it up properly:** render it in `layout.tsx` below `{children}`, and replace the links with the real profiles: [instagram.com/devhouse.eg](https://www.instagram.com/devhouse.eg/), [linkedin.com/company/devhouse-eg](https://www.linkedin.com/company/devhouse-eg), [x.com/devhouse_eg](https://x.com/devhouse_eg). Add the WhatsApp number and `contact@devhouse.dev` while there — a footer with contact details on every page helps both conversion and local SEO.

Note it currently renders on `bg-gray-800`, which will clash with the black page backgrounds. Restyle to match.

---

### 9. `/dashboard` and `/build-website` are public and orphaned

`src/app/dashboard/page.tsx` ("Select service") and `src/app/build-website/page.tsx` are reachable by anyone who guesses the URL, are linked from no navigation, and belong to an older version of the product. `/dashboard` links to `/build-app`, which does not exist — that's a 404 waiting to happen.

**Fix:** delete both routes if they're abandoned. If they're meant for later, at minimum add `noindex` metadata and disallow them in `robots.ts` so they don't get crawled and dilute the site.

---

### 10. The OTP gate on the contact form suppresses leads

`src/app/contact/page.tsx` requires a prospect to receive an emailed 6-digit code and type it back in **before** the submit button is even enabled. For a business with zero clients, that is a significant amount of friction to filter spam that isn't arriving yet.

**Fix (recommended):** remove the OTP requirement from the contact form. Keep the API routes if wanted. Replace the anti-spam function with a honeypot field — an input hidden via CSS that real users never fill and bots do; reject the submission server-side if it has a value. Zero friction, catches most bots.

---

### 11. OTP code written to server logs

`src/app/api/verify-otp/route.ts:45` runs `console.log("Verifying OTP:", { email, otp })`, putting live one-time codes and the emails they belong to into Vercel's log stream.

**Fix:** delete that line. (Moot if item 10 removes the flow, but delete it either way.)

---

### 12. OTP routes open a new MongoDB connection per request

`send-otp/route.ts:48` and `verify-otp/route.ts:48` each construct `new MongoClient(uri)`, connect, and close on every call, ignoring the pooled helper at `src/lib/mongodb.ts`. On serverless this exhausts connections under any real traffic.

**Fix:** use the shared helper from `src/lib/mongodb.ts` in both routes and drop the manual `client.close()` calls.

---

### 13. Build trace file committed and publicly served

`public/.next/trace` is tracked in git and sits inside `public/`, so it is served to anyone at `https://devhouse.dev/.next/trace`. It leaks local build paths and timings.

**Fix:** `git rm -r --cached public/.next`, delete the directory, and add `public/.next/` to `.gitignore`.

---

### 14. Portfolio images bypass image optimization

`src/app/projects/page.tsx:92` sets `unoptimized` on the `<Image>` components, so full-size PNG/JPG screenshots ship as-is. `happydent.jpg` and the other screenshots are the heaviest assets on the site, on the page prospects use to judge the work.

**Fix:** remove `unoptimized` and let Next optimize them. The `onError` fallback to `s0.wp.com/mshots` needs `s0.wp.com` added to `images.remotePatterns` in `next.config.ts` to keep working.

---

### 15. Splash page adds a click before the real homepage

`src/app/page.tsx` is a logo-and-"Get Started"-button splash screen with a deliberate 500 ms delay before routing to `/home`. Anyone landing on `devhouse.dev` sees no information about the business, must click, then wait.

This is also the page that ranks for the brand name, and it has almost no crawlable text.

**Fix:** make `/home` the content served at `/`, and either delete the splash or move it to a dedicated route. If it stays, keep it out of the primary entry path.

---

### 16. About page copy is from an earlier business

`src/app/about/page.tsx` reads "Launching into the Digital Frontier," "revolutionize the digital landscape," "cutting-edge technologies," with core values of Innovation / Precision / Collaboration / Agility. Every other page speaks plainly about customers and money. This one speaks in abstractions and mentions no customer, price, or timeline.

**Fix:** rewrite the copy. The facts worth stating: three founders, all in Egypt, all generalists — clients talk directly to the people building the site, not to an account manager. Leave the layout and animation as they are; this is a copy change only.

---

## Suggested order

1. Items 1, 2, 3 — the phone number, lead persistence, and analytics. Small, and each one is currently losing or hiding leads.
2. Items 4, 5, 6 — metadata refactor and SEO basics. Item 4 is the largest job here because it touches every page.
3. Items 7–16 — bugs and cleanup, safe to batch.

Run `npm run build` and `npm run lint` after the item 4 refactor; splitting client and server components is where something is most likely to break.
