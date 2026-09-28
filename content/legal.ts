export const privacyEffectiveDate = "2026";

export const privacyIntro = {
  emphasis:
    "This site is owned and built by Peruri Jai Sai Siddhartha, working alone.",
  rest:
    "It collects as little as it possibly can. This page names exactly what happens to any information that passes through it.",
} as const;

export type PrivacyRow = {
  label: string;
  detail: string;
};

export type PrivacySection = {
  id: string;
  navLabel: string;
  number: string;
  title: string;
  rows: readonly PrivacyRow[];
};

export const privacySections: readonly PrivacySection[] = [
  {
    id: "information",
    navLabel: "Information collected",
    number: "1",
    rows: [
      {
        detail:
          "Every “write to me” or “email directly” link on this site is a mailto: link — it opens your own email client. Nothing you type is sent to, or stored by, this website. This site does not run a server-side contact form.",
        label: "Correspondence",
      },
      {
        detail:
          "Vercel Analytics records anonymised page views and a small number of named events — for example, that a contact link was clicked — so the site's actual usage can inform what gets improved. It does not use cookies and does not identify you personally.",
        label: "Analytics",
      },
    ],
    title: "Information I collect",
  },
  {
    id: "usage",
    navLabel: "How data is used",
    number: "2",
    rows: [
      {
        detail: "To see which pages and case studies are actually being read.",
        label: "2.1",
      },
      {
        detail: "To see, in aggregate, which contact or profile links people follow.",
        label: "2.2",
      },
      {
        detail: "Never sold, shared, or used to advertise to you.",
        label: "2.3",
      },
    ],
    title: "How your data is used",
  },
  {
    id: "storage",
    navLabel: "Data storage",
    number: "3",
    rows: [
      {
        detail:
          "This site has no database and stores nothing about visitors itself. Analytics events are processed and retained by Vercel under their own retention policy — see vercel.com/legal/privacy-policy.",
        label: "Storage",
      },
    ],
    title: "Data storage",
  },
  {
    id: "cookies",
    navLabel: "Cookies",
    number: "4",
    rows: [
      {
        detail:
          "This site does not set cookies. Vercel Analytics is cookie-free by design, so there is nothing to opt out of in your browser settings.",
        label: "Cookies",
      },
    ],
    title: "Cookies",
  },
  {
    id: "rights",
    navLabel: "Your rights",
    number: "5",
    rows: [
      {
        detail:
          "Because no personal data is collected or stored by this site directly, there is generally nothing here to request a copy of or ask to be deleted. If you have a question about what Vercel's analytics service retains on its side, get in touch and I'll point you to the right place.",
        label: "Requests",
      },
    ],
    title: "Your rights",
  },
  {
    id: "contact",
    navLabel: "Contact",
    number: "6",
    rows: [
      {
        detail: "Email siddharthaperuri12@gmail.com with any question about this page.",
        label: "Reach me",
      },
    ],
    title: "Contact",
  },
];
