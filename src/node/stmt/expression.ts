import { Stmt } from '../stmt';

export class Expression extends Stmt {
  public expr: any;

  constructor(expr: any, attributes: Record<string, any> = {}) {
    super(attributes);
    this.expr = expr;
  }

  getSubNodeNames(): string[] {
    return ['expr'];
  }

  getType(): string {
    return 'Stmt_Expression';
  }
}
