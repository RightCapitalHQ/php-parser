import { execSync } from 'child_process';
import { resolve } from 'path';
import { PROJECT_ROOT } from '../../constants';
import { NodeTypeInheritingFromNodeAbstract } from '../types/types';

const PHP_PARSER_BINARY = resolve(PROJECT_ROOT, 'vendor', 'bin', 'php-parse');
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
    // Avoid ENOBUFS for large output, increase buffer size to 50m
    // https://stackoverflow.com/questions/46818563/buffer-returned-by-child-process-execsync-is-incomplete/51408070
    const parserOutputString = execSync(
      `${PHP_PARSER_BINARY} ${phpFilePath} -j`,
      { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 },
    );
    return JSON.parse(
      parserOutputString,
    ) as NodeTypeInheritingFromNodeAbstract[];
  }
}
