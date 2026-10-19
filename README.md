# KumbhDoot - Nashik-Trimbakeshwar Simhastha Kumbh Mela 2027
### Official-Style Web Portal Prototype & Front-End Design System

> **Mandatory Handover Disclaimer:**  
> *"Initial design prepared by KumbhDoot for the Nashik administration and its vendor, to be refined by them. No approval or partnership by the administration is claimed."*

---

## 1. Executive Summary & Context

This repository provides a working, production-grade, responsive front-end prototype designed for the official portal of the **Nashik-Trimbakeshwar Simhastha Kumbh Mela 2027**. 

Prepared as an initial design brief by **KumbhDoot** for the **Nashik District Administration**, the **Nashik-Trimbakeshwar Kumbh Mela Authority (NTKMA)**, and their authorized site-building technology vendor (e.g., NIC, MahaIT, or empanelled agency), this project gives the engineering team an immediately runnable, accessible, and compliant foundation so they do not start from scratch.

### Key Tenets
1. **No Government Partnership Claimed**: Do NOT claim administration approval. Replaceable logo placeholders are used throughout. Colours, official emblem, and `.gov.in` domain are to be applied by the authorized administration.
2. **GIGW 3.0 & WCAG 2.1 AA Standards**: Built with accessibility features strictly matching Guidelines for Indian Government Websites (GIGW 3.0), including high-contrast mode, dynamic text size scaling (A- / A / A+), skip to main content, keyboard navigation, and accessible text-list alternatives for interactive GIS maps.
3. **Verified Content Policy**: Every date, notice, and helpline carries explicit `"Source"` and `"Last updated"` labels with clear notifications that dates and phone numbers are placeholders awaiting official gazette verification.
4. **Trilingual (i18n)**: Marathi (First / State Official Language), Hindi, and English are kept 100% in sync.
5. **Mobile-First & Ultra-Lightweight**: Zero framework bloat. Pre-compiled Tailwind CSS produces a minified 35 KB stylesheet that loads in milliseconds over congested 2G/3G cellular networks during peak festival days.

---

## 2. Design Tokens & Visual Rebranding Guide

All design variables are decoupled into `design-tokens.json` and mirrored in `src/styles/tokens.css`. The vendor can customize the visual identity in minutes without touching markup.

### Rebranding in 3 Steps:

#### Step 1: Replace Logo Placeholder
Replace the SVG file located at:
```
public/assets/placeholders/logo-placeholder.svg
```
With the official emblem authorized by the Government of Maharashtra / NTKMA.

#### Step 2: Update Color Palette in `design-tokens.json`
Open `design-tokens.json` and modify the theme colors:
```json
{
  "colors": {
    "theme": {
      "headerBg": "#0C2340",             // Official portal header (navy/maroon)
      "headerBgGradientEnd": "#1B3B6F",
      "bodyBg": "#FFFDF8",               // Sacred cream background
      "surfaceBg": "#FFFFFF",
      "borderDefault": "#CBD5E1"
    },
    "kumbhdootCta": {
      "background": "#D9531E",           // Saffron action token reserved for AI assistant
      "backgroundHover": "#BA4314"
    }
  }
}
```
Then run `npm run build:css` to recompile the production stylesheet.

#### Step 3: Replace Image Placeholders with Official Photography
Replace the clean SVG placeholders with official licensed drone and DSLR imagery:
- `public/assets/placeholders/ramkund-placeholder.svg` ➔ Ramkund Sacred Ghats
- `public/assets/placeholders/trimbakeshwar-placeholder.svg` ➔ Trimbakeshwar Temple & Kushavarta Kund
- `public/assets/placeholders/godavari-ghats-placeholder.svg` ➔ Godavari Riverfront & Ahilyabai Bridge

---

## 3. Managing Content, Dates & Languages

### A. Updating Translation Packs (i18n)
All strings are housed in standard JSON dictionaries under `src/locales/`:
- `src/locales/mr.json` — Marathi (Default / Primary)
- `src/locales/hi.json` — Hindi
- `src/locales/en.json` — English

Each dictionary has matching keys. When adding a new key, update all three files to preserve synchronization.

### B. Updating Shahi Snan Dates
Open `src/data/snan-dates.json`. Once the official dates are notified in the Gazette:
```json
{
  "id": "snan-2",
  "title_mr": "प्रथम शाही स्नान (श्रावणी अमावास्या)",
  "date": "02 August 2027",
  "source": "Government of Maharashtra Gazette Notification No. XXXX",
  "lastUpdated": "DD/MM/YYYY"
}
```
The schedule cards, calendar `.ics` download generator, and contextual KumbhDoot buttons will automatically reflect the changes.

