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
          "A dashboard-style layout structured around live-feeling classification states rather than a generic settings screen.",
        kind: "flow",
        label: "Monitoring dashboard",
      },
      {
        detail:
          "A ResNet-18 image classification pipeline built with PyTorch and Torchvision, explored inside the desktop shell.",
        kind: "simulation",
        label: "Computer-vision pipeline",
      },
      {
        detail:
          "A dark, vigilance-themed visual language ties the cybersecurity framing together across the interface.",
        kind: "brand",
        label: "Digital-defense visual identity",
      },
    ],
    challenge:
      "Give an urban-safety, monitoring-oriented AI application a clear interface identity while pairing it with real computer-vision work, not just a static mockup.",
    context: "AI desktop application",
    description:
      "A cybersecurity and urban-safety-oriented AI desktop application concept combining interface design with technical experimentation in computer vision and machine learning.",
    designSystem: [
      "A dark, cybersecurity-oriented visual identity sets the application apart from a conventional desktop tool.",
      "Dashboard-style, monitoring-driven layouts organise classification output around clear, glanceable states.",
      "A digital-defense aesthetic carries the interface's vigilance narrative without overstating the system's real-world capability.",
    ],
    development: [
      "Built the desktop application in Python with PyQt6 for the interface layer.",
      "Implemented an image classification pipeline using PyTorch, Torchvision, and a ResNet-18 model.",
      "Paired the computer-vision experimentation with a monitoring-oriented interface to explore how a classification system could be presented to a user.",
    ],
    featured: true,
    iteration: [
      "Treat the interface and the classification pipeline as one connected system, not a mockup wrapped around a separate script.",
      "Keep the dashboard vocabulary calm and legible so monitoring-style states stay readable under a dark theme.",
      "Use the vigilance and digital-defense narrative to guide visual decisions without overstating real-world capability.",
    ],
    media: [],
    research: [
      "How might a desktop interface communicate vigilance and monitoring without resorting to generic dashboard clichés?",
      "What does a computer-vision classification pipeline need from its interface to feel legible in real time?",
      "How can a cybersecurity-flavoured visual identity stay calm and usable rather than purely decorative?",
    ],
    results: [
      "Delivered a desktop application interface concept built around a dark, monitoring-oriented visual identity.",
      "Implemented a working image classification pipeline using PyTorch, Torchvision, and ResNet-18 inside a PyQt6 desktop shell.",
      "Demonstrated technical range beyond web interfaces by pairing UI design with applied computer-vision experimentation.",
    ],
    roles: [
      { label: "Role", value: "Designer & developer" },
      { label: "Focus", value: "Interface design & computer vision" },
    ],
    slug: "vigil-88",
    summary:
      "A cybersecurity and urban-safety-oriented AI desktop application combining a dark monitoring interface with computer-vision image classification.",
    title: "VIGIL-88",
    tools: ["Python", "PyQt6", "PyTorch", "Torchvision", "ResNet-18"],
    type: "ai",
    wireframes: [
      "The dashboard structure separates live monitoring output from configuration and system status.",
      "A dark canvas keeps classification results and alerts legible as the primary visual focus.",
      "Navigation stays minimal so the interface reads as a focused instrument rather than a general application shell.",
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
