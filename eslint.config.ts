import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'semi': ['warn', 'always'], // Always require semicolons
      'quotes': ['warn', 'single', { avoidEscape: true }], // Prefer single quotes

      // Possible Problems
      'no-duplicate-imports': ['warn'],
      'no-template-curly-in-string': ['warn'],
      'require-atomic-updates': ['warn'],

      // Suggestions
      'arrow-body-style': ['warn', 'as-needed'],
      'block-scoped-var': ['warn'],
      'curly': ['warn'], // Always use curly braces in control statements
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
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/no-explicit-any': ['off'],
      '@typescript-eslint/no-empty-object-type': ['off'],
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: { globals: globals.browser },
  },
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    rules: {
      // Vue-Specific Rules
      'vue/multi-word-component-names': ['off'], // Disable multi-word component name rule for Vue files
      'vue/html-indent': ['warn', 2], // Enforce 2-space indent in templates
      'vue/singleline-html-element-content-newline': ['off'], // Don't enforce newlines for single-line HTML elements
      'vue/multiline-html-element-content-newline': ['warn'], // Require newlines for multi-line HTML elements
      'vue/max-attributes-per-line': [
        'warn',
        {
          singleline: 1, // One attribute per line for single-line elements
          multiline: 1, // One attribute per line for multi-line elements
        },
      ],
      'vue/require-default-prop': ['off'], // Disable required default props for Vue components
      'vue/no-multiple-template-root': ['off'], // Allow multiple root nodes in Vue templates
    },
  },
];
