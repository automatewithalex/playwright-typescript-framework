import type { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class NotFoundPage extends BasePage {
  readonly heading: Locator;
  readonly homeLink: Locator;

  constructor(
    page: Page,
    protected readonly path = '/this-page-does-not-exist',
  ) {
    super(page);
    this.heading = page.getByRole('heading', { level: 1 });
    this.homeLink = page.getByRole('main').getByRole('link', { name: 'Home', exact: true });
  }

  async openAndGetStatus(): Promise<number | undefined> {
    const response = await this.page.goto(this.path);
    return response?.status();
  }
}
