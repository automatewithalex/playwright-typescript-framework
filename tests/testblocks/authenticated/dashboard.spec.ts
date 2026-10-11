import { test, expect } from '@fixtures/testblocks';
import { env } from '@config/env';
import { Tag } from '@support/tags';

test.describe('Dashboard', { tag: [Tag.ui, Tag.auth] }, () => {
  test.skip(!env.testBlocksUser, 'TestBlocks test account is not configured');

  test(
    'opens straight into the dashboard with a stored session',
    { tag: Tag.smoke },
    async ({ dashboardPage }) => {
      await dashboardPage.open();

      await expect(dashboardPage.projectsHeading).toBeVisible();
    },
  );

  test(
    'lists a project created through the API',
    { tag: Tag.regression },
    async ({ dashboardPage, tempProject }) => {
      await dashboardPage.open();

      await expect(dashboardPage.project(tempProject.name)).toBeVisible();
    },
  );
});
