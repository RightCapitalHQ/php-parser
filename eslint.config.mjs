import rcPreset from '@rightcapital/eslint-config';

const { config } = rcPreset.utils;

export default config(
  {
    ignores: [
      'src/php-parser/types/node',
      'src/php-parser/types/types.ts',
      'dist',
    ],
  },
  ...rcPreset.configs.recommended,
);
