import { Stmt } from '../stmt';

export class Do_ extends Stmt {
  public stmts: any[];
  public cond: any;

  constructor(cond: any, stmts: any[] = [], attributes: Record<string, any> = {}) {
    super(attributes);
    this.cond = cond;
    this.stmts = stmts;
  }

  getSubNodeNames(): string[] {
    return ['stmts', 'cond'];
  }

  getType(): string {
    return 'Stmt_Do';
  }
}
