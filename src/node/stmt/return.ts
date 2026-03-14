import { Stmt } from '../stmt';

export class Return_ extends Stmt {
  public expr: any | null;

  constructor(expr: any | null = null, attributes: Record<string, any> = {}) {
    super(attributes);
    this.expr = expr;
  }

  getSubNodeNames(): string[] {
    return ['expr'];
  }

  getType(): string {
    return 'Stmt_Return';
  }
}
