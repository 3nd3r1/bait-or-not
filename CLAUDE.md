# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## About

This is a Next.js template that can be modified for any project. Update `src/lib/config.ts` with your site details to get started.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # ESLint + Prettier check
npm run lint:fix     # Fix ESLint errors
npm run format       # Format with Prettier
npm run test         # Run all tests
npm test -- tests/api/ping.test.ts  # Run single test file
npm run type-check   # TypeScript checking
```

Add shadcn components: `npx shadcn@latest add [component]`

## Shadcn

This project uses shadcn/ui for UI components. Always prefer shadcn components over custom implementations when a suitable component exists. Browse available components at [ui.shadcn.com](https://ui.shadcn.com). Components are installed to `src/components/ui/` and can be customized after installation.

Components use the `base-nova` style, built on Base UI (not Radix). Compose with the `render` prop instead of `asChild`. For links that look like buttons, style the link with `buttonVariants()` rather than wrapping it in `Button`.

## Folder Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/                # API routes (route.ts files)
│   ├── opengraph-image.tsx # Auto-generated OG image
│   ├── twitter-image.tsx   # Auto-generated Twitter image
│   ├── manifest.ts         # PWA manifest
│   ├── sitemap.ts          # Sitemap generation
│   ├── robots.ts           # Robots.txt generation
│   ├── layout.tsx          # Root layout with metadata
│   └── [page]/page.tsx     # Pages
├── components/
│   ├── ui/                 # shadcn/ui components
│   └── common/             # Shared custom components
├── hooks/                  # Custom React hooks
├── lib/
│   ├── config.ts           # Site configuration
│   └── utils.ts            # Utility functions (cn)
└── validators/             # Zod schemas and types

tests/                      # Tests mirror src/ structure
├── api/                    # API route tests
├── components/             # Component tests
├── hooks/                  # Hook tests
├── lib/                    # Utility tests
├── utils/                  # Test utilities
└── setup.ts                # Test setup
```

## Code Rules

- Use `@/` path alias for imports from `src/`
- Client components need `"use client"` directive
- Zod schemas go in `src/validators/`, types are inferred with `z.infer<>`
- Site metadata flows from `src/lib/config.ts` to layout, manifest, sitemap, robots, and OG images
- API routes export named functions (GET, POST, etc.) in `route.ts` files
- Tests import route handlers directly for API testing

## Behavior

- Be concise
- Search or read docs when uncertain
- Maintain code quality and follow the existing structure
