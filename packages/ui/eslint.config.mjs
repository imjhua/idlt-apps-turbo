import { OFF } from '@repo/eslint-config/base'
import { config } from '@repo/eslint-config/react-internal'

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    rules: {
      // indent: OFF,
      'react/prop-types': OFF,
      'react/no-unknown-property': OFF,
      //     'simple-import-sort/imports': OFF,
      //     'simple-import-sort/exports': OFF,
      //     '@stylistic/indent': OFF,
      //     '@stylistic/curly-newline': OFF,
      //     '@stylistic/jsx-first-prop-new-line': OFF,
      //     '@stylistic/js/quotes': [ERROR, 'double'],
      //     '@stylistic/js/simple-import-sort/imports': OFF,
      //     '@stylistic/ts/member-delimiter-style': OFF,
      //     '@stylistic/js/object-curly-spacing': OFF,
      //     '@stylistic/js/object-curly-newline': OFF,
      //     '@stylistic/jsx/jsx-curly-spacing': OFF,
    },
  },
]
