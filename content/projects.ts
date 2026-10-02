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
          "A state-wise entry point supports destination discovery without forcing visitors through a generic list.",
        kind: "flow",
        label: "Destination discovery",
      },
      {
        detail:
          "A treasure-hunt layer turns visiting places into a sequence of small, motivating actions.",
        kind: "flow",
        label: "Exploration loop",
      },
      {
        detail:
          "Directions, summaries, hotel suggestions, and attraction recommendations support planning at the right moments.",
        kind: "flow",
        label: "Planning support",
      },
    ],
    challenge:
      "Bring destination discovery, trip planning, and local exploration into one experience without making travel planning feel like a form.",
    context: "Product concept",
    description:
      "A tourism planning platform that combines discovery, trip support, and a gamified exploration layer.",
    designSystem: [
      "Destination content is organised around a discover-plan-explore progression.",
      "The treasure-hunt mechanic rewards progress while remaining tied to real places and planning needs.",
      "Assistance is contextual: summaries and directions support a place instead of becoming a separate product.",
    ],
    development: [
      "Built the experience with HTML, CSS, and JavaScript.",
      "Implemented a dynamic Select Your Tourist Spot flow with state-wise exploration.",
      "Connected chatbot-style assistance with directions, place summaries, hotel suggestions, and attraction recommendations.",
    ],
    featured: true,
    iteration: [
      "Make the first selection feel like discovery, not filtering.",
      "Use game mechanics to encourage exploration without hiding practical planning information.",
      "Keep support options close to the place they help explain.",
    ],
    media: [],
    research: [
      "How might trip planning feel exploratory before it becomes logistical?",
      "What information helps a traveller move from a destination idea to a useful next step?",
      "How can a gamified mechanic create momentum without distracting from travel decisions?",
    ],
    results: [
      "Delivered an interactive tourism site with destination discovery, planning support, and nearby-service recommendations.",
      "Created a state-wise exploration system and a treasure-hunt-style visitor journey.",
      "Demonstrated how a product concept can combine utility and play in one narrative.",
    ],
    roles: [
      { label: "Role", value: "Designer & developer" },
      { label: "Focus", value: "Travel UX & gamification" },
    ],
    slug: "travelease",
    summary:
      "Trip planning reframed as a guided, rewarding journey through destinations and local discovery.",
    title: "Travelease",
    tools: ["HTML", "CSS", "JavaScript"],
    type: "web",
    wireframes: [
      "A state-led browse pattern gives users a concrete first decision.",
      "Destination details create a bridge between inspiration, place knowledge, and planning support.",
      "The exploration mechanic appears as a supporting loop rather than the primary navigation system.",
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
]);
