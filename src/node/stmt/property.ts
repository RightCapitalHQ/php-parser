import { Modifiers } from '../../modifiers';
import { Stmt } from '../stmt';

export class Property extends Stmt {
  public flags: number;
  public props: any[];
  public type: any | null;
  public attrGroups: any[];
  public hooks: any[];

  constructor(
    flags: number,
    props: any[],
    attributes: Record<string, any> = {},
    type: any | null = null,
    attrGroups: any[] = [],
    hooks: any[] = []
  ) {
    super(attributes);
    this.flags = flags;
    this.props = props;
    this.type = type;
    this.attrGroups = attrGroups;
    this.hooks = hooks;
  }

  getSubNodeNames(): string[] {
    return ['attrGroups', 'flags', 'type', 'props', 'hooks'];
  }

  isPublic(): boolean {
    return (this.flags & Modifiers.PUBLIC) !== 0 || (this.flags & Modifiers.VISIBILITY_MASK) === 0;
  }

  isProtected(): boolean {
    return !!(this.flags & Modifiers.PROTECTED);
  }

  isPrivate(): boolean {
    return !!(this.flags & Modifiers.PRIVATE);
  }

  isStatic(): boolean {
    return !!(this.flags & Modifiers.STATIC);
  }

  isReadonly(): boolean {
    return !!(this.flags & Modifiers.READONLY);
  }

  isAbstract(): boolean {
    return !!(this.flags & Modifiers.ABSTRACT);
  }

  isFinal(): boolean {
    return !!(this.flags & Modifiers.FINAL);
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

  getType(): string {
    return 'Stmt_Property';
  }
}
