# Playwright TypeScript Framework

UI and API tests for two live applications: automatewithalex.com (`awa`) and testblocks.io (`testblocks`).

## Commands

```bash
npm run check                         # typecheck + lint + format check, run before every commit
npx playwright test --project=awa:chromium
npx playwright test --grep @smoke
npx playwright test path/to/file.spec.ts --debug
npm run report                        # open the last HTML report
```

## Layout

- `src/pages`: one class per page, composed of components; no assertions.
- `src/components`: parts of a page with their own behaviour (navigation, forms, tables).
- `src/api`: API clients; every response goes through a zod schema.
- `src/fixtures`: everything a test receives (`homePage`, `contactApi`, `tempProject`...).
- `src/data`: `static` reference data, `builders` for generated data, `cases` for data-driven tables.
- `src/support`: tags, auth session helpers, accessibility audit.
- `tests/<app>/{ui,api,a11y,visual,authenticated}`: specs only, no locators or raw data.

## Rules

- Tests import `test` and `expect` from `@fixtures/<app>`, never from `@playwright/test`.
- Every test has tags from `Tag` (`@smoke` or `@regression`, plus the layer: `@ui`, `@api`, ...).
- Locators: `getByRole` > `getByLabel` > `getByPlaceholder` > `getByText` > CSS. Never XPath, never `nth()` on generated class names.
- No `waitForTimeout`, no hard-coded sleeps; rely on web-first assertions.
- Tests that create data must clean it up through a fixture teardown (see `tempProject`).
- Never submit the real contact form or TestBlocks public forms: they send email and have a 5/hour rate limit. Use `mockContactApi` or the honeypot path.
- Negative login tests use an account that does not exist; wrong passwords on the real test account lock it.
- Secrets only come from env variables (`src/config/env.ts`). Never print, log or commit them.
- Known product bugs are marked with `test.fail(true, 'Known bug: ...')`, never deleted or weakened.

## Skills

`.claude/skills` has step-by-step guides: `write-test`, `add-page-object`, `heal-failing-test`, `review-test`.
The Playwright planner, generator and healer agents live in `.claude/agents`.
