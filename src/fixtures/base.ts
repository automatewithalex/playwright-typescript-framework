import { test as base } from '@playwright/test';
import { fakerSeed } from '@data/faker';

const trackers = ['**/_vercel/insights/**', '**/_vercel/speed-insights/**', '**/plausible.io/**'];

const stableRendering = () =>
  document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent =
      '*, *::before, *::after { scroll-behavior: auto !important; animation: none !important; transition: none !important; }';
    document.head.append(style);
  });

export const test = base.extend<{ blockTrackers: void; stableRendering: void; dataSeed: void }>({
  blockTrackers: [
    async ({ context }, use) => {
      for (const pattern of trackers) {
        await context.route(pattern, (route) => route.abort());
      }
      await use();
    },
    { auto: true },
  ],

  stableRendering: [
    async ({ context }, use) => {
      await context.addInitScript(stableRendering);
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
