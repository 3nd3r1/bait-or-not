# Ender - Next.js Template

A minimal Next.js starter with React 19, Tailwind CSS 4, and shadcn/ui.

## Stack

All dependencies are kept at latest versions.

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Vitest
- ESLint
- Prettier

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint and Prettier check
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run coverage     # Run tests with coverage
npm run type-check   # TypeScript type checking
```

## Structure

```
src/
├── app/             # Next.js App Router pages
│   ├── layout.tsx   # Root layout
│   ├── page.tsx     # Home page
│   └── globals.css  # Global styles
├── components/
│   └── ui/          # shadcn/ui components
└── lib/
    └── utils.ts     # Utility functions (cn)

tests/
├── api/             # API route tests
├── components/      # Component tests
├── lib/             # Utility tests
└── setup.ts         # Test configuration
```

## Adding Components

```bash
npx shadcn@latest add button
npx shadcn@latest add card
```

Components are added to `src/components/ui/`.
