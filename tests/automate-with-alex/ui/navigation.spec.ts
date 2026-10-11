import { test, expect } from '@fixtures/automate-with-alex';
import { desktopNavigation, mobileNavigation } from '@data/static/automate-with-alex';
import { Tag } from '@support/tags';

test.describe('Navigation', { tag: Tag.ui }, () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  test('desktop menu lists every section link', { tag: Tag.smoke }, async ({ homePage }) => {
    expect(await homePage.navigation.linkNames()).toEqual(desktopNavigation);
  });

  for (const name of desktopNavigation) {
    test(`"${name}" scrolls to its section`, { tag: Tag.regression }, async ({ homePage, page }) => {
      await homePage.navigation.goTo(name);

      const sectionId = new URL(page.url()).hash.slice(1);
      await expect(homePage.section(sectionId)).toBeInViewport();
    });
  }

  test('mobile menu opens, lists links and closes after a choice', { tag: [Tag.mobile, Tag.smoke] }, async ({
    homePage,
  }) => {
    await homePage.mobileMenu.open();
    for (const name of mobileNavigation) {
      await expect(homePage.mobileMenu.link(name)).toBeVisible();
    }

    await homePage.mobileMenu.link('Contact').click();

    await expect(homePage.mobileMenu.link('Contact')).toBeHidden();
    await expect(homePage.section('contact')).toBeInViewport();
  });

  test('page does not scroll sideways on a phone', { tag: [Tag.mobile, Tag.regression] }, async ({ page }) => {
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
