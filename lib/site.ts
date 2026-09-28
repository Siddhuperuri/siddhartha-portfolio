const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
const vercelUrl = process.env.VERCEL_URL;

export const siteUrl = new URL(
  configuredUrl ?? (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000"),
);

export const siteConfig = {
  description:
    "Portfolio of Peruri Jai Sai Siddhartha, a product-minded visual designer and creative front-end builder.",
  name: "Siddhartha",
  title: "Siddhartha — Designer & Creative Developer",
} as const;
