import { test } from '@playwright/test';

export function uniqueName(prefix: string): string {
  const { workerIndex } = test.info();
  return `${prefix}-w${workerIndex}-${Date.now().toString(36)}`;
}
