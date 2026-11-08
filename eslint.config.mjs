import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig(
  {
    ignores: ['dist/', 'node_modules/', '.husky/'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,ts}'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'error',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'prefer-template': 'error',
      'prefer-arrow-callback': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-unused-vars': 'off',
      eqeqeq: ['error', 'always'],
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
  },
  eslintConfigPrettier,
);
