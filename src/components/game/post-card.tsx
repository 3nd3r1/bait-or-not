import Image from "next/image";

import type { Post } from "@/validators/post";

const PostCard = ({ post }: { post: Post }) => {
    return (
        <div className="relative h-[min(60vh,32rem)] w-full overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/10">
            <Image
                src={post.media.url}
                alt={post.alt}
                fill
                sizes="(max-width: 448px) 100vw, 448px"
                loading="eager"
                className="object-contain"
            />
        </div>
    );
};

export default PostCard;
