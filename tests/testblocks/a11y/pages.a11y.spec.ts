import { test, expect } from '@fixtures/testblocks';
import { knownAccessibilityIssues } from '@data/static/accessibility-baseline';
import { findNewAccessibilityViolations } from '@support/accessibility';
import { Tag } from '@support/tags';

test.describe('Accessibility', { tag: [Tag.a11y, Tag.regression] }, () => {
  test('landing page has no new WCAG 2.1 AA violations', async ({ landingPage, page }) => {
    await landingPage.open();

    expect(await findNewAccessibilityViolations(page, knownAccessibilityIssues.testBlocks)).toEqual([]);
  });

  test('login page has no new WCAG 2.1 AA violations', async ({ loginPage, page }) => {
    await loginPage.open();

    expect(await findNewAccessibilityViolations(page, knownAccessibilityIssues.testBlocks)).toEqual([]);
  });
});
