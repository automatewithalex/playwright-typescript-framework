---
name: heal-failing-test
description: Diagnose and fix a failing or flaky Playwright test without hiding real bugs. Use when CI or a local run reports a failure.
---

# Heal a failing test

1. **Reproduce.** `npx playwright test <file> -g "<title>" --project=<project> --trace=on`, then open the trace with `npx playwright show-trace`. For CI failures, download the `playwright-report-*` artifact.
2. **Classify the failure** before touching code:
   | Cause           | Signal                                        | Fix                                                                     |
   | --------------- | --------------------------------------------- | ----------------------------------------------------------------------- |
   | Locator changed | element not found, DOM in trace differs       | update the page object or component, not the spec                       |
   | Timing          | passes on retry, action before the UI settled | wait for a state with a web-first assertion; never `waitForTimeout`     |
   | Test data       | conflicts, leftovers, rate limits             | unique names, fixture cleanup, fewer calls                              |
   | Product bug     | the app really behaves wrong                  | keep the assertion, mark `test.fail(true, 'Known bug: ...')`, report it |
   | Environment     | 5xx, DNS, site down                           | rerun; if it persists, report, do not change tests                      |
3. **Use the healer agent** for locator and timing issues: ask Claude to "use playwright-test-healer on <file>". Review every change it proposes; reject anything that loosens an assertion or adds a sleep.
4. **Fix at the lowest layer.** A selector fix goes in `src/pages` or `src/components`, so every test using it heals at once.
5. **Prove it.** `--repeat-each=5` on the affected project, then `npm run check`.
6. **Commit** with `fix(<area>): <what changed in the app>` and mention the root cause in the body.

Never: delete a failing test, raise timeouts to make it pass, wrap steps in try/catch, or swap a specific assertion for a vaguer one.
