---
name: write-test
description: Add a new UI or API test that follows this framework's conventions (fixtures, tags, page objects, test data). Use when asked to cover a new scenario.
---

# Write a test

1. **Find the home.** Pick `tests/<app>/<layer>/` (`ui`, `api`, `a11y`, `visual`, `authenticated`). Extend an existing spec when the scenario belongs to the same feature.
2. **Check what exists.** Look for a page object, component or API client in `src/` that already covers the screen or endpoint. If something is missing, follow the `add-page-object` skill first; never put locators in a spec.
3. **Get the data.**
   - Fixed reference values go in `src/data/static/<app>.ts`.
   - Generated values come from a builder in `src/data/builders` (add a `with...` method rather than inline objects).
   - Several inputs with the same steps: add a table to `src/data/cases` and loop over it.
   - Anything created on the server goes through a fixture that deletes it in teardown.
4. **Write the test.**
   ```ts
   import { test, expect } from '@fixtures/<app>';
   import { Tag } from '@support/tags';

   test('describes the behaviour in plain words', { tag: [Tag.regression] }, async ({ somePage }) => {
     await somePage.open();

     await somePage.doSomething();

     await expect(somePage.result).toBeVisible();
   });
   ```
   - Arrange, act, assert, separated by a blank line.
   - One behaviour per test; the title says what the user sees, not how.
   - Web-first assertions (`toBeVisible`, `toHaveText`, `toHaveURL`), no manual waits.
5. **Tag it.** `@smoke` only for the few checks that prove the app is up; everything else `@regression`. Add the layer tag.
6. **Run it** on its project at least three times: `npx playwright test <file> --project=<app>:chromium --repeat-each=3`.
7. **Finish** with `npm run check`.
