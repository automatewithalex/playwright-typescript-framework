import { test, expect } from '@fixtures/automate-with-alex';

test('seed: home page is ready for exploration', async ({ homePage }) => {
  await homePage.open();

  await expect(homePage.heading).toBeVisible();
});
