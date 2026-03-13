import { NodeAbstract } from '../node';

export class VariadicPlaceholder extends NodeAbstract {
  constructor(attributes: Record<string, any> = {}) {
    super(attributes);
  }

  getSubNodeNames(): string[] {
    return [];
  }

  getType(): string {
    return 'VariadicPlaceholder';
  }
}
