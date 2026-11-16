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
      "What an interactive gravity simulation taught me about making complex systems understandable through direct manipulation.",
    publishedAt: "2026-08-03",
    readingTime: "5 min read",
    sections: [
      {
        body: [
          "A physics engine can be technically correct and still be difficult to understand. The moment a user can create a body, change a condition, and watch a trajectory respond, the system becomes something they can reason about.",
          "That was the purpose behind Gravity Playground: make gravitational force, velocity, acceleration, and collision behaviour visible as a connected system rather than as isolated facts.",
        ],
        title: "Interaction makes systems legible",
      },
      {
        body: [
          "The interface has to separate three jobs: creating a system, observing it, and moving through it. When those jobs blur together, a user can change the world without understanding what changed or lose their spatial context while navigating.",
          "A clear simulation workspace gives the physics room to lead, while controls stay available as instruments rather than competing visual objects.",
        ],
        title: "Controls need a clear role",
      },
      {
        body: [
          "Particles, smooth motion, zoom, and pan can make a simulation feel compelling. They must also carry information. The visual system should help someone notice cause and effect, not make the engine look more complicated than it is.",
          "Creative technology earns its place when the visual layer makes behaviour easier to understand.",
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
      "Why an early visual system is more than polish when a product has several emotional and practical jobs to do.",
    publishedAt: "2026-08-03",
    readingTime: "4 min read",
    sections: [
      {
        body: [
          "A new platform rarely begins with one clean user task. PETPONKS needed to hold adoption, community, and storytelling together. Before refining individual screens, it was important to decide how these ideas belonged in one product.",
          "Wireframes helped make the relationship visible. They are not just lower-fidelity screens; they are a way to test what the product should make easy, prominent, and repeatable.",
        ],
        title: "Structure comes before styling",
      },
      {
        body: [
          "A logo, colour direction, and type rhythm are useful early because they give every later decision a shared reference point. The goal is not a finished brand kit on day one. It is a coherent voice that can survive iteration.",
          "For a community-focused product, that consistency helps emotional storytelling feel intentional instead of noisy.",
        ],
        title: "Identity creates continuity",
      },
      {
        body: [
          "The practical question is always whether visual personality helps people move with confidence. A good system can feel warm and memorable while still making navigation, hierarchy, and action obvious.",
          "Brand becomes most useful when it helps a product make sense.",
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
      "Why VIGIL-88 treats a camera frame as evidence to accumulate, not a verdict to act on, and what that changes about the whole system.",
    publishedAt: "2026-11-16",
    readingTime: "5 min read",
    sections: [
      {
        body: [
          "A single frame is a weak witness. A shadow, a reflection or a passing hand can look like an event for exactly one frame, and a system that raises an alarm on that frame will teach its operator to ignore it.",
          "VIGIL-88 is designed the other way round: observations accumulate into candidate events, the candidates are verified, and only then does an incident exist. The conclusion is drawn from time, not from a moment.",
        ],
        title: "A frame is evidence, not a verdict",
      },
      {
        body: [
          "The interface follows the same logic. The console is specified as an instrument panel that ranks information by the cost of missing it: an unacknowledged critical incident first, then live camera views, the incident queue and camera health.",
          "Colour is reserved almost entirely for severity, and never as the only signal of it. On a screen watched for hours, most of the interface has to stay quiet so that the one thing that matters can be loud.",
        ],
        title: "Design the screen for hour six",
      },
      {
        body: [
          "Nothing is detected yet. The foundation runs: configuration, logging, a complete domain model, webcam capture and camera health. Detection, tracking, incidents and the console are designed but not built, and the repository says so in its own limitations document.",
          "That honesty is a design decision. A capability that does not exist is absent or disabled with its reason stated, so no control ever appears to work when it does not.",
        ],
        title: "Say what exists",
      },
    ],
    slug: "evidence-over-time-not-a-single-frame",
    title: "Evidence Over Time, Not a Single Frame",
    topic: "Systems design",
  },
  {
    description:
      "What building the Helios solar calculator taught me about showing uncertainty so a non-expert can tell how much to believe a number.",
    publishedAt: "2026-11-16",
    readingTime: "4 min read",
    sections: [
      {
        body: [
          "A forecast presented as one confident number invites trust it has not earned. Someone deciding whether to install solar panels needs to know how much to believe the answer as much as they need the answer itself.",
          "So every Helios estimate shows a range, a confidence level and the assumptions behind it. The number is the start of the conversation, not the end of it.",
        ],
        title: "A number needs a range",
      },
      {
        body: [
          "Helios puts one engine behind two audiences: a person deciding whether to install, and an analyst who needs to check the work. They share the same physical chain, from solar geometry to PV conversion and inverter losses, written as pure functions.",
          "The surfaces differ on purpose. The consumer calculator is light and mobile-first, because it is read on a phone outdoors. The analysis console is a dark instrument panel built for dense work, with calibrated prediction intervals and time-aware validation.",
        ],
        title: "One engine, two audiences",
      },
      {
        body: [
          "The consumer interview is data served by the API, so a farmer and a factory manager are asked different questions by the same engine. Adding a new kind of user means adding data, not building another wizard.",
          "Making a prediction checkable by someone who did not build it is the real test of the interface: results trace back to their data and code, and the limits are written down in a delivery report.",
        ],
        title: "Ask only what the answer needs",
      },
    ],
    slug: "show-the-range-not-just-the-number",
    title: "Show the Range, Not Just the Number",
    topic: "Data products",
  },
  {
    description:
      "What it means to design an interface where the visitor's stillness is the input, and why the SIDDHARTHA artwork leaves its depths unexplained.",
    publishedAt: "2026-11-16",
    readingTime: "4 min read",
    sections: [
      {
        body: [
          "SIDDHARTHA is built around one law: stillness resolves, motion scatters, attention pulls. The name is made of five layers of light at five depths, and it only becomes legible from exactly one vantage point, and only if you hold still.",
          "Most interfaces reward activity. This one rewards the opposite, which changes how a visitor behaves in the first ten seconds and what they notice afterwards.",
        ],
        title: "Reward the pause",
      },
      {
        body: [
          "The piece is designed for three speeds of visit: scrolling through, lingering, and returning more than once. The deeper behaviours are never explained. Each one is found by stopping.",
          "The open question was how much can be left unexplained before it reads as broken. The answer was to make the first layer of the experience complete by itself, so a visitor who never finds anything deeper has still seen a whole piece.",
        ],
        title: "Leave things to be found",
      },
      {
        body: [
          "A small 3D lens appears at only three held moments, and the 2D piece is complete without WebGL. It supports phones and prefers-reduced-motion, and it runs from a plain file with no build step and no network requests.",
          "Restraint is what keeps the spectacle meaningful. The enhancement stays an enhancement, never a dependency.",
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
      "Which architectural rules are worth enforcing in CI instead of review, drawn from the layering checks in ORBIT and VIGIL-88.",
    publishedAt: "2026-11-16",
    readingTime: "5 min read",
    sections: [
      {
        body: [
          "A rule that lives only in a document survives until the first deadline. Both ORBIT and VIGIL-88 check their layering with import-linter, so a dependency that points the wrong way fails the build instead of waiting for someone to notice in review.",
          "In ORBIT the direction runs composition, api, application and infrastructure, domain, core. In VIGIL-88 a pure domain layer, a single clock module and no swallowed exceptions are enforced the same way.",
        ],
        title: "Let the build say no",
      },
      {
        body: [
          "ORBIT recorded 24 architecture decisions along with the alternatives that were rejected, and documented the failure behaviour of each dependency before relying on it. A decision with no recorded alternatives is just an opinion.",
          "Configuration follows the same habit: fail fast on missing settings instead of booting with defaults that hide the problem.",
        ],
        title: "Write the failure down first",
      },
      {
        body: [
          "ORBIT delivered identity, workspaces, upload and an asynchronous processing pipeline. Retrieval and chat are designed but not built, and the repository does not call itself production-ready.",
          "Stating the status plainly is part of the architecture. It tells the next reader, including the next version of me, exactly where the real work begins.",
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
      "How TETRIX keeps a premium 3D presentation from ever disagreeing with the game underneath it.",
    publishedAt: "2026-11-16",
    readingTime: "5 min read",
    sections: [
      {
        body: [
          "TETRIX has a pure rules engine, written as plain TypeScript with input handling and a fixed-step loop. The 3D layer reads game state every frame and writes nothing back, so the visuals cannot drift from the rules.",
          "That one-way flow is the whole trick. When a line clears, the effect shows what the engine actually did, because the renderer has no other source of truth.",
        ],
        title: "The renderer only reads",
      },
      {
        body: [
          "Piece motion is smoothed as a decaying offset on top of the logical position, so the picture always converges on the true state. Every line-clear has its own visual signature, from single to tetris, perfect clear and T-spin, and all effect objects are allocated once instead of per clear.",
          "The arena uses instanced meshes, which keeps the whole stack to roughly 14 draw calls, with Low, High and Ultra presets that change real rendering work.",
        ],
        title: "Smooth the picture, not the truth",
      },
      {
        body: [
          "The project status records 201 unit tests and 21 end-to-end tests passing at the last run. It also records what is missing: touch controls, music and the Overdrive mechanic are not built, and frame rate has not been measured on integrated GPUs or phones.",
          "The Overdrive meter is labelled as a placeholder in the game itself, because an unfinished part should look unfinished.",
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
      "Why Halftone Gambit ships a semantic DOM board beside its ASCII 3D scene, and what that did for keyboard and screen-reader play.",
    publishedAt: "2026-11-16",
    readingTime: "4 min read",
    sections: [
      {
        body: [
          "Halftone Gambit draws chess entirely in glyphs and dithering, which is lovely to look at and hard to read as a board. The question was how far a scene can be pushed before the pieces stop looking like chess pieces.",
          "The answer was never to depend on the picture alone. A semantic DOM board mirrors the game state, so the same game exists in a form that does not rely on the 3D view.",
        ],
        title: "Beautiful, and still playable",
      },
      {
        body: [
          "That DOM board does three jobs: it is a playable 2D fallback, the route for keyboard play and the route for screen-reader play. The interface text is real monospace DOM on top of the scene, so it stays crisp.",
          "Rules stay authoritative in one place, and the rendering, the animation and the accessible board all read from it.",
        ],
        title: "One game state, several ways to play it",
      },
      {
        body: [
          "Accounts are optional, so guest play is complete and no account code loads without configuration. Mate challenges are verified by exhaustive search, and the project includes a perft test of the rules.",
          "The limits are written down too: progression is local and unverified, drag-to-move is not implemented, and performance was measured only in a desktop browser.",
        ],
        title: "Be exact about what is verified",
      },
    ],
    slug: "playable-without-the-3d-view",
    title: "Playable Without the 3D View",
    topic: "Accessibility",
  },
  {
    description:
      "What a collection of logos, posters and identity concepts taught me about typography as structure rather than decoration.",
    publishedAt: "2026-11-16",
    readingTime: "4 min read",
    sections: [
      {
        body: [
          "In the Creative Design Collection each piece treats typography as a structural element. If the type and the composition hold up in plain black and white, colour can only improve them.",
          "So the working order is typography and composition first, colour last. A layout that depends on colour to make sense has not finished its structural work.",
        ],
        title: "Structure before colour",
      },
      {
        body: [
          "A logo alone is a graphic. A mark, a typeface and a colour system working together are an identity. Each identity in the collection is built as a small system, then tested across formats: logo, poster and banner.",
          "Consistency across formats is the real test. If the system only works in one shape, it was a picture, not a system.",
        ],
        title: "A mark is not an identity",
      },
      {
        body: [
          "A poster or banner has a few seconds to communicate. It should still feel considered when someone stays longer. Legible and intentional beats merely decorative every time.",
          "Taken together, the pieces make the case for one design sensibility across very different products, and they balance the portfolio's interactive and product work with pure visual craft.",
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
