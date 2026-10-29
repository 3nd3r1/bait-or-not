import { z } from "zod";

export const labelSchema = z.enum(["bait", "genuine"]);

export const postSchema = z.object({
    id: z.string().min(1),
    body: z.string().min(1),
    imageUrl: z.string().optional(),
    handle: z.string().regex(/^@\w+$/),
    label: labelSchema,
    reason: z.string().min(1),
    // Private, never rendered. Ships in the client bundle until Phase 2.
    sourceNote: z.string().optional(),
});

export const postsSchema = z
    .array(postSchema)
    .refine(
        (posts) => new Set(posts.map((post) => post.id)).size === posts.length,
        { message: "Post ids must be unique" }
    );

export type Label = z.infer<typeof labelSchema>;
export type Post = z.infer<typeof postSchema>;
