import type { Locator, Page } from '@playwright/test';

export abstract class Component {
  constructor(protected readonly root: Locator) {}

  protected get page(): Page {
    return this.root.page();
  }

  isVisible(): Promise<boolean> {
    return this.root.isVisible();
  }
}
