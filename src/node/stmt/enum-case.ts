import { Stmt } from '../stmt';

export class EnumCase extends Stmt {
  public name: any;
  public expr: any | null;
  public attrGroups: any[];

  constructor(
    name: any,
    expr: any | null = null,
    attrGroups: any[] = [],
    attributes: Record<string, any> = {}
  ) {
    super(attributes);
    this.name = typeof name === 'string' ? { name, toString: () => name, toLowerString: () => name.toLowerCase() } : name;
    this.expr = expr;
    this.attrGroups = attrGroups;
  }

  getSubNodeNames(): string[] {
    return ['attrGroups', 'name', 'expr'];
  }

  getType(): string {
    return 'Stmt_EnumCase';
  }
}
