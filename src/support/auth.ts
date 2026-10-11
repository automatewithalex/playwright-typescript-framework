import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { test } from '@playwright/test';
import { env } from '@config/env';
import type { Credentials } from '@api/testblocks/AuthApi';
import { tokenStorageKey } from '@data/static/testblocks';

export const TESTBLOCKS_AUTH_FILE = '.auth/testblocks-user.json';

export function testUserOrSkip(): Credentials {
  const user = env.testBlocksUser;
  test.skip(!user, 'TestBlocks test account is not configured (TB_TEST_EMAIL, TB_TEST_PASSWORD)');
  return user as Credentials;
}

export function saveSession(token: string): void {
  const state = {
    cookies: [],
    origins: [{ origin: env.urls.testBlocks, localStorage: [{ name: tokenStorageKey, value: token }] }],
  };
  mkdirSync(dirname(TESTBLOCKS_AUTH_FILE), { recursive: true });
  writeFileSync(TESTBLOCKS_AUTH_FILE, JSON.stringify(state, null, 2));
}

export function readSessionToken(): string {
  const state = JSON.parse(readFileSync(TESTBLOCKS_AUTH_FILE, 'utf8'));
  return state.origins[0].localStorage[0].value;
}
