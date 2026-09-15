# Yellowstone + Jackson Trip Companion — v1

Mobile-first static PWA for the Sept. 23–27, 2026 Yellowstone / Jackson trip.

## What's in v1

- V2 / V3 / V4 itinerary selector, persisted in localStorage.
- **Overview** comparing V2 vs V3 geographically and by destinations.
- MapLibre map with **no clustering**; map pins are geographically locked and scale with zoom.
- Route line for the selected plan/day. The app tries to retrieve road-following geometry from OSRM when online, caches successful route geometry locally, and falls back to the built-in waypoint line if routing is unavailable.
- Current-position GPS marker using the phone/browser geolocation API.
  - Blue = recent / reasonably accurate fix.
  - Yellow = stale or low-accuracy fix.
  - Gray = no recent fix / last known location.
- Network state shown separately from GPS state: GPS can continue to work without cellular data.
- V4 manual conditions scenarios: Normal, Poor Weather, Snow/Ice, Road Closure, Running Late.
- Today/preview itinerary timeline with Done state.
- Wildlife sighting logger; saves time and location if GPS is available.
- Trip checklist with custom items.
- Apple Maps and Google Maps handoff for individual stops.
- Service worker caches the app shell and runtime resources as they are used.

## Files

- `index.html` — full app, data, UI and mapping logic.
- `manifest.webmanifest` — PWA manifest.
- `sw.js` — app-shell + runtime caching.
- `icon-180.png` — iOS home-screen icon.
- `icon-512.png` — PWA icon.

## Deploy on GitHub Pages

Same workflow as the restaurant-map prototype:

1. Put these files at the repository root.
2. Commit/push to `main`.
3. In GitHub Pages, deploy from the `main` branch and `/ (root)`.
4. Open the Pages URL in Safari on iPhone and use **Share → Add to Home Screen**.

Geolocation requires HTTPS; GitHub Pages satisfies this.

## Important map / offline notes

- The route display is a planning aid, **not a turn-by-turn navigation system**.
- Yellowstone NPS warns that consumer navigation systems can send visitors onto closed or inappropriate roads. Always use official NPS road status for final driving decisions.
- v1 caches map resources that have already been viewed. It does **not yet ship a complete offline Yellowstone/Grand Teton basemap**. That is the main offline-map improvement for a later version.
- Current GPS position can continue to update without cellular data because GPS and network connectivity are separate. iOS may pause a web app while it is backgrounded or the phone is locked.

## v1 itinerary definitions

- **V2 — Grand Prismatic:** Lamar / northern wildlife + Mammoth + Grand Prismatic.
- **V3 — Northern Wildlife:** longer Lamar flexibility + Tower / Calcite / optional Wraith-Undine + Mammoth, no Grand Prismatic.
- **V4 — Flexible Conditions:** fallback logic for poor weather, snow/ice, closures and delays. It is intentionally excluded from the Overview comparison.

## Recommended next iteration after phone testing

1. Dedicated packaged offline basemap for Yellowstone + Grand Teton.
2. Live NPS road status / weather data with a visible freshness timestamp.
3. More detailed routing and route-progress logic after validating actual iPhone GPS behavior.
4. Refine visual hierarchy and stop details based on real-world use.
