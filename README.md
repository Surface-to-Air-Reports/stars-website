# Surface to Air Reports (STARs)

Public-facing React frontend for Surface to Air Reports — tracks and visualizes low-altitude aircraft activity. Users can browse statistics, search flight sessions, view affected-area maps, check rankings, and file complaints.

Built with Create React App, React 19, React Router v7, MUI Joy + MUI X (charts, date pickers), Leaflet / Mapbox for maps. Consumes a separate REST backend.

---

## Setup

### Prerequisites

- **Node.js** 18+ recommended (`react-scripts 5` requires ≥14; React 19 / MUI 7 work best on 18 or 20+). No `.nvmrc` pinned. Dev tested on v22.
- **npm** 9+ (ships with Node 18+).

### Install

```bash
git clone <repo-url>
cd stars-website
npm install
```

### Backend API

Frontend reads from an external REST API. Configured via env var:

- `REACT_APP_API_BASE_URL` — base URL for the backend. Default: `https://api.stars80027.com`.

Override in a local `.env.local` when pointing at a dev backend:

```
REACT_APP_API_BASE_URL=http://localhost:8000
```

### Run (dev)

```bash
npm start
```

Serves on `http://localhost:3000` with hot reload.

### Build (prod)

```bash
npm run build
```

Outputs static bundle to `build/`.

---

## Project layout

```
stars-website/
├── public/            Static assets served as-is
│   ├── index.html     HTML shell
│   ├── manifest.json  PWA manifest
│   ├── robots.txt
│   └── cdn/           Bundled data + images (logos, CSV/JSON datasets, map placeholder)
├── src/
│   ├── index.js       React entry, renders <App/>
│   ├── index.css      Global styles
│   ├── App.js         Router + theme provider + layout shell
│   ├── App.test.js    CRA smoke test
│   ├── setupTests.js  Jest DOM setup
│   ├── reportWebVitals.js   Perf metrics hook
│   ├── components/
│   │   ├── public/    Page-level route components
│   │   └── reusable/  Shared UI (header, footer, toggles, pagination)
│   └── utils/         API client + data fetchers + formatters
├── package.json
└── .gitignore
```

---

## Files

### Root

- **package.json** — deps + CRA scripts (`start`, `build`, `test`, `eject`).
- **.gitignore** — ignores `node_modules`, build output, env files, lockfiles.
- **LICENSE** — license text.

### `public/`

