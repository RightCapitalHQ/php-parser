import { execFile, execSync } from 'node:child_process';
import * as fs from 'node:fs';
import { tmpdir } from 'node:os';
import * as path from 'node:path';

import { PROJECT_ROOT } from '../../constants';
import type { NodeTypeInheritingFromNodeAbstract } from '../types/types';

const defaultPhpParserBinaryPath = path.resolve(
  PROJECT_ROOT,
  'vendor',
  'bin',
  'php-parse',
);
const PHP_PARSER_BINARY =
  process.env.PHP_PARSER_BINARY_PATH || defaultPhpParserBinaryPath;

// Avoid ENOBUFS for large output, increase buffer size to 50m
// https://stackoverflow.com/questions/46818563/buffer-returned-by-child-process-execsync-is-incomplete/51408070
const MAX_BUFFER_SIZE_FOR_PHP_BINARY_OUTPUT = 10 * 1024 * 1024;

export class CliHelpers {
  /**
   * Using PHP version php phaser to Parse PHP File to AST
   *
   * @param phpFilePath The PHP file path to parse
   * @returns a AST in JSON format from php parser
   */
  public static parsePhpFileToAst(
    phpFilePath,
  ): NodeTypeInheritingFromNodeAbstract[] {
    const parserOutputString = execSync(
      `${PHP_PARSER_BINARY} ${phpFilePath} -j`,
      {
        encoding: 'utf8',
        maxBuffer: MAX_BUFFER_SIZE_FOR_PHP_BINARY_OUTPUT,
        stdio: ['pipe', 'pipe', 'ignore'],
      },
    );
    return JSON.parse(
      parserOutputString,
    ) as NodeTypeInheritingFromNodeAbstract[];
  }

  /**
   * Using PHP version php phaser to Parse PHP File to AST (Async version)
   *
   * @param phpFilePath The PHP file path to parse
   * @returns Promise resolving to an AST in JSON format from php parser
   */
  public static async parsePhpFileToAstAsync(
    phpFilePath: string,
  ): Promise<NodeTypeInheritingFromNodeAbstract[]> {
    return new Promise((resolve, reject) => {
      execFile(
        PHP_PARSER_BINARY,
        [phpFilePath, '-j'],
        {
          encoding: 'utf8',
          maxBuffer: MAX_BUFFER_SIZE_FOR_PHP_BINARY_OUTPUT,
        },
        (error, stdout) => {
          if (error) {
            reject(new Error(`Failed to parse PHP file: ${error.message}`));
            return;
          }

          try {
            const result = JSON.parse(
              stdout,
            ) as NodeTypeInheritingFromNodeAbstract[];
            resolve(result);
          } catch (parseError) {
            reject(
              new Error(
                `Failed to parse JSON output: ${parseError instanceof Error ? parseError.message : String(parseError)}`,
              ),
            );
          }
        },
      );
    });
  }

  /**
   * Parse a PHP Code string to AST in JSON format
   * Because we are invoking PHP parser to parse the string
   * We have to write String to a temporary file and parse it.
   *
   * @param code PHP Code to parse
   */
  public static parsePhpCodeStringToAst(
    code: string,
  ): NodeTypeInheritingFromNodeAbstract[] {
    const currentDate = new Date();
    /**
     * Temp file like "php-parser-{current time}.tmp" +
     */
    const temporaryFilename = path.resolve(
      tmpdir(),
      `${currentDate.getTime()}.${currentDate.getMilliseconds()}.tmp`,
    );

    fs.writeFileSync(temporaryFilename, code, 'utf8');
    try {
      return CliHelpers.parsePhpFileToAst(temporaryFilename);
    } finally {
      // Remove the temp file
      fs.rmSync(temporaryFilename);
    }
  }
}
