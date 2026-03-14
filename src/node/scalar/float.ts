import { Scalar } from '../scalar';

export class Float_ extends Scalar {
  public value: number;

  constructor(value: number, attributes: Record<string, any> = {}) {
    super(attributes);
    this.value = value;
  }

  getSubNodeNames(): string[] {
    return ['value'];
  }

  static fromString(str: string, attributes: Record<string, any> = {}): Float_ {
    attributes['rawValue'] = str;
    const float = Float_.parse(str);
    return new Float_(float, attributes);
  }

  static parse(str: string): number {
    str = str.replace(/_/g, '');

    if (str[0] === '0' && str.length > 1) {
      if (str[1] === 'x' || str[1] === 'X') {
        return parseInt(str, 16);
      }
      if (str[1] === 'b' || str[1] === 'B') {
        return parseInt(str.substring(2), 2);
      }
      if (str[1] === 'o' || str[1] === 'O') {
        return parseInt(str.substring(2), 8);
      }
      if (!/[.eE]/.test(str)) {
        const valid = str.substring(0, str.search(/[89]/) === -1 ? str.length : str.search(/[89]/));
        return parseInt(valid, 8);
      }
    }

    return parseFloat(str);
  }

  getType(): string {
    return 'Scalar_Float';
  }
}
