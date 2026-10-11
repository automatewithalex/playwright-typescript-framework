import { test, expect } from '@fixtures/automate-with-alex';
import { Tag } from '@support/tags';

test.describe('Visual: home page', { tag: [Tag.visual, Tag.regression] }, () => {
  test('header matches the baseline', async ({ homePage }) => {
    await homePage.open();

    await expect(homePage.header).toHaveScreenshot('header.png');
  });
});
