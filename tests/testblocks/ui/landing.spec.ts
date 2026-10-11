import { test, expect } from '@fixtures/testblocks';
import { plans } from '@data/static/testblocks';
import { Tag } from '@support/tags';

test.describe('Landing page', { tag: Tag.ui }, () => {
  test.beforeEach(async ({ landingPage }) => {
    await landingPage.open();
  });

  test('shows the product headline', { tag: Tag.smoke }, async ({ landingPage }) => {
    await expect(landingPage.heading).toBeVisible();
  });

  for (const plan of plans) {
    test(
      `${plan.name} plan price follows the billing toggle`,
      { tag: Tag.regression },
      async ({ landingPage }) => {
        const { pricing } = landingPage;

        await pricing.monthlyToggle.click();
        await expect(pricing.price(plan.name)).toHaveText(plan.monthly);
        await expect(pricing.billingNote(plan.name)).toHaveText('billed monthly');

        await pricing.annualToggle.click();
        await expect(pricing.price(plan.name)).toHaveText(plan.annual);
        await expect(pricing.billingNote(plan.name)).toHaveText('billed yearly');
      },
    );
  }
});
