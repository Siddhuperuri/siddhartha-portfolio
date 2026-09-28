export const contactDetails = {
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL,
  email: "siddharthaperuri12@gmail.com",
  github: "https://github.com/Siddhuperuri",
  linkedIn: "https://www.linkedin.com/in/siddharthaperuri/",
} as const;

export const contactFaqs = [
  {
    answer:
      "The strongest fit is UI/UX, visual design, creative front-end, and product-design internship work where thoughtful interaction and clear visual systems matter.",
    question: "What kinds of opportunities are you open to?",
  },
  {
    answer:
      "Yes. Interface design and the build are the same job here — most projects run end to end, from structure and visual system through to the working front-end.",
    question: "Do you offer both design and development?",
  },
  {
    answer:
      "Yes. Identity, logo, and visual language work sits alongside the product work, and is usually strongest when the two are decided together.",
    question: "Do you also create branding and logo designs?",
  },
  {
    answer:
      "Often. Picking up an existing file, auditing it, and extending it into a consistent system is a normal starting point — a clean slate is not a requirement.",
    question: "Do you work with existing designs?",
  },
  {
    answer:
      "Yes. Motion and interactive prototypes are part of the practice rather than a separate service — the portfolio itself is the working sample.",
    question: "Can you also create animations and interactions?",
  },
  {
    answer:
      "A focused landing page or identity runs one to two weeks. A full interface with a build behind it is closer to four to eight, depending on scope and how quickly feedback lands.",
    question: "How long does a typical project take?",
  },
  {
    answer:
      "Email is the best first step. A short note about the role, project, or problem you are exploring is enough to begin a useful conversation.",
    question: "What is the best way to get in touch?",
  },
] as const;

export const projectTypes = [
  "Product & UI/UX design",
  "Visual identity",
  "Creative front-end build",
  "Design + build, end to end",
  "Something else",
] as const;

export const engagementTypes = [
  "Internship",
  "Freelance project",
  "Studio contract",
  "Collaboration",
  "Just saying hello",
] as const;

export const trustSignals = [
  "Five documented project case studies",
  "Design and implementation context on every project",
  "Direct email, LinkedIn, and GitHub paths",
] as const;
