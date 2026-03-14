import { Stmt } from '../stmt';

export class Switch_ extends Stmt {
  public cond: any;
  public cases: any[];

  constructor(cond: any, cases: any[], attributes: Record<string, any> = {}) {
    super(attributes);
    this.cond = cond;
    this.cases = cases;
  }

  getSubNodeNames(): string[] {
    return ['cond', 'cases'];
  }

  getType(): string {
    return 'Stmt_Switch';
  }
}
