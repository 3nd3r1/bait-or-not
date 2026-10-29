import { postsSchema } from "@/validators/post";

import rawPosts from "@/data/posts.json";

// Throws at import if posts.json doesn't match the schema.
export const posts = postsSchema.parse(rawPosts);
