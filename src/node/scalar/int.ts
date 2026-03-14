import { Scalar } from '../scalar';
import { PhpParserError } from '../../error';

export class Int_ extends Scalar {
  static readonly KIND_BIN = 2;
  static readonly KIND_OCT = 8;
  static readonly KIND_DEC = 10;
  static readonly KIND_HEX = 16;

  public value: number;

  constructor(value: number, attributes: Record<string, any> = {}) {
    super(attributes);
    this.value = value;
  }

  getSubNodeNames(): string[] {
    return ['value'];
  }

  static fromString(str: string, attributes: Record<string, any> = {}, allowInvalidOctal: boolean = false): Int_ {
    attributes['rawValue'] = str;
    str = str.replace(/_/g, '');

    if (str[0] !== '0' || str === '0') {
      attributes['kind'] = Int_.KIND_DEC;
      return new Int_(parseInt(str, 10), attributes);
    }

    if (str[1] === 'x' || str[1] === 'X') {
      attributes['kind'] = Int_.KIND_HEX;
      return new Int_(parseInt(str, 16), attributes);
    }

    if (str[1] === 'b' || str[1] === 'B') {
      attributes['kind'] = Int_.KIND_BIN;
      return new Int_(parseInt(str.substring(2), 2), attributes);
    }

    if (!allowInvalidOctal && /[89]/.test(str)) {
      throw new PhpParserError('Invalid numeric literal', attributes);
    }

    if (str[1] === 'o' || str[1] === 'O') {
      str = str.substring(2);
    }

    attributes['kind'] = Int_.KIND_OCT;
    return new Int_(parseInt(str, 8), attributes);
  }

  getType(): string {
    return 'Scalar_Int';
  }
}
