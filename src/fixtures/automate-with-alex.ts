import { test as base } from './base';
import { apiClient } from './api-context';
import { env } from '@config/env';
import { ContactApi } from '@api/automate-with-alex/ContactApi';
import { ChecklistPage } from '@pages/automate-with-alex/ChecklistPage';
import { HomePage } from '@pages/automate-with-alex/HomePage';
import { NotFoundPage } from '@pages/automate-with-alex/NotFoundPage';

interface AutomateWithAlexFixtures {
  homePage: HomePage;
  checklistPage: ChecklistPage;
  notFoundPage: NotFoundPage;
  contactApi: ContactApi;
}

export const test = base.extend<AutomateWithAlexFixtures>({
  homePage: async ({ page }, use) => use(new HomePage(page)),
  checklistPage: async ({ page }, use) => use(new ChecklistPage(page)),
  notFoundPage: async ({ page }, use) => use(new NotFoundPage(page)),
  contactApi: apiClient(env.urls.automateWithAlex, (request) => new ContactApi(request)),
});

export { expect } from '@playwright/test';
