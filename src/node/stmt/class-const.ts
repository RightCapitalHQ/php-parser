import { Modifiers } from '../../modifiers';
import { Stmt } from '../stmt';

export class ClassConst extends Stmt {
  public flags: number;
  public consts: any[];
  public attrGroups: any[];
  public type: any | null;

  constructor(
    consts: any[],
    flags: number = 0,
    attributes: Record<string, any> = {},
    attrGroups: any[] = [],
    type: any | null = null
  ) {
    super(attributes);
    this.flags = flags;
    this.consts = consts;
    this.attrGroups = attrGroups;
    this.type = type;
  }

  getSubNodeNames(): string[] {
    return ['attrGroups', 'flags', 'type', 'consts'];
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

  isFinal(): boolean {
    return !!(this.flags & Modifiers.FINAL);
  }

  getType(): string {
    return 'Stmt_ClassConst';
  }
}
