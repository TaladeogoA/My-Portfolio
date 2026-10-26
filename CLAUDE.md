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

**Routing** (`src/AppRoutes.tsx`): every page is `React.lazy` and wrapped in `TransitionLayout`, which uses a framer-motion `AnimatePresence` fade keyed on the top-level path. Its wrapper is `min-height: 100%` and a column flexbox, not a fixed height: a fixed height made tall pages spill past it so their bottom hid under the phone nav. A page fills the screen with `flex: 1` (Home does).

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
- On mobile (≤992px), a fixed 60px bottom bar replaces the strips. It is light: one line per item with a small "00N" before the lowercase label, greyed except the current page, and a short black mark on the top rule above the current page that slides between items (framer-motion `layoutId`). The user rejected a heavier version with ruled cells and a black-filled current cell.
- **Adding a top-level page requires updating `NAV_ORDER`, `useNavPadding`, and `AppRoutes` together.**
- `getNavPath` reduces nested paths such as `/work/01` to their top-level path, so `NAV_ORDER` and `useNavPadding` work for them.
- Nav items are real `NavLink`s (no `preventDefault`). `PageLayout` resets scroll and focuses `<main id="main-content">` on top-level route change and renders a skip link.
- `<main>` is the only scroll container (fixed 100dvh, `overflow: auto`) and is `position: relative`. Keep it positioned: without it, absolutely positioned children such as `VisuallyHidden` labels stretch the document, so the window scrolls too and blank space shows under the page.

**Work page:**

- All project content lives in `src/data/projectdata.ts`, typed by `Project` in `src/types/project.ts`.
- Project IDs are zero-padded strings (`"01"`, `"02"`, …). They appear in URLs and are shown as the list numbers. The Home page's "Selected work" link points to `/work/01`.
- Images are imported from `src/assets/*.webp` so webpack bundles them.
- `role` and `platforms` are short labels shown in the list and the case-study facts.
- `/work` renders `WorkIndex`: a list of real links, one row per project. On hover devices wider than 992px, hovering a row shows that project's first screenshot in `Effects/HoverPreview` following the cursor. On smaller screens each row shows that screenshot as a thumbnail instead. `/work/:projectId` renders `ProjectCaseStudy`: a single scrolling page with the facts, the first asset as a hero, sections from `description`/`constraints`/`contribution`/`decisions`, the other assets two per row (an odd last one spans the full width), every `technicalHighlights` item, and a "Next project" link. An unknown ID redirects to `/work`.
- Every case-study image sits on the same cream plate (`#ECE9E2`, fixed 16:9 or 3:2) and is scaled to fit inside it at its own ratio (a CSS container query), with a soft shadow. That keeps projects with very different artwork looking like one set. Each asset's optional `caption` says what the screen does and is shown with a figure number; it falls back to `alt`. An asset marked `bare` is a composite of several phone screens with the plate colour and shadows already in the image, so it fills the plate with no frame or padding (Famasi's, Dispensary's and Octodoc's app images are built this way, from screens on famasi.me, famasi.me/dispensary, the Wrapped recording and the user's own Octodoc screenshots; Octodoc's web images are captures of octodoc.com, including its plan comparison). A `video` asset plays muted on a loop.
- The Work list's hover preview shows each screenshot in warm greys first, then colour spreads out from the centre.
- `live`, `appStoreUrl`, and `playStoreUrl` are optional and render links only when set.
- Clicking a screenshot opens `ImageModal`, a portal dialog with focus handling.
- `PageLayout` only resets scroll between top-level pages, so `ProjectCaseStudy` scrolls `#main-content` to the top and focuses its `h1` whenever the project changes.
- Both pages use `align-self: flex-start`, because `<main>` centres its content vertically and a tall centred child can't be scrolled to its top.

**SEO:** each page renders `<MetaTags>` (`components/SEO/MetaTags.tsx`, built on react-helmet-async) with its own title and description. `SITE_URL` and the default OG and Twitter values are defined there. `public/index.html` holds the static fallback title and description.

**Animation:**

- GSAP with `split-type` animates the Home heading text in `Home.tsx`.
- `hooks/useScrollChoreography.ts` runs the scroll reveals on Work, the case studies, About and Contact. Pages opt in with data attributes (`data-split`, `data-fade`, `data-stagger`, `data-clip`, `data-parallax`, documented in the hook). It uses GSAP ScrollTrigger with `scroller: "#main-content"`. Don't use `clamp()` starts: they keep anything already on screen hidden at scroll 0. A catch-all trigger at the end of the page plays reveals the page can't scroll far enough to reach.
- framer-motion handles route transitions, the nav, and modals.
- CSS keyframes handle the smaller effects: the rotating "Get in touch" badge on `/work`, the skeleton shimmer, and the Home illustration's float when WebGL is off.
- Section labels in the case studies and About stick while their section scrolls past (above 992px).

**WebGL effects** (`components/Effects/`, built on `three`):

