import { test as base } from '@playwright/test';
import { fakerSeed } from '@data/faker';

const trackers = ['**/_vercel/insights/**', '**/_vercel/speed-insights/**', '**/plausible.io/**'];

const instantScrolling = () =>
  document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = '*, *::before, *::after { scroll-behavior: auto !important; }';
    document.head.append(style);
  });

export const test = base.extend<{ blockTrackers: void; instantScroll: void; dataSeed: void }>({
  blockTrackers: [
    async ({ context }, use) => {
      for (const pattern of trackers) {
        await context.route(pattern, (route) => route.abort());
      }
      await use();
    },
    { auto: true },
  ],

  instantScroll: [
    async ({ context }, use) => {
      await context.addInitScript(instantScrolling);
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
