# CLAUDE.md

Personal portfolio site for Taladeogo Abraham ("Talade"), deployed at https://talade.name.ng. It's a single-page app built with Create React App (plain `react-scripts`, not ejected). The code is a mix of TypeScript and JavaScript.

## Commands

```bash
npm start            # dev server on http://localhost:3000
npm run build        # production build into build/
npm test             # Jest watch mode. There are currently no test files.
npx tsc --noEmit     # typecheck. There is no script for it; CRA's build does not fail on type errors in .js files.
```

There is no lint script. ESLint (`react-app` config) runs inside `start` and `build`. With `CI=true`, CRA turns lint warnings into build errors.

## Environment

The contact form sends through EmailJS and needs these variables in `.env` (see `.env.example`):

- `REACT_APP_EMAILJS_SERVICE_ID`
- `REACT_APP_EMAILJS_TEMPLATE_ID`
- `REACT_APP_EMAILJS_PUBLIC_KEY`

Without them the site still runs, but submitting the form shows the error state.

## Architecture

**Bootstrapping:** `src/index.tsx` renders `ErrorBoundary > BrowserRouter > App`. `App.tsx` adds `HelmetProvider` and the desktop-only `react-animated-cursor`, and wraps all routes in `PageLayout`.

**Routing** (`src/AppRoutes.tsx`): every page is `React.lazy` and wrapped in `TransitionLayout`, which uses a framer-motion `AnimatePresence` fade keyed on `location.key`.

| Path | Component |
|---|---|
| `/` | `components/Homepage/Home.js` |
| `/about` | `components/AboutMe/AboutContent.js` |
| `/work`, `/work/:projectId` | `components/Works/WorksContent.tsx`. The same component serves both routes and reads `projectId` from the URL. |
| `/contact` | `components/Contact/ContactContent.js` |
| `*` | `components/Common/NotFound.tsx` |

**Navigation** (`components/Navbar/NavBar.tsx`): `NAV_ORDER` maps each top-level path to 1–4 and drives the whole layout.

- On desktop (>992px), each route is a 50px vertical strip. Routes ordered after the current page stack on the left, and the current and earlier routes stack on the right. The strips animate between sides on navigation.
- `hooks/useNavPadding.ts` sets the main content's left and right padding to fit those strips (multiples of `NAV_WIDTH = 50`).
- On mobile (≤992px), a fixed 60px bottom bar replaces the strips.
- **Adding a top-level page requires updating `NAV_ORDER`, `useNavPadding`, and `AppRoutes` together.**
- Gotcha: `NAV_ORDER` and `useNavPadding` match the exact pathname. Nested paths such as `/work/01` fall back to the Home ordering and padding.

**Work page:**

- All project content lives in `src/data/projectdata.ts`, typed by `Project` in `src/types/project.ts`.
- Project IDs are zero-padded strings (`"01"`, `"02"`, …). They appear in URLs and are shown as the list numbers. The Home page's "Selected work" link points to `/work/01`.
- Images are imported from `src/assets/*.webp` so webpack bundles them.
- The first three `technicalHighlights` are always shown; the rest appear behind "Read Full Case Study".
- `live`, `appStoreUrl`, and `playStoreUrl` are optional and render icon links only when set.
- Layout switches at 1200px:
  - Desktop is a three-column grid: `ProjectList`, `ProjectDetails`, and `ProjectImages`. Clicking an image in `ProjectImages` opens `ImageModal`.
  - Mobile is an accordion: `ProjectList` expands `ProjectDetails` inline with `isMobileExpanded`, using a `react-slick` carousel.

**SEO:** each page renders `<MetaTags>` (`components/SEO/MetaTags.tsx`, built on react-helmet-async) with its own title and description. `SITE_URL` and the default OG and Twitter values are defined there. `public/index.html` holds the static fallback title and description.

**Animation:**

- GSAP with `split-type` animates the Home heading text (`utils/Animation.js`).
- framer-motion handles route transitions, the nav, the project list, and modals.
- CSS keyframes handle the smaller effects: floating avatar, rotating About text, and the skeleton shimmer.

**About page:**

- The name-pronunciation buttons play `src/assets/talade.m4a` and `taladeogo.m4a` through a single shared module-level `Audio` instance.
- "View Resume" opens `src/assets/Taladeogo-Abraham-Resume.pdf`. To update the résumé, replace that file under the same name.

## Conventions

- **Styling:** styled-components v5 only, with components defined in the same file below the React component. `App.css` and `index.css` hold only resets and global fonts. There is no theme provider; colors are hardcoded, mainly black `#000` on off-white `#F8F7F4`.
- **Transient props:** use `$`-prefixed props (`$isLoading`, `$margin`) so they don't reach the DOM. `ProjectList.tsx` still uses a bare `isSelected`; don't copy that pattern.
- **Animated styled components:** create them with `motion(StyledBase)`, e.g. `const Content = motion(ContentBase)`. The recent commit c6f6668 switched to this pattern to fix TypeScript build errors.
- **Shared UI:**
  - `components/Common/Typography.tsx`: `H1`–`H4` and `Text`, which take `$margin`, `$size`, `$color`, and similar props.
  - `Common/Button.tsx`: `variant="primary" | "secondary"`.
  - `Common/StyledLink.tsx`
  - `Works/OptimizedImage.tsx`: a lazy image with a skeleton placeholder. It is also used outside the Work page.
- **Breakpoints:** 992px for the nav and layout switch, 1200px for the Work page desktop/mobile switch, and 768px for the cursor and minor tweaks. `useMediaQuery` is the hook for JS-side checks.
- **Types:** new components should be `.tsx`. Several older components are still `.js`. `tsconfig` is `strict`, with `allowJs`. Module declarations for image and video imports live in `src/types/declarations.d.ts`. Add one there for any new asset type imported from a TS file.
- **Fonts:** DM Sans is the body font, Kodchasan is used for the nav and Home page, and Noto Serif Display is also loaded. All come from Google Fonts in `index.css` and `public/index.html`. `ProjectList` references "Neue Montreal", which is never loaded, so it falls back to sans-serif.
