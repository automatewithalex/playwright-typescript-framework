import { test, expect } from '@fixtures/testblocks';
import { tokenStorageKey } from '@data/static/testblocks';
import { testUserOrSkip } from '@support/auth';
import { Tag } from '@support/tags';

test.describe('Login', { tag: Tag.ui }, () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('sign-in form is available', { tag: Tag.smoke }, async ({ loginPage }) => {
    await expect(loginPage.heading).toBeVisible();
    await expect(loginPage.signInButton).toBeEnabled();
  });

  test(
    'wrong credentials show an error message',
    { tag: Tag.regression },
    async ({ loginPage, browserName }) => {
      test.skip(
        browserName === 'webkit',
        'Reload timing makes this check nondeterministic in WebKit, see #21',
      );
      test.fail(
        true,
        'Known bug: a 401 from /api/auth/login reloads /login, clearing the form and the error toast',
      );

      const email = 'nobody-e2e@example.com';

      await loginPage.loginAndSettle({ email, password: 'Wrong-password-1!' });

      await expect(loginPage.email).toHaveValue(email);
      await expect(loginPage.errorMessage).toBeVisible();
    },
  );

  test(
    'a registered user signs in and lands on the dashboard',
    { tag: [Tag.auth, Tag.smoke] },
    async ({ loginPage, dashboardPage, page }) => {
      const user = testUserOrSkip();

      await loginPage.login(user);

      await expect(dashboardPage.projectsHeading).toBeVisible();
      expect(await page.evaluate((key) => localStorage.getItem(key), tokenStorageKey)).toBeTruthy();
    },
  );
});
