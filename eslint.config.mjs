import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['node_modules', 'playwright-report', 'test-results', 'blob-report', 'reports'] },
  js.configs.recommended,
  ...tseslint.configs.strict,
  {
    files: ['tests/**/*.ts'],
    ...playwright.configs['flat/recommended'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/expect-expect': ['warn', { assertFunctionNames: ['expect*'] }],
      'playwright/no-skipped-test': ['error', { allowConditional: true }],
      'playwright/valid-test-tags': 'off',
    },
  },
  {
    files: ['src/fixtures/**/*.ts'],
    rules: {
      '@typescript-eslint/no-invalid-void-type': 'off',
      'no-empty-pattern': 'off',
    },
  },
  {
    files: ['scripts/**/*.mjs'],
    languageOptions: { globals: { process: 'readonly' } },
  },
  prettier,
);
