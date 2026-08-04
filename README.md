# 🌌 Star Wars Character Explorer & Holocron Codex

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-v5-FF4154?style=flat-square)](https://tanstack.com/query)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.x-0055FF?style=flat-square)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

A **production-ready** Star Wars Character Explorer built with a premium enterprise-quality dark Holocron aesthetic. Explore galactic characters, species, homeworlds, and film appearances — all sourced live from the Star Wars API (SWAPI).

---

## 📸 Screenshots

| Home Page | Character Modal |
| :---: | :---: |
| ![Home](screenshots/home.png) | ![Modal](screenshots/modal.png) |

| Search & Filters | Login Portal |
| :---: | :---: |
| ![Search](screenshots/search.png) | ![Login](screenshots/login.png) |

| Mobile View |
| :---: |
| ![Mobile](screenshots/mobile.png) |

> Screenshots captured at 1920×1080 (desktop) and 375×812 (mobile). Run `npm run dev` for the live interactive demo.

---

## ✨ Features

| Feature | Status |
| :--- | :--- |
| Character Listing from SWAPI | ✅ |
| Character Details Modal | ✅ |
| Debounced Real-Time Search (300ms) | ✅ |
| Multi-Attribute Filters (Species / Homeworld / Film) | ✅ |
| Paginated Navigation | ✅ |
| Homeworld Lookup (Planets API) | ✅ |
| Species Lookup (Species API) | ✅ |
| TanStack React Query Caching | ✅ |
| Animated Skeleton Loaders | ✅ |
| Error States with Retry | ✅ |
| Fully Responsive UI | ✅ |
| Mock JWT Authentication + Silent Refresh | ✅ |
| Protected Route Guard | ✅ |
| Remember Me (localStorage) | ✅ |
| TypeScript (100% strict) | ✅ |
| Dark Holocron Theme | ✅ |
| WCAG 2.1 AA Accessibility | ✅ |
| 16 Integration Tests (Vitest + RTL + MSW) | ✅ |

---

## 🛠 Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 18** | UI component architecture, hooks, concurrent rendering |
| **TypeScript** | Strict compile-time type safety & domain interfaces |
| **Vite 8** | Next-generation build tool with HMR |
| **Tailwind CSS 3** | Utility-first responsive styling |
| **TanStack Query v5** | Server-state management, caching & background refetching |
| **Framer Motion 12** | Physics-based animations & micro-interactions |
| **Axios** | HTTP client with base URL configuration |
| **Lucide React** | Lightweight, consistent icon set |
| **Vitest** | Fast unit and integration test runner |
| **React Testing Library** | DOM-based component testing utilities |
| **MSW v2** | Network-level API mocking for isolated tests |

---

## 📁 Folder Structure

```
tsx-mern-06Aug2026/
├── public/                     # Static assets
├── screenshots/                # Portfolio showcase screenshots
│   └── README.md
├── src/
│   ├── api/
│   │   └── axiosClient.ts      # Axios instance with base URL
│   ├── components/
│   │   ├── starwars/           # Domain-specific Star Wars components
│   │   │   ├── CharacterCard.tsx
│   │   │   ├── CharacterModal.tsx
│   │   │   ├── CharacterStats.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── ErrorState.tsx
│   │   │   ├── FilterPanel.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── PlanetCard.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── SkeletonLoader.tsx
│   │   │   └── SpeciesBadge.tsx
│   │   ├── ProtectedRoute.tsx  # JWT-based route guard
│   │   └── index.ts            # Central component barrel export
│   ├── context/
│   │   └── AuthContext.tsx     # JWT auth state, login, logout, silent refresh
│   ├── data/                   # Static fallback data & species mappings
│   ├── hooks/
│   │   ├── useCharacters.ts    # React Query hook for SWAPI character list
│   │   ├── useDebounce.ts      # 300ms debounce hook for search
│   │   ├── useFilteredCharacters.ts  # Memoized filter & dropdown logic
│   │   ├── useHomeworld.ts     # React Query hook for planet details
│   │   └── useSpecies.ts       # React Query hook for species details
│   ├── pages/
│   │   ├── Home.tsx            # Main dashboard page
│   │   └── Login.tsx           # Authentication portal
│   ├── services/
│   │   └── swapiService.ts     # SWAPI API service methods
│   ├── tests/
│   │   ├── mocks/
│   │   │   ├── handlers.ts     # MSW request handlers
│   │   │   └── server.ts       # MSW test server setup
│   │   ├── integration.test.tsx  # 16 integration tests
│   │   ├── setup.ts            # Vitest + JSDOM global setup
│   │   └── test-utils.tsx      # Custom renderWithProviders utility
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces & types
│   ├── utils/
│   │   └── jwtUtils.ts         # Mock JWT encode / decode / expiry logic
│   ├── App.tsx                 # Router & QueryClient provider
│   ├── main.tsx                # Application entry point
│   └── index.css               # Global Tailwind CSS styles
├── .env.example                # Environment variable template
├── .gitignore
├── index.html                  # HTML5 entry template
├── package.json
├── tsconfig.app.json           # TypeScript configuration
├── vite.config.ts              # Vite + Vitest configuration
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites
- **Node.js**: `v18.x` or higher
- **npm**: `v9.x` or higher

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/Technical-Siddhi/tsx-mern-06Aug2026.git
cd tsx-mern-06Aug2026

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env

# 4. Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Demo Login Credentials
```
Username: admin
Password: 123456
```

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start Vite development server with HMR |
| `npm run build` | TypeScript check + production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run type-check` | Run strict `tsc --noEmit` type validation |
| `npm run lint` | Run ESLint across `src/` |
| `npm test` | Run Vitest integration test suite |

---

## 🏗 Architecture

### UI Layer (`src/components/`)
Stateless, memoized (`React.memo`) presentational components. Each component has a single, well-defined responsibility (SRP). Zero prop drilling — data flows through hooks.

### Pages (`src/pages/`)
Container-level components that compose smaller components. Handle routing context and top-level state (search, filter, pagination, modal open/close).

### Hooks (`src/hooks/`)
Custom React hooks encapsulate all data-fetching logic via TanStack Query. Hooks return typed data, loading states, and error states — keeping components clean and reusable.

### Services (`src/services/`)
Pure async functions that call SWAPI through the Axios client. No state, no side effects — only network I/O and data transformation.

### API Layer (`src/api/`)
Centralized Axios instance pre-configured with `VITE_API_BASE_URL`, enabling single-source base URL configuration for all services.

### Context (`src/context/`)
`AuthContext` manages JWT authentication state globally. Exposes `login`, `logout`, `isAuthenticated`, and a silent token refresh mechanism (checks every 30s, renews if expiring within 5 minutes).

---

## ⚡ Performance

- **React Query Cache**: `staleTime: 5 * 60 * 1000` — data stays fresh for 5 minutes without redundant network calls.
- **Component Memoization**: `React.memo` on `CharacterCard`, `CharacterModal`, `FilterPanel`, `SearchBar`, `Pagination` to eliminate unnecessary re-renders.
- **`useCallback` & `useMemo`**: All event handlers and computed filter values are memoized in `Home.tsx`.
- **Lazy Image Loading**: `loading="lazy"` on all character and modal images reduces initial paint time.
- **Debounced Search**: 300ms `useDebounce` hook prevents API hammering on rapid keystrokes.

---

## ♿ Accessibility (WCAG 2.1 AA)

- **Semantic HTML**: `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>` for screen reader clarity.
- **ARIA Attributes**: `role="dialog"`, `aria-modal="true"`, `aria-label`, `aria-invalid`, `aria-describedby`, `aria-current="page"`, `aria-live="polite"`.
- **Focus Management**: `CharacterModal` implements a full **keyboard focus trap** — Tab/Shift+Tab cycles within the open modal.
- **Focus Indicators**: All interactive elements use `focus-visible:ring-2 focus-visible:ring-amber-400` for clear visible focus.
- **Keyboard Navigation**: Full support for `Enter` (submit/activate), `Escape` (close modal / clear field), `Tab` (navigation order).
- **Auto-complete**: Login form fields include `autocomplete="username"` and `autocomplete="current-password"`.

---

## 🧪 Testing

The project includes **16 integration tests** covering all critical user flows:

```bash
npm test
```

### Test Coverage

| # | Scenario | Status |
| :--- | :--- | :--- |
| 1 | Renders character list after fetching | ✅ |
| 2 | Displays skeleton loader while loading | ✅ |
| 3 | Displays error state on API failure | ✅ |
| 4 | Pagination changes displayed characters | ✅ |
| 5 | Clicking a character card opens modal | ✅ |
| 6 | Modal displays complete character details | ✅ |
| 7 | Loads homeworld data correctly in modal | ✅ |
| 8 | Loads species data correctly in modal | ✅ |
| 9a | Closes modal via Close button | ✅ |
| 9b | Closes modal via ESC key | ✅ |
| 9c | Closes modal via backdrop click | ✅ |
| 10 | Search input filters character list | ✅ |
| 11 | Dropdown filters update displayed results | ✅ |
| 12 | Successful login stores JWT in localStorage | ✅ |
| 13 | Invalid credentials display error alert | ✅ |
| 14 | Protected route redirects unauthenticated user | ✅ |

**Stack:** Vitest · React Testing Library · MSW v2 · JSDOM

---

## 🚀 Deployment (Vercel)

### Option A — Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option B — Vercel Dashboard

1. Push repository to GitHub.
2. Visit [vercel.com](https://vercel.com) → **Add New Project**.
3. Import `tsx-mern-06Aug2026` repository.
4. Configure build settings:

| Setting | Value |
| :--- | :--- |
| Framework Preset | **Vite** |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

5. Add Environment Variable:

```
VITE_API_BASE_URL=https://swapi.py4e.com/api
```

6. Click **Deploy**.

---

## ✅ Production QA Checklist

### Frontend
- [x] Login page renders and authenticates correctly
- [x] Protected route redirects unauthenticated users
- [x] Home page loads character grid from SWAPI
- [x] Character card displays avatar, name, species, homeworld
- [x] Character details modal opens with full demographic data
- [x] Homeworld details loaded via parallel React Query request
- [x] Species details loaded via parallel React Query request
- [x] Search debounces correctly at 300ms
- [x] Filters by Species / Homeworld / Film update grid correctly
- [x] Reset Filters button clears all active filters
- [x] Pagination navigates between SWAPI pages
- [x] Skeleton loaders display during network fetch
- [x] Error state with retry button renders on API failure
- [x] Empty state renders when filters yield no results
- [x] Footer displays portfolio branding and tech stack
- [x] Navbar displays app title and logout button

### Authentication
- [x] Login with `admin` / `123456` generates JWT
- [x] JWT stored in `localStorage`
- [x] Remember Me persists username across sessions
- [x] Silent refresh renews token within 5 min of expiry
- [x] Logout clears token and redirects to `/login`
- [x] Protected route blocks unauthenticated access

### Accessibility
- [x] Semantic HTML5 elements used throughout
- [x] ARIA labels on interactive elements
- [x] Focus trap active inside character modal
- [x] Keyboard navigation works across all interactions
- [x] `focus-visible` rings visible on all focusable elements
- [x] Screen reader compatible ARIA live regions

### Responsive Design
- [x] 320px — single column, no overflow
- [x] 375px — mobile-optimized layout
- [x] 768px — 2-column card grid
- [x] 1024px — 3-column card grid
- [x] 1440px — 4-column card grid
- [x] 1920px — full-width centered layout

### Testing
- [x] 16/16 integration tests passing
- [x] MSW intercepts all SWAPI network calls
- [x] Login success & failure tests passing
- [x] Protected route test passing

### Build & Code Quality
- [x] `npm run type-check` — 0 TypeScript errors
- [x] `npm run lint` — 0 ESLint errors
- [x] `npm run build` — Production bundle created successfully
- [x] `npm test` — 16/16 tests passing

### Documentation
- [x] `README.md` — comprehensive with features, architecture, deployment
- [x] `.env.example` — environment variable template
- [x] `screenshots/` — visual showcase directory
- [x] `GITIGNORE` — all generated files excluded

---

## 🔭 Future Improvements

| Feature | Priority |
| :--- | :--- |
| Dark / Light Theme Toggle | Medium |
| Favorites / Bookmarked Characters | High |
| Infinite Scroll (alternative to pagination) | Medium |
| Real Backend Authentication (Node.js + JWT) | High |
| Character Comparison View | Low |
| Playwright / Cypress E2E Tests | High |
| PWA Support (offline mode) | Low |

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

**Created with May the Force by [Siddhi Raj](https://github.com/Technical-Siddhi) — 2026.**
