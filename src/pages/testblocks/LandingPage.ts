import type { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { PricingTable } from '@components/testblocks/PricingTable';

export class LandingPage extends BasePage {
  protected readonly path = '/';

  readonly heading: Locator;
  readonly pricing: PricingTable;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { level: 1 });
    this.pricing = new PricingTable(page);
  }
}
