import { projects } from "@/content/projects";

export type AuthorityArticle = {
  description: string;
  publishedAt: string;
  readingTime: string;
  sections: ReadonlyArray<{
    body: ReadonlyArray<string>;
    title: string;
  }>;
  slug: string;
  title: string;
  topic: string;
};

export const authorityArticles: readonly AuthorityArticle[] = [
  {
    description:
      "What I learned about explaining a complex system by letting people push it around, from building a gravity simulation.",
    publishedAt: "2026-08-03",
    readingTime: "5 min read",
    sections: [
      {
        body: [
          "A physics engine can be correct and still hard to follow. It gets easier once someone can create a body, change a condition and watch the trajectory respond.",
          "Gravity Playground started from that idea. Force, velocity, acceleration and collisions are visible in one running system, so nobody has to read them as separate facts.",
        ],
        title: "Interaction makes systems legible",
      },
      {
        body: [
          "I split the interface by job: creating a system, observing it and moving through it. When those jobs share one control, people change the world without knowing what they changed, or get lost while panning.",
          "The simulation takes most of the screen and the controls sit around it like instruments.",
        ],
        title: "Controls need a clear role",
      },
      {
        body: [
          "Particles, smooth motion, zoom and pan make a simulation pleasant to use. I kept only the motion that shows cause and effect, because anything else makes the engine look more complicated than it is.",
        ],
        title: "Motion should explain, not decorate",
      },
    ],
    slug: "making-physics-feel-touchable-on-the-web",
    title: "Making Physics Feel Touchable on the Web",
    topic: "Creative technology",
  },
  {
    description:
      "Why I drew wireframes and a logo for PETPONKS before refining any screen, when the product had several jobs to do at once.",
    publishedAt: "2026-08-03",
    readingTime: "4 min read",
    sections: [
      {
        body: [
          "PETPONKS had to hold adoption, community and storytelling in one product, and none of the three was the obvious main task. Before polishing a screen I wanted to know how they fit together.",
          "Wireframes answered that. I used them to test what the product should make easy, prominent and repeatable.",
        ],
        title: "Structure comes before styling",
      },
      {
        body: [
          "A logo, a colour direction and a type rhythm give later decisions something to point at. I did not need a finished brand kit on day one, only a voice that would survive iteration.",
          "In a community product the shared reference keeps the emotional storytelling from turning into noise.",
        ],
        title: "Identity creates continuity",
      },
      {
        body: [
          "The check I come back to is whether the personality helps people move with confidence. A warm, memorable system still has to make navigation, hierarchy and the next action obvious.",
        ],
        title: "Personality needs a job",
      },
    ],
    slug: "why-product-systems-need-a-point-of-view",
    title: "Why Product Systems Need a Point of View",
    topic: "Visual systems",
  },
  {
    description:
      "VIGIL-88 waits for evidence to build up across frames before it calls anything an incident. Here is how that shapes the design.",
    publishedAt: "2026-11-16",
    readingTime: "5 min read",
    sections: [
      {
        body: [
          "One frame is a weak witness. A shadow, a reflection or a passing hand can look like an event for exactly one frame, and an alarm that fires on it teaches the operator to ignore alarms.",
          "In VIGIL-88 observations pile up into candidate events. The candidates get verified, and only then does an incident exist. The conclusion comes from time passing.",
        ],
        title: "A frame is evidence, not a verdict",
      },
      {
        body: [
          "The console follows the same rule. I specified it as an instrument panel ordered by the cost of missing something: an unacknowledged critical incident first, then the live camera views, the incident queue and camera health.",
          "Colour is saved for severity, and it is never the only signal. Someone watching this screen for hours needs most of it to stay quiet.",
        ],
        title: "Design the screen for hour six",
      },
      {
        body: [
          "Nothing is detected yet. The foundation runs: configuration, logging, the full domain model, webcam capture and camera health. Detection, tracking, incidents and the console are designed and not built, and the repository's limitations document says so.",
          "A control for something that does not exist is either missing or disabled with the reason written next to it.",
        ],
        title: "Say what exists",
      },
    ],
    slug: "evidence-over-time-not-a-single-frame",
    title: "Evidence Over Time",
    topic: "Systems design",
  },
  {
    description:
      "How the Helios solar calculator shows a range and its assumptions, so a non-expert can judge how far to trust an estimate.",
    publishedAt: "2026-11-16",
    readingTime: "4 min read",
    sections: [
      {
        body: [
          "A single confident number asks for more trust than a forecast has earned. Someone deciding whether to put panels on a roof needs to know how much to believe the answer.",
          "Every Helios estimate therefore comes with a range, a confidence level and the assumptions behind it.",
        ],
        title: "A number needs a range",
      },
      {
        body: [
          "One engine serves two audiences: a person deciding whether to install, and an analyst who has to check the work. Both run on the same physical chain, from solar geometry through PV conversion to inverter losses, written as pure functions.",
          "The surfaces differ. The calculator is light and built for phones, because people read it outdoors. The analysis console is a dark instrument panel for dense work, with calibrated prediction intervals and time-aware validation.",
        ],
        title: "One engine, two audiences",
      },
      {
        body: [
          "The consumer interview is data served by the API, so a farmer and a factory manager get different questions from the same engine. A new kind of user means new data and no new wizard.",
          "The test for the whole interface is whether someone who did not build it can check a prediction. Results trace back to their data and code, and a delivery report lists the limits.",
        ],
        title: "Ask only what the answer needs",
      },
    ],
    slug: "show-the-range-not-just-the-number",
    title: "Give Every Estimate a Range",
    topic: "Data products",
  },
  {
    description:
      "In the SIDDHARTHA artwork the visitor's stillness is the input. Here is what that did to the design.",
    publishedAt: "2026-11-16",
    readingTime: "4 min read",
    sections: [
      {
        body: [
          "SIDDHARTHA runs on one law: stillness resolves, motion scatters, attention pulls. The name is built from five layers of light at five depths, and it reads as a word from exactly one vantage point, if you hold still there.",
          "Most interfaces reward activity. This one rewards waiting, and that changes what a visitor does in the first ten seconds.",
        ],
        title: "Reward the pause",
      },
      {
        body: [
          "I designed for three speeds of visit: scrolling through, lingering, and coming back. Nothing deeper is explained. Each behaviour is found by stopping.",
          "My open question was how much I could leave unexplained before it looked broken. I made the first layer complete on its own, so a visitor who never finds anything deeper has still seen a whole piece.",
        ],
        title: "Leave things to be found",
      },
      {
        body: [
          "A small 3D lens appears at only three held moments, and the 2D piece works without WebGL. It supports phones and reduced motion, and it runs from a plain file with no build step and no network requests.",
        ],
        title: "Keep the enhancement an enhancement",
      },
    ],
    slug: "designing-for-stillness",
    title: "Designing for Stillness",
    topic: "Interaction design",
  },
  {
    description:
      "Which architecture rules I make CI enforce instead of leaving to review, taken from the layering checks in ORBIT and VIGIL-88.",
    publishedAt: "2026-11-16",
    readingTime: "5 min read",
    sections: [
      {
        body: [
          "A rule that lives in a document lasts until the first deadline. ORBIT and VIGIL-88 both check their layering with import-linter, so a dependency pointing the wrong way fails the build before anyone has to spot it in review.",
          "ORBIT's direction runs composition, api, application and infrastructure, domain, core. VIGIL-88 enforces a pure domain layer, a single clock module and no swallowed exceptions the same way.",
        ],
        title: "Let the build say no",
      },
      {
        body: [
          "For ORBIT I recorded 24 architecture decisions with the alternatives I rejected, and wrote down how each dependency fails before I relied on it. A decision with no recorded alternatives is an opinion.",
          "Configuration works the same way: if a setting is missing, the app refuses to start instead of booting on defaults that hide the problem.",
        ],
        title: "Write the failure down first",
      },
      {
        body: [
          "ORBIT has identity, workspaces, upload and an asynchronous processing pipeline. Retrieval and chat are designed and not built, and the repository does not call itself production-ready.",
          "The next reader, including me in six months, can see where the real work starts.",
        ],
        title: "Keep the status honest",
      },
    ],
    slug: "architecture-rules-worth-enforcing-by-machine",
    title: "Architecture Rules Worth Enforcing by Machine",
    topic: "Systems architecture",
  },
  {
    description:
      "How TETRIX keeps its 3D presentation from ever disagreeing with the game rules underneath it.",
    publishedAt: "2026-11-16",
    readingTime: "5 min read",
    sections: [
      {
        body: [
          "TETRIX has a pure rules engine: plain TypeScript with its own input handling and a fixed-step loop. The 3D layer reads game state every frame and never writes to it, so the visuals cannot drift from the rules.",
          "When a line clears, the effect shows what the engine did, because the renderer has no other source of truth.",
        ],
        title: "The renderer only reads",
      },
      {
        body: [
          "Piece motion is a decaying offset on top of the logical position, so the picture always settles on the true state. Each kind of clear has its own look (single, tetris, perfect clear, T-spin), and every effect object is allocated once instead of per clear.",
          "The arena uses instanced meshes and the whole stack costs roughly 14 draw calls. Low, High and Ultra presets change real rendering work.",
        ],
        title: "Smooth the picture, not the truth",
      },
      {
        body: [
          "The status file records 201 unit tests and 21 end-to-end tests passing at the last run. It also lists what is missing: touch controls, music and the Overdrive mechanic are not built, and I have not measured frame rate on integrated GPUs or phones.",
          "The Overdrive meter is labelled as a placeholder in the game itself.",
        ],
        title: "Keep the unfinished parts visible",
      },
    ],
    slug: "let-the-rules-engine-lead-the-renderer",
    title: "Let the Rules Engine Lead the Renderer",
    topic: "Game engineering",
  },
  {
    description:
      "Why Halftone Gambit ships a plain DOM chess board next to its ASCII 3D scene, and what that did for keyboard and screen-reader play.",
    publishedAt: "2026-11-16",
    readingTime: "4 min read",
    sections: [
      {
        body: [
          "Halftone Gambit draws chess in glyphs and dithering. It looks good and is hard to read as a board, and I wanted to find how far a scene can go before the pieces stop looking like chess pieces.",
          "I also decided the game would never depend on the picture. A semantic DOM board mirrors the game state, so the same game exists without the 3D view.",
        ],
        title: "Beautiful, and still playable",
      },
      {
        body: [
          "That board is the 2D fallback and the way in for keyboard and screen-reader players. The interface text is real monospace DOM on top of the scene, so it stays sharp.",
          "The rules live in one place, and the rendering, the animation and the accessible board all read from it.",
        ],
        title: "One game state, several ways to play it",
      },
      {
        body: [
          "Accounts are optional. Guest play is complete, and no account code loads unless it is configured. Mate challenges are checked by exhaustive search through chess.js, and the project has a perft test of the rules.",
          "Progression is local and unverified, drag-to-move is not implemented, and I measured performance only in a desktop browser.",
        ],
        title: "Say what is verified",
      },
    ],
    slug: "playable-without-the-3d-view",
    title: "Playable Without the 3D View",
    topic: "Accessibility",
  },
  {
    description:
      "What making logos, posters and identity concepts taught me about treating typography as structure.",
    publishedAt: "2026-11-16",
    readingTime: "4 min read",
    sections: [
      {
        body: [
          "In the Creative Design Collection, type is part of the structure of each piece. If the typography and composition work in black and white, colour can only improve them.",
          "So I work in that order: typography and composition first, colour last. A layout that needs colour to make sense is not finished.",
        ],
        title: "Structure before colour",
      },
      {
        body: [
          "A logo alone is a graphic. A mark, a typeface and a colour system that work together make an identity. I built each identity in the collection as a small system and tried it as a logo, a poster and a banner.",
          "If a system only holds up in one of those shapes, it was a picture.",
        ],
        title: "A mark is not an identity",
      },
      {
        body: [
          "A poster or banner has a few seconds to say something, and it should still reward a longer look. I aim for legible and intentional over decorative.",
          "Across very different products the pieces share one sensibility, and they sit beside the portfolio's interactive and product work as pure visual craft.",
        ],
        title: "Quick to read, rewarding to stay with",
      },
    ],
    slug: "typography-is-structure",
    title: "Typography Is Structure",
    topic: "Visual design",
  },
] as const;