- **index.html** — CRA HTML template, `<div id="root">` mount.
- **manifest.json** — PWA icons/name.
- **robots.txt** — crawler rules.
- **cdn/** — static data payloads loaded by the app when a live API call is not used:
  - `STARlogo.png`, `DarkModeLogo.png`, `favicon.ico` — branding.
  - `Placeholder-Map-Image.png` — heatmap placeholder on Affected Areas page.
  - `FORMATTED_airplane_data.csv`, `violating_callsigns.csv`, `VIOLATION_TIME_PERIODS.csv` — raw violation datasets.
  - `altitude_violations.json`, `callsign_violations.json`, `hourly_violations.json`, `stats.json`, `violating_totals.txt`, `statistics.txt` — aggregated stats payloads.
  - `blog.json` — blog post list (route currently disabled).

### `src/` — entrypoints

- **index.js** — mounts React root in StrictMode, wires `reportWebVitals`.
- **App.js** — top-level `BrowserRouter`. Declares all routes, wraps in `CssVarsProvider` (MUI Joy), renders `<Header/>` + routes + `<Footer/>`.
- **index.css / App.css** — global CSS (App.css currently empty).
- **setupTests.js** — imports `@testing-library/jest-dom`.
- **reportWebVitals.js** — optional CRA perf reporter.

### `src/components/public/` — routed pages

One file per route rendered by `App.js`:

- **home.jsx** → `/` — hero with total low-altitude seconds + CTA buttons.
- **about.jsx** → `/about` — project mission.
- **affected-areas.jsx** → `/affected-areas` — tabbed heatmap / interactive map.
- **data-search.jsx** → `/data-search` (+ `/:tab/:typ/:fil`) — side-menu switcher between Sessions / Planes / Owners tabs.
- **file-report.jsx** → `/file-report` — complaint submission.
- **methodology.jsx** → `/methodology` — data-collection methodology.
- **statistics.jsx** → `/statistics` — bar charts: hourly frequency, altitude buckets, top aircraft.
- **rankings.jsx** → `/rankings` — weekly top offenders podium.
- **blog.jsx** — currently commented out in `App.js`.
- **privacy-policy.jsx** → `/privacy-policy`.
- **terms-of-use.jsx** → `/terms-of-use`.
- **notfound.jsx** — catch-all `*` 404.

#### `affected-areas-tabs/`

- **interactive-map.jsx** — Leaflet/Mapbox map with violation clusters.

#### `data-search-tabs/`

Rendered inside `data-search.jsx`:

- **sessions.jsx** — filterable session table (callsign, altitude/duration bounds, date range, sort, pagination).
- **planes.jsx** — aircraft table with owner filter + sorting.
- **owners.jsx** — owner-aggregated view.

### `src/components/reusable/`

- **header.jsx** — top navbar (logo swaps for dark mode, nav links, scroll-restoration helper, `ModeToggle`).
- **footer.jsx** — site footer.
- **ModeToggle.jsx** — light/dark/system theme switcher.
- **Pagination.jsx** — shared pagination control used across data-search tabs.

### `src/utils/` — API + helpers

- **api.js** — exports `API_BASE_URL` (reads `REACT_APP_API_BASE_URL`, falls back to `https://api.stars80027.com`).
- **getStats.js** — `getGenStats`, `getFrequencyStats`, `getAltitudeStats`, `getTopAircraft` — fetchers for the `/stats` and `/aircraft` endpoints.
- **getTopAircraft.js** — standalone top-aircraft fetcher used by rankings.
- **getTopOwners.js** — top-owners fetcher.
- **powerSearchPlanes.js** — paginated/sorted query against `/aircraft` with optional owner filter.
- **powerSearchLowSessions.js** — paginated/sorted session search with multi-field filters.
- **colorScale.js** — `colorScale` + `colorScaleInverse` for altitude/duration chips.
- **secToDuration.js** — seconds → long human duration (e.g. "1 hour 23 minutes").
- **secToDurationShort.js** — seconds → compact form (e.g. "1h 23m").
- **muitheme.js** — MUI Material theme (used by `DateTimePicker` inside sessions tab).

---

## Testing

CRA + Jest + React Testing Library.

### Run tests

```bash
npm test
```

Interactive watch mode. Press `a` for all, `q` to quit.

### One-shot (CI)

```bash
CI=true npm test
```

### What's there

- **src/App.test.js** — CRA-default smoke test (`renders learn react link`). **Note:** stale — the app no longer renders that text, so this test fails as-is. Replace or delete before wiring to CI.

### Writing new tests

Co-locate `*.test.js` / `*.test.jsx` next to the component. `setupTests.js` already loads `@testing-library/jest-dom` matchers (`toBeInTheDocument`, etc.). Example:

```jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './components/public/home';

test('home shows CTA buttons', () => {
  render(<MemoryRouter><Home/></MemoryRouter>);
  expect(screen.getByText(/File a complaint/i)).toBeInTheDocument();
});
```

Mock the API helpers (`src/utils/getStats.js` etc.) with `jest.mock()` to avoid live network calls.

### Manual QA checklist

- `/` loads, shows non-zero duration (confirms `/stats` reachable).
- `/statistics` renders three bar charts with data.
- `/data-search` → Sessions tab: filters, date pickers, pagination all respond.
- `/affected-areas` → both Heatmap and Interactive Map tabs render.
- `/rankings` shows top-3 podium.
- Dark-mode toggle swaps logo + theme.
- 404 route (`/foo`) hits `notfound.jsx`.
