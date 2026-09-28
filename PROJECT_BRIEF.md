# Portfolio Foundation Brief

## Source inventory

- Resume: Peruri Jai Sai Siddhartha, B.Tech Computer Science and Engineering student at Sri Vasavi Engineering College (2023-2027 expected).
- Existing work: Travelease tourism planner, Gravity Playground with Cosmos Engine, PETPONKS visual identity and wireframes, VIGIL-88 branding/UI concepts.
- References: dark grid-based interfaces, bold editorial typography, violet active states, glass/metal controls, compact segmented navigation, and motion-led project presentation.
- Provided component references: liquid-glass button and a Three.js orbit gallery. These are inspiration only; implementation must be rewritten to meet the portfolio's accessibility and performance standards.

## Identity and positioning

Siddhartha is an emerging product-minded visual designer and creative front-end builder. The portfolio will position him as someone who turns playful, high-concept ideas into clear, usable digital experiences rather than as a generalist design student.

## Skills and technology evidence

### Design

UI/UX, website design, visual design, logo design, branding, posters, banners, wireframes, colour theory, typography, and layout.

### Tools

Figma, Framer, Adobe Photoshop, Illustrator, Lightroom, Canva, and Adobe Express.

### Development

HTML, CSS, JavaScript, responsive design, C, Python, Java, data structures and algorithms, databases, UNIX, networks, and web development fundamentals.

## Experience and projects

### Travelease

A tourism-planning platform with state-wise destination discovery, a location-based treasure-hunt mechanic, chatbot assistance, and hotel/attraction recommendations. Its strongest portfolio angle is experiential travel planning with game mechanics.

### Gravity Playground with Cosmos Engine

An interactive gravity simulation with a custom engine for forces, velocity, acceleration, orbital trajectories, collisions, body generation, particles, zoom, pan, and real-time controls. This is the strongest technical and interactive case study; it should anchor the homepage.

### PETPONKS

A pet-platform brand identity and initial product structure for adoption, storytelling, and community. It demonstrates brand thinking, wireframing, and user-centred interface planning.

### VIGIL-88

A cybersecurity-themed branding and UI-concept exploration. It can serve as a compact visual-system proof point, subject to confirming sufficient project material.

## Brand personality and visual direction

The visual language is precise, experimental, and confident: near-black canvas, a restrained technical grid, high-contrast warm-white type, and a single electric violet highlight. Typography should be editorial and oversized, with generous negative space and carefully paced transitions. Glass/metal surfaces belong only to controls and moments of interaction; they must not overpower case-study content.

The references also reveal a risk: visual effects can become generic or reduce legibility. The portfolio will prioritise work, story, hierarchy, keyboard access, and motion reduction over decorative 3D. Three.js is reserved for a lightweight optional hero detail, not a dependency for reading the site.

## Strengths, gaps, and opportunities

### Strengths

- A rare combination of visual design and hands-on interactive prototyping.
- Distinct project themes: travel gamification, physics simulation, pet-community brand, and cybersecurity.
- Evidence of both interface craft and systems thinking.

### Gaps

- The resume provides outcomes and features but no quantified project impact or process evidence.
- There is not yet a clearly curated project-asset library or live links in the workspace.
- The current resume language undersells the technical depth of the Cosmos Engine.

### Opportunities

- Build case studies around decisions, interaction, and the before/after user journey, not tool lists.
- Lead with Gravity Playground as the technical signature, then prove range through Travelease and PETPONKS.
- Establish a clear internship-ready narrative: visual designer who can prototype and ship rich web experiences.

## Unique selling proposition and career direction

**USP:** A visually rigorous designer who brings interactive ideas to life in the browser, from identity and interface structure to motion and playful real-time systems.

**Career direction:** UI/UX and product-design internships with a creative-front-end edge, progressing toward product designer / creative developer roles.

## Locked design principles

1. Desktop-first, with an accessible responsive baseline retained.
2. Near-black, warm-white, graphite, and a single violet accent.
3. Bold sans-serif display typography; highly legible neutral body type.
4. A persistent grid and deliberate editorial spacing.
5. Motion clarifies hierarchy and interaction; `prefers-reduced-motion` is fully respected.
6. Original portfolio assets and documented projects take precedence over stock imagery and unverified external media.
7. Every meaningful action is keyboard-operable, labelled, and has clear focus visibility.

