import type { Locator, Page } from '@playwright/test';
import { Component } from '../Component';

export class Navigation extends Component {
  constructor(page: Page) {
    super(page.getByRole('navigation', { name: 'Primary', exact: true }));
  }

  link(name: string): Locator {
    return this.root.getByRole('link', { name, exact: true });
  }

  linkNames(): Promise<string[]> {
    return this.root.getByRole('link').allInnerTexts();
  }

  async goTo(name: string): Promise<void> {
    await this.link(name).click();
  }
}
