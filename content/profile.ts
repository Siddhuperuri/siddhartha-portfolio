export const profile = {
  email: "siddharthaperuri12@gmail.com",
  name: "Peruri Jai Sai Siddhartha",
  role: "Product-minded visual designer and creative front-end builder",
  statement:
    "I use visual systems, interaction, and working prototypes to make digital ideas clearer, more useful, and more memorable.",
} as const;

export const capabilities = [
  {
    index: "01",
    summary:
      "Interface structures that make a product feel clear before it tries to feel clever.",
    title: "Product & UI/UX design",
  },
  {
    index: "02",
    summary:
      "Brand identities and visual language that give early-stage ideas a recognisable point of view.",
    title: "Visual identity",
  },
  {
    index: "03",
    summary:
      "Interactive browser prototypes that turn a concept into something people can explore.",
    title: "Creative front-end",
  },
] as const;

export const skillGroups = [
  {
    label: "Design",
    skills: [
      "UI/UX design",
      "Website design",
      "Visual design",
      "Branding",
      "Logo design",
      "Wireframing",
    ],
  },
  {
    label: "Tools",
    skills: [
      "Figma",
      "Framer",
      "Photoshop",
      "Illustrator",
      "Lightroom",
      "Canva",
    ],
  },
  {
    label: "Build",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "Responsive design",
      "Python",
      "Java",
    ],
  },
] as const;

export const processSteps = [
  {
    detail:
      "Frame the user, context, constraint, and success condition before choosing a visual direction.",
    number: "01",
    title: "Understand the signal",
  },
  {
    detail:
      "Turn the strongest idea into a simple information structure, flow, or interaction model.",
    number: "02",
    title: "Make the system visible",
  },
  {
    detail:
      "Prototype early so pacing, usability, and visual hierarchy can be evaluated in motion.",
    number: "03",
    title: "Test through making",
  },
  {
    detail:
      "Refine the details that shape trust: clarity, state changes, accessibility, and performance.",
    number: "04",
    title: "Polish what people feel",
  },
] as const;

export const timeline = [
  {
    detail:
      "Building a practical foundation in software, systems, and web development alongside design work.",
    period: "2023 — 2027 expected",
    title: "B.Tech, Computer Science & Engineering",
  },
  {
    detail:
      "Exploring product interface, identity, and interactive systems through independent project work.",
    period: "Present",
    title: "Design & creative development practice",
  },
] as const;
