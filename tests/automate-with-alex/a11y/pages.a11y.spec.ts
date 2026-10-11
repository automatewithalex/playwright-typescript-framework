import { test, expect } from '@fixtures/automate-with-alex';
import { knownAccessibilityIssues } from '@data/static/accessibility-baseline';
import { findNewAccessibilityViolations } from '@support/accessibility';
import { Tag } from '@support/tags';

test.describe('Accessibility', { tag: [Tag.a11y, Tag.regression] }, () => {
  test('home page has no new WCAG 2.1 AA violations', async ({ homePage, page }) => {
    await homePage.open();

    expect(await findNewAccessibilityViolations(page, knownAccessibilityIssues.automateWithAlex)).toEqual([]);
  });

  test('audit checklist has no new WCAG 2.1 AA violations', async ({ checklistPage, page }) => {
    await checklistPage.open();

    expect(await findNewAccessibilityViolations(page, knownAccessibilityIssues.automateWithAlex)).toEqual([]);
  });
});
