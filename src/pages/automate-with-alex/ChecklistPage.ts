import type { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class ChecklistPage extends BasePage {
  protected readonly path = '/resources/qa-automation-audit-checklist';

  readonly heading: Locator;
  readonly sectionHeadings: Locator;
  readonly printButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { level: 1 });
    this.sectionHeadings = page.getByRole('heading', { level: 2 });
    this.printButton = page.getByRole('button', { name: /print/i });
  }
}