## Nine independent modules

1. **Foundation brief and project plan** - source audit, positioning, design direction, and locked principles. Complete.
2. **Application foundation** - initialise the Next.js App Router project, TypeScript, Tailwind v4, shadcn structure, linting, formatting, and core dependencies.
3. **Design system** - implement tokens, typography, layout primitives, accessible controls, theme foundations, and motion rules.
4. **Site architecture and content model** - create routes, structured portfolio data, navigation, metadata foundations, and information hierarchy.
5. **Homepage editorial experience** - build the hero, selected-work narrative, capabilities, and contact conversion path.
6. **Gravity Playground case study** - produce the flagship technical project story and performant interactive visual treatment.
7. **Travelease and PETPONKS case studies** - deliver the remaining detailed work pages and project-gallery system.
8. **Conversion, analytics, and search** - implement contact flow, Schema.org, GA4, Search Console, Vercel Analytics, PostHog, Clarity, sitemap, and robots policy with privacy-safe configuration.
9. **Quality, performance, and release readiness** - complete accessibility, SEO, performance, production build, visual QA, and deployment handoff.

---

# Module 1: Complete Project Blueprint

## Asset study

| Source | Useful evidence | Portfolio implication |
| --- | --- | --- |
| Resume PDF | Name, contact details, education, skills, and three substantive projects | The website must be credible for internships while leading with demonstrated work rather than coursework. |
| Screen recording 1 | 12-second recorded interaction reference | Treat as motion-reference material only; do not reuse unless ownership and project context are confirmed. |
| Screen recording 2 | 4-second recorded interaction reference | Treat as motion-reference material only; do not reuse unless ownership and project context are confirmed. |
| Screenshots 1-2 | Dot-matrix field; compact dark segmented control with light/dark/settings states | Use as evidence for controlled technical texture and tactile controls, not as a layout to reproduce. |
| Screenshots 3-5 | Grid, oversized kinetic words, violet active state, editorial negative space | Confirms the desired pace: bold type, selective colour, controlled scroll storytelling. |
| Screenshots 6-7 | Glass overlay and stacked image-gallery interaction | Validates depth and motion as interaction cues; it does not justify generic stock imagery. |
| Screenshots 8-10 | Compressed navigation, pill navigation, test/production control | Supports an intentional lab-like, product-minded tone. |
| Liquid-glass component reference | SVG-filter glass, button variants, metal interaction study | The original has export and accessibility issues; only the tactile intent may influence a later, accessible control primitive. |
| Three.js orbit-gallery reference | Particle field and orbiting imagery | The original pulls remote stock assets and renders many individual meshes. It is not production-ready; any 3D use must be optional, local, data-driven, and performance-budgeted. |

## Brand strategy

### Purpose

Create a credible, memorable hiring and collaboration surface that demonstrates Siddhartha's ability to frame a problem, make a coherent visual system, and implement engaging web experiences.

### Positioning

An emerging product-minded visual designer and creative front-end builder, creating clear, expressive, interactive web experiences from identity through interface and prototype.

### Target audience

1. **Primary: internship recruiters and product-design hiring managers.** They need a fast read on level, role fit, process, and project quality.
2. **Secondary: founders and small teams.** They need confidence that one collaborator can shape a coherent launch experience.
3. **Tertiary: design peers and mentors.** They need a clear point of view and easy access to the work.

### Brand personality

Precise, curious, expressive, experimental, pragmatic, and approachable. The site should feel authored, never loud for its own sake; technically capable, never over-engineered.

### Unique selling proposition

**Visual systems with a working pulse:** Siddhartha pairs UI/UX and brand craft with browser-based prototypes and interactive systems, making ideas tangible rather than merely presentational.

### Competitive context

| Comparable pattern | What it proves | Strategic response |
| --- | --- | --- |
| Product-design portfolios such as Anshuman Dixit's frame work through bold interactive ideas and named case studies. | Design-development fluency has become a visible differentiator. | State both design role and build contribution on every project. |
| Senior portfolios such as Harshit Chaturvedi's support strong claims with scale and measurable outcomes. | Recruiters expect evidence, not only polished visuals. | Never invent metrics; use role, scope, constraints, artefacts, and observable outcomes until verified metrics are available. |
| Student portfolios such as Kartik Goel's make project context and case-study access obvious. | A clear project path reduces recruiter effort. | Put selected work ahead of biography and make each case study independently understandable. |
| Highly interactive creative-developer sites use cursor effects and 3D as signature moments. | Art direction can differentiate a portfolio. | Use interaction to reveal project content, never to obstruct navigation, text selection, performance, or accessibility. |

