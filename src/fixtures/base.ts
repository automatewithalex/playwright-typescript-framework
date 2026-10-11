import { test as base } from '@playwright/test';
import { fakerSeed } from '@data/faker';

const trackers = ['**/_vercel/insights/**', '**/_vercel/speed-insights/**', '**/plausible.io/**'];

export const test = base.extend<{ blockTrackers: void; dataSeed: void }>({
  blockTrackers: [
    async ({ context }, use) => {
      for (const pattern of trackers) {
        await context.route(pattern, (route) => route.abort());
      }
      await use();
    },
    { auto: true },
  ],

  dataSeed: [
    async ({}, use, testInfo) => {
      testInfo.annotations.push({ type: 'faker-seed', description: String(fakerSeed) });
      await use();
    },
    { auto: true },
  ],
});
