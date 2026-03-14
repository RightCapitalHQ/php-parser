import { Stmt } from '../stmt';

export class Function_ extends Stmt {
  public byRef: boolean;
  public name: any;
  public params: any[];
  public returnType: any | null;
  public stmts: any[];
  public attrGroups: any[];
  public namespacedName: any | null = null;

  constructor(
    name: any,
    subNodes: {
      byRef?: boolean;
      params?: any[];
      returnType?: any | null;
      stmts?: any[];
      attrGroups?: any[];
    } = {},
    attributes: Record<string, any> = {}
  ) {
    super(attributes);
    this.byRef = subNodes.byRef ?? false;
    this.name = typeof name === 'string' ? { name, toString: () => name, toLowerString: () => name.toLowerCase() } : name;
    this.params = subNodes.params ?? [];
    this.returnType = subNodes.returnType ?? null;
    this.stmts = subNodes.stmts ?? [];
    this.attrGroups = subNodes.attrGroups ?? [];
  }

  getSubNodeNames(): string[] {
    return ['attrGroups', 'byRef', 'name', 'params', 'returnType', 'stmts'];
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

  getAttrGroups(): any[] {
    return this.attrGroups;
  }

  getStmts(): any[] {
    return this.stmts;
  }

  getType(): string {
    return 'Stmt_Function';
  }
}
