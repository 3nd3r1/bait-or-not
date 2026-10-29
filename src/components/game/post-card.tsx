import Image from "next/image";

import type { Post } from "@/validators/post";

const PostCard = ({ post }: { post: Post }) => {
    return (
        <div className="flex justify-center">
            <Image
                src={post.media.url}
                alt={post.alt}
                width={post.media.width}
                height={post.media.height}
                sizes="(max-width: 448px) 100vw, 448px"
                loading="eager"
                className="h-auto max-h-[60dvh] w-auto max-w-full rounded-xl ring-1 ring-foreground/10"
            />
        </div>
    );
};

export default PostCard;