export const resources = [
  {
    description: "A practical reference for making web experiences faster and more responsive.",
    href: "https://developer.mozilla.org/en-US/docs/Web/Performance",
    label: "MDN Web Performance",
    topic: "Performance",
  },
  {
    description: "A grounding resource for accessible design and inclusive web experiences.",
    href: "https://www.w3.org/WAI/fundamentals/accessibility-intro/",
    label: "W3C Web Accessibility Initiative",
    topic: "Accessibility",
  },
  {
    description: "The reference point for the React renderer that informs future real-time web experiments.",
    href: "https://docs.pmnd.rs/react-three-fiber/getting-started/introduction",
    label: "React Three Fiber documentation",
    topic: "Creative technology",
  },
] as const;

export const authoritySignals = [
  { label: "Documented project narratives", value: String(projects.length).padStart(2, "0") },
  { label: "Design + build disciplines", value: "03" },
  { label: "Years of degree study", value: "04" },
] as const;

export const transparencyNotes = [
  {
    label: "Awards",
    value: "No formal awards are published at this stage.",
  },
  {
    label: "Testimonials",
    value: "No client testimonials are published without clear permission and attribution.",
  },
  {
    label: "Certifications",
    value: "The current portfolio documents project-based learning and academic coursework rather than unverified certificate claims.",
  },
] as const;

export function getArticleBySlug(slug: string) {
  return authorityArticles.find((article) => article.slug === slug) ?? null;
}
