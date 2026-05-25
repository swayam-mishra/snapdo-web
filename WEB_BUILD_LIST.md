# Snapdo Web — Complete Page Build List

## Build Priority Order

```
Phase 1 (MVP — get it functional)
  Landing → Signup/Login → Onboarding → Dashboard → Orders → Extract → Invoices → API Keys

Phase 2 (polish + trust)
  Privacy + Terms + Cookie consent → Pricing → Analytics → Settings (billing/profile)

Phase 3 (growth + developer adoption)
  Docs/Quickstart → Webhooks → Changelog → Use cases → Blog
```

---

## TIER 1 — Public / Marketing

### `/` — Landing Page

Sections:
- **Navbar** — Logo, Features, Pricing, Docs, Login, "Get Started" CTA button
- **Hero** — Headline, sub-headline, primary CTA ("Start for free"), secondary CTA ("See a demo"), WhatsApp chat mockup showing raw Hinglish message → structured order transformation
- **Social proof bar** — "Built for kiranas, distributors, tiffin services, and more"
- **Problem section** — 3-column: the chaos (WhatsApp chaos), the friction (manual entry), the risk (no GST record)
- **How it works** — 3 steps: paste chat → AI extracts order → download invoice. Animated or static diagram
- **Feature highlights** — Cards: Hinglish AI, GST invoices, Order history, API-first, Multi-tenant, Rate limits
- **Pricing preview** — Teaser, link to /pricing
- **Testimonials / trust** — Placeholder for 2-3 quotes (fill with real users later)
- **CTA section** — Full-width banner: "Start managing orders in 5 minutes"
- **Footer** — Links to all legal pages, social icons, copyright

---

### `/features` — Features Deep Dive

Sections:
- Hinglish & regional language understanding (with example snippets)
- GST invoice generation (CGST/SGST/IGST breakdown visual)
- Async extraction + webhooks for developers
- Order analytics dashboard preview
- API-first architecture (code snippet teaser)
- Multi-tenant isolation explainer

---

### `/pricing` — Pricing Page

Sections:
- 3-tier pricing table: Free / Pro / Enterprise
- Feature comparison grid (all rows: orders/month, invoices, API rate limits, webhooks, support)
- FAQ accordion — "Can I change plans?", "Do you store my WhatsApp data?", "Is GST compliance guaranteed?"
- CTA at bottom

---

### `/use-cases` — Use Case Pages

Sub-pages: `/use-cases/kirana`, `/use-cases/distributor`, `/use-cases/tiffin`

Each sub-page:
- Hero tailored to that business type
- Sample WhatsApp conversation specific to that use case
- Resulting structured order + invoice mockup
- CTA

---

### `/about` — About Page

Sections:
- Founder story (solo, India SMB context)
- Mission statement
- Tech philosophy (API-first, India-specific)
- Contact link

---

### `/contact` — Contact Page

- Contact form (name, email, message, business type)
- Email address
- Expected response time

---

### `/changelog` — Changelog / What's New

- Reverse-chronological list of releases
- Each entry: version, date, bullets of additions/fixes/removals

---

### `/blog` — Blog Index *(optional for launch, useful for SEO)*

- Card grid of posts
- Tags: Product, Tutorial, India SMB, API

### `/blog/:slug` — Blog Post

---

## TIER 2 — Legal & Compliance

These are **required** even at MVP stage for any production SaaS.

---

### `/privacy` — Privacy Policy

Must cover:
- What data you collect (order content, business profile, usage data)
- Why you collect it (service delivery, invoice generation)
- Who you share it with (Anthropic via API calls — important, Claude processes their chat data)
- Data retention period
- User rights (access, deletion)
- Indian IT Act 2000 / PDPB 2023 compliance note
- GDPR note (if any EU users)
- Contact email

---

### `/terms` — Terms of Service

Must cover:
- What Snapdo is and isn't (not a certified GST filing tool, just invoice generation)
- User responsibilities (they own their data)
- Acceptable use (no abuse of the API)
- Service availability / SLA disclaimer
- Termination clause
- Governing law: India / Karnataka

---

