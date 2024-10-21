import eslintConfigRightcapital from '@rightcapital/eslint-config';

const { config } = eslintConfigRightcapital.utils;

export default config(
  {
    ignores: [
      'src/php-parser/types/node',
      'src/php-parser/types/types.ts',
      'dist',
    ],
  },
  ...eslintConfigRightcapital.configs.recommended,
);
