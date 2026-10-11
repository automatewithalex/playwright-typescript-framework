import type { Page } from '@playwright/test';

export async function mockContactApi(
  page: Page,
  status = 200,
  body: object = { ok: true },
): Promise<unknown[]> {
  const sentPayloads: unknown[] = [];

  await page.route('**/api/contact', async (route) => {
    sentPayloads.push(route.request().postDataJSON());
    await route.fulfill({ status, json: body });
  });

  return sentPayloads;
}
