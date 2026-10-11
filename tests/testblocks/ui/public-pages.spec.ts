import { test, expect } from '@fixtures/testblocks';
import { infoPages } from '@data/static/testblocks';
import { InfoPage } from '@pages/testblocks/InfoPage';
import { Tag } from '@support/tags';

test.describe('Public pages', { tag: [Tag.ui, Tag.regression] }, () => {
  for (const { path, heading } of infoPages) {
    test(`${path} shows "${heading}"`, async ({ page }) => {
      const infoPage = new InfoPage(page, path);
      await infoPage.open();

      await expect(infoPage.heading).toHaveText(heading);
    });
  }

  test('unknown routes show the not found page', async ({ page }) => {
    const infoPage = new InfoPage(page, '/this-route-does-not-exist');
    await infoPage.open();

    await expect(infoPage.heading).toHaveText('Page not found');
  });
});
