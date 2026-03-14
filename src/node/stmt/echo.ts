import { Stmt } from '../stmt';

export class Echo_ extends Stmt {
  public exprs: any[];

  constructor(exprs: any[], attributes: Record<string, any> = {}) {
    super(attributes);
    this.exprs = exprs;
  }

  getSubNodeNames(): string[] {
    return ['exprs'];
  }

  getType(): string {
    return 'Stmt_Echo';
  }
}
