# MEDBUILDS by Rotstruck — Landing Page PRD

## Original Problem Statement
Build a completely new premium SaaS-style landing page for "MEDBUILDS by Rotstruck", a hospital management and EMR platform for Indian hospitals and clinics. Light theme only (light blue/cyan/soft teal gradients, #F7FCFF–#D5F3FF backgrounds), heavy glassmorphism, layered multi-device mockups, floating glass vitals cards, Outfit + Manrope typography, conversion-focused storytelling. One long page: Sticky Header → Hero → Product Overview → Role-Based Workspaces → Patient Journey → Analytics & Insights → Pricing → Why MEDBUILDS → Security & Integrations → Contact/Demo CTA → Footer.

## Architecture
- Frontend: React (CRA + craco), Tailwind CSS, lucide-react icons, sonner toasts. Single-page landing at `/app/frontend/src/`, section components in `src/components/` (Header, Hero, Mockups, Overview, Workspaces, Journey, Analytics, Pricing, WhySecurity, Contact, Footer, Reveal).
- Backend: FastAPI (`/app/backend/server.py`), `/api` prefix. Endpoints: `GET /api/` health, `POST /api/demo-requests`, `GET /api/demo-requests`.
- DB: MongoDB via MONGO_URL/DB_NAME env, `demo_requests` collection (uuid ids, no ObjectId leakage).

## User Personas
- Hospital owner/administrator evaluating a hospital OS
- Doctor / nursing lead assessing daily usability
- Front-desk/operations manager comparing HMS options

## Core Requirements (static)
- All 10 sections in specified order with specified headings and copy tone
- Hero: 3 eyebrow pills, gradient headline, 2 CTAs, credibility pills, laptop/tablet/phone mockups, 4 floating glass vitals cards (Heart Rate 78 bpm ECG, ICU Monitoring, Beds 73.6%, SpO₂ 97%)
- Glassmorphism, soft shadows, pale orbs, float/fade-up/pulse animations, hover lift
- Pricing: Clinic / Hospital (Most popular) / Enterprise, custom pricing
- Demo form: hospital, name, role, city, email, phone/WhatsApp, challenge → "Schedule my demo"
- data-testid on all interactive elements

## Implemented
- 2026-10-20: Full landing page — all 10 sections, device mockup composition, floating glass cards with float/ECG/pulse animations, scroll fade-up reveals, sticky glass header with mobile drawer, demo request form persisting to MongoDB with toast + success state, footer with live status badge. Fonts (Outfit/Manrope), title and meta description set in index.html.

## Verification Done
- curl: `GET /api/` OK; `POST /api/demo-requests` returns success+id; `GET /api/demo-requests` returns stored record.
- Screenshots at 1366/768/375px across hero, workspaces, journey, pricing, contact; form submitted via UI → success panel + toast confirmed.

## Backlog
- P1: Email notification on new demo request (Resend integration)
- P1: Admin view page for demo requests (or simple auth-protected list)
- P2: SEO deep setup (OG image, JSON-LD, sitemap) via farm-seo-setup skill
- P2: Real customer logos / testimonials strip
- P2: Blog/resources section

## Next Tasks
1. Wire Resend email alerts for demo requests (needs integration_expert playbook)
2. Add OG/social share image and JSON-LD structured data
3. Add testimonials section once real quotes are available

## Credentials
No auth in the app. See /app/memory/test_credentials.md.
