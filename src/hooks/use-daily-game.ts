"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

import type { DayGame } from "@/validators/game";
import type { Label, Post } from "@/validators/post";

import { getDailyPosts, getDayNumber, toDateKey } from "@/lib/daily";
import { advance, applyGuess, getActiveStreak } from "@/lib/game";
import { posts } from "@/lib/posts";
import { parseState, readRaw, subscribe, writeState } from "@/lib/storage";

const postsById = new Map(posts.map((post) => [post.id, post]));

const noopSubscribe = () => () => {};

// Keeps the posts a round started with, so changing posts.json mid-day doesn't
// shift guesses onto different posts.
const getDay = (
    games: Record<string, DayGame>,
    today: string
): { day: DayGame; round: Post[] } => {
    const saved = games[today];
    const savedRound = saved?.postIds.map((id) => postsById.get(id));
    if (saved && savedRound?.every(Boolean)) {
        return { day: saved, round: savedRound as Post[] };
    }
    const round = getDailyPosts(posts, today);
    return {
        day: {
            postIds: round.map((post) => post.id),
            guesses: [],
            position: 0,
        },
        round,
    };
};

export const useDailyGame = () => {
    // Both are null during server render; the client fills them in on hydration.
    const today = useSyncExternalStore(
        noopSubscribe,
        () => toDateKey(new Date()),
        () => null
    );
    const raw = useSyncExternalStore(subscribe, readRaw, () => null);

    const state = useMemo(() => parseState(raw), [raw]);
    const { day, round } = useMemo(
        () => (today ? getDay(state.games, today) : { day: null, round: [] }),
        [state.games, today]
    );

    const guess = useCallback(
        (label: Label) => {
            if (!today) return;
            const fresh = parseState(readRaw());
            writeState(
                applyGuess(fresh, today, getDay(fresh.games, today).day, label)
            );
        },
        [today]
    );

    const next = useCallback(() => {
        if (!today) return;
        const fresh = parseState(readRaw());
        writeState(advance(fresh, today, getDay(fresh.games, today).day));
    }, [today]);

    if (!today || !day) {
        return { ready: false as const };
    }

    return {
        ready: true as const,
        dayNumber: getDayNumber(today),
        round,
        guesses: day.guesses,
        position: day.position,
        current: round[day.position] as Post | undefined,
        revealed: day.guesses.length > day.position,
        finished: day.position >= round.length,
        results: day.guesses.map((label, i) => label === round[i].label),
        streak: getActiveStreak(state.stats, today),
        maxStreak: state.stats.maxStreak,
        guess,
        next,
    };
};
