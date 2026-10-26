import { z } from "zod";

import { projectSchema } from "@/content/schemas";

const projectsSchema = z.array(projectSchema);

export const projects = projectsSchema.parse([
  {
    artefacts: [
      {
        detail:
          "A controlled space for creating bodies, observing forces, and changing the conditions of a system in real time.",
        kind: "simulation",
        label: "Simulation workspace",
      },
      {
        detail:
          "The experience centred on force, velocity, acceleration, orbital trajectories, collision handling, zoom, and pan.",
        kind: "simulation",
        label: "Cosmos Engine controls",
      },
      {
        detail:
          "Particles and smooth motion were used to help the simulation feel alive while the controls retained their purpose.",
        kind: "simulation",
        label: "System feedback",
      },
    ],
    challenge:
      "Make an advanced gravity simulation approachable enough to explore while keeping the system's real-time behaviour legible.",
    context: "Interactive prototype",
    description:
      "An interactive physics simulation platform powered by a custom-built Cosmos Engine.",
    designSystem: [
      "A dark simulation field keeps celestial bodies and trajectories readable.",
      "Controls are treated as a clear instrument panel, separating creation, observation, and navigation.",
      "Motion is functional: it reveals gravitational behaviour, not a decorative layer over it.",
    ],
    development: [
      "Built the custom Cosmos Engine to calculate gravitational forces, velocity, acceleration, and orbital trajectories in real time.",
      "Implemented dynamic body generation, collision handling, zoom, pan, and interactive simulation controls.",
      "Used responsive HTML, CSS, and JavaScript to make the environment explorable across screen sizes.",
    ],
    featured: true,
    iteration: [
      "Start with a stable world state before exposing more creation controls.",
      "Keep physical feedback visible so an interaction has an observable consequence.",
      "Separate navigation controls from simulation variables to reduce accidental changes.",
    ],
    media: [],
    research: [
      "How might a user understand a gravity system by manipulating it instead of reading about it first?",
      "Which controls are essential for exploration, and which would distract from the simulation?",
      "How can real-time physics feedback remain visually calm enough to follow?",
    ],
    results: [
      "Delivered a fully responsive environment for creating and exploring gravity-based systems.",
      "Produced a working simulation with custom physics logic, interactive controls, particles, and collision behaviour.",
      "Established a strong technical case-study direction: visual interaction backed by a working system.",
    ],
    roles: [
      { label: "Role", value: "Designer & developer" },
      { label: "Focus", value: "Interaction & physics systems" },
    ],
    slug: "gravity-playground",
    summary:
      "A custom gravity engine made explorable through a responsive, real-time simulation.",
    title: "Gravity Playground",
    tools: ["HTML", "CSS", "JavaScript"],
    type: "interactive",
    wireframes: [
      "A central canvas makes the system the focal point rather than a secondary visual.",
      "Creation and simulation controls remain at the edge of the workspace for a direct manipulation flow.",
      "Zoom and pan support close inspection without breaking the wider spatial context.",
    ],
  },
  {
    artefacts: [
      {
        detail:
          "A modern pet-platform identity designed to hold adoption, stories, and community in one recognisable voice.",
        kind: "brand",
        label: "Brand foundation",
      },
      {
        detail:
          "Low- and high-fidelity wireframes clarified what each core area should help people do first.",
        kind: "brand",
        label: "Platform structure",
      },
      {
        detail:
          "Colour, typography, and layout principles were selected to give the early product a consistent visual rhythm.",
        kind: "brand",
        label: "Visual language",
      },
    ],
    challenge:
      "Give a pet-focused platform a distinct identity and a clear product structure before visual detail outruns the experience.",
    context: "Brand & wireframes",
    description:
      "A visual identity and early product structure for a platform focused on adoption, storytelling, and community.",
    designSystem: [
      "A modern logo establishes the PETPONKS brand as a distinct, memorable platform.",
      "Colour theory and layout principles create continuity across early product touchpoints.",
      "The interface language balances emotional storytelling with direct task clarity.",
    ],
    development: [
      "Created the identity and wireframe work in Figma and Framer.",
      "Designed low- and high-fidelity wireframes that outlined the platform's core features and layout.",
      "Focused the concept on intuitive navigation and a clear user-first product structure.",
    ],
    featured: true,
    iteration: [
      "Define the relationship between adoption, stories, and community before treating them as separate pages.",
      "Use wireframes to validate hierarchy before committing to visual styling.",
      "Apply a consistent identity system so the platform can feel caring without becoming visually noisy.",
    ],
    media: [],
    research: [
      "How might a pet platform balance emotional storytelling with an adoption-focused action path?",
      "Which information needs to be immediate for someone exploring an animal or a community story?",
      "How can the identity make a community product feel warm, modern, and navigable?",
    ],
    results: [
      "Delivered a distinctive logo and an initial visual foundation for PETPONKS.",
      "Created low- and high-fidelity wireframes for the product's core structure.",
      "Established an early interface and brand direction for a community-led pet platform.",
    ],
    roles: [
      { label: "Role", value: "Brand & UI/UX designer" },
      { label: "Focus", value: "Identity & product structure" },
    ],
    slug: "petponks",
    summary:
      "A warm, modern brand and interface foundation for a pet community built around adoption and stories.",
    title: "PETPONKS",
    tools: ["Figma", "Framer"],
    type: "brand",
    wireframes: [
      "Core platform areas were mapped as an early navigation and content structure.",
      "Low-fidelity wireframes established hierarchy before the high-fidelity pass.",
      "High-fidelity wireframes applied the emerging visual language to core experiences.",
    ],
  },
  {
    artefacts: [
      {
        detail:
          "The architecture treats a frame as evidence, not a verdict: observations accumulate into candidate events, are verified, and only then become incidents. Ten design documents specify the engines, data model, event model and camera pipeline.",
        kind: "flow",
        label: "Evidence-over-time pipeline",
      },
      {
        detail:
          "Webcam capture with frame identity and timestamps, bounded buffering, a camera health state machine, reconnection and stall detection, running headless with a clean shutdown.",
        kind: "flow",
        label: "Camera pipeline foundation",
      },
      {
        detail:
          "A console identity specified in the architecture documents but not yet built: hairline-ruled, monospace-numeric and near-monochrome, with colour reserved for severity and never the only signal of it.",
        kind: "brand",
        label: "Instrument-panel identity (designed)",
      },
    ],
    challenge:
      "Design a computer-vision platform around evidence accumulated over time rather than single-frame classification, and be explicit about what exists at each phase.",
    context: "Computer-vision foundation",
    description:
      "A computer-vision incident-detection and situational-awareness platform built from first principles. Its foundation is implemented; detection and the operator console are designed but not built yet.",
    designSystem: [
      "The console is specified as an instrument panel: dense, hairline-ruled and near-monochrome, with colour reserved almost entirely for severity.",
      "It ranks information by the cost of missing it: an unacknowledged critical incident first, then live camera views, the incident queue and camera health.",
      "A capability that does not exist is absent or disabled with its reason stated, never a control that appears to work.",
    ],
    development: [
      "Built the P0 foundation in Python: layered, validated configuration, structured logging with redaction, and frozen domain models for the whole data model.",
      "Implemented webcam capture with frame identity and timestamps, bounded buffering, a camera health state machine, reconnection and stall detection.",
      "Enforced the architecture by machine rather than convention: layered imports checked with import-linter, a pure domain layer, a single clock module and no swallowed exceptions.",
    ],
    featured: true,
    iteration: [
      "State what exists: the repository keeps a limitations inventory, and the word real-time is not claimed until it has been measured.",
      "Make capability a computed fact rather than a claim, so what is available is reported by the system and never asserted.",
      "Keep the system local-first, with no facial recognition or identity profiling.",
    ],
    media: [],
    research: [
      "What changes when an incident is a conclusion drawn from accumulated evidence instead of a single-frame classification?",
      "How can a system show what it can and cannot do at each phase, so no control appears to work when it does not?",
      "What should an operator see first on a screen watched for hours, and what should stay visually quiet?",
    ],
    results: [
      "Delivered a P0 foundation: configuration, logging, a complete domain model, webcam capture, camera health and a headless application lifecycle.",
      "Wrote ten architecture documents covering the engines, data model, event model, camera pipeline, console, testing and roadmap.",
      "Nothing is detected yet. Object detection, tracking, incidents, alerts and the console are designed but not built, and the repository says so in its own limitations document.",
    ],
    roles: [
      { label: "Role", value: "Designer & developer" },
      { label: "Focus", value: "Systems architecture & interface design" },
    ],
    slug: "vigil-88",
    summary:
      "A computer-vision platform built around evidence over time. Its foundation runs; detection is not built yet.",
    title: "VIGIL-88",
    tools: ["Python", "Pydantic", "OpenCV"],
    type: "ai",
    wireframes: [
      "The console is specified as seven views, each with one job: Live Wall, Incident Desk, Timeline, Cameras, Zones, Analytics and System.",
      "Camera health is ranked above the event timeline, so a blind camera is never an unexplained black tile.",
      "A status strip that never scrolls keeps armed state, camera health and system load in view at all times.",
    ],
  },
  {
    artefacts: [
      {
        detail:
          "Logo explorations and brand identity concepts developed across a range of visual directions.",
        kind: "brand",
        label: "Logo & identity explorations",
      },
      {
        detail:
          "Posters, banners, and social/design assets applying a consistent visual system to different formats.",
        kind: "brand",
        label: "Posters & campaign assets",
      },
      {
        detail:
          "Typography exploration and layout composition studies underpinning the collection's visual communication.",
        kind: "brand",
        label: "Typography & composition",
      },
    ],
    challenge:
      "Build a body of standalone visual-design work — logos, posters, and identity concepts — that demonstrates branding and composition craft independent of any single product.",
    context: "Visual design collection",
    description:
      "A collection of visual-design work demonstrating branding, typography, layout, visual identity, and digital graphic composition.",
    designSystem: [
      "Each piece treats typography as a primary structural element, not a decorative afterthought.",
      "Colour theory and layout principles are applied consistently across logos, posters, and banners.",
      "Visual identities are developed as small systems — mark, type, and colour working together — rather than isolated graphics.",
    ],
    development: [
      "Developed logo and brand identity concepts across multiple visual directions.",
      "Designed posters, banners, and social/design assets applying consistent visual systems.",
      "Explored typography, colour theory, and layout composition as the core craft of each piece.",
    ],
    featured: true,
    iteration: [
      "Iterate on typography and composition before finalising colour so the structure holds up on its own.",
      "Test each identity across multiple formats (logo, poster, banner) to check for consistency.",
      "Keep visual communication legible and intentional rather than purely decorative.",
    ],
    media: [],
    research: [
      "How does a mark, a typeface, and a colour system combine into one coherent visual identity?",
      "What makes a poster or banner communicate quickly while still feeling considered?",
      "How can a collection of separate pieces still read as one consistent design sensibility?",
    ],
    results: [
      "Produced a collection of logo, poster, and identity work spanning multiple visual directions.",
      "Demonstrated branding, typography, and layout craft independent of a single product or platform.",
      "Established a visual-design counterweight to the portfolio's product and interactive work.",
    ],
    roles: [
      { label: "Role", value: "Visual & graphic designer" },
      { label: "Focus", value: "Branding & typography" },
    ],
    slug: "creative-design-collection",
    summary:
      "A collection of branding, typography, and visual-design work spanning logos, posters, and identity concepts.",
    title: "Creative Design Collection",
    tools: [],
    type: "brand",
    wireframes: [
      "Layout studies establish grid and hierarchy before typography and colour are finalised.",
      "Each identity is composed to hold up across multiple formats — logo, poster, and banner.",
      "Composition choices prioritise clear visual communication over decorative complexity.",
    ],
  },
  {
    artefacts: [
      {
        detail:
          "A two-minute calculator that answers how much a roof can generate, what it will save, and how far to trust the number, with an honest range and every assumption shown.",
        kind: "flow",
        label: "Solar calculator",
      },
      {
        detail:
          "An analysis console for hourly irradiance forecasting with time-aware validation, calibrated prediction intervals and results traceable to their data and code.",
        kind: "flow",
        label: "Analysis console",
      },
      {
        detail:
          "The consumer interview is data served by the API, so a farmer and a factory manager are asked different questions by the same engine.",
        kind: "flow",
        label: "Persona-driven interview",
      },
    ],
    challenge:
      "Put one solar-prediction engine behind two audiences, a person deciding whether to install and an analyst who needs to check the work, without overstating certainty.",
    context: "Full-stack data product",
    description:
      "A solar energy intelligence platform: a plain-language calculator for deciding on an installation, and an analysis console for validating the forecasts behind it.",
    designSystem: [
      "The consumer surface defaults to a light theme with mobile-first density, because it is read on a phone outdoors.",
      "The console keeps a dark instrument palette built for dense analysis.",
      "Every estimate shows a range, a confidence level and its assumptions rather than a single confident number.",
    ],
    development: [
      "Built a Python backend whose physical chain, from solar geometry to PV conversion and inverter losses, is a set of pure functions shared by both surfaces.",
      "Added a consumer estimate layer covering demand, sizing, battery balance, economics, uncertainty and a shareable report, alongside time-aware validation and conformal prediction intervals.",
      "Shipped the work with Docker Compose, load testing and security, deployment and recovery documentation.",
    ],
    featured: true,
    iteration: [
      "Keep what was scientifically load-bearing and compose the new consumer layer on top instead of rewriting it.",
      "Serve the interview as data so new user types need no new wizard.",
      "Delete only code that nothing calls, and say so in the delivery report.",
    ],
    media: [],
    research: [
      "How can a forecast be presented so a non-expert can tell how much to believe it?",
      "Which questions does each kind of user need to answer before a sizing recommendation is meaningful?",
      "What makes a prediction checkable by someone who did not build it?",
    ],
    results: [
      "Delivered a calculator and an analysis console over one engine, with consumer and research APIs.",
      "Kept the original 133 tests passing while adding the consumer layer.",
      "Documented the method, assumptions and limitations in a delivery report.",
    ],
    roles: [
      { label: "Role", value: "Designer & developer" },
      { label: "Focus", value: "Data product & uncertainty design" },
    ],
    slug: "helios",
    summary:
      "A solar calculator and analysis console over one engine, built to show how much its own numbers can be trusted.",
    title: "Helios",
    tools: ["Python", "FastAPI", "Docker"],
    type: "product",
    wireframes: [
      "The consumer flow asks a short, persona-specific interview before showing any result.",
      "Results lead with a range and confidence, with assumptions one step away.",
      "The console organises analysis into separate views for data quality, models, uncertainty and scenarios.",
    ],
  },
  {
    artefacts: [
      {
        detail:
          "The name is built from five layers of light at five depths that sum into the word only from exactly one vantage point.",
        kind: "simulation",
        label: "Five-layer name",
      },
      {
        detail:
          "Stillness resolves, motion scatters, attention pulls: the pointer behaves as a mass acting on the scene.",
        kind: "simulation",
        label: "One law of interaction",
      },
      {
        detail:
          "The piece can be pulled out of its browser window, opening a second window onto the same continuous world.",
        kind: "flow",
        label: "Beyond the frame",
      },
    ],
    challenge:
      "Make a piece about a person that is an environment to move through rather than a portfolio page, with no framework, build step or backend.",
    context: "Interactive artwork",
    description:
      "An interactive artwork built around the idea of radiolucence: you never see the person directly, only what passes through them.",
    designSystem: [
      "A single rule governs the world: stillness resolves, motion scatters, attention pulls.",
      "Layers pass through and reveal one another instead of sitting in sections.",
      "Restraint over spectacle: a small 3D lens appears at only three held moments and the 2D piece stays complete without WebGL.",
    ],
    development: [
      "Built in HTML, CSS and vanilla JavaScript with Three.js vendored locally, and no network requests, font files or image assets.",
      "Wrote the glyph, layer and camera systems that let five sheets align into the name from a single viewpoint.",
      "Supported phones and prefers-reduced-motion, and made it run from file:// by using classic scripts instead of modules.",
    ],
    featured: true,
    iteration: [
      "Make every deeper behaviour discoverable by stopping, with none of them explained.",
      "Design for three speeds of visit: scroll through, linger, and return repeatedly.",
      "Keep the 2D piece whole so the 3D is an enhancement, not a dependency.",
    ],
    media: [],
    research: [
      "How can a piece describe a person without a portrait or a list of skills?",
      "What does an interface feel like when the user's stillness is the input?",
      "How much can be left unexplained before it reads as broken?",
    ],
    results: [
      "Delivered a four-part continuous world, from the name to its inside, its edge and its ending.",
      "Produced a piece that runs offline with no build step.",
      "Established a signature interaction language for the rest of the work.",
    ],
    roles: [
      { label: "Role", value: "Designer & developer" },
      { label: "Focus", value: "Interaction & visual systems" },
    ],
    slug: "siddhartha",
    summary:
      "An interactive artwork about a person, where the name is only visible from exactly one place.",
    title: "SIDDHARTHA",
    tools: ["JavaScript", "Three.js", "HTML", "CSS"],
    type: "interactive",
    wireframes: [
      "A single continuous scroll carries the visitor from the name through its inside to the edge.",
      "Doors and memories reward a visitor who stops and rests the pointer.",
      "On a phone the interior becomes a panorama you turn and tap.",
    ],
  },
  {
    artefacts: [
      {
        detail:
          "Uploads move through an asynchronous parse, normalise, chunk, embed and index pipeline backed by a worker queue.",
        kind: "flow",
        label: "Document processing pipeline",
      },
      {
        detail:
          "The architecture is written down in overview, backend, frontend, data-flow, AI-pipeline and security documents, with 24 decision records.",
        kind: "flow",
        label: "Architecture documentation",
      },
      {
        detail:
          "Layering is enforced in CI with import-linter, so a dependency in the wrong direction fails the build.",
        kind: "flow",
        label: "Enforced layering",
      },
    ],
    challenge:
      "Build a knowledge platform whose answers cite the exact source passage, and be exact about which parts exist yet.",
    context: "Platform in development",
    description:
      "A document and knowledge platform where uploaded files are processed into a searchable index, with answers intended to cite the exact source passage. Identity, workspaces, upload and processing are built; retrieval and chat are not.",
    designSystem: [
      "A single origin lets both auth tokens be HttpOnly cookies that JavaScript cannot read.",
      "Dependency direction runs composition, api, application and infrastructure, domain, core, and is checked by machine.",
      "The repository states plainly what exists and what does not, and does not call itself production-ready.",
    ],
    development: [
      "Built the backend in Python with FastAPI, Celery workers, PostgreSQL with pgvector, Redis and S3-compatible storage.",
      "Implemented identity, workspaces, document upload and the asynchronous processing pipeline.",
      "Recorded 24 architecture decisions with the alternatives rejected, and documented failure modes and runbooks for each dependency.",
    ],
    featured: true,
    iteration: [
      "Write the failure behaviour of each dependency before relying on it.",
      "Keep the status honest: retrieval and chat are listed as not yet built.",
      "Fail fast on missing configuration instead of booting with defaults.",
    ],
    media: [],
    research: [
      "What does a citation have to resolve to for a reader to trust an answer?",
      "How should a document move through processing so a failure at any step is visible and recoverable?",
      "Which architectural rules are worth enforcing in CI rather than in review?",
    ],
    results: [
      "Delivered milestones M0 to M4: identity, workspaces, upload and the processing pipeline.",
      "Produced architecture, security and operations documentation with 24 decision records.",
      "Retrieval and chat are designed but not yet built.",
    ],
    roles: [
      { label: "Role", value: "Designer & developer" },
      { label: "Focus", value: "Systems architecture & backend" },
    ],
    slug: "orbit",
    summary:
      "A document-grounded knowledge platform whose ingestion pipeline runs; retrieval and chat are not built yet.",
    title: "ORBIT",
    tools: ["Python", "FastAPI", "PostgreSQL", "Next.js"],
    type: "ai",
    wireframes: [
      "A workspace is the unit of identity and document ownership.",
      "Each document shows its processing state as it moves through the pipeline.",
      "Answers are designed so every citation resolves to a source passage.",
    ],
  },
  {
    artefacts: [
      {
        detail:
          "A pure rules engine kept separate from rendering. Every frame the 3D layer reads game state and writes nothing back, so visuals cannot drift from the rules.",
        kind: "simulation",
        label: "Rules-first engine",
      },
      {
        detail:
          "Marathon, Sprint and Ultra modes with their own goals and rankings, plus a line-clear signature for single, double, triple, tetris, perfect clear and T-spin.",
        kind: "simulation",
        label: "Modes and clear effects",
      },
      {
        detail:
          "A chamfered title mark, a rotating 3D tetromino spiral on a plinth, and a HUD that keeps the board as the focal point.",
        kind: "brand",
        label: "Menu and HUD",
      },
    ],
    challenge:
      "Give a familiar puzzle game a premium 3D presentation without letting the visuals ever disagree with the rules underneath.",
    context: "3D arcade game",
    description:
      "A 3D arcade interpretation of Tetris built with React, Three.js and a pure rules engine, with three game modes and graphics presets that change real rendering work.",
    designSystem: [
      "A near-black stage with one lime accent keeps the coloured pieces as the loudest thing on screen.",
      "Each tetromino has its own material, from machined steel to translucent polymer, with a colour-keyed front plate so neighbours stay readable.",
      "Motion is tied to game events: it confirms a lock or a clear, and reduced motion removes sway, shake and debris entirely.",
    ],
    development: [
      "Wrote the rules engine, input handling with auto-repeat, and a fixed-step game loop as plain TypeScript, with the renderer only reading from it.",
      "Built the 3D arena with instanced meshes, so the whole stack is roughly 14 draw calls, with Low, High and Ultra presets for post-processing, shadows and effect budgets.",
      "Added versioned local persistence, a seedable piece sequence for repeatable tests, and a 2D canvas fallback for browsers without WebGL.",
    ],
    featured: true,
    iteration: [
      "Smooth piece motion as a decaying offset on top of the logical position, so visuals always converge on the true game state.",
      "Give every line-clear a distinct visual, and allocate all effect objects once instead of per clear.",
      "Keep the unfinished parts visible: the Overdrive meter is labelled as a placeholder with no mechanic behind it.",
    ],
    media: [],
    research: [
      "How much can the visuals add before they get in the way of reading the board at speed?",
      "How can a renderer follow the rules engine closely enough that a line clear looks like what the engine did?",
      "What should a lower-powered device give up first when frame rate drops?",
    ],
    results: [
      "Delivered a playable 3D game with three modes, hold and next previews, and local statistics and personal bests.",
      "The project status file records 201 unit tests and 21 end-to-end browser tests passing at the last run.",
      "Touch controls, music and the Overdrive mechanic are not built yet, and frame rate has not been measured on integrated GPUs or phones.",
    ],
    roles: [
      { label: "Role", value: "Designer & developer" },
      { label: "Focus", value: "Game engine & 3D rendering" },
    ],
    slug: "tetrix",
    summary:
      "A 3D take on Tetris where a pure rules engine drives every block, effect and camera move.",
    title: "TETRIX",
    tools: ["TypeScript", "React", "Three.js", "Vitest", "Playwright"],
    type: "interactive",
    wireframes: [
      "The HUD is a three-column layout around a transparent stage cell, and the board is framed to fit that cell.",
      "On portrait tablets and phones it becomes a compact strip of hold, score and next above a full-width stage.",
      "The menu, results and pause screens share one set of components with the in-game HUD.",
    ],
  },
  {
    artefacts: [
      {
        detail:
          "Every lit surface picks a glyph from a coverage-sorted atlas by its brightness, and the glyph grid is attached to each piece so characters move with it.",
        kind: "simulation",
        label: "ASCII shader",
      },
      {
        detail:
          "A screen pass adds depth-edge outlines, colour grading and Bayer or halftone dithering over the glyph surface.",
        kind: "simulation",
        label: "Halftone pipeline",
      },
      {
        detail:
          "A setup panel for mode, side, match type and six engine strengths, plus an optional account and a level and rating readout.",
        kind: "flow",
        label: "Game setup and progression",
      },
    ],
    challenge:
      "Make chess feel like a tactile 3D object drawn entirely in glyphs, while keeping it fully playable, accessible and honest about what is and is not verified.",
    context: "3D chess game",
    description:
      "A 3D chess game rendered through colourful ASCII glyphs and GPU dithering, playable against a Stockfish engine or a second player in the browser.",
    designSystem: [
      "One glyph shader draws every lit surface, so the whole scene shares a single visual language.",
      "The interface is DOM text in a monospace face, so it stays crisp on top of the dithered 3D scene.",
      "A semantic DOM board mirrors the game state and doubles as a playable 2D fallback and the route for keyboard and screen-reader play.",
    ],
    development: [
      "Built the game on chess.js for the rules, a procedural 3D board and pieces in React Three Fiber, and a custom shader and dither pipeline.",
      "Runs Stockfish as a WebAssembly engine in a Web Worker, with six difficulty presets and a fallback search if the engine fails.",
      "Added progression with XP, levels, Elo-style rated games and 13 verified challenge positions, plus optional Supabase accounts, saved games and privacy controls.",
    ],
    featured: true,
    iteration: [
      "Keep rules authoritative in one place and let rendering, animation and the accessible board all read from it.",
      "Make accounts optional so guest play is complete and no account code loads without configuration.",
      "State the limits plainly: progression is local and unverified, and performance was measured only in a desktop browser.",
    ],
    media: [],
    research: [
      "How far can a scene be pushed into glyphs and dithering before pieces stop being readable as chess pieces?",
      "How can the game be fully playable without the 3D view for keyboard and screen-reader users?",
      "What would make local progression honest about not being competitive evidence?",
    ],
    results: [
      "Delivered a playable 3D chess game with a Stockfish opponent, two-player mode, challenges, saved games and a theme lab.",
      "Mate challenges are verified by exhaustive search through chess.js, and the project includes a perft test of the rules.",
      "Drag-to-move is not implemented, and performance has not been measured on mobile hardware.",
    ],
    roles: [
      { label: "Role", value: "Designer & developer" },
      { label: "Focus", value: "3D rendering & game systems" },
    ],
    slug: "halftone-gambit",
    summary:
      "3D chess drawn entirely in ASCII glyphs and halftone dithering, with a Stockfish opponent in the browser.",
    title: "Halftone Gambit",
    tools: ["TypeScript", "React", "Three.js", "Stockfish", "Supabase"],
    type: "interactive",
    wireframes: [
      "A left-hand setup panel holds mode, side, match type and engine strength, beside the 3D board.",
      "The title is an ASCII wordmark, with level, rating and account status in a compact strip above the options.",
      "Legal and privacy links sit at the foot of the setup panel.",
    ],
  },
]);
