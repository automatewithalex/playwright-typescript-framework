import type { Locator, Page } from '@playwright/test';
import { Component } from '../Component';

export class PricingTable extends Component {
  readonly monthlyToggle: Locator;
  readonly annualToggle: Locator;

  constructor(page: Page) {
    super(page.locator('section#pricing'));
    this.monthlyToggle = this.root.getByRole('button', { name: 'Monthly' });
    this.annualToggle = this.root.getByRole('button', { name: /^Annual/ });
  }

  plan(name: string): Locator {
    return this.root.locator('div', { has: this.page.getByRole('heading', { name, level: 3 }) }).last();
  }

  price(name: string): Locator {
    return this.plan(name).getByText(/^\$\d+$/);
  }

  billingNote(name: string): Locator {
    return this.plan(name).getByText(/^billed /);
  }
}
