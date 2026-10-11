import { test, expect } from '@fixtures/automate-with-alex';
import { calendlyUrl, homeSections } from '@data/static/automate-with-alex';
import { Tag } from '@support/tags';

test.describe('Home page', { tag: Tag.ui }, () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  test('shows the hero headline and primary call to action', { tag: Tag.smoke }, async ({ homePage }) => {
    await expect(homePage.heading).toHaveText(/QA engineers for your team, without hiring/i);
    await expect(homePage.bookCallLink).toBeVisible();
  });

  test('booking link points to Calendly and opens in a new tab', { tag: Tag.smoke }, async ({ homePage }) => {
    await expect(homePage.bookCallLink).toHaveAttribute('href', calendlyUrl);
    await expect(homePage.bookCallLink).toHaveAttribute('target', '_blank');
  });

  test('renders sections in the agreed order', { tag: Tag.regression }, async ({ homePage }) => {
    expect(await homePage.sectionIds()).toEqual(homeSections);
  });

  test('has a descriptive page title', { tag: Tag.regression }, async ({ homePage }) => {
    expect(await homePage.title()).toMatch(/QA Engineers on a Monthly Contract/i);
  });
});
