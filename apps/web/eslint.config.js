import { ERROR } from '@repo/eslint-config/base';
import { nextJsConfig } from '@repo/eslint-config/next-js';
import pluginQuery from '@tanstack/eslint-plugin-query';

export default [
  {
    plugins: { '@tanstack/query': pluginQuery },
    rules: { '@tanstack/query/exhaustive-deps': ERROR },
  },
  ...nextJsConfig,
];
