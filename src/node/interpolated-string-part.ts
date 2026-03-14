import { NodeAbstract } from '../node';

export class InterpolatedStringPart extends NodeAbstract {
  public value: string;

  constructor(value: string, attributes: Record<string, any> = {}) {
    super(attributes);
    this.value = value;
  }

  getSubNodeNames(): string[] {
    return ['value'];
  }

  getType(): string {
    return 'InterpolatedStringPart';
  }
}
