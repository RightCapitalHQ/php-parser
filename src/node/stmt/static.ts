import { Stmt } from '../stmt';

export class Static_ extends Stmt {
  public vars: any[];

  constructor(vars: any[], attributes: Record<string, any> = {}) {
    super(attributes);
    this.vars = vars;
  }

  getSubNodeNames(): string[] {
    return ['vars'];
  }

  getType(): string {
    return 'Stmt_Static';
  }
}
