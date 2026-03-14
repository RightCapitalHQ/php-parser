import { Scalar } from '../scalar';
import { PhpParserError } from '../../error';

export class String_ extends Scalar {
  static readonly KIND_SINGLE_QUOTED = 1;
  static readonly KIND_DOUBLE_QUOTED = 2;
  static readonly KIND_HEREDOC = 3;
  static readonly KIND_NOWDOC = 4;

  public value: string;

  private static replacements: Record<string, string> = {
    '\\': '\\',
    '$': '$',
    'n': '\n',
    'r': '\r',
    't': '\t',
    'f': '\f',
    'v': '\v',
    'e': '\x1B',
  };

  constructor(value: string, attributes: Record<string, any> = {}) {
    super(attributes);
    this.value = value;
  }

  getSubNodeNames(): string[] {
    return ['value'];
  }

  static fromString(str: string, attributes: Record<string, any> = {}, parseUnicodeEscape: boolean = true): String_ {
    attributes['kind'] = (str[0] === "'" || (str[1] === "'" && (str[0] === 'b' || str[0] === 'B')))
      ? String_.KIND_SINGLE_QUOTED
      : String_.KIND_DOUBLE_QUOTED;
    attributes['rawValue'] = str;
    const string = String_.parse(str, parseUnicodeEscape);
    return new String_(string, attributes);
  }

  static parse(str: string, parseUnicodeEscape: boolean = true): string {
    let bLength = 0;
    if (str[0] === 'b' || str[0] === 'B') {
      bLength = 1;
    }

    if (str[bLength] === "'") {
      return str.substring(bLength + 1, str.length - 1)
        .replace(/\\\\/g, '\\')
        .replace(/\\'/g, "'");
    } else {
      return String_.parseEscapeSequences(
        str.substring(bLength + 1, str.length - 1), '"', parseUnicodeEscape
      );
    }
  }

  static parseEscapeSequences(str: string, quote: string | null, parseUnicodeEscape: boolean = true): string {
    if (quote !== null) {
      str = str.replace(new RegExp('\\\\' + escapeRegExp(quote), 'g'), quote);
    }

    let extra = '';
    if (parseUnicodeEscape) {
      extra = '|u\\{([0-9a-fA-F]+)\\}';
    }

    const regex = new RegExp('\\\\([\\\\$nrtfve]|[xX][0-9a-fA-F]{1,2}|[0-7]{1,3}' + extra + ')', 'g');

    return str.replace(regex, (match: string, p1: string, p2?: string) => {
      if (String_.replacements[p1] !== undefined) {
        return String_.replacements[p1];
      }
      if (p1[0] === 'x' || p1[0] === 'X') {
        return String.fromCharCode(parseInt(p1.substring(1), 16));
      }
      if (p1[0] === 'u' && p2 !== undefined) {
        const dec = parseInt(p2, 16);
        return codePointToUtf8(dec);
      }
      return String.fromCharCode(parseInt(p1, 8) & 255);
    });
  }

  getType(): string {
    return 'Scalar_String';
  }
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function codePointToUtf8(num: number): string {
  if (num > 0x10FFFF) {
    throw new PhpParserError('Invalid UTF-8 codepoint escape sequence: Codepoint too large');
  }
  return String.fromCodePoint(num);
}
