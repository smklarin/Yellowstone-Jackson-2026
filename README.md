# Yellowstone + Jackson Trip Companion — App 2.1

Mobile-first static PWA for the Sept. 23–27, 2026 Yellowstone / Jackson trip.

## What changed in App 2.1


App 2.1 is a focused usability update:

- Day selectors now use one consistent two-line format (weekday above date) on both Today and Map views.
- Wildlife sightings can be removed from the Recent Sightings list; removing one also corrects the species count.
- Custom animals can be added to the Wildlife tab and are persisted locally on the device.
- Recent Sightings now shows up to 12 entries for easier correction of accidental taps.

## App 2.0 foundation

The main addition is a **Saturday Module** that is independent of the Yellowstone V2 / V3 / V4 itinerary selector. Saturday can be changed without affecting Thursday or Friday.

### Saturday options

- **High Alpine** — Aerial Tram + Top of the World + Rock Springs Loop.
  - No driving from Teton Village.
  - Top of the World: 0.5 mi round trip / about 20 min / easy.
  - Rock Springs Loop: 3.5 mi round trip / about 1.5–2 hr / moderate.
  - Target hotel return: roughly 12:30–1:00 PM.
- **Grand Teton** — South Jenny Lake + shuttle boat + Hidden Falls + Inspiration Point.
  - Route is forced south/east through Jackson and Moose rather than assuming Moose-Wilson Road access.
  - Via shuttle boat, Inspiration Point is about 1.8 mi round trip with about 550 ft of climbing.
  - Target hotel return: roughly 1:15–1:45 PM; 2:15 PM is treated as the latest target.
- **Local Trails** — Saratoga + Seven Bridges and/or Valley Trail from Teton Village.
  - Saratoga: 1.66 mi round trip / about 0.5–1 hr / moderate.
  - Seven Bridges: 0.78 mi one way / about 1–2 hr / easy.
  - Valley Trail: 1.5 mi from the resort base to the GTNP trailhead.
  - No driving; easiest option to shorten on wedding day.

The selected Saturday plan is saved locally and updates:

- Saturday timeline
- Saturday route / pins on the map
- Saturday summary in Trip Info
- Done-state keys, so each Saturday option keeps its own completion state

Saturday hiking/lift segments are shown as a **dashed purple planning line** where appropriate. These are schematic and are not turn-by-turn trail navigation.

## Existing core features

- V2 / V3 / V4 Yellowstone itinerary selector, persisted in localStorage.
- **Overview** comparing V2 vs V3 geographically and by destinations.
- MapLibre map with no clustering; pins remain geographically locked.
- Route line for the selected plan/day. The app attempts online road-following geometry from OSRM where appropriate, caches successful geometry, and falls back to built-in waypoint lines.
- Current-position GPS marker using the phone/browser geolocation API.
  - Blue = recent / reasonably accurate fix.
  - Yellow = stale or low-accuracy fix.
  - Gray = no recent fix / last known location.
- Network state shown separately from GPS state.
- V4 manual condition scenarios: Normal, Poor Weather, Snow/Ice, Road Closure, Running Late.
- Today/preview itinerary timeline with Done state.
- Wildlife sighting logger; saves time and location if GPS is available.
- Trip checklist with custom items.
- Apple Maps and Google Maps handoff for individual stops.
- Service worker caches the app shell and runtime resources as they are used.

## Files

- `index.html` — app UI, itinerary data, Saturday Module, maps and GPS logic.
- `manifest.webmanifest` — PWA manifest.
- `sw.js` — app-shell + runtime caching. App 2.0 uses a new cache version and network-first navigation so updates appear more reliably after GitHub Pages deployment.
- `icon-180.png` — iOS home-screen icon.
- `icon-512.png` — PWA icon.

## Deploy / update on GitHub Pages

To update the existing `Yellowstone-Jackson-2026` repo:

1. Replace the files at the repository root with the App 2.0 files.
2. Commit the changes to `main`.
3. Wait for GitHub Pages to finish deploying.
4. Open the Pages URL in Safari and refresh once. If the home-screen PWA was already open, fully close and reopen it after the deployment so the new service worker can take control.

Geolocation requires HTTPS; GitHub Pages satisfies this.

## Important map / offline notes

- The route display is a planning aid, **not a turn-by-turn navigation system**.
- Yellowstone NPS warns that consumer navigation systems can send visitors onto closed or inappropriate roads. Always use official NPS road status for final driving decisions.
- App 2.0 caches map resources that have already been viewed. It does **not yet ship a complete offline Yellowstone/Grand Teton basemap**.
- Current GPS position can continue to update without cellular data because GPS and network connectivity are separate. iOS may pause a web app while it is backgrounded or the phone is locked.
- Saturday trail/lift geometry is deliberately labeled schematic; follow official signs and current trail conditions.

## Itinerary definitions

- **V2 — Grand Prismatic:** Lamar / northern wildlife + Mammoth + Grand Prismatic.
- **V3 — Northern Wildlife:** longer Lamar flexibility + Tower / Calcite / optional Wraith-Undine + Mammoth, no Grand Prismatic.
- **V4 — Flexible Conditions:** fallback logic for poor weather, snow/ice, closures and delays. It is intentionally excluded from the Overview comparison.
- **Saturday Module:** High Alpine / Grand Teton / Local Trails, independent of V2 / V3 / V4.
