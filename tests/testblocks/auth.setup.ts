import { test as setup, expect } from '@fixtures/testblocks';
import { saveSession, testUserOrSkip } from '@support/auth';

setup('sign in through the API and store the session', async ({ authApi }) => {
  const user = testUserOrSkip();

  const { status, body } = await authApi.login(user);

  expect(status).toBe(200);
  saveSession(body.token);
});
