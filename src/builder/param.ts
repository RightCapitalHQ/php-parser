import { Param } from '../node/param';
import { Variable } from '../node/expr/variable';
import { Identifier } from '../node/identifier';
import { Name } from '../node/name';
import { Modifiers } from '../modifiers';
import { Node } from '../node';

export class ParamBuilder {
  protected name: string;
  protected default_: Node | null = null;
  protected type: Node | null = null;
  protected byRef: boolean = false;
  protected variadic: boolean = false;
  protected flags: number = 0;
  protected attrGroups: Node[] = [];

  constructor(name: string) {
    this.name = name;
  }

  setDefault(value: Node): this {
    this.default_ = value;
    return this;
  }

  setType(type: string | Name | Identifier | Node): this {
    this.type = normalizeType(type);
    return this;
  }

  makeByRef(): this {
    this.byRef = true;
    return this;
  }

  makeVariadic(): this {
    this.variadic = true;
    return this;
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

  makeReadonly(): this {
    this.flags |= Modifiers.READONLY;
    return this;
  }

  addAttribute(attrGroup: Node): this {
    this.attrGroups.push(attrGroup);
    return this;
  }

  getNode(): Param {
    return new Param(
      new Variable(this.name),
      this.default_,
      this.type,
      this.byRef,
      this.variadic,
      {},
      this.flags,
      this.attrGroups,
    );
  }
}

export function normalizeType(type: string | Name | Identifier | Node): Node {
  if (typeof type === 'string') {
    const builtinTypes = [
      'array', 'callable', 'bool', 'float', 'int', 'string',
      'iterable', 'void', 'object', 'null', 'false', 'true',
      'never', 'mixed',
    ];
    const lower = type.toLowerCase();
    if (builtinTypes.includes(lower)) {
      return new Identifier(lower);
    }
    return new Name(type);
  }
  return type as Node;
}
