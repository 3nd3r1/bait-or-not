import Image from "next/image";

import type { Label, Post } from "@/validators/post";

import { cn } from "@/lib/utils";

import { Button, buttonVariants } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

type RevealProps = {
    post: Post;
    guess: Label;
    isLast: boolean;
    onNext: () => void;
};

const Reveal = ({ post, guess, isLast, onNext }: RevealProps) => {
    const correct = guess === post.label;

    return (
        <div className="flex flex-col gap-3">
            <div className="space-y-1">
                <p className="text-lg font-semibold">
                    <span
                        className={cn(
                            correct ? "text-emerald-500" : "text-destructive"
                        )}
                    >
                        {correct ? "Correct." : "Wrong."}
                    </span>{" "}
                    It was {post.label}.
                </p>
                <p className="text-muted-foreground">{post.reason}</p>
            </div>

            {(post.sourceUrl || post.proof) && (
                <div className="flex gap-4">
                    {post.sourceUrl && (
                        <a
                            href={post.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                buttonVariants({ variant: "link" }),
                                "px-0"
                            )}
                        >
                            View original
                        </a>
                    )}
                    {post.proof && (
                        <Dialog>
                            <DialogTrigger
                                render={
                                    <Button variant="link" className="px-0" />
                                }
                            >
                                Show proof
                            </DialogTrigger>
                            <DialogContent className="max-h-[85dvh] overflow-y-auto sm:max-w-md">
                                <DialogTitle>Proof</DialogTitle>
                                {post.proof.map((proof) => (
                                    <Image
                                        key={proof.url}
                                        src={proof.url}
                                        alt="Proof"
                                        width={proof.width}
                                        height={proof.height}
                                        sizes="(max-width: 448px) 100vw, 448px"
                                        className="h-auto w-full rounded-lg"
                                    />
                                ))}
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
            )}

            <Button className="h-14 text-base" onClick={onNext}>
                {isLast ? "See results" : "Next"}
            </Button>
        </div>
    );
};

export default Reveal;
