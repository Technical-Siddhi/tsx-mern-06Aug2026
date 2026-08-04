# 🌌 Star Wars Explorer & Holocron Codex

A production-ready, enterprise-grade frontend application built with **React 18**, **TypeScript**, **Vite**, **Tailwind CSS**, **TanStack React Query**, **Framer Motion**, and **MSW (Mock Service Worker)**.

Features real-time character discovery, 300ms debounced search, multi-attribute filtering, detailed homeworld & species modals, persistent Mock JWT authentication with silent token refresh, and a 100% passing integration test suite.

---

## 🌟 Project Overview

**Star Wars Explorer** is a high-performance web interface designed for searching, filtering, and exploring character demographics from the Star Wars universe via the Star Wars API (SWAPI). Designed with a modern, dark "Holocron" aesthetic, fluid animations, strict accessibility standards (WCAG 2.1 AA), and robust error handling.

---

## 🚀 Key Features

### 🔍 Real-Time Search & Filtering
- **Debounced Search**: Input queries are debounced by 300ms to eliminate redundant network requests while preserving instant user feedback.
- **Multi-Attribute Filters**: Filter characters dynamically by **Species**, **Homeworld**, and **Film Title**.
- **Pagination**: Paginated navigation supporting SWAPI's 10-item-per-page schema with page state persistence.

### 👤 Interactive Character Details Modal
- **Dynamic Data Fetching**: Deep-links and fetches parallel entity details for Homeworld (Planets API) and Species (Species API) using TanStack React Query.
- **Accessibility & Focus Trap**: Modal includes full keyboard navigation, `Escape` key dismissal, focus trap, and background scroll locking.

### 🔐 Client-Side Mock JWT Authentication
- **Secure Credentials**: Log in using `admin` / `123456`.
- **JWT Storage & Expiration**: Generates a base64-encoded `header.payload.signature` mock JWT with embedded `iat` and `exp` claims stored in `localStorage`.
- **Silent Token Refresh**: Background timer checks expiration every 30s and silently renews tokens within 5 minutes of expiry.
- **Route Authorization Guard**: `<ProtectedRoute>` wrapper automatically redirects unauthenticated users to `/login`.

### 🧪 Comprehensive Integration Testing
- **Vitest & React Testing Library**: 16 integration tests covering rendering, search, filters, pagination, modal flows, authentication, error states, and route protection.
- **MSW (Mock Service Worker)**: Intercepts network calls to provide deterministic, isolated test environments.

---

## 🛠️ Tech Stack & Architecture

| Technology | Purpose |
| :--- | :--- |
| **React 18** | UI component architecture, state management & hooks |
| **TypeScript** | Strict compile-time type safety & domain interfaces |
| **Vite** | Next-generation frontend build tool & fast HMR |
| **Tailwind CSS** | Utility-first responsive styling & custom Holocron theme |
| **TanStack Query (v5)** | Server-state management, caching, & refetching |
| **Framer Motion** | Physics-based animations, layout transitions & micro-interactions |
| **Vitest & RTL** | Integration test runner and DOM testing utilities |
| **MSW (v2)** | API mocking for unit & integration testing |
| **Axios** | HTTP client configuration |

---

## 📁 Repository Structure

```
├── public/                 # Static public assets
├── screenshots/            # Showcase screenshots & visual documentation
│   ├── README.md
│   └── home.svg
├── src/
│   ├── api/                # Axios HTTP client configuration
│   ├── components/         # Reusable UI components
│   │   ├── common/         # Generic UI primitives
│   │   ├── starwars/       # Star Wars domain components
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
│   │   ├── ProtectedRoute.tsx
│   │   └── index.ts
│   ├── context/            # React Context (AuthContext & state)
│   ├── data/               # Static fallback data & species mappings
│   ├── hooks/              # Custom React Query & UI hooks
│   ├── pages/              # Route level page views (Home, Login)
│   ├── services/           # API service modules
│   ├── tests/              # Vitest & MSW integration test suite
│   │   ├── mocks/          # MSW handlers & server setup
│   │   ├── integration.test.tsx
│   │   ├── setup.ts
│   │   └── test-utils.tsx
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # JWT & formatting helpers
│   ├── App.tsx             # Root router & query provider setup
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global Tailwind CSS styles
├── index.html              # HTML5 entry template
├── tsconfig.app.json       # TypeScript frontend configuration
├── vite.config.ts          # Vite build & Vitest runner config
└── package.json            # Project dependencies & npm scripts
```

