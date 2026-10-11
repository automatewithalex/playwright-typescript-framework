import { test as base } from './base';
import { apiClient } from './api-context';
import { env } from '@config/env';
import { AuthApi } from '@api/testblocks/AuthApi';
import { BillingApi } from '@api/testblocks/BillingApi';
import { HealthApi } from '@api/testblocks/HealthApi';
import { ProjectsApi, type Project } from '@api/testblocks/ProjectsApi';
import { uniqueName } from '@data/unique';
import { DashboardPage } from '@pages/testblocks/DashboardPage';
import { LandingPage } from '@pages/testblocks/LandingPage';
import { LoginPage } from '@pages/testblocks/LoginPage';
import { readSessionToken } from '@support/auth';

interface TestBlocksFixtures {
  landingPage: LandingPage;
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  healthApi: HealthApi;
  billingApi: BillingApi;
  authApi: AuthApi;
  projectsApi: ProjectsApi;
  tempProject: Project;
}

interface TestBlocksWorkerFixtures {
  sessionToken: string;
}

const api = env.urls.testBlocksApi;

export const test = base.extend<TestBlocksFixtures, TestBlocksWorkerFixtures>({
  landingPage: async ({ page }, use) => use(new LandingPage(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  dashboardPage: async ({ page }, use) => use(new DashboardPage(page)),

  healthApi: apiClient(api, (request) => new HealthApi(request)),
  billingApi: apiClient(api, (request) => new BillingApi(request)),
  authApi: apiClient(api, (request) => new AuthApi(request)),

  sessionToken: [async ({}, use) => use(readSessionToken()), { scope: 'worker' }],

  projectsApi: async ({ playwright, sessionToken }, use) =>
    apiClient(api, (request) => new ProjectsApi(request, sessionToken))({ playwright }, use),

  tempProject: async ({ projectsApi }, use) => {
    const { body } = await projectsApi.create(uniqueName('e2e-project'));
    await use(body.project);
    await projectsApi.remove(body.project.id);
  },
});

export { expect } from '@playwright/test';
