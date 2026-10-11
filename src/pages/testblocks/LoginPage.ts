import type { Locator, Page } from '@playwright/test';
import type { Credentials } from '@api/testblocks/AuthApi';
import { BasePage } from '../BasePage';

export class LoginPage extends BasePage {
  protected readonly path = '/login';

  readonly heading: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly signInButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Sign in to TestBlocks' });
    this.email = page.getByPlaceholder('you@example.com');
    this.password = page.getByPlaceholder('Enter your password');
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
    this.errorMessage = page.getByText(/invalid credentials/i);
  }

  async login({ email, password }: Credentials): Promise<void> {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.signInButton.click();
  }

  async loginAndSettle(credentials: Credentials): Promise<void> {
    await this.login(credentials);
    await this.page.waitForLoadState('networkidle');
  }
}
