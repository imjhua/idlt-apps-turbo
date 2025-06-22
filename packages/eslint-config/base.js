import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import turboPlugin from 'eslint-plugin-turbo'
import tseslint from 'typescript-eslint'
import onlyWarn from 'eslint-plugin-only-warn'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginReact from 'eslint-plugin-react'

// import stylistic from '@stylistic/eslint-plugin';
// import stylisticTs from '@stylistic/eslint-plugin-ts';
// import stylisticJs from '@stylistic/eslint-plugin-js';
// import stylisticJsx from '@stylistic/eslint-plugin-jsx';

export const OFF = 0
export const WARN = 1
export const ERROR = 2

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  pluginReact.configs.flat.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['dist/**'],
  },
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      'turbo/no-undeclared-env-vars': WARN,
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      // React scope no longer necessary with new JSX transform.
      'react/react-in-jsx-scope': 'off',
    },
  },
  // {
  //   plugins: {
  //     '@stylistic': stylistic,
  //   },
  //   rules: {
  //     '@stylistic/comma-spacing': ERROR,
  //     '@stylistic/indent': [ERROR, 2],
  //     '@stylistic/object-curly-spacing': [ERROR, 'always'],
  //     '@stylistic/jsx-first-prop-new-line': ERROR,
  //     '@stylistic/space-before-blocks': ERROR,
  //   },
  // },
  // {
  //   plugins: {
  //     '@stylistic/ts': stylisticTs,
  //   },
  //   rules: {
  //     '@stylistic/ts/type-annotation-spacing': ERROR,
  //   },
  // },
  // {
  //   plugins: {
  //     '@stylistic/jsx': stylisticJsx,
  //   },
  //   rules: {
  //     '@stylistic/jsx/jsx-tag-spacing': ERROR,
  //     '@stylistic/jsx/jsx-closing-bracket-location': [ERROR, 'line-aligned'],
  //     '@stylistic/jsx/jsx-closing-tag-location': [ERROR, 'line-aligned'],
  //     '@stylistic/jsx/jsx-newline': [WARN, { prevent: true }],
  //     '@stylistic/jsx/jsx-curly-spacing': ERROR,
  //     '@stylistic/jsx/jsx-wrap-multilines': [
  //       WARN,
  //       {
  //         declaration: 'parens-new-line',
  //         assignment: 'parens-new-line',
  //         return: 'parens-new-line',
  //         arrow: 'parens-new-line',
  //         condition: 'parens',
  //         logical: 'parens',
  //         prop: 'parens',
  //         propertyValue: 'parens',
  //       },
  //     ],
  //   },
  // },
  // {
  //   plugins: {
  //     '@stylistic/js': stylisticJs,
  //   },
  //   rules: {
  //     '@stylistic/js/jsx-quotes': [ERROR, 'prefer-double'],
  //     '@stylistic/js/quotes': [ERROR, 'single'],
  //     '@stylistic/js/no-multi-spaces': ERROR,
  //     '@stylistic/js/brace-style': ERROR,
  //     '@stylistic/js/no-trailing-spaces': ERROR,
  //     '@stylistic/js/array-element-newline': [ERROR, { consistent: true }],
  //     '@stylistic/js/no-multiple-empty-lines': [
  //       WARN,
  //       {
  //         max: 1, // 코드 사이의 최대 연속 빈 줄 개수
  //         maxBOF: 0, // 파일 시작 부분의 최대 빈 줄 개수
  //         maxEOF: 0, // 파일 끝 부분의 최대 빈 줄 개수
  //       },
  //     ],
  //     '@stylistic/js/key-spacing': ERROR,
  //     '@stylistic/js/object-curly-newline': [
  //       ERROR,
  //       { ObjectExpression: { multiline: true, minProperties: 4 } },
  //     ],
  //   },
  // },
  // {
  //   rules: {
  //     'react/jsx-curly-brace-presence': ERROR,
  //     curly: ERROR,
  //     'arrow-spacing': ERROR,
  //     'space-infix-ops': ERROR,
  //   },
  // },
]
