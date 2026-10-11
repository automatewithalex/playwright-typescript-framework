---
name: review-test
description: Review a test or page-object change against this framework's standards. Use before opening a pull request or when asked to review test code.
---

# Review a test change

Read the diff, then check each point and report only the ones that fail, with file:line and a suggested fix.

**Structure**

- Spec imports `test`/`expect` from `@fixtures/<app>`; no locators, URLs or literal data in the spec.
- Page objects and components hold locators, describe intent and never assert.
- New pages/components are exposed through fixtures.

**Behaviour**

- Title states the behaviour; one behaviour per test; arrange / act / assert are visible.
- Assertions are web-first and specific (`toHaveText('Help center')`, not `toBeTruthy()`).
- No `waitForTimeout`, `force: true`, `test.only`, or unconditional `test.skip`.

**Data**

- Generated data comes from builders; reference data from `src/data/static`.
- Anything created is cleaned up in a fixture teardown.
- No real emails sent, no secrets in code or logs.

**Tagging and scope**

- Has `@smoke` or `@regression` plus a layer tag.
- `@api`, `@visual`, `@a11y` tests do not depend on a browser project.

**Proof**

- `npm run check` passes.
- New or changed tests pass with `--repeat-each=3`.
