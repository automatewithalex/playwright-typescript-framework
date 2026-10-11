import type { Locator, Page } from '@playwright/test';
import { Component } from '../Component';

export class Faq extends Component {
  readonly items: Locator;

  constructor(page: Page) {
    super(page.locator('section#faq'));
    this.items = this.root.locator('details');
  }

  async toggle(item: Locator): Promise<void> {
    await item.locator('summary').click();
  }
}