The category is crowded with dark, animated portfolios. Differentiation will come from a tighter "designer who builds" narrative, bespoke project storytelling, and disciplined restraint. Current portfolio examples consistently reward clear case studies and a visible approach rather than ornamental homepages. [Anshuman Dixit](https://anshumandixit.com/), [Kartik Goel](https://www.kartikgoel.com/), and [Creative Bloq's portfolio review](https://www.creativebloq.com/portfolios/examples-712368) informed this benchmark.

## Website goals and measures

### Goals

1. Communicate role, capability, and career direction in the first screenful.
2. Make Gravity Playground, Travelease, and PETPONKS compelling within two interactions.
3. Convert interested visitors to an email, LinkedIn, résumé download, or interview conversation.
4. Demonstrate front-end quality without degrading speed, accessibility, or search discoverability.

### Success signals

- A recruiter reaches a selected project from the homepage in one action.
- A visitor can identify Siddhartha's role, tools, and key contribution for every project in under 30 seconds.
- Core Web Vitals pass on a representative desktop profile.
- No critical accessibility issues in automated checks or keyboard review.
- Analytics record project-open, résumé-download, email, and external-profile actions without collecting form content or sensitive personal data.

## User journey

| Stage | Visitor question | Required answer | Desired action |
| --- | --- | --- | --- |
| Arrival | Who is this and why should I care? | A concise role statement plus proof-oriented work preview | Open flagship work |
| Evaluation | Can they solve the kind of problem I have? | Project framing, role, constraints, process, and final result | Read a case study |
| Validation | Is the craft and thinking real? | Process artefacts, implementation notes, accessible interactions, honest scope | View a second project or résumé |
| Conversion | How do I contact or evaluate them? | Clear email, LinkedIn, résumé, availability context | Email or download résumé |
| Return | Where was that project or contact route? | Persistent simple navigation and direct URLs | Resume evaluation |

## Content strategy

### Editorial approach

- Use first-person, direct, evidence-led writing.
- Lead every project with the problem, contribution, and result before tools.
- Use short labels and plain language; reserve technical detail for expandable or lower-page context.
- Keep claims factual: label self-initiated, academic, or conceptual work when applicable.
- Build content from a structured project model so the same facts power the homepage, work index, case studies, metadata, and JSON-LD.

### Content inventory and priority

| Priority | Project | Why it leads | Required evidence before publication |
| --- | --- | --- | --- |
| 1 | Gravity Playground with Cosmos Engine | Strongest crossover of systems thinking, interaction, and implementation | Live link or recording, engine explanation, controls, technical decisions, screenshots/video, known limitations |
| 2 | Travelease | Clear user value with distinctive gamified travel concept | Key flows, destination/treasure-hunt logic, chatbot scope, visual artefacts, prototype or recording |
| 3 | PETPONKS | Demonstrates brand, IA, and interface foundations | Logo rationale, wireframes, design-system fragments, user-flow artefacts, final screens |
| 4 | VIGIL-88 | Useful visual proof point but currently under-documented | Brand assets, concept brief, intended application, and explicit project scope |

### Case-study structure

1. Title, one-line outcome, project type, timeframe, and role.
2. Problem and opportunity.
3. My contribution and collaboration boundary.
4. Constraints and success criteria.
5. Discovery and concept framing.
6. System, interaction, or visual-design decisions.
7. Key flows and implementation/prototype detail.
8. Result, learnings, and next iteration.
9. Relevant links and next project.

No stage will be fabricated. If user testing, metrics, or collaboration did not occur, the case study will say so and instead show the decision framework and next validation step.

## Content hierarchy and information architecture

### Global hierarchy

1. Identity and role
2. Selected work
3. Capabilities and approach
4. About and education context
5. Contact and résumé

### Route map

```text
/
├── work
│   ├── gravity-playground
│   ├── travelease
│   ├── petponks
│   └── vigil-88 (conditional: only after source assets are confirmed)
├── about
├── resume
├── contact
├── sitemap.xml
└── robots.txt
```

The homepage is the editorial entry point, `/work` is the scan-friendly archive, project routes are deep-linkable narratives, and `/about` supports—not replaces—the work.

## SEO strategy

### Search intent and page targets

| Route | Intent | Primary topic |
| --- | --- | --- |
| `/` | Discover Siddhartha's portfolio | UI/UX designer and creative developer portfolio |
| `/work/gravity-playground` | Evaluate technical interactive work | interactive physics simulation / creative front-end project |
| `/work/travelease` | Evaluate UX and travel-product thinking | tourism planning web platform case study |
| `/work/petponks` | Evaluate brand and UI work | pet platform branding and UI/UX case study |
| `/about` | Verify background | Siddhartha's design background and skills |

### Implementation rules

- Use unique title, description, canonical URL, Open Graph image, and Twitter metadata per route.
- Use semantic single `h1`, logical `h2` hierarchy, descriptive link labels, and server-rendered copy.
- Add `Person`, `WebSite`, `CreativeWork`, and `BreadcrumbList` JSON-LD only where claims can be supported by page content.
- Generate sitemap and robots rules at build time; allow public pages and exclude future private preview routes.
- Use local, optimised images with stable descriptive filenames and useful `alt` text.
- Do not target vague keyword lists or use duplicate project copy; write for recruiter intent first.

## Analytics strategy

### Measurement plan

| Event | Trigger | Purpose |
| --- | --- | --- |
| `project_opened` | Selected-work card or project navigation | Rank interest by project |
| `case_study_depth` | Meaningful reading-depth thresholds | Identify engagement without recording text |
| `resume_downloaded` | Résumé asset download | Measure evaluation intent |
| `contact_initiated` | Mailto, contact form success, or LinkedIn click | Measure conversion |
| `external_profile_opened` | GitHub or LinkedIn action | Measure professional validation paths |
| `motion_reduced` | Motion preference is active, anonymous aggregate only | Verify experience parity |
| `web_vital` | INP, LCP, CLS telemetry | Protect quality as features grow |

### Tooling policy

- **Vercel Analytics:** baseline traffic and web-vitals observation.
- **GA4:** aggregate acquisition and conversion funnels, configured only after a valid measurement ID exists.
- **PostHog:** product-event analysis and optional feature-flag experiments; no session replay by default.
- **Microsoft Clarity:** enabled only after cookie/consent requirements are resolved for the deployment jurisdiction; mask sensitive fields and avoid recording email/contact input.
- **Google Search Console:** verify domain, submit sitemap, monitor indexing and search performance.

Environment variables must keep all provider IDs optional. The site must build and work without them.

## Desktop strategy

Desktop is the primary composition and interaction target: 1440px-wide reference, wide editorial columns, comfortably spaced project media, pointer-enhanced hover states, and keyboard parity. The implementation will still avoid fixed desktop-only assumptions: content must reflow without horizontal scrolling, hover-exclusive instructions, or inaccessible pointer interactions. Primary QA breakpoints will be 1280px, 1440px, and 1728px.

## Feature list

### Required

- Semantic App Router pages and deep-linkable case studies.
- Clear global navigation, skip link, footer contact paths, and résumé access.
- Structured project data with project labels, roles, tools, and content blocks.
- Accessible motion with reduced-motion support.
- Optimised local media and progressive enhancement.
- Route metadata, sitemap, robots, JSON-LD, and analytics adapters.
- Empty-state-safe external integrations and build-time validation.

### Conditional

- Lightweight interactive hero treatment only after performance testing.
- WebGL scene only if it materially communicates the Gravity Playground story and has an accessible static fallback.
- Contact form only after the delivery mechanism and anti-spam strategy are approved; email link is the reliable baseline.
- Theme preference only if it improves the portfolio's narrative; dark is the launch default.

### Explicit non-features for launch

- Login, pricing, dashboard, CMS, user accounts, chatbots, autoplay video, cursor replacement, and remote Unsplash media.

## Design and interaction direction

### Design direction and visual mood

An editorial technical journal: blackened graphite ground, warm-white content, thin grid structure, quiet graphite surfaces, and a single electric-violet emphasis. The visual mood is cinematic and engineered—high contrast, calm, deliberate, and slightly playful. It is not a recreation of any reference interface.

### Interaction direction

- Motion reveals sequence, state, and cause; it never exists merely to fill space.
- Use a small set of shared timing/easing tokens and transform/opacity-first animation.
- Prefer native scroll unless Lenis demonstrably improves the experience without creating focus or reduced-motion regressions.
- Build every hover response with a focus-visible equivalent; never hide essential content behind hover.
- Provide a static visual and text equivalent for every dynamic/WebGL treatment.

## Technology decisions

| Concern | Decision | Rationale |
| --- | --- | --- |
| Framework | Next.js App Router + TypeScript strict mode | Server-first content, route metadata, and type-safe components. |
| Styling | Tailwind CSS v4 + CSS custom properties | Small, consistent design tokens with fast composition. |
| Primitives | shadcn/ui + Radix UI | Accessible, controllable primitives without a heavy runtime design system. |
| Motion | Framer Motion by default; GSAP only for measured scroll sequences | Keep most motion declarative and bundle-conscious. |
| Smooth scrolling | Lenis only after accessibility/performance validation | Avoid global scrolling complexity by default. |
| 3D | React Three Fiber, Three.js, Drei only in a lazy client island | Isolate WebGL cost and preserve static fallback. |
| Forms | React Hook Form + Zod | Typed validation if a contact form is approved. |
| Icons | Lucide React | Consistent accessible SVGs without bespoke icon debt. |
| Media | `next/image`, local assets, `next/font` | Predictable loading, layout stability, and privacy. |
| Quality | ESLint, Prettier, pnpm | Automated baseline consistency. |
| Deployment | Vercel | Native Next.js support and analytics integration. |

## Proposed folder structure

```text
app/
  (site)/
    about/page.tsx
    contact/page.tsx
    resume/route.ts
    work/page.tsx
    work/[slug]/page.tsx
    layout.tsx
    page.tsx
  robots.ts
  sitemap.ts
  globals.css
  layout.tsx
components/
  analytics/
  case-studies/
  chrome/
  motion/
  sections/
  ui/
content/
  projects.ts
  site.ts
lib/
  analytics.ts
  metadata.ts
  projects.ts
  schema.ts
  utils.ts
public/
  assets/
    projects/
    resume/
types/
  project.ts
```

## Architecture plan

1. Keep route pages and metadata server-rendered by default.
2. Model projects as typed local content, validated against a Zod schema at build time.
3. Compose pages from reusable, semantic sections; do not create a universal page builder.
4. Put client boundaries around only interactive controls, analytics listeners, and optional visual effects.
5. Keep third-party analytics behind a single provider adapter and environment-variable gates.
6. Use `next/image` with responsive dimensions and `priority` only for the single primary LCP image.
7. Dynamically import WebGL and large motion sequences with a static fallback.
8. Fail the build for invalid content data, missing required project assets, or incorrect route metadata.

## Design principles

1. Work before decoration.
2. Proof before claims.
3. Intentional motion, optional complexity.
4. Accessibility is part of the aesthetic.
5. One visual system, many project voices.
6. Performance protects the first impression.
7. Every page earns its existence and its byte cost.

## Coding standards

- TypeScript strict; no `any`, unchecked casts, or ignored type errors.
- Server Components by default; use `"use client"` only for actual browser state or event handling.
- Named exports for reusable modules; one responsibility per file.
- Tailwind tokens first; no arbitrary values unless a documented visual token cannot express the requirement.
- No duplicated animation, class, metadata, or project data logic.
- Use semantic HTML first; ARIA only to supplement native semantics.
- All interactive elements need visible focus, keyboard access, accessible names, and disabled/loading states where relevant.
- Honour `prefers-reduced-motion`; avoid layout animation where CSS transition suffices.
- No remote stock imagery or external asset hotlinking.
- Run lint, typecheck, build, and relevant automated accessibility checks before a module is marked complete.
- Use Prettier formatting and pnpm lockfile discipline; never hand-edit generated files.

## Dependencies and decisions required before implementation

1. Confirm a preferred contact email and whether the résumé may be downloaded publicly.
2. Supply or approve original project screenshots, recordings, live links, repository links, and any results/metrics for the three priority projects.
3. Confirm whether VIGIL-88 has sufficient material to publish in the initial release.
4. Provide production IDs and consent requirements before analytics providers are activated.
