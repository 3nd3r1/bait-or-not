import { z } from "zod";

import { labelSchema } from "@/validators/post";

export const dayGameSchema = z.object({
    postIds: z.array(z.string()),
    guesses: z.array(labelSchema),
    position: z.number().int().min(0),
});

export const statsSchema = z.object({
    currentStreak: z.number().int().min(0),
    maxStreak: z.number().int().min(0),
    lastCompletedDate: z.string().nullable(),
});

export const gameStateSchema = z.object({
    games: z.record(z.string(), dayGameSchema),
    stats: statsSchema,
});

export type DayGame = z.infer<typeof dayGameSchema>;
export type Stats = z.infer<typeof statsSchema>;
export type GameState = z.infer<typeof gameStateSchema>;
