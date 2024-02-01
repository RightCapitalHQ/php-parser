import { execSync } from 'child_process';
import * as fs from 'fs';
import { tmpdir } from 'os';
import { resolve } from 'path';
import { PROJECT_ROOT } from '../../constants';
import type { NodeTypeInheritingFromNodeAbstract } from '../types/types';

const PHP_PARSER_BINARY = resolve(PROJECT_ROOT, 'vendor', 'bin', 'php-parse');
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
        encoding: 'utf-8',
        maxBuffer: MAX_BUFFER_SIZE_FOR_PHP_BINARY_OUTPUT,
        stdio: ['pipe', 'pipe', 'ignore'],
      },
    );
    return JSON.parse(
      parserOutputString,
    ) as NodeTypeInheritingFromNodeAbstract[];
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
    const temporaryFilename = resolve(
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
