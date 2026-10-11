import { test as base } from './base';
import { ChecklistPage } from '@pages/automate-with-alex/ChecklistPage';
import { HomePage } from '@pages/automate-with-alex/HomePage';
import { NotFoundPage } from '@pages/automate-with-alex/NotFoundPage';

interface AutomateWithAlexPages {
  homePage: HomePage;
  checklistPage: ChecklistPage;
  notFoundPage: NotFoundPage;
}

export const test = base.extend<AutomateWithAlexPages>({
  homePage: async ({ page }, use) => use(new HomePage(page)),
  checklistPage: async ({ page }, use) => use(new ChecklistPage(page)),
  notFoundPage: async ({ page }, use) => use(new NotFoundPage(page)),
});

export { expect } from '@playwright/test';
