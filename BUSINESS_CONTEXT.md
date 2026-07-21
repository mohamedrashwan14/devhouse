# DevHouse — Business Context

## 1. Company

| Field | Value |
|---|---|
| Name | DevHouse |
| Business | Web design & development studio |
| Location | Egypt (all 3 founders) |
| Founded | Site copyright reads 2025; repo active since Apr 2025 |
| Stage | Early-stage, self-funded |
| Clients to date | 0 paying clients |
| Revenue to date | 0 |
| Team | 3 co-founders, all generalists — no fixed roles or titles, everyone does sales, design, build, and support |
| Marketing budget | 3,000 EGP/month (≈ $60) |
| Geography served | Egypt focus; open to clients outside Egypt (Gulf, remote) |

### Contact & channels

| Channel | Value |
|---|---|
| Website | devhouse.dev |
| Email | contact@devhouse.dev |
| WhatsApp | +20 114 358 4929 (`wa.me/201143584929`) |
| Instagram | [@devhouse.eg](https://www.instagram.com/devhouse.eg/) |
| LinkedIn | [devhouse-eg](https://www.linkedin.com/company/devhouse-eg) |
| X / Twitter | [@devhouse_eg](https://x.com/devhouse_eg) |

---

## 2. Portfolio

**HappyDent** — [happydenteg.com](https://happydenteg.com) — dental/medical equipment distributor, Egypt
Full e-commerce platform: product catalog with EGP pricing, clinical case studies, demo booking system, warranty checker, maintenance request flow.

**Black Diamond** — [blackdiamondegy.com](https://www.blackdiamondegy.com/) — construction & real estate
Project portfolio, services, and team pages.

Proof comes from the live sites themselves — prospects visit and judge the work directly. There are no client testimonials, reviews, or performance metrics.

`/public/static/Images` also contains `IbnSinaMarket.png`, `kalbstore.png`, `kalbwottaClinic.jpg`, and `optima.png`, none of which appear on the site.

---

## 3. Lead Funnel

The site's single conversion goal is `/free-audit`. Every CTA across every page links there.

**The offer:** a free website audit — review of the prospect's current site (or absence of one), delivered as a personalized video within 48 hours, with a reply on WhatsApp within 24 hours. Page states "100% free, no sales pitch."

**Form fields captured:**
- Name *(required)*
- Business name *(required)*
- Type of business *(required, free text)*
- Current website URL *(optional)*
- WhatsApp number *(required)*
- "What's your biggest frustration with your online presence right now?" *(required, free text)*

**Backend:** submissions email `contact@devhouse.dev` via nodemailer ([route](src/app/api/free-audit/route.ts)), then redirect to `/free-audit/thank-you`. No CRM, no database record, no autoresponder to the prospect.

**Process advertised on the homepage:** Free Audit → Design → Build & Launch → Support.

The funnel is built but has not been used — no traffic sources active, no submissions, no analytics installed.

---

## 4. Website Copy

**Homepage H1:** "Modern Websites That Actually Grow Your Business"

**Homepage subhead:** "We build fast, professional websites for businesses in Egypt — with online booking, WhatsApp integration, and Google-ready SEO. Delivered in 2 weeks."

**Problem section:** "Is your business losing customers to a bad website?" / "Most businesses in Egypt still rely on outdated websites, a Facebook page, or nothing at all. Meanwhile, customers are searching Google right now for a business like yours — and choosing the one that looks more professional online."

**Three benefit cards:** "Designed to Convert" · "Online Booking & WhatsApp" · "Found on Google"

**Closing CTA:** "Ready to stop losing customers to a bad website?"

**Pricing H1:** "Pricing Built for Egyptian Businesses"

**About page** (older copy, different register from the rest of the site): "Launching into the Digital Frontier" / "At DevHouse, we're a startup with big dreams. Our mission is to revolutionize the digital landscape with innovative solutions and cutting-edge technologies." Core values listed: Innovation, Precision, Collaboration, Agility.

**Meta description (site-wide):** "Your cosmic journey in web development starts here"

**Form placeholder examples** — business types: Restaurant, Clinic, Gym, Real Estate, Law Firm. Business names: "Nile Real Estate, Cairo Gym, Blue Door Restaurant."

**Language:** site is English-only. Bilingual Arabic/English is sold as a deliverable (Growth tier and up).

---

## 5. Brand Assets

| Asset | Value |
|---|---|
| Primary logo | `/public/static/Images/logoblackb2.png` (navbar + audit page) |
| Other logo files | `logo1.png`, `LogoBlackB.png` |
| Background | Black `#000000` |
| Accent | Teal `#17b6a7`, hover `#14a090` |
| Body text | Tailwind gray-300 |
| WhatsApp green | `#25D366` |
| Fonts | Inter (body), Orbitron (headings, brand) |
| Site pages | `/` (splash) · `/home` · `/about` · `/projects` · `/pricing` · `/contact` · `/free-audit` · `/free-audit/thank-you` |
| Persistent UI | Floating WhatsApp button on every page |

**Stack (internal):** Next.js 15, React 19, Tailwind, Framer Motion, MongoDB/Mongoose, nodemailer, Vercel.

---

## 6. Known Site Issues

1. **Wrong phone number on the contact page.** [contact/page.tsx:387](src/app/contact/page.tsx:387) shows `+2011434584929` — one digit too many. Correct number is `+201143584929`.
2. Footer links point to generic `linkedin.com` and `github.com`, not DevHouse profiles ([Footer.tsx](src/components/Footer.tsx)).
3. Meta description is legacy copy unrelated to current site content.
4. About page copy is from an earlier version of the business and reads differently from every other page.
5. No analytics or tracking installed — no Google Analytics, no Meta pixel, no conversion tracking.
6. No blog or content section exists, though SEO is sold as a deliverable.
7. Contact form requires email OTP verification before submission; validates Egyptian mobile format (010/011/012/015 + 8 digits).
8. Free-audit submissions are email-only; nothing is stored or tracked.

---

## 7. Open Questions

- Status of the Ibn Sina Market, Kalb Store, Kalb Wotta Clinic, and Optima assets
- Whether HappyDent and Black Diamond were paid work, and at what price
- How those two clients were originally acquired
- Which competitors exist in this market
- Legal/invoicing setup for taking client payments
- Realistic concurrent-build capacity for 3 people
