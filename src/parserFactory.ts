import { Parser } from './parser';
import { Php8Parser } from './parser/php8';
import { PhpVersion } from './phpVersion';
import { Lexer } from './lexer';

export class ParserFactory {
  createForVersion(version: PhpVersion): Parser {
    const lexer = new Lexer();
    return new Php8Parser(lexer, version);
  }

  createForNewestSupportedVersion(): Parser {
    return this.createForVersion(PhpVersion.getNewestSupported());
  }

  createForHostVersion(): Parser {
    return this.createForVersion(PhpVersion.getHostVersion());
  }
}
