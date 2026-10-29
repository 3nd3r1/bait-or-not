import { postsSchema } from "@/validators/post";

import rawPosts from "@/data/posts.json";

export const posts = postsSchema.parse(rawPosts);
