import type { DayGame, GameState, Stats } from "@/validators/game";
import type { Label } from "@/validators/post";

import { addDays } from "@/lib/daily";

export const createInitialState = (): GameState => ({
    games: {},
    stats: { currentStreak: 0, maxStreak: 0, lastCompletedDate: null },
});

export const completeDay = (stats: Stats, dateKey: string): Stats => {
    if (stats.lastCompletedDate === dateKey) {
        return stats;
    }
    const currentStreak =
        stats.lastCompletedDate === addDays(dateKey, -1)
            ? stats.currentStreak + 1
            : 1;
    return {
        currentStreak,
        maxStreak: Math.max(stats.maxStreak, currentStreak),
        lastCompletedDate: dateKey,
    };
};

export const getActiveStreak = (stats: Stats, today: string): number =>
    stats.lastCompletedDate === today ||
    stats.lastCompletedDate === addDays(today, -1)
        ? stats.currentStreak
        : 0;

export const applyGuess = (
    state: GameState,
    dateKey: string,
    day: DayGame,
    label: Label
): GameState => {
    if (
        day.guesses.length > day.position ||
        day.position >= day.postIds.length
    ) {
        return state;
    }
    const guesses = [...day.guesses, label];
    const finished = guesses.length === day.postIds.length;
    return {
        games: { ...state.games, [dateKey]: { ...day, guesses } },
        stats: finished ? completeDay(state.stats, dateKey) : state.stats,
    };
};

export const advance = (
    state: GameState,
    dateKey: string,
    day: DayGame
): GameState => {
    if (day.guesses.length <= day.position) {
        return state;
    }
    return {
        ...state,
        games: {
            ...state.games,
            [dateKey]: { ...day, position: day.position + 1 },
        },
    };
};
