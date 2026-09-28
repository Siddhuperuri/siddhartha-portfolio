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
      "A product-design perspective on making travel planning feel exploratory without losing practical direction.",
    publishedAt: "2026-08-03",
    readingTime: "4 min read",
    sections: [
      {
        body: [
          "Travel planning usually begins with an emotion before it becomes a checklist. A place, a memory, or a possibility gives someone a reason to look. The product challenge is to respect that early curiosity while still giving people a useful next step.",
          "For Travelease, the central design question was not how to display more destinations. It was how to guide someone from a broad interest toward a meaningful plan without making the first interaction feel like filtering a database.",
        ],
        title: "Discovery is a product decision",
      },
      {
        body: [
          "The state-wise exploration system gives the visitor a concrete starting point. From there, destination details, directions, recommendations, and contextual assistance can arrive as part of the journey rather than as separate utility pages.",
          "This kind of structure matters because it turns the information architecture into a story: choose a region, understand a place, then decide what to do next.",
        ],
        title: "Make the next step visible",
      },
      {
        body: [
          "The treasure-hunt idea works best when it supports real exploration instead of competing with it. A mechanic should reward attention, but the product remains responsible for helping someone plan, navigate, and discover with confidence.",
          "The lesson is simple: play can create momentum, but usefulness is what earns trust.",
        ],
        title: "Use play to support utility",
      },
    ],
    slug: "designing-play-into-travel-planning",
    title: "Designing Play Into Useful Travel Planning",
    topic: "Product thinking",
  },
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
  { label: "Documented project narratives", value: "05" },
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
