import { z } from "zod";

export const siteConfigSchema = z.object({
    name: z.string().min(1),
    shortName: z.string().min(1),
    description: z.string().min(1),
    url: z.string(),
    themeColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    backgroundColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    locale: z.string().min(1),
    language: z.string().min(1),
    author: z.object({
        name: z.string().min(1),
        url: z.string(),
    }),
    keywords: z.array(z.string()),
    category: z.string().min(1),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;
