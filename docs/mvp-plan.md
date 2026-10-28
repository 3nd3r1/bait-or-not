# MVP plan

How we build the MVP in [concept.md](./concept.md) on top of this template. Phase 1 is a playable game with no backend. Phase 2 adds Supabase.

## Phase 1: playable, no backend

Goal: play a full round on a phone, end with share text you can paste.

### Data

`src/data/posts.json`, validated at import with a Zod schema in `src/validators/post.ts`:

```ts
{
  id: string,            // "p001"
  body: string,
  imageUrl?: string,     // optional, files under public/posts/
  handle: string,        // generated, e.g. "@quietlemon42"
  label: "bait" | "genuine",
  reason: string,        // one line shown on reveal
  sourceNote?: string,   // private, never rendered
}
```

`sourceNote` lives in the JSON for now. It ships in the client bundle, so it must not hold anything sensitive until Phase 2 moves posts to the server.

### Daily set

`src/lib/daily.ts`:

- Day number = days since a fixed launch date (UTC). Used in share text: `ragebaitor #3`.
- Seeded PRNG from the date string picks 5 bait + 5 genuine and shuffles them. Same set for everyone on the same day.
- With only ~10 seed posts every day has the same posts in a different order. That's fine for testing.

### Fake crowd %

Seeded from post id, so the number is stable across reloads (e.g. 20–85% said bait). Replaced by real counts in Phase 2.

### Game state

`src/hooks/use-daily-game.ts`, stored in localStorage:

- `playerId`: random uuid, created on first visit (unused until Phase 2, but set now)
- `games[date]`: guesses so far, so a reload resumes mid-round and a finished day shows the end screen
- `stats`: current streak, max streak, last completed date

Streak = consecutive days with a finished round. Missing a day resets it.

### UI (one page, mobile-first)

| Component        | Does                                                                     |
| ---------------- | ------------------------------------------------------------------------ |
| `PostCard`       | Neutral card: generated avatar, handle, body, optional image             |
| `GuessButtons`   | Bait / Genuine, large tap targets at the bottom of the screen            |
| `Reveal`         | Right/wrong, verdict, reason, crowd bar, Next button                     |
| `ProgressDots`   | 10 dots showing done / current / correct / wrong                         |
| `EndScreen`      | Score, one-line flavour text ("unbaitable"), streak, Copy share button   |

Components go in `src/components/game/`. Uses existing shadcn `Card`, `Button`, `sonner` (for "Copied!"); may add `progress`.

Template cleanup: replace the home page, drop the navbar and about page, update `src/lib/config.ts`, OG image and manifest with the game name.

### Share text

```
ragebaitor #3 7/10
🎣🎣⬜🎣⬜⬜🎣⬜⬜⬜
🔥 streak 4
ragebaitor.com
```

🎣 = got baited (wrong guess), ⬜ = called it right.

### Tests

- `daily.ts`: same date gives same set, 5/5 balance, different dates differ
- share text formatting
- game hook: guess, advance, finish, resume, streak rollover

## Phase 2: Supabase

- Tables from concept.md: `posts`, `daily_sets`, `votes`
- `POST /api/votes` (one vote per player per post, enforced by a unique index)
- `GET /api/daily` returns today's posts without labels; `POST` a guess returns the label, reason and crowd split. This stops people reading answers from the bundle.
- Crowd % cached (revalidate every few minutes)
- Flag posts where the crowd disagrees with the label by a wide margin
- Admin: probably keep posts in a JSON/CSV file and seed the DB from a script, before building any form

## Decisions

| Question              | Decision                                                                                  |
| --------------------- | ----------------------------------------------------------------------------------------- |
| Name                  | Ragebaitor                                                                                |
| Share emoji           | 🎣 = got baited (wrong guess), ⬜ = correct. Fewer hooks is better |
| Seed posts            | You provide real posts in `posts.json`; code ships with the schema and 2–3 placeholders |
| Buttons               | Bait / Genuine only. "Can't tell" maybe later                                             |
| Engagement numbers    | Hidden in Phase 1 (default, revisit after playtesting)                                    |
| Finnish set           | Out of scope for Phase 1                                                                  |

## Still open

- Re-typed real posts vs lookalikes (content decision, doesn't block code)
- Domain check for ragebaitor.com / .app
