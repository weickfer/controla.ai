# Repository Guidelines

## Project Structure & Module Organization
- `src/` — application code.
  - `components/` (UI and screens; shadcn-ui under `components/ui`).
  - `pages/` (routes; wired via `src/router.tsx`).
  - `services/` (e.g., `supabase.ts`).
  - `hooks/`, `lib/`, `assets/`.
- `public/` — static assets served as-is.
- `scripts/` — maintenance (e.g., `check-filenames.mjs`).
- Root configs: `vite.config.ts`, `tailwind.config.ts`, `eslint.config.js`, `tsconfig*.json`, `vercel.json`.

## Build, Test, and Development Commands
- `npm run dev` — start Vite dev server.
- `npm run build` — production build to `dist/`.
- `npm run build:dev` — development-mode build.
- `npm run preview` — serve the built app locally.
- `npm run lint` — run ESLint on the codebase.
- `npm run lint:filenames` — enforce kebab-case filenames.
- `npm run lint:all` — run both lint checks.

## Coding Style & Naming Conventions
- TypeScript + React; ESLint rules in `eslint.config.js` (React Hooks rules enabled).
- Filenames: kebab-case only (enforced). Example: `transaction-item.tsx` not `TransactionItem.tsx`.
- Exports: Components/Types `PascalCase`; functions/vars `camelCase`; React hooks named `useSomething` and stored in `hooks/` (files `use-*.ts(x)`).
- Styling: Tailwind-first; prefer shadcn-ui primitives from `components/ui`.

## Testing Guidelines
- No test runner is configured yet. If adding tests, prefer Vitest + React Testing Library.
- Co-locate tests as `*.test.ts(x)` next to source or under `src/__tests__/`.
- Mock Supabase in tests; avoid real network calls.

## Commit & Pull Request Guidelines
- Use clear, imperative messages; Conventional Commits are encouraged.
  - Examples: `feat(ui): add transaction modal`, `fix(router): handle 404 redirects`.
- PRs must include: purpose/summary, linked issue (if any), screenshots/GIFs for UI changes, test/QA steps, and confirmation that `npm run lint:all` and `npm run build` pass.

## Security & Configuration Tips
- Create `.env.local` for secrets (never commit). Vite envs must be prefixed `VITE_`:
  - `VITE_SUPABASE_URL=...`
  - `VITE_SUPABASE_ANON_KEY=...`
- Prefer `npm i` (lockfile present). Keep credentials out of code and logs.

