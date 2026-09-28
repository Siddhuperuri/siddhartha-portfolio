# Module 3: Application Architecture

## Architectural model

The portfolio is a server-first Next.js App Router application. Content and metadata render on the server; browser code is restricted to progressive enhancements: controls, analytics events, motion, and optional WebGL. The architecture avoids a global client state store because the public portfolio has no authenticated or cross-route transactional state.

## Folder structure

```text
app/
  (site)/
    about/page.tsx
    contact/page.tsx
    work/page.tsx
    work/[slug]/page.tsx
    layout.tsx
    page.tsx
  layout.tsx
  robots.ts
  sitemap.ts
components/
  analytics/
  chrome/
  motion/
  primitives/
  providers/
  sections/
  three/
  ui/
content/
  projects.ts
  site.ts
  schemas.ts
hooks/
  use-reduced-motion.ts
lib/
  analytics/
    events.ts
  seo/
    schema.ts
  metadata.ts
  projects.ts
  utils.ts
public/
  assets/
    projects/
    resume/
styles/
  design-tokens.css
types/
  project.ts
```

`app/` owns routes and route metadata. `components/` owns presentation, with `primitives/` reserved for generic composition pieces and `ui/` reserved for shadcn-derived, accessible controls. `content/` is the initial local CMS boundary. `lib/` owns framework-agnostic utility, data access, SEO, and adapter logic. `three/` is intentionally isolated so no WebGL code leaks into standard content paths.

## Routing and component tree

```text
RootLayout
└── AppProviders
    ├── SkipLink
    ├── SiteChrome
    │   ├── Header
    │   └── Main
    │       └── Route content (server-rendered by default)
    └── Footer

WorkRoute
└── WorkIndex
    └── ProjectCard[]

ProjectRoute
└── CaseStudy
    ├── ProjectIntro
    ├── CaseStudyNarrative[]
    ├── ProjectMedia[]
    └── ProjectNavigation
```

The tree is a blueprint only. Content routes and content sections are intentionally deferred. Shared chrome and case-study components must receive typed data rather than importing page data directly.

## State management

- Use server-rendered typed content for route data.
- Use component-local state for ephemeral UI state such as a menu open state or media control.
- `AppProviders` is the controlled boundary for cross-cutting client providers. Add a provider only when state must cross independently mounted client islands.
- Never mirror URL state in React state. Filters, active project tabs, and shareable view state belong in `searchParams`.
- Do not introduce Redux, Zustand, or a global client store for the initial portfolio.

## Animation architecture

- CSS handles focus, hover, selection, simple reveal, and reduced-motion fallback.
- Framer Motion owns component entrance/exit transitions inside client islands.
- GSAP is permitted only for measured, scroll-linked editorial sequences that cannot be expressed clearly with Framer Motion/CSS.
- A single `useReducedMotionPreference` hook gates JavaScript-driven motion. Motion values must be token-driven from `styles/design-tokens.css`.
- Animation wrappers must expose normal semantic content when JavaScript is unavailable.

## Three.js architecture

```text
Route/section (server)
└── DynamicThreeScene (client-only, ssr: false)
    ├── SceneCanvas
    ├── SceneControls
    └── StaticSceneFallback
```

- Three.js exists only for a project-relevant optional enhancement, expected first in Gravity Playground.
- Load the scene with `next/dynamic`; never import WebGL dependencies into the primary route bundle.
- Use instancing or shader/points approaches rather than one React mesh per particle.
- Store scene configuration as typed data; do not use remote textures or unbounded random generation during render.
- Respect reduced motion, pause when offscreen, cap device pixel ratio, and always provide a static image/text fallback.

## Data models and CMS preparation

`content/schemas.ts` defines the contract. The initial local data source will export values that satisfy `projectSchema`; route code accesses them only through `lib/projects.ts`. This allows migration to a headless CMS later without changing page/component consumers.

Future CMS adapter contract:

```ts
export interface ProjectRepository {
  getAll(): Promise<Project[]>;
  getBySlug(slug: string): Promise<Project | null>;
  getFeatured(): Promise<Project[]>;
}
```

Any CMS must return the same validated model and use local or approved image-host allowlists. Draft/preview implementation is explicitly deferred until a CMS is selected.

## SEO and metadata structure

- Root metadata is composed from `content/site.ts` through `lib/metadata.ts`.
- Route-level metadata uses project data, with one canonical URL per public route.
- `app/sitemap.ts` enumerates static routes and published project routes.
- `app/robots.ts` permits public routes and disallows future preview/private paths.
- `lib/seo/schema.ts` serializes only verified `Person`, `WebSite`, `CreativeWork`, and `BreadcrumbList` facts.
- Open Graph images are generated per route later; they are not hard-coded in individual pages.

## Performance plan

1. Server render all editorial content and ship minimal client JavaScript.
2. Keep a single high-priority LCP image per route; lazy-load all lower content media.
3. Use static imports/local images and `next/image` dimensions to eliminate layout shift.
4. Dynamic-import analytics, complex animation, WebGL, and non-critical dialogs.
5. Enforce WebGL DPR, animation, image, and script budgets before a 3D feature is accepted.
6. Measure Web Vitals in Vercel Analytics and treat LCP, INP, and CLS regressions as release blockers.

## Dependency list

| Group | Packages |
| --- | --- |
| Framework | `next`, `react`, `react-dom`, `typescript` |
| Styling and UI | `tailwindcss`, `@tailwindcss/postcss`, `class-variance-authority`, `clsx`, `tailwind-merge`, Radix packages required by adopted shadcn components |
| Motion and 3D | `framer-motion`, `gsap`, `lenis`, `three`, `@react-three/fiber`, `@react-three/drei` |
| Forms | `react-hook-form`, `zod`, `@hookform/resolvers` |
| Icons and analytics | `lucide-react`, `@vercel/analytics`, `posthog-js` |
| Quality | `eslint`, `eslint-config-next`, `prettier`, `prettier-plugin-tailwindcss` |

Pin exact compatible versions when the project is initialised with pnpm. Next.js 16.2.12 currently requires Node 20.9 or newer and supports React 19; this is the baseline for the initialization module. [Next package metadata](https://registry.npmjs.org/next/latest), [React package metadata](https://registry.npmjs.org/react/latest)

## Base components created in this module

- `Container`: constrains standard, wide, and reading-width content.
- `Grid`: applies the twelve-column layout contract.
- `Section`: preserves semantic sectioning and vertical rhythm.
- `VisuallyHidden`: exposes accessible text without visual noise.
- `SkipLink`: preserves keyboard access to main content.
- `AppProviders`: stable boundary for later client-only providers.

No page or project content is created in this module.
