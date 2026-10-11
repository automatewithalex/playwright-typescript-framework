import type { Locator, Page } from '@playwright/test';
import { Component } from '../Component';

export class MobileMenu extends Component {
  readonly toggle: Locator;

  constructor(page: Page) {
    super(page.getByRole('navigation', { name: 'Mobile primary' }));
    this.toggle = page.getByRole('button', { name: /open menu|close menu/i });
  }

  link(name: string): Locator {
    return this.root.getByRole('link', { name, exact: true });
  }

  async open(): Promise<void> {
    await this.toggle.click();
  }

  async goTo(name: string): Promise<void> {
    await this.open();
    await this.link(name).click();
  }
}
