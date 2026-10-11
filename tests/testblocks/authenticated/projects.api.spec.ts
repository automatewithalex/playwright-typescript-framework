import { test, expect } from '@fixtures/testblocks';
import { env } from '@config/env';
import { uniqueName } from '@data/unique';
import { Tag } from '@support/tags';

test.describe('Projects API', { tag: [Tag.api, Tag.auth, Tag.regression] }, () => {
  test.skip(!env.testBlocksUser, 'TestBlocks test account is not configured');

  test('a created project is listed and can be deleted', async ({ projectsApi }) => {
    const name = uniqueName('e2e-api-project');

    const created = await projectsApi.create(name);
    expect(created.status).toBe(201);

    const listed = await projectsApi.list();
    expect(listed.body.projects.map((p) => p.name)).toContain(name);

    expect(await projectsApi.remove(created.body.project.id)).toBe(200);
    const afterDelete = await projectsApi.list();
    expect(afterDelete.body.projects.map((p) => p.name)).not.toContain(name);
  });

  test('requests without a token are rejected', async ({ playwright }) => {
    const request = await playwright.request.newContext({ baseURL: env.urls.testBlocksApi });

    const response = await request.get('/api/projects');

    expect(response.status()).toBe(401);
    await request.dispose();
  });
});
