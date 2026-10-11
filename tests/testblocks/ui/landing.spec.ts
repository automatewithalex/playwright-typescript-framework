import { test, expect } from '@fixtures/testblocks';
import { plans } from '@data/static/testblocks';
import { Tag } from '@support/tags';

test.describe('Landing page', { tag: Tag.ui }, () => {
  test('shows the product headline', { tag: Tag.smoke }, async ({ landingPage }) => {
    await landingPage.open();

    await expect(landingPage.heading).toBeVisible();
  });

  test.describe('Pricing', { tag: Tag.regression }, () => {
    test.beforeEach(async ({ landingPage }) => {
      await landingPage.openWithFrozenTimers();
      await landingPage.pricing.reveal();
    });

    for (const plan of plans) {
      test(`${plan.name} plan price follows the billing toggle`, async ({ landingPage }) => {
        const { pricing } = landingPage;

        await pricing.monthlyToggle.click();
        await expect(pricing.price(plan.name)).toHaveText(plan.monthly);
        await expect(pricing.billingNote(plan.name)).toHaveText('billed monthly');

        await pricing.annualToggle.click();
        await expect(pricing.price(plan.name)).toHaveText(plan.annual);
        await expect(pricing.billingNote(plan.name)).toHaveText('billed yearly');
      });
    }
  });
});
