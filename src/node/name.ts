import { NodeAbstract } from '../node';

export class Name extends NodeAbstract {
  public name: string;

  private static specialClassNames: Record<string, boolean> = {
    'self': true,
    'parent': true,
    'static': true,
  };

  constructor(name: string | string[] | Name, attributes: Record<string, any> = {}) {
    super(attributes);
    this.name = Name.prepareName(name);
  }

  getSubNodeNames(): string[] {
    return ['name'];
  }

  getParts(): string[] {
    return this.name.split('\\');
  }

  getFirst(): string {
    const pos = this.name.indexOf('\\');
    if (pos !== -1) {
      return this.name.substring(0, pos);
    }
    return this.name;
  }

  getLast(): string {
    const pos = this.name.lastIndexOf('\\');
    if (pos !== -1) {
      return this.name.substring(pos + 1);
    }
    return this.name;
  }

  isUnqualified(): boolean {
    return !this.name.includes('\\');
  }

  isQualified(): boolean {
    return this.name.includes('\\');
  }

  isFullyQualified(): boolean {
    return false;
  }

  isRelative(): boolean {
    return false;
  }

  toString(): string {
    return this.name;
  }

  toCodeString(): string {
    return this.toString();
  }

  toLowerString(): string {
    return this.name.toLowerCase();
  }

  isSpecialClassName(): boolean {
    return this.name.toLowerCase() in Name.specialClassNames;
  }

  slice(offset: number, length: number | null = null): Name | null {
    const parts = this.name.split('\\');
    const numParts = parts.length;

    const realOffset = offset < 0 ? offset + numParts : offset;
    if (realOffset < 0 || realOffset > numParts) {
      throw new RangeError(`Offset ${offset} is out of bounds`);
    }

    let realLength: number;
    if (length === null) {
      realLength = numParts - realOffset;
    } else {
      realLength = length < 0 ? length + numParts - realOffset : length;
      if (realLength < 0 || realLength > numParts - realOffset) {
        throw new RangeError(`Length ${length} is out of bounds`);
      }
    }

    if (realLength === 0) {
      return null;
    }

    return new (this.constructor as typeof Name)(
      parts.slice(realOffset, realOffset + realLength),
      this.attributes
    );
  }

  static concat(
    name1: string | string[] | Name | null,
    name2: string | string[] | Name | null,
    attributes: Record<string, any> = {}
  ): Name | null {
    if (name1 === null && name2 === null) {
      return null;
    }
    if (name1 === null) {
      return new Name(name2!, attributes);
    }
    if (name2 === null) {
      return new Name(name1, attributes);
    }
    return new Name(
      Name.prepareName(name1) + '\\' + Name.prepareName(name2),
      attributes
    );
  }

  private static prepareName(name: string | string[] | Name): string {
    if (typeof name === 'string') {
      if (name === '') {
        throw new Error('Name cannot be empty');
      }
      return name;
    }
    if (Array.isArray(name)) {
      if (name.length === 0) {
        throw new Error('Name cannot be empty');
      }
      return name.join('\\');
    }
    if (name instanceof Name) {
      return name.name;
    }
    throw new Error('Expected string, array of parts or Name instance');
  }

  getType(): string {
    return 'Name';
  }
}

export class FullyQualified extends Name {
  isUnqualified(): boolean { return false; }
  isQualified(): boolean { return false; }
  isFullyQualified(): boolean { return true; }
  isRelative(): boolean { return false; }

  toCodeString(): string {
    return '\\' + this.toString();
  }

  getType(): string {
    return 'Name_FullyQualified';
  }
}

export class Relative extends Name {
  isUnqualified(): boolean { return false; }
  isQualified(): boolean { return false; }
  isFullyQualified(): boolean { return false; }
  isRelative(): boolean { return true; }

  toCodeString(): string {
    return 'namespace\\' + this.toString();
  }

  getType(): string {
    return 'Name_Relative';
  }
}
