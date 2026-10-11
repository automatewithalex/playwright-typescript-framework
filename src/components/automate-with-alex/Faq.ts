import type { Locator, Page } from '@playwright/test';
import { Component } from '../Component';

export class Faq extends Component {
  readonly items: Locator;

  constructor(page: Page) {
    super(page.locator('section#faq'));
    this.items = this.root.locator('details');
  }

  item(question: string | RegExp): Locator {
    return this.items.filter({ has: this.page.locator('summary', { hasText: question }) });
  }

  async toggle(question: string | RegExp): Promise<void> {
    await this.item(question).locator('summary').click();
  }
}
