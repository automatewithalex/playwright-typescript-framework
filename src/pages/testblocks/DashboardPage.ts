import type { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class DashboardPage extends BasePage {
  protected readonly path = '/';

  readonly projectsHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.projectsHeading = page.getByRole('heading', { name: 'Your projects' });
  }

  project(name: string): Locator {
    return this.page.getByText(name, { exact: true });
  }
}
