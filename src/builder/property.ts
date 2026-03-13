import { Property } from '../node/stmt/property';
import { PropertyItem } from '../node/property-item';
import { Modifiers } from '../modifiers';
import { Node } from '../node';
import { normalizeType } from './param';

export class PropertyBuilder {
  protected name: string;
  protected flags: number = 0;
  protected default_: Node | null = null;
  protected type: Node | null = null;
  protected attrGroups: any[] = [];

  constructor(name: string) {
    this.name = name;
  }

  makePublic(): this {
    this.flags = Modifiers.PUBLIC | (this.flags & ~Modifiers.VISIBILITY_MASK);
    return this;
  }

  makeProtected(): this {
    this.flags = Modifiers.PROTECTED | (this.flags & ~Modifiers.VISIBILITY_MASK);
    return this;
  }

  makePrivate(): this {
    this.flags = Modifiers.PRIVATE | (this.flags & ~Modifiers.VISIBILITY_MASK);
    return this;
  }

  makeStatic(): this {
    this.flags |= Modifiers.STATIC;
    return this;
  }

  makeReadonly(): this {
    this.flags |= Modifiers.READONLY;
    return this;
  }

  makeAbstract(): this {
    this.flags |= Modifiers.ABSTRACT;
    return this;
  }

  makeFinal(): this {
    this.flags |= Modifiers.FINAL;
    return this;
  }

  setDefault(value: Node): this {
    this.default_ = value;
    return this;
  }

  setType(type: string | Node): this {
    this.type = normalizeType(type);
    return this;
  }

  addAttribute(attrGroup: any): this {
    this.attrGroups.push(attrGroup);
    return this;
  }

  getNode(): Property {
    return new Property(
      this.flags,
      [new PropertyItem(this.name, this.default_)],
      {},
      this.type,
      this.attrGroups,
    );
  }
}
