import { Stmt } from '../stmt';

export class If_ extends Stmt {
  public cond: any;
  public stmts: any[];
  public elseifs: any[];
  public else: any | null;

  constructor(
    cond: any,
    subNodes: {
      stmts?: any[];
      elseifs?: any[];
      else?: any | null;
    } = {},
    attributes: Record<string, any> = {}
  ) {
    super(attributes);
    this.cond = cond;
    this.stmts = subNodes.stmts ?? [];
    this.elseifs = subNodes.elseifs ?? [];
    this.else = subNodes.else ?? null;
  }

  getSubNodeNames(): string[] {
    return ['cond', 'stmts', 'elseifs', 'else'];
  }

  getType(): string {
    return 'Stmt_If';
  }
}
