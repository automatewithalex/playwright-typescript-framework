import { test, expect } from '@fixtures/testblocks';
import { Tag } from '@support/tags';

test.describe('TestBlocks public API', { tag: Tag.api }, () => {
  test('service is live', { tag: Tag.smoke }, async ({ healthApi }) => {
    const { status } = await healthApi.live();

    expect(status).toBe(200);
  });

  test('service is ready and connected to its database', { tag: Tag.smoke }, async ({ healthApi }) => {
    const { status, body } = await healthApi.ready();

    expect(status).toBe(200);
    expect(body.database).toBe('connected');
  });

  test('billing config exposes the active billing mode', { tag: Tag.regression }, async ({ billingApi }) => {
    const { status } = await billingApi.config();

    expect(status).toBe(200);
  });

  test('login requires email and password', { tag: Tag.regression }, async ({ authApi }) => {
    const { status, body } = await authApi.loginExpectingError({});

    expect(status).toBe(400);
    expect(body.error).toBe('Email and password are required');
  });

  test('login rejects an unknown account', { tag: Tag.regression }, async ({ authApi }) => {
    const { status, body } = await authApi.loginExpectingError({
      email: 'nobody-e2e@example.com',
      password: 'Wrong-password-1!',
    });

    expect(status).toBe(401);
    expect(body.error).toBe('Invalid credentials');
  });
});
