import { NodeAbstract, Node } from '../node';
import { Modifiers } from '../modifiers';

export class Param extends NodeAbstract {
  public type: Node | null;
  public byRef: boolean;
  public variadic: boolean;
  public var: Node;
  public default: Node | null;
  public flags: number;
  public attrGroups: Node[];
  public hooks: Node[];

  constructor(
    varNode: Node,
    defaultValue: Node | null = null,
    type: Node | null = null,
    byRef: boolean = false,
    variadic: boolean = false,
    attributes: Record<string, any> = {},
    flags: number = 0,
    attrGroups: Node[] = [],
    hooks: Node[] = [],
  ) {
    super(attributes);
    this.type = type;
    this.byRef = byRef;
    this.variadic = variadic;
    this.var = varNode;
    this.default = defaultValue;
    this.flags = flags;
    this.attrGroups = attrGroups;
    this.hooks = hooks;
  }

  getSubNodeNames(): string[] {
    return ['attrGroups', 'flags', 'type', 'byRef', 'variadic', 'var', 'default', 'hooks'];
  }

  getType(): string {
    return 'Param';
  }

  isPromoted(): boolean {
    return this.flags !== 0 || this.hooks.length > 0;
  }

  isFinal(): boolean {
    return !!(this.flags & Modifiers.FINAL);
  }

  isPublic(): boolean {
    if (this.flags & Modifiers.PUBLIC) return true;
    if (!this.isPromoted()) return false;
    return (this.flags & Modifiers.VISIBILITY_MASK) === 0;
  }

  isProtected(): boolean {
    return !!(this.flags & Modifiers.PROTECTED);
  }

  isPrivate(): boolean {
    return !!(this.flags & Modifiers.PRIVATE);
  }

  isReadonly(): boolean {
    return !!(this.flags & Modifiers.READONLY);
  }

  isPublicSet(): boolean {
    return !!(this.flags & Modifiers.PUBLIC_SET);
  }

  isProtectedSet(): boolean {
    return !!(this.flags & Modifiers.PROTECTED_SET);
  }

  isPrivateSet(): boolean {
    return !!(this.flags & Modifiers.PRIVATE_SET);
  }
}