### `/cookies` — Cookie Policy

Must cover:
- Types of cookies: strictly necessary, analytics, preferences
- What you use: session cookies for auth, analytics (if any), consent cookie itself
- How to opt out
- Link to consent management

---

### `/refund` — Refund Policy

- Free tier: N/A
- Pro tier: 7-day refund window policy
- Enterprise: case-by-case
- How to request a refund

---

### `/security` — Security Page

- Encryption in transit (HTTPS/TLS)
- Encryption at rest (PostgreSQL, Azure Blob)
- Authentication model (JWT + API keys)
- Multi-tenant isolation
- PII handling (phone/email masking in logs)
- Responsible disclosure email

---

### `/dpa` — Data Processing Agreement *(required for B2B Pro/Enterprise tiers)*

- Controller vs. processor roles
- Sub-processors list (Anthropic, Azure, Neon)
- Data transfer safeguards
- Breach notification commitments

---

## TIER 3 — Auth Flow

### `/signup` — Sign Up

- Email + password, or magic link
- "By signing up you agree to [Terms] and [Privacy Policy]" checkbox — required before submit
- Redirect to onboarding after first signup

---

### `/login` — Log In

- Email + password
- "Forgot password?" link
- Magic link option
- Redirect to dashboard if already authenticated

---

### `/forgot-password` — Forgot Password

- Email input
- "Check your inbox" confirmation state

---

### `/reset-password?token=…` — Reset Password

- New password + confirm
- Token validation (expired/invalid state)

---

### `/verify-email?token=…` — Verify Email

- Auto-verifies on load
- Success state → redirect to dashboard
- Expired/invalid state → resend link option

---

## TIER 4 — Onboarding Flow

### `/onboarding` — Multi-step wizard

Don't send new users straight to a blank dashboard.

- **Step 1 — Business Profile**: Business name, GST number (optional), state (for CGST/SGST vs IGST), currency (default INR)
- **Step 2 — Product Catalog** *(optional, skippable)*: Add common items (name, default unit, default price)
- **Step 3 — Get your API key**: Display generated API key, copy button, docs link
- **Step 4 — Test it**: Paste a sample WhatsApp message, see live extraction result
- **Step 5 — Done**: Confetti moment, link to dashboard + link to docs

---

## TIER 5 — App Dashboard (Authenticated)

### `/dashboard` — Overview

Widgets:
- Total orders (all time)
- Orders this month
- Revenue this month (INR)
- Pending orders count
- Recent orders table (last 5, with status pills)
- Quick action: "Extract new order" button

---

### `/orders` — Orders List

- Searchable, filterable table (status, date range, customer)
- Columns: Order ID, Customer, Items summary, Total (INR), Status, Created date, Actions
- Pagination
- Bulk status update
- Export to CSV button

---

### `/orders/:id` — Order Detail

- Full order breakdown (items, quantities, units, prices)
- Customer info
- Extraction confidence score (from AI)
- Status update dropdown (pending / confirmed / fulfilled / cancelled)
- "Generate Invoice" button → triggers POST /api/generate-invoice
- Invoice download link (if generated)
- Raw extracted data toggle (for debugging)
- Edit mode for order items

---

### `/customers` — Customers List

- Table: Name, Total orders, Total revenue, Last order date
- Search by name
- Click through to customer detail

---

### `/customers/:id` — Customer Detail

- Customer name, phone (if captured)
- All orders from this customer
- Total revenue from customer
- Order frequency trend (simple)

---

### `/invoices` — Invoices List

- Table: Invoice number (INV-2026-XXX), Order ID, Customer, Amount, GST type (CGST/SGST or IGST), Date, Status
- Download PDF button per row
- Search / filter

---

### `/invoices/:id` — Invoice Detail

- Full invoice preview (rendered in-browser, matches the PDF)
- CGST / SGST / IGST line items
- Download PDF button (signed URL from Azure)
- Re-generate button

---

### `/extract` — Manual Order Extraction *(power user tool)*

- Paste single message or full chat log
- Toggle: single message vs. multi-message chat
- Submit → show structured result
- "Save as order" button
- "Clear" button
- Show confidence score and extraction notes

