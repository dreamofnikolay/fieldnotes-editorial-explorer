# Fieldnotes — Editorial Content Explorer

An original portfolio demonstration project prepared as a frontend engineering code sample. This is not code from a previous employer or client.

## What it demonstrates
- React and TypeScript with strict compiler settings
- Reusable components and typed domain models
- Responsive, semantic, keyboard-accessible UI
- Search, topic filtering, sorting, pagination, loading and empty states
- A separate data-service boundary that can be replaced by a REST or GraphQL API
- User-facing tests with Vitest and Testing Library

## Run locally
Requires Node.js 20+.

```bash
npm install
npm run dev
```

## Validate
```bash
npm test
npm run build
```

## Architecture
`App` owns the search, category, sort and page state. Filtered results are derived with `useMemo` rather than duplicated in state. `useArticles` owns loading/error lifecycle. `articleService` isolates data access so the UI can later use a real API without rewriting components.

## Suggested review points
- `src/App.tsx` — state ownership, derived filtering and pagination
- `src/hooks/useArticles.ts` — async lifecycle and cancellation
- `src/services/articleService.ts` — data-access boundary
- `src/components/Filters.tsx` — accessible form controls
- `src/App.test.tsx` — behavior-focused tests
