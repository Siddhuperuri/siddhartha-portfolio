import { z } from "zod";

export const projectRoleSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

export const projectMediaSchema = z.object({
  alt: z.string().min(1),
  height: z.number().int().positive(),
  src: z.string().min(1),
  width: z.number().int().positive(),
});

export const projectSchema = z.object({
  artefacts: z
    .array(
      z.object({
        detail: z.string().min(1),
        kind: z.enum(["brand", "flow", "simulation"]),
        label: z.string().min(1),
      }),
    )
    .min(1),
  challenge: z.string().min(1),
  context: z.string().min(1),
  description: z.string().min(1),
  development: z.array(z.string().min(1)).min(1),
  designSystem: z.array(z.string().min(1)).min(1),
  featured: z.boolean(),
  iteration: z.array(z.string().min(1)).min(1),
  media: z.array(projectMediaSchema),
  research: z.array(z.string().min(1)).min(1),
  results: z.array(z.string().min(1)).min(1),
  roles: z.array(projectRoleSchema).min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  summary: z.string().min(1),
  title: z.string().min(1),
  tools: z.array(z.string().min(1)),
  type: z.enum(["ai", "brand", "interactive", "product", "web"]),
  wireframes: z.array(z.string().min(1)).min(1),
});
