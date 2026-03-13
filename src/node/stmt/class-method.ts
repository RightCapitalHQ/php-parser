import { Modifiers } from '../../modifiers';
import { Stmt } from '../stmt';

const MAGIC_NAMES: Record<string, boolean> = {
  '__construct': true,
  '__destruct': true,
  '__call': true,
  '__callstatic': true,
  '__get': true,
  '__set': true,
  '__isset': true,
  '__unset': true,
  '__sleep': true,
  '__wakeup': true,
  '__tostring': true,
  '__set_state': true,
  '__clone': true,
  '__invoke': true,
  '__debuginfo': true,
  '__serialize': true,
  '__unserialize': true,
};

export class ClassMethod extends Stmt {
  public flags: number;
  public byRef: boolean;
  public name: any;
  public params: any[];
  public returnType: any | null;
  public stmts: any[] | null;
  public attrGroups: any[];

  constructor(
    name: any,
    subNodes: {
      flags?: number;
      byRef?: boolean;
      params?: any[];
      returnType?: any | null;
      stmts?: any[] | null;
      attrGroups?: any[];
    } = {},
    attributes: Record<string, any> = {}
  ) {
    super(attributes);
    this.flags = subNodes.flags ?? 0;
    this.byRef = subNodes.byRef ?? false;
    this.name = typeof name === 'string' ? { name, toString: () => name, toLowerString: () => name.toLowerCase() } : name;
    this.params = subNodes.params ?? [];
    this.returnType = subNodes.returnType ?? null;
    this.stmts = 'stmts' in subNodes ? subNodes.stmts ?? null : [];
    this.attrGroups = subNodes.attrGroups ?? [];
  }

  getSubNodeNames(): string[] {
    return ['attrGroups', 'flags', 'byRef', 'name', 'params', 'returnType', 'stmts'];
  }

  returnsByRef(): boolean {
    return this.byRef;
  }

  getParams(): any[] {
    return this.params;
  }

  getReturnType(): any | null {
    return this.returnType;
  }

  getStmts(): any[] | null {
    return this.stmts;
  }

  getAttrGroups(): any[] {
    return this.attrGroups;
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

  isAbstract(): boolean {
    return !!(this.flags & Modifiers.ABSTRACT);
  }

  isFinal(): boolean {
    return !!(this.flags & Modifiers.FINAL);
  }

  isStatic(): boolean {
    return !!(this.flags & Modifiers.STATIC);
  }

  isMagic(): boolean {
    return !!MAGIC_NAMES[this.name.toLowerString()];
  }

  getType(): string {
    return 'Stmt_ClassMethod';
  }
}
