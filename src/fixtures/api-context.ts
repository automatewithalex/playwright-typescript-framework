import type { APIRequestContext, PlaywrightWorkerArgs } from '@playwright/test';

type Use<T> = (client: T) => Promise<void>;

export function apiClient<T>(baseURL: string, create: (request: APIRequestContext) => T) {
  return async ({ playwright }: Pick<PlaywrightWorkerArgs, 'playwright'>, use: Use<T>) => {
    const request = await playwright.request.newContext({ baseURL });
    await use(create(request));
    await request.dispose();
  };
}
