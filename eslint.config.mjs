import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import prettierConfig from 'eslint-config-prettier';

const eslintConfig = [
  ...nextCoreWebVitals,
  prettierConfig,
  {
    rules: {
      'prefer-const': 'error',
      'no-var': 'error',
      'no-console': 'warn',
    },
  },
];

export default eslintConfig;
