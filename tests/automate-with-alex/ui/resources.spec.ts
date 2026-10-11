import { test, expect } from '@fixtures/automate-with-alex';
import { Tag } from '@support/tags';

test.describe('Resources and errors', { tag: Tag.ui }, () => {
  test('audit checklist page is published', { tag: Tag.smoke }, async ({ checklistPage }) => {
    await checklistPage.open();

    await expect(checklistPage.heading).toHaveText(/QA Automation Audit Checklist/i);
    await expect(checklistPage.printButton).toBeVisible();
  });

  test('audit checklist is split into sections', { tag: Tag.regression }, async ({ checklistPage }) => {
    await checklistPage.open();

    expect(await checklistPage.sectionHeadings.count()).toBeGreaterThan(3);
  });

  test(
    'unknown pages return 404 and lead back home',
    { tag: Tag.regression },
    async ({ notFoundPage, page }) => {
      expect(await notFoundPage.openAndGetStatus()).toBe(404);

      await notFoundPage.homeLink.click();

      await expect(page).toHaveURL('/');
    },
  );
});
