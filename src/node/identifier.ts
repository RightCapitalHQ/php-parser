import { NodeAbstract } from '../node';

export class Identifier extends NodeAbstract {
  public name: string;

  private static specialClassNames: Record<string, boolean> = {
    'self': true,
    'parent': true,
    'static': true,
  };

  constructor(name: string, attributes: Record<string, any> = {}) {
    super(attributes);
    if (name === '') {
      throw new Error('Identifier name cannot be empty');
    }
    this.name = name;
  }

  getSubNodeNames(): string[] {
    return ['name'];
  }

  toString(): string {
    return this.name;
  }

  toLowerString(): string {
    return this.name.toLowerCase();
  }

  isSpecialClassName(): boolean {
    return this.name.toLowerCase() in Identifier.specialClassNames;
  }

  getType(): string {
    return 'Identifier';
  }
}

export class VarLikeIdentifier extends Identifier {
  getType(): string {
    return 'VarLikeIdentifier';
  }
}
