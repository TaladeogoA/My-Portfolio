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
- `getNavPath` reduces nested paths such as `/work/01` to their top-level path, so `NAV_ORDER` and `useNavPadding` work for them.
- Nav items are real `NavLink`s (no `preventDefault`). `PageLayout` resets scroll and focuses `<main id="main-content">` on top-level route change and renders a skip link.
- `<main>` is the only scroll container (fixed 100dvh, `overflow: auto`) and is `position: relative`. Keep it positioned: without it, absolutely positioned children such as `VisuallyHidden` labels stretch the document, so the window scrolls too and blank space shows under the page.

**Work page:**

- All project content lives in `src/data/projectdata.ts`, typed by `Project` in `src/types/project.ts`.
- Project IDs are zero-padded strings (`"01"`, `"02"`, …). They appear in URLs and are shown as the list numbers. The Home page's "Selected work" link points to `/work/01`.
- Images are imported from `src/assets/*.webp` so webpack bundles them.
- `role` and `platforms` are short labels shown in the list and the case-study facts.
- `/work` renders `WorkIndex`: a plain list of real links, one row per project, with no images. `/work/:projectId` renders `ProjectCaseStudy`: a single scrolling page with the facts, the first asset as a hero, sections from `description`/`constraints`/`contribution`/`decisions`, the other assets in a grid, every `technicalHighlights` item, and a "Next project" link. An unknown ID redirects to `/work`.
- `live`, `appStoreUrl`, and `playStoreUrl` are optional and render links only when set.
- Clicking a screenshot opens `ImageModal`, a portal dialog with focus handling.
- `PageLayout` only resets scroll between top-level pages, so `ProjectCaseStudy` scrolls `#main-content` to the top and focuses its `h1` whenever the project changes.
- Both pages use `align-self: flex-start`, because `<main>` centres its content vertically and a tall centred child can't be scrolled to its top.

**SEO:** each page renders `<MetaTags>` (`components/SEO/MetaTags.tsx`, built on react-helmet-async) with its own title and description. `SITE_URL` and the default OG and Twitter values are defined there. `public/index.html` holds the static fallback title and description.

**Animation:**

- GSAP with `split-type` animates the Home heading text (`utils/Animation.js`).
- framer-motion handles route transitions, the nav, the project list, and modals.
- CSS keyframes handle the smaller effects: the floating Home illustration, the rotating "Get in touch" badge on `/work`, and the skeleton shimmer.

**About page:**

- The name-pronunciation buttons play `src/assets/talade.m4a` and `taladeogo.m4a` through a single shared module-level `Audio` instance.
- The page is a photo header, then label-on-the-left sections (Hello, Experience, Outside work) in the same layout as the Work case studies. The Experience rows are the `EXPERIENCE` array in `AboutContent.tsx`.
- The résumé link (here and on `/work`) points to `src/assets/Taladeogo-Abraham-Resume.pdf`. To update the résumé, replace that file under the same name.

**Home page:** GSAP animates the two heading lines, and `.reveal` elements fade in after. Content stays hidden until that runs. The "Currently building…" line is hardcoded in `Home.tsx`.

**Contact page:** direct links (email with a Copy button, LinkedIn, GitHub) beside `ContactForm`. The form's EmailJS call is unchanged.

## Conventions

- **Styling:** styled-components v5 only, with components defined in the same file below the React component. `App.css` and `index.css` hold only resets and global fonts. There is no theme provider. Page content takes its colours, the rounded `PillLink` / `pillStyles` call-to-action and `quietLinkStyles` from `components/Common/theme.tsx`. The nav keeps its own hardcoded `#000` on `#F8F7F4`; don't restyle it.
- **Transient props:** use `$`-prefixed props (`$isLoading`, `$margin`) so they don't reach the DOM.
- **Animated styled components:** create them with `motion(StyledBase)`, e.g. `const Content = motion(ContentBase)`. The recent commit c6f6668 switched to this pattern to fix TypeScript build errors.
- **Shared UI:**
  - `components/Common/theme.tsx`: colour constants, pill and quiet link styles, `ArrowIcon`, and `LinkIcon` (use it for links that leave the site, never a ↗ arrow).
  - `Works/OptimizedImage.tsx`: a lazy image with a skeleton placeholder. It is also used outside the Work page.
- **Breakpoints:** 992px for the nav and layout switch, and 768px for the cursor and minor tweaks. `useMediaQuery` is the hook for JS-side checks.
- **Types:** new components should be `.tsx`. Several older components are still `.js`. `tsconfig` is `strict`, with `allowJs`. Module declarations for image and video imports live in `src/types/declarations.d.ts`. Add one there for any new asset type imported from a TS file.
- **Fonts:** DM Sans is the body and heading font, Kodchasan is used only for the nav and the Work badge, and Noto Serif Display is also loaded but unused. All come from Google Fonts in `index.css` and `public/index.html`.
