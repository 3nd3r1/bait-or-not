# Tasks

Working checklist for [mvp-plan.md](./mvp-plan.md). Tick items off as they land.

## Phase 1: playable, no backend

### Setup

- [ ] Template cleanup
    - [x] Remove navbar and about page (layout, sitemap)
    - [ ] Site config for Ragebaitor (feeds metadata, manifest, OG/Twitter images)
    - [ ] Fix manifest icon paths to match `public/`
    - [ ] README

### Data

- [ ] `src/validators/post.ts`: Zod post schema
- [ ] `src/data/posts.json`: 2–3 placeholder posts (real posts come from Viljami)
- [ ] `src/lib/posts.ts`: load and validate posts at import

### Game logic

- [ ] `src/lib/daily.ts`: day number, seeded PRNG, pick 5 bait + 5 genuine, shuffle
- [ ] Fake crowd % seeded from post id
- [ ] Share text formatting
- [ ] `src/hooks/use-daily-game.ts`: localStorage state (playerId, games by date, stats), resume, streak

### UI

- [ ] `PostCard`
- [ ] `GuessButtons`
- [ ] `Reveal` (verdict, reason, crowd bar, Next)
- [ ] `ProgressDots`
- [ ] `EndScreen` (score, flavour text, streak, copy share)
- [ ] Home page wires it together

### Tests

- [ ] `daily.ts`: same date same set, 5/5 balance, different dates differ
- [ ] Share text
- [ ] Game hook: guess, advance, finish, resume, streak rollover

### Content

- [ ] Seed set of ~30 real posts in `posts.json`

## Phase 2: Supabase

- [ ] Tables: `posts`, `daily_sets`, `votes`
- [ ] Seed script from `posts.json`
- [ ] `GET /api/daily` (posts without labels)
- [ ] `POST` guess returns label, reason, crowd split
- [ ] `POST /api/votes` with one vote per player per post
- [ ] Cache crowd %
- [ ] Flag posts where crowd disagrees with label

## Open

- [ ] Re-typed real posts vs lookalikes
- [ ] Domain check for ragebaitor.com / .app
