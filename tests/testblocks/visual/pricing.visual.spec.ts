import { test, expect } from '@fixtures/testblocks';
import { Tag } from '@support/tags';

test.describe('Visual: pricing', { tag: [Tag.visual, Tag.regression] }, () => {
  test('annual pricing table matches the baseline', async ({ landingPage }) => {
    await landingPage.openWithFrozenTimers();
    await landingPage.pricing.reveal();
    await landingPage.pricing.annualToggle.click();

    await expect(landingPage.pricing.plan('Team')).toHaveScreenshot('team-plan-annual.png');
  });
});
