import { ClassConst } from '../node/stmt/class-const';
import { Const_ } from '../node/const';
import { Modifiers } from '../modifiers';
import { Node } from '../node';

export class ClassConstBuilder {
  protected name: string;
  protected value: Node;
  protected flags: number = 0;
  protected attrGroups: any[] = [];
  protected type: Node | null = null;

  constructor(name: string, value: Node) {
    this.name = name;
    this.value = value;
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

  makeFinal(): this {
    this.flags |= Modifiers.FINAL;
    return this;
  }

  setType(type: Node): this {
    this.type = type;
    return this;
  }

  addAttribute(attrGroup: any): this {
    this.attrGroups.push(attrGroup);
    return this;
  }

  getNode(): ClassConst {
    return new ClassConst(
      [new Const_(this.name, this.value)],
      this.flags,
      {},
      this.attrGroups,
      this.type,
    );
  }
}
