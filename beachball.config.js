// @ts-check
/** @type {import('beachball').BeachballConfig} */
module.exports = {
  registry: 'https://registry.npmjs.org',
  ignorePatterns: [
    '.*ignore',
    'prettier.config.cjs',
    '.eslintrc.cjs',
    'jest.*.js',
    '.pnpm-store/**',
    '.vscode/**',
    'pnpm-lock.yaml',
  ],
  changelog: {
    customRenderers: {
      renderHeader() {},
      renderChangeTypeHeader(changeType, renderInfo) {
        const changelogDate = renderInfo.newVersionChangelog.date
          .toLocaleDateString('zh-CN')
          .replace(/\//g, '-');
        const heading =
          changeType === 'major' || changeType === 'minor' ? '##' : '###';
        return `${heading} [${renderInfo.newVersionChangelog.version}](https://github.com/RightCapitalHQ/php-parser/tree/${renderInfo.newVersionChangelog.tag}) (${changelogDate})`;
      },
      renderEntry(entry) {
        if (entry.author === 'beachball') {
          return `- ${entry.comment}`;
        }
        return `- ${entry.comment} ([${entry.commit.substring(
          0,
          7,
        )}](https://github.com/RightCapitalHQ/php-parser/commit/${
          entry.commit
        }))`;
      },
    },
  },
};