- `ParticleFigure`: the Home image (`src/assets/talade-floating.webp`, an 800×881 cut-out photo with transparency) rebuilt as particles. They settle into place as the image crossfades out, part around the cursor and burst on click or tap. A dragged finger leaves a trail that parts them, and they drift back as it fades. Idle motion runs in the vertex shader: a per-particle shimmer, a slow "current" that sways broad patches together, and a few motes that drift up and fade. On a `mono` figure, single particles glint in the photo's real colour, and every few seconds a patch "blooms" into colour from a random point with a ragged edge, then drains back to grey (up to three at once, `uBlooms`). The user likes these and asked for more of them. The user found an earlier top-to-bottom ripple too much. `idle={false}` turns all idle motion off. Every particle is the same size; the user found mixed sizes looked like old film grain. The whole figure only floats up and down. Don't add rotation or tilt, which the user rejected. A cut-out is sampled by transparency only; an image without transparency falls back to skipping near-white pixels. Home passes `mono`, so the particles (and the `<img>` under them, via a CSS grayscale filter) are black and white. `gather` starts the particles scattered, `onSettled` fires once the intro has played (for an `idle={false}` figure, as soon as the particles reach their spots, so the hand-off never looks stuck), and `resolve` dissolves the particles one by one in random order. About uses all three with `idle={false}` (which also damps the gather so it doesn't overshoot), so the particles sit exactly on the photo as it fades in underneath. The user rejected both idle drift there and swelling the particles shut, which looked like a bounce. Big figures are sampled more finely (up to 280px wide). If the WebGL context is lost (iOS Safari does this after a few page changes) it calls `onError` and the page shows the plain image again. Home checks WebGL support once per visit and releases the test context.
- `HoverPreview`: the Work list's cursor-following screenshot. It bends with cursor speed and shows a slight colour split.
- `DitherPortrait`: a hover effect on the About photo. The canvas is clear at rest, so the real photo shows; around the cursor it draws an ink-on-cream ordered dither. It only runs on devices with a mouse (`(hover: hover) and (pointer: fine)`), and only after the particle intro has finished. The user asked for this way round: photo at rest, dots on hover.
- Each one is loaded with `React.lazy`, so `three` stays out of the main bundle. Each one sits over a plain image that remains the fallback. They are skipped under `prefers-reduced-motion` or when WebGL isn't available.
- They cap pixel ratio at 2 and stop rendering when idle, offscreen or hidden. Their shaders write raw sRGB colours, so pass colours as plain 0–1 values rather than `THREE.Color`.
- The Browser pane throttles `requestAnimationFrame` when it isn't visible, so these effects and GSAP can look frozen or half-finished in its screenshots.

**About page:**

- The name-pronunciation buttons play `src/assets/talade.m4a` and `taladeogo.m4a` through a single shared module-level `Audio` instance.
- The page is a photo header (on every device the photo first gathers out of `ParticleFigure` particles, which dissolve into the real photo and are removed; the photo stays hidden until then, or 3 seconds if they're slow to start, so it never flashes first; `DitherPortrait` takes over for hover afterwards), then label-on-the-left sections (Hello, Experience, Outside work) in the same layout as the Work case studies. The Experience rows are the `EXPERIENCE` array in `AboutContent.tsx`.
- The résumé link (here and on `/work`) points to `src/assets/Taladeogo-Abraham-Resume.pdf`. To update the résumé, replace that file under the same name.

**Home page:** GSAP animates the two heading lines, and `.reveal` elements fade in after. Content stays hidden until that runs. On phones (≤767px) it is a poster that fits above the nav without scrolling. The particle portrait is a full-bleed backdrop (`min(140vw, 68dvh)` wide, cropped by the screen, up to 13,000 particles), with a cream fade over its lap. The centred text sits on top at the bottom: "Hi, I'm", "Talade." in very large type, the pronunciation, the tagline and the button. `HomeText` is `display: contents` there so its children can be ordered around the figure. A `SHORT_PHONE` query tightens it for short screens. The illustration becomes `ParticleFigure` once it's ready; the `<img>` is measured so the particles line up with it. There is no "now building" status line: the user removed it after several versions on desktop and phone never looked right, so don't add one back.

**Contact page:** direct links (email with a Copy button, LinkedIn, GitHub) beside `ContactForm`. The form fields are ruled lines (a bottom border only, no box or fill) with muted labels, matching the rows beside them. The form's EmailJS call is unchanged.

## Conventions

- **Styling:** styled-components v5 only, with components defined in the same file below the React component. `App.css` and `index.css` hold only resets and global fonts. There is no theme provider. Page content takes its colours, the rounded `PillLink` / `pillStyles` call-to-action and `quietLinkStyles` from `components/Common/theme.tsx`. The nav keeps its own hardcoded `#000` on `#F8F7F4`; don't restyle it.
- **Transient props:** use `$`-prefixed props (`$isLoading`, `$margin`) so they don't reach the DOM.
- **Animated styled components:** create them with `motion(StyledBase)`, e.g. `const Content = motion(ContentBase)`. The recent commit c6f6668 switched to this pattern to fix TypeScript build errors.
- **Shared UI:**
  - `components/Common/theme.tsx`: colour constants, pill and quiet link styles, `ArrowIcon` (a long thin arrow with curved barbs that slides through on hover of its link or button; sized by font-size; `direction="left"` for back links; the user rejected stock chevron arrows and a single-barb one). Pill buttons have no arrow: the user asked for them to be text only, and `LinkIcon` (use it for links that leave the site, never a ↗ arrow).
  - `Works/OptimizedImage.tsx`: a lazy image with a skeleton placeholder. It is also used outside the Work page.
- **Breakpoints:** 992px for the nav and layout switch, and 768px for the cursor and minor tweaks. `useMediaQuery` is the hook for JS-side checks.
- **Types:** new components should be `.tsx`. Several older components are still `.js`. `tsconfig` is `strict`, with `allowJs`. Module declarations for image and video imports live in `src/types/declarations.d.ts`. Add one there for any new asset type imported from a TS file.
- **Fonts:** DM Sans is the body and heading font, Kodchasan is used only for the nav and the Work badge, and Noto Serif Display is also loaded but unused. All come from Google Fonts in `index.css` and `public/index.html`.