---

## ⚙️ Installation & Setup

### Prerequisites
- **Node.js**: `v18.x` or higher
- **npm**: `v9.x` or higher

### Steps
1. **Clone Repository**:
   ```bash
   git clone https://github.com/Technical-Siddhi/tsx-mern-06Aug2026.git
   cd tsx-mern-06Aug2026
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Local Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## 📜 Available NPM Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Launches Vite local development server with HMR |
| `npm run build` | Runs TypeScript check & compiles optimized production build to `dist/` |
| `npm run preview` | Previews production build locally |
| `npm run type-check` | Runs strict `tsc --noEmit` validation |
| `npm run lint` | Runs ESLint across `src/` directory |
| `npm test` | Runs complete Vitest + MSW integration test suite |

---

## 🧪 Integration Testing

The application includes 16 automated integration tests validating core user interactions and edge cases:

```bash
npm test
```

### Verified Test Cases
1. Renders character list successfully after fetching.
2. Displays skeleton loader while loading.
3. Renders error state with retry button on API failure.
4. Updates character grid on pagination clicks.
5. Opens modal on card selection.
6. Displays complete demographic details inside modal.
7. Fetches and displays homeworld data in modal.
8. Fetches and displays species data in modal.
9. Dismisses modal via Close button, ESC key, and backdrop click.
10. Filters character list by debounced search input.
11. Filters character list by species/homeworld/film dropdowns.
12. Authenticates user with valid credentials (`admin` / `123456`) & stores JWT.
13. Displays error message on invalid credentials.
14. Protects home route and redirects unauthenticated users to `/login`.

---

## 🌐 Vercel Deployment Instructions

Deploying **Star Wars Explorer** to Vercel requires zero complex backend setup:

### Option A: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option B: Vercel Dashboard
1. Push repository to **GitHub**.
2. Log into [Vercel Dashboard](https://vercel.com).
3. Click **"Add New Project"** and select the `tsx-mern-06Aug2026` repository.
4. **Build Settings**:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click **"Deploy"**.

---

## 🖼️ Application Screenshots & Visual Showcase

Detailed visual assets are stored in the [`screenshots/`](./screenshots/README.md) directory:

- **Home Page Overview**: `screenshots/home.svg`
- **Character Grid & Demographics**: `screenshots/character-grid.png`
- **Character Detail Modal**: `screenshots/character-modal.png`
- **Mock JWT Login Portal**: `screenshots/login.png`

---

## 📋 Production Readiness Checklist

- [x] **Code Quality**: Zero dead code, clean separation of concerns, SOLID principles.
- [x] **Performance**: Component memoization (`React.memo`), `useCallback` handler stability, lazy image loading.
- [x] **Accessibility**: Semantic HTML5, `aria-label`, visible focus rings, modal focus trap, ESC key support.
- [x] **Responsiveness**: Fully responsive across mobile, tablet, laptop, and 4K desktop displays.
- [x] **Error Handling**: Custom error states with refetch capabilities for failed network calls.
- [x] **Type Safety**: 100% strict TypeScript coverage (`0` type errors).
- [x] **Linting**: 100% ESLint compliance (`0` errors).
- [x] **Tests**: 16/16 integration tests passing cleanly.
- [x] **Build**: Production bundle builds in < 5 seconds.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

**Created with May the Force by Siddhi Raj (2026).**
