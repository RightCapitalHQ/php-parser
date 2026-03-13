import { Stmt } from '../stmt';

export class ElseIf_ extends Stmt {
  public cond: any;
  public stmts: any[];

  constructor(cond: any, stmts: any[] = [], attributes: Record<string, any> = {}) {
    super(attributes);
    this.cond = cond;
    this.stmts = stmts;
  }

  getSubNodeNames(): string[] {
    return ['cond', 'stmts'];
  }

  getType(): string {
    return 'Stmt_ElseIf';
  }
}
