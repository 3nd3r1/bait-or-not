import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "node:util";
import sharp from "sharp";

import {
    type Media,
    type Post,
    postSchema,
    postsSchema,
} from "@/validators/post";

const POSTS_JSON = path.join(process.cwd(), "src/data/posts.json");
const POSTS_DIR = path.join(process.cwd(), "public/posts");
const WIDTH = 1080;

const USAGE = `Usage:
  npm run add-post -- <screenshot> --label bait|genuine --alt "..." --reason "..." [--source <url>] [--proof <image>]...`;

const readPosts = async (): Promise<Post[]> => {
    try {
        return postsSchema.parse(
            JSON.parse(await readFile(POSTS_JSON, "utf8"))
        );
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
        throw error;
    }
};

const nextId = (posts: Post[]): string => {
    const max = Math.max(0, ...posts.map((post) => Number(post.id.slice(1))));
    return `p${String(max + 1).padStart(3, "0")}`;
};

// sharp strips metadata (EXIF, location) by default.
const importImage = async (input: string, name: string): Promise<Media> => {
    await sharp(input)
        .rotate()
        .resize({ width: WIDTH })
        .webp({ quality: 85 })
        .toFile(path.join(POSTS_DIR, `${name}.webp`));
    return { type: "image", url: `/posts/${name}.webp` };
};

const main = async () => {
    const { values, positionals } = parseArgs({
        allowPositionals: true,
        options: {
            label: { type: "string" },
            alt: { type: "string" },
            reason: { type: "string" },
            source: { type: "string" },
            proof: { type: "string", multiple: true },
        },
    });

    const [screenshot] = positionals;
    if (!screenshot || !values.label || !values.alt || !values.reason) {
        console.error(USAGE);
        process.exit(1);
    }

    await mkdir(POSTS_DIR, { recursive: true });
    await mkdir(path.dirname(POSTS_JSON), { recursive: true });

    const posts = await readPosts();
    const id = nextId(posts);

    const draft = {
        id,
        label: values.label,
        media: { type: "image", url: `/posts/${id}.webp` },
        alt: values.alt,
        reason: values.reason,
        sourceUrl: values.source,
    };
    postSchema.parse(draft);

    const media = await importImage(screenshot, id);
    const proofFiles = values.proof ?? [];
    const proof = await Promise.all(
        proofFiles.map((file, i) => importImage(file, `${id}-proof-${i + 1}`))
    );

    const post = postSchema.parse({
        ...draft,
        media,
        proof: proof.length > 0 ? proof : undefined,
    });
    await writeFile(
        POSTS_JSON,
        `${JSON.stringify([...posts, post], null, 4)}\n`
    );
    console.log(`Added ${id} (${post.label}) → ${post.media.url}`);
};

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
