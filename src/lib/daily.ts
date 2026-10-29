import type { Label, Post } from "@/validators/post";

import { createRng, hashString, shuffle } from "@/lib/random";

// Placeholder until there's a real launch date.
export const LAUNCH_DATE = "2026-10-29";
export const ROUND_SIZE = 10;

const DAY_MS = 24 * 60 * 60 * 1000;

const pad = (value: number) => String(value).padStart(2, "0");

const mod = (value: number, size: number) => ((value % size) + size) % size;

// The player's local calendar date, so the day changes at their own midnight.
export const toDateKey = (date: Date): string =>
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

// Date keys parse as UTC midnight, so day maths isn't affected by DST.
export const addDays = (dateKey: string, days: number): string =>
    new Date(Date.parse(dateKey) + days * DAY_MS).toISOString().slice(0, 10);

export const getDayNumber = (dateKey: string): number =>
    Math.round((Date.parse(dateKey) - Date.parse(LAUNCH_DATE)) / DAY_MS) + 1;

// Walks through posts in id order, `count` per day, so nothing repeats until the
// pool runs out. New posts get higher ids and don't change upcoming days.
const takeForDay = (
    posts: readonly Post[],
    label: Label,
    dayIndex: number,
    count: number
): Post[] => {
    const pool = posts
        .filter((post) => post.label === label)
        .sort((a, b) => a.id.localeCompare(b.id, "en", { numeric: true }));
    const take = Math.min(count, pool.length);
    return Array.from(
        { length: take },
        (_, i) => pool[mod(dayIndex * count + i, pool.length)]
    );
};

// Half bait, half genuine, shuffled the same way for everyone on that date.
export const getDailyPosts = (
    posts: readonly Post[],
    dateKey: string,
    size: number = ROUND_SIZE
): Post[] => {
    const dayIndex = getDayNumber(dateKey) - 1;
    const perLabel = Math.floor(size / 2);
    const round = [
        ...takeForDay(posts, "bait", dayIndex, perLabel),
        ...takeForDay(posts, "genuine", dayIndex, perLabel),
    ];
    return shuffle(round, createRng(hashString(dateKey)));
};
