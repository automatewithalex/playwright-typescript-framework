import AxeBuilder from '@axe-core/playwright';
import { test, type Page } from '@playwright/test';

export const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

export async function findAccessibilityViolations(page: Page) {
  const { violations } = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
  return violations.map(({ id, impact, nodes }) => ({
    id,
    impact,
    targets: nodes.map((n) => n.target.join(' ')),
  }));
}

export async function findNewAccessibilityViolations(page: Page, knownIssues: string[]) {
  const violations = await findAccessibilityViolations(page);

  for (const known of violations.filter((v) => knownIssues.includes(v.id))) {
    test.info().annotations.push({
      type: 'known a11y issue',
      description: `${known.id}: ${known.targets.length} elements`,
    });
  }

  return violations.filter((v) => !knownIssues.includes(v.id));
}
