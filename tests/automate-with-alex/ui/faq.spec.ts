import { test, expect } from '@fixtures/automate-with-alex';
import { Tag } from '@support/tags';

test.describe('FAQ', { tag: [Tag.ui, Tag.regression] }, () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.openSection('faq');
  });

  test('every answer starts collapsed', async ({ homePage }) => {
    await expect(homePage.faq.items.first()).toBeVisible();
    for (const item of await homePage.faq.items.all()) {
      await expect(item).not.toHaveAttribute('open');
    }
  });

  test('a question expands and collapses its answer', async ({ homePage }) => {
    const first = homePage.faq.items.first();

    await homePage.faq.toggle(first);
    await expect(first).toHaveAttribute('open');

    await homePage.faq.toggle(first);
    await expect(first).not.toHaveAttribute('open');
  });
});