---

### `/analytics` — Analytics

Charts / metrics:
- Orders over time (line chart, daily/weekly/monthly toggle)
- Revenue over time
- Top customers by order count
- Top customers by revenue
- Orders by status (donut chart: pending / confirmed / fulfilled / cancelled)
- Average order value

---

### `/async-jobs` — Async Jobs & Dead Letter Queue *(for power users / developers)*

- List of queued/processing extraction jobs
- Failed jobs (DLQ) with error message
- Retry individual job button
- Retry all failed button
- Job status: queued / processing / completed / failed

---

## TIER 6 — Settings

All under `/settings/*` with a shared sidebar nav.

---

### `/settings/profile` — Business Profile

- Business name, GST number, state, address
- Logo upload (used on invoices)
- Default currency
- Save button

---

### `/settings/organization` — Organization

- Org name, slug/ID
- Tier display (Free / Pro / Enterprise)
- Danger zone: Delete organization

---

### `/settings/api-keys` — API Keys

- List of active API keys (name, created date, last used, masked value)
- Create new key (name input → show full key once, then mask)
- Revoke key (confirm dialog)
- Usage note: "Use API keys for server-to-server integrations"

---

### `/settings/webhooks` — Webhooks

- List of configured webhook endpoints (URL, events subscribed to, status)
- Add new webhook: URL, event types (order.created, order.updated, job.completed, job.failed)
- Test webhook (sends a test payload)
- Delete webhook
- Delivery logs (last 20 deliveries, status code, timestamp)

---

### `/settings/billing` — Billing & Plan

- Current plan display (Free / Pro / Enterprise) with feature list
- Usage this month (API calls, orders, invoices)
- Upgrade CTA (links to /pricing or inline plan selector)
- Payment method (when billing is live)
- Invoice history (when billing is live)

---

### `/settings/notifications` — Notifications

- Email notification toggles: new order extracted, job failed, DLQ threshold hit, weekly summary
- Webhook failure alerts

---

## TIER 7 — Developer / Docs

### `/docs` — API Documentation

Can be external (Swagger UI / Mintlify) but needs a route:
- Authentication (JWT vs API key)
- All endpoints with request/response schemas
- Code examples (cURL, Node.js, Python)
- Idempotency-Key usage
- SSE event format for async jobs

---

### `/docs/quickstart` — Quickstart Guide

- 5-minute integration guide
- Install SDK (if you build one) or raw cURL
- Extract your first order
- Generate your first invoice

---

### `/docs/webhooks` — Webhook Guide

- Event types and payload shapes
- How to verify webhook signatures (if you add HMAC signing)
- Retry behavior
- Example server code

---

## TIER 8 — Error & Utility Pages

### `/404` — Not Found

- Friendly message, link home

### `/500` — Server Error

- "Something went wrong on our end" message, retry CTA

### `/maintenance` — Maintenance Mode

- "We'll be back shortly" with estimated time

---

## Global Components

Build these before the pages — everything depends on them.

| Component | Notes |
|---|---|
| **Cookie Consent Banner** | Bottom-of-screen, accept/reject, persists choice in localStorage. Blocks analytics cookies until accepted. |
| **Navbar** (public) | Logo, links, login/signup CTAs, mobile hamburger |
| **Sidebar** (app) | Collapsible, all app nav links, org switcher, user avatar + logout |
| **Toast / Notification system** | Success, error, warning, info variants |
| **Confirmation Dialog** | Used for destructive actions (revoke key, delete order, etc.) |
| **Empty states** | Every list page needs one: icon + message + CTA |
| **Loading skeletons** | For every table and card that fetches data |
| **Plan gate** | Component that wraps Pro/Enterprise-only UI with an upgrade prompt |

---

## Page Count Summary

| Tier | Count |
|---|---|
| Public / Marketing | 8+ |
| Legal & Compliance | 6 |
| Auth | 5 |
| Onboarding | 1 (multi-step) |
| App Dashboard | 9 |
| Settings | 6 |
| Docs | 3 |
| Error / Utility | 3 |
| **Total** | **~41 routes** |
