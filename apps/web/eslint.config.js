import { ERROR, WARN } from '@repo/eslint-config/base'
import { nextJsConfig } from '@repo/eslint-config/next-js'
import pluginQuery from '@tanstack/eslint-plugin-query'
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort'

export default [
  {
    plugins: { '@tanstack/query': pluginQuery },
    rules: { '@tanstack/query/exhaustive-deps': ERROR },
  },
  ...nextJsConfig,
  {
    plugins: {
      'simple-import-sort': pluginSimpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': WARN,
      'simple-import-sort/exports': WARN,
    },
  },
]
