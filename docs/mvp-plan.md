# MVP plan

How we build the MVP in [concept.md](./concept.md) on top of this template. Phase 1 is a playable game with no backend. Phase 2 adds Supabase.

## Phase 1: playable, no backend

Goal: play a full round on a phone, end with share text you can paste.

### Data

Posts are screenshots of real posts, not re-typed text. A screenshot works for any platform and looks like the real thing.

`src/data/posts.json`, validated at import with a Zod schema in `src/validators/post.ts`:

```ts
{
  id: string,            // "p001"
  label: "bait" | "genuine",
  media: { type: "image", url: string },  // "/posts/p001.webp"; video later
  alt: string,           // what the post says, for screen readers
  reason: string,        // one line shown on reveal
  sourceUrl?: string,    // "View original" after reveal, when we have it
  proof?: { type: "image", url: string }[],  // "Show proof" after reveal
}
```

Everything ships in the client bundle until Phase 2 moves posts to the server.

### Content workflow

Every screenshot is captured and imported the same way, so posts look consistent.

1. **Capture** (guide in `docs/capture.md`): DevTools device mode at 390px wide, edit out real names and like counts in DevTools, then Inspect the post → Capture node screenshot.
2. **Import** with `npm run add-post`: resizes to 1080px wide WebP with `sharp`, strips metadata, assigns the next id and appends the entry to `posts.json`.
3. **Display:** the card shows the screenshot in a fixed frame (fixed width, max height, neutral background) so the layout doesn't jump between posts.

### Daily set

`src/lib/daily.ts`:

- Day number = days since a fixed launch date (UTC). Used in share text: `ragebaitor #3`.
- Seeded PRNG from the date string picks 5 bait + 5 genuine and shuffles them. Same set for everyone on the same day.
- With only ~10 seed posts every day has the same posts in a different order. That's fine for testing.

### Game state

`src/hooks/use-daily-game.ts`, stored in localStorage:

- `playerId`: random uuid, created on first visit (unused until Phase 2, but set now)
- `games[date]`: guesses so far, so a reload resumes mid-round and a finished day shows the end screen
- `stats`: current streak, max streak, last completed date

Streak = consecutive days with a finished round. Missing a day resets it.

### UI (one page, mobile-first)

| Component        | Does                                                                     |
| ---------------- | ------------------------------------------------------------------------ |
| `PostCard`       | Screenshot in a fixed frame                                              |
| `GuessButtons`   | Bait / Genuine, large tap targets at the bottom of the screen            |
| `Reveal`         | Right/wrong, verdict, reason, View original, Show proof, Next            |
| `ProgressDots`   | 10 dots showing done / current / correct / wrong                         |
| `EndScreen`      | Score, one-line flavour text ("unbaitable"), streak, Copy share button   |

Components go in `src/components/game/`. Uses existing shadcn `Card`, `Button`, `sonner` (for "Copied!"); may add `progress`.

Template cleanup: replace the home page, drop the navbar and about page, update `src/lib/config.ts`, OG image and manifest with the game name.

### Share text

Kept plain: score, grid, link. No streak line or extra emoji.

```
Ragebaitor #3 7/10
🎣🎣⬜🎣⬜⬜🎣⬜⬜⬜
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
| Post format           | Screenshots of real posts, captured and imported with a fixed workflow                    |
| Proof                 | Optional; `reason` is always required                                                     |
| Video                 | Later                                                                                     |
| Crowd %               | Not in Phase 1. Comes with real votes in Phase 2                                          |

## Still open

- Domain check for ragebaitor.com / .app
