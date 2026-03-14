import { Stmt } from '../stmt';

export class Case_ extends Stmt {
  public cond: any | null;
  public stmts: any[];

  constructor(cond: any | null, stmts: any[] = [], attributes: Record<string, any> = {}) {
    super(attributes);
    this.cond = cond;
    this.stmts = stmts;
  }

  getSubNodeNames(): string[] {
    return ['cond', 'stmts'];
  }

  getType(): string {
    return 'Stmt_Case';
  }
}
