import { defineConfig, devices, type Project } from '@playwright/test';
import { env } from './src/config/env';

const isCI = Boolean(process.env.CI);

export const TESTBLOCKS_AUTH_FILE = '.auth/testblocks-user.json';

const desktopBrowsers = {
  chromium: devices['Desktop Chrome'],
  firefox: devices['Desktop Firefox'],
  webkit: devices['Desktop Safari'],
};

const chromiumOnly = /@api|@visual|@a11y/;

function desktopProjects(
  app: string,
  testDir: string,
  baseURL: string,
  extra: Partial<Project> = {},
): Project[] {
  return Object.entries(desktopBrowsers).map(([browser, device]) => ({
    name: `${app}:${browser}`,
    testDir,
    use: { ...device, baseURL },
    grepInvert: browser === 'chromium' ? /@mobile/ : new RegExp(`${chromiumOnly.source}|@mobile`),
    ...extra,
  }));
}

export default defineConfig({
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 4 : undefined,
  timeout: 30_000,
  expect: { timeout: 7_000 },
  outputDir: 'test-results',
  metadata: { environment: env.name },

  reporter: isCI
    ? [['blob'], ['github'], ['list']]
    : [['list'], ['html', { open: 'never' }], ['junit', { outputFile: 'reports/junit.xml' }]],

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },

  projects: [
    ...desktopProjects('awa', './tests/automate-with-alex', env.urls.automateWithAlex),
    {
      name: 'awa:mobile',
      testDir: './tests/automate-with-alex',
      use: { ...devices['Pixel 7'], baseURL: env.urls.automateWithAlex },
      grep: /@mobile/,
    },

    ...desktopProjects('testblocks', './tests/testblocks', env.urls.testBlocks, {
      testIgnore: ['**/authenticated/**', '**/*.setup.ts'],
    }),
    {
      name: 'testblocks:setup',
      testDir: './tests/testblocks',
      testMatch: /.*\.setup\.ts/,
      use: { baseURL: env.urls.testBlocks },
    },
    {
      name: 'testblocks:authenticated',
      testDir: './tests/testblocks/authenticated',
      dependencies: ['testblocks:setup'],
      use: { ...devices['Desktop Chrome'], baseURL: env.urls.testBlocks, storageState: TESTBLOCKS_AUTH_FILE },
    },
  ],
});
