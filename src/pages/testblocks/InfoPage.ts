import type { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class InfoPage extends BasePage {
  readonly heading: Locator;

  constructor(
    page: Page,
    protected readonly path: string,
  ) {
    super(page);
    this.heading = page.getByRole('heading', { level: 1 });
  }
}
