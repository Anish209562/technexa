# Technexa Solutions

An enterprise website built by evolving the original React, TypeScript, Vite, GSAP and Three.js project. The original logo vectors, metal sculpture, product previews and project brief export logic are retained and developed into a routed experience.

## Clone and run

Use Node.js 24 (the version used to build and verify this project) and npm. The repository root is the application root.

```sh
git clone https://github.com/ExperCodeVaibhav/tnsol.git
cd tnsol
npm ci
npm run dev -- --host 0.0.0.0 --port 5174 --strictPort
```

Open **http://localhost:5174/**. Vite reloads the browser as files change. No environment variables are required for the local preview. If port 5174 is already in use, choose another port in the command.

To get subsequent changes in an existing clone, commit or stash your local changes, run `git pull --ff-only origin main`, and run `npm ci` if the lockfile changed.

```sh
npm run build
npm run lint
npm run preview -- --port 4174
```

## Structure

- `src/layout`: shared navigation, footer, page transitions and route metadata.
- `src/pages`: Home, Expertise, five services, Portfolio, three system studies (with legacy /work links), About, Insights, articles, Contact, project enquiry, site information and 404.
- `src/features`: WebGL portfolio gallery, layered product media, inspectable workflow diagram and progressive project brief.
- `src/sections`: shared engineering process and technology landscape.
- `src/data`: service, project and article content; source of truth for route metadata.
- `src/styles`: design tokens, preserved product interface styles, responsive layouts and motion. `cinematic.css` defines the graphite and sage visual direction, compact hero object, outlined display typography and dimensional gallery.
- `src/hooks/useMotion.ts`: scoped GSAP entrance, scroll reveal, depth and parallax sequences.
- `src/three/PortfolioScene.tsx`: native Three.js scene with local canvas textures, pointer selection and GPU-resource cleanup.
- `src/components/Sculpture.tsx` and `src/lib/logo.ts`: original brand geometry with the upgraded Three.js environment.

Dependencies, build output, local environment files and review artifacts are excluded from Git. Install dependencies with `npm ci`; generate production output with `npm run build`.

## Experiences

- Global desktop mega menu and keyboard-accessible mobile navigation.
- GSAP brand assembly intro with progress, a Skip button, Escape support and an independent 2.3-second exit guard. The hero entrance waits for the intro; client-side navigation does not replay it. Reduced motion skips the intro.
- Precision-machined hero sculpture with pointer and scroll response; the renderer stops when offscreen, backgrounded or reduced motion is enabled. A brand-image fallback is available without WebGL.
- Dedicated /portfolio page with a real Three.js carousel: textured product interfaces, physical depth, GSAP rotations, drag/swipe selection, circular arrow controls, accessible keyboard tabs and clickable case studies. Each study has its own /portfolio route.
- Five service pages with problems, capabilities, value, inspectable architecture, relevant technology, related work and FAQs.
- Interactive AI workflow with simulated processing, a human approval gate and a clear completion state. No external model or business system is called.
- Editorial About and Insights, including five complete original articles and functional category filtering.
- Five-stage enquiry with INR investment ranges, input validation, review, text download and clipboard export.

## Content integrity and contact configuration

The repository contains concept interfaces, not verified client work. The archive labels them as original concept studies and identifies figures as sample data. No client deployments, quantitative outcomes, partnerships, awards or employee counts are asserted.

Set the public values in `.env.local`, using `.env.example`:

- `VITE_SITE_URL`: the eventual site origin, such as the real company domain, without a trailing slash. The production build then emits absolute canonical/OG URLs and a sitemap. Without it, the local preview derives its origin and production HTML uses relative canonical paths.
- `VITE_CONTACT_EMAIL`: the real business inbox. This enables a user-reviewed email draft. Automatic submission, email delivery and CRM lead storage are not configured. Without the inbox, visitors can still download or copy their brief. The site accurately explains this.

No project/contact data is written to persistent storage. The intro does not use persistent storage. No remote fonts, analytics or advertising scripts are included.

## Production routing and metadata

Pages are lazy-loaded; Three.js is split into separately loaded chunks. The build emits an `index.html` for each of the 26 content routes, with unique title, description, canonical structure, Open Graph, Twitter and JSON-LD metadata. A browser router handles client navigation. Configure the static host to serve existing route files first and fall back to the root `index.html` for unknown paths. A Netlify-style `_redirects` file and Vercel configuration are included.

Content is rendered by React. The build generates route-specific metadata, not a server-rendered copy of page bodies.

### GitHub Pages

`.github/workflows/deploy.yml` builds and publishes the site on every push to `main`, and can also be run manually from the Actions tab. The live URL is **https://expercodevaibhav.github.io/tnsol/**.

Project pages are served from a subpath, so the workflow passes `BASE_PATH` (the Vite `base`, which also becomes the router `basename`) and `VITE_SITE_URL` from the Pages configuration. Nothing needs to be committed for this: `dist` stays untracked and the workflow uploads it as a Pages artifact. `VITE_CONTACT_EMAIL` is read from an optional repository variable of the same name (Settings, Secrets and variables, Actions, Variables).

The build also emits `404.html` so unknown deep links load the app and reach the 404 route, and `.nojekyll` so no file is stripped by Jekyll. To move to a custom domain instead, set the domain under Settings, Pages and remove `BASE_PATH` from the workflow so the site builds at the root.

## Verification

Optional Windows browser checks use the installed agent-browser executable. Start the development server first. If the browser is not installed, run `npx agent-browser install` once.

```sh
node scripts/verify-site.mjs
node scripts/verify-interactions.mjs
node scripts/verify-motion.mjs
```

The first checks all 26 content routes plus the 404 route at 1440px and 390px, and home at 1440, 1280, 1024, 768, 430 and 390px. The second checks navigation, portfolio controls, workflow approval, process stages, filtering, article links and the complete enquiry flow, downloadable payload and clipboard export. The current Windows headless browser cancels automated file transfers; the interaction report records that saving the download to disk could not be verified. This limitation is not counted as a passing download test. Set `PREVIEW_URL` to check a different local server.

The third checks splash appearance and dismissal, restored scrolling, coordinated hero entrance, reduced motion, live WebGL rendering and portfolio navigation.

Reports and screenshots are generated in `artifacts/`, which is intentionally excluded from Git. Browser checks create this directory when needed.
