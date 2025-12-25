# Repository Guidelines

## Communication

- 永远使用简体中文进行思考和对话,输出的文档文字说明保持使用简体中文

## Project Structure & Module Organization

- `src/app/`: Next.js App Router entrypoints (`layout.tsx`, `page.tsx`, global styles).
- `src/components/`: React + `@react-three/fiber` scene/components, typically one folder per component with an `index.ts` barrel export.
- `src/hooks/`, `src/helpers/`, `src/constants.ts`: shared utilities, patches, and constants (importable via `@/…`).
- `public/`: static assets served at `/<asset>`.
- `.next/`: build output (generated; don’t edit).

## Build, Test, and Development Commands

Use a single package manager per change (lockfiles: `pnpm-lock.yaml` and `package-lock.json`).

- `npm run dev`: start the dev server at `http://localhost:3000`.
- `npm run build`: production build (use this to validate rendering before PRs).
- `npm run start`: run the built app locally.
- `npm run lint`: run Next.js ESLint rules (`next/core-web-vitals`).

## Coding Style & Naming Conventions

- Language: TypeScript + React (Next.js 14). Keep `strict` typing intact (`tsconfig.json`).
- Indentation: 2 spaces for `.ts/.tsx`; keep formatting consistent within the file you touch.
- Naming:
  - Components: `PascalCase` (e.g., `src/components/Tree/Tree.tsx`).
  - Hooks: `useX` (e.g., `src/hooks/useMemoizedObject.ts`).
  - Exports: prefer `src/components/Foo/index.ts` barrels for imports.
- Imports: use the `@/*` alias for `src/*` (avoid deep relative paths).

## Testing Guidelines

No dedicated test runner is configured. Treat `npm run lint` + `npm run build` as the minimum validation. For visual/3D changes, also verify in the browser (performance + shadows/bloom).

## Commit & Pull Request Guidelines

This checkout may not include Git history, so no repo-specific commit convention can be inferred. Recommended:

- Commits: imperative, scoped if helpful (e.g., `fix: reduce snow particle allocations`).
- PRs: include a short summary, before/after screenshots or a short capture for visual changes, and the commands you ran (`lint`, `build`).

## Security & Configuration Notes

`next.config.js` sets `Content-Security-Policy: frame-ancestors *` to allow embedding; call this out in PRs if you change headers or hosting assumptions.
