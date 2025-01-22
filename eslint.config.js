import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    rules: {
      'semi': ['warn', 'always'], // Always require semicolons
      'quotes': ['warn', 'single', { avoidEscape: true }], // Prefer single quotes
      'indent': ['warn', 2], // Enforce 2-space tab width

      // Possible Problems
      'no-duplicate-imports': ['warn'],
      'no-template-curly-in-string': ['warn'],
      'require-atomic-updates': ['warn'],

      // Suggestions
      'arrow-body-style': ['warn', 'as-needed'],
      'block-scoped-var': ['warn'],
      'curly': ['warn'], // Always use curly braces in control statements
      'default-case': ['warn'], // Require a default case in switch statements
      'default-case-last': ['warn'], // Enforce default case to be the last
      'default-param-last': ['warn'],
      'eqeqeq': ['warn'], // Require strict equality (===)
      'func-style': ['warn', 'expression'],
      'grouped-accessor-pairs': ['warn', 'getBeforeSet'],
      'no-else-return': ['warn'],
      'no-empty-function': ['warn'],
      'no-lonely-if': ['warn'],
      'prefer-const': ['warn'],

      // TypeScript-Specific Rules
      '@typescript-eslint/explicit-function-return-type': ['warn'], // Require explicit return type for functions and methods
    }
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
