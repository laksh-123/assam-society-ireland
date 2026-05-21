# Static Pre-rendering Design

**Date:** 2026-05-21  
**Status:** Approved

## Problem

The site uses `BrowserRouter` from `react-router-dom`. On static hosts (Netlify, Vercel, GitHub Pages, AWS S3), navigating directly to a route like `/about` returns a 404 because no file exists at that path. Each host requires a different server-redirect workaround to fix this.

## Goal

Make the site universally deployable to any static host without host-specific config, by ensuring every route has a real HTML file in the build output.

## Approach: Static Pre-rendering with vite-react-ssg

Use `vite-react-ssg` (the React-specific SSG package built on top of vite-ssg) to pre-render each route into its own HTML file at build time. The React app still hydrates client-side after the initial HTML loads, so all interactivity and Framer Motion page transitions continue to work unchanged.

### Build output

```
dist/
  index.html          → /
  about/index.html    → /about
  events/index.html   → /events
  gallery/index.html  → /gallery
  contact/index.html  → /contact
  assets/             → JS, CSS, fonts, images
```

Every URL maps to a real file. No server redirect needed on any host.

## Changes

### 1. `package.json`
- Add `vite-react-ssg` as a dependency
- Change the `build` script from `vite build` to `vite-react-ssg build`

### 2. `src/main.jsx`
- Replace `createRoot(...).render(...)` with `vite-react-ssg`'s `ViteSSG` named export
- Pass the root `App` component and the list of routes to `ViteSSG`

### 3. `src/App.jsx`
- Remove the `BrowserRouter` wrapper (routing context is now provided by `ViteSSG`)
- Keep `Navbar`, `AnimatedRoutes`, and `Footer` layout unchanged
- Keep `AnimatePresence` + `useLocation` in `AnimatedRoutes` unchanged

### 4. `vite.config.js`
- No changes required

## Routes

| Path | Component |
|------|-----------|
| `/` | `Home` |
| `/about` | `About` |
| `/events` | `Events` |
| `/gallery` | `Gallery` |
| `/contact` | `Contact` |

## Constraints

- No backend, no dynamic/user-specific content — all pages are fully static, making SSG the correct fit
- Framer Motion's `AnimatePresence` requires `useLocation` which requires a router context — `vite-react-ssg` provides this via its internal router during hydration, so no changes needed to `AnimatedRoutes`
- The `preview` script (`vite preview`) continues to work for local testing of the built output

## Hosting compatibility after this change

| Host | Works after change | Config needed |
|------|-------------------|---------------|
| Netlify | Yes | None |
| Vercel | Yes | None |
| GitHub Pages | Yes | None |
| AWS S3 | Yes | None |
