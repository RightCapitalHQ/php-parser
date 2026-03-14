import { Stmt } from '../stmt';

export class Foreach_ extends Stmt {
  public expr: any;
  public keyVar: any | null;
  public byRef: boolean;
  public valueVar: any;
  public stmts: any[];

  constructor(
    expr: any,
    valueVar: any,
    subNodes: {
      keyVar?: any | null;
      byRef?: boolean;
      stmts?: any[];
    } = {},
    attributes: Record<string, any> = {}
  ) {
    super(attributes);
    this.expr = expr;
    this.keyVar = subNodes.keyVar ?? null;
    this.byRef = subNodes.byRef ?? false;
    this.valueVar = valueVar;
    this.stmts = subNodes.stmts ?? [];
  }

  getSubNodeNames(): string[] {
    return ['expr', 'keyVar', 'byRef', 'valueVar', 'stmts'];
  }

  getType(): string {
    return 'Stmt_Foreach';
  }
}
