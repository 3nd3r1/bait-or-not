"use client";

import { useDailyGame } from "@/hooks/use-daily-game";

import PostCard from "@/components/game/post-card";

const Game = () => {
    const game = useDailyGame();

    if (!game.ready || !game.current) {
        return null;
    }

    return (
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-4 p-4">
            <PostCard key={game.current.id} post={game.current} />
        </div>
    );
};

export default Game;