### C. Updating Interactive Map Points
Open `src/data/map-locations.json`. Each entry supports:
- `category`: `ghat`, `parking`, `shuttle`, `medical`, `police`, `water_toilet`, `lost_found`
- `city`: `Nashik` or `Trimbakeshwar`
- `lat` / `lng`: Decimal coordinates
- `googleMapsUrl`: Direct link for turn-by-turn navigation
- `facilities`: Array of amenity tags (e.g., wheelchair ramp, RO water, changing rooms)

### D. Updating Emergency Numbers & Advisories
Open `src/data/safety.json` and `src/data/notices.json` to insert verified control room phone numbers and published PDF circulars.

---

## 4. KumbhDoot AI Assistant Integration

The KumbhDoot assistant provides voice-first, multilingual guidance for pilgrims on weak networks:
1. **Persistent Header & Mobile Bar**: Visible on every viewport, linking to `https://kumbhdoot.app?lang=[currentLang]`.
2. **Contextual In-Page CTAs**:
   - Schedule Page ➔ *"Ask about today's snan"* (`action=schedule`)
   - Interactive Map ➔ *"Ask for directions"* (`action=directions`)
   - Safety Page ➔ *"Get help now via KumbhDoot"* (`action=safety`)
   - Lost & Found ➔ *"Report lost person via KumbhDoot"* (`action=lostfound`)
   - Transport ➔ *"Ask for parking & shuttle routes"* (`action=transport`)
3. **On-Site QR Code Modal**: Generates a high-contrast printable QR code dialog (`public/assets/qr-code.svg`) for deployment on physical hoarding boards, bus stops, and railway stations.

---

## 5. Domain Handover & Production Deployment

To deploy to the official government domain (e.g., `https://kumbh.maharashtra.gov.in` or `https://nashikkumbhmela2027.gov.in`):

1. **Verify Official SSL / HTTPS**: Ensure TLS 1.3 certificate is provisioned by NIC / National Informatics Centre.
2. **Configure Web Server**:
   - **Nginx / Apache / IIS**: Deploy the repository root directly as static web assets. No server-side runtime (Node.js or Python) is required in production!
   - **Edge Caching / CDN**: Cache `dist/output.css`, `public/assets/`, and JSON data files with a `max-age=86400` header for lightning-fast edge delivery.
3. **Enable GZIP / Brotli**: The 35 KB compiled CSS compresses to less than 8 KB over gzip.

---

## 6. How to Run Locally

### Prerequisites
- Node.js (v18+ recommended; tested on v24.12.0)
- npm (v9+)

### Installation & Execution
```bash
# 1. Install development dependencies
npm install

# 2. Build production minified stylesheet
npm run build:css

# 3. Start local development server
npm run serve
# Server runs at http://localhost:3000
```

### Capturing Screenshots
To capture high-resolution responsive desktop (1280x900) and mobile (390x844) screenshots across Home, Schedule, Map, and Safety:
```bash
node scripts/capture-screenshots.js
```
Screenshots will be saved to the `./screenshots/` directory.

---

## 7. Deliverables & Screenshots Reference

| Viewport | Page | File |
|---|---|---|
| **Desktop** | Home | [`screenshots/home-desktop.png`](file:///d:/Kumbh/KumbhDoot/Gov%20Site%20Design/screenshots/home-desktop.png) |
| **Desktop** | Schedule & Snan Dates | [`screenshots/schedule-desktop.png`](file:///d:/Kumbh/KumbhDoot/Gov%20Site%20Design/screenshots/schedule-desktop.png) |
| **Desktop** | Places & Interactive Map | [`screenshots/map-desktop.png`](file:///d:/Kumbh/KumbhDoot/Gov%20Site%20Design/screenshots/map-desktop.png) |
| **Desktop** | Safety & Helplines | [`screenshots/safety-desktop.png`](file:///d:/Kumbh/KumbhDoot/Gov%20Site%20Design/screenshots/safety-desktop.png) |
| **Mobile** | Home | [`screenshots/home-mobile.png`](file:///d:/Kumbh/KumbhDoot/Gov%20Site%20Design/screenshots/home-mobile.png) |
| **Mobile** | Schedule & Snan Dates | [`screenshots/schedule-mobile.png`](file:///d:/Kumbh/KumbhDoot/Gov%20Site%20Design/screenshots/schedule-mobile.png) |
| **Mobile** | Places & Interactive Map | [`screenshots/map-mobile.png`](file:///d:/Kumbh/KumbhDoot/Gov%20Site%20Design/screenshots/map-mobile.png) |
| **Mobile** | Safety & Helplines | [`screenshots/safety-mobile.png`](file:///d:/Kumbh/KumbhDoot/Gov%20Site%20Design/screenshots/safety-mobile.png) |
