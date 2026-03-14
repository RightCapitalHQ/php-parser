import { Stmt } from '../stmt';

export class Declare_ extends Stmt {
  public declares: any[];
  public stmts: any[] | null;

  constructor(declares: any[], stmts: any[] | null = null, attributes: Record<string, any> = {}) {
    super(attributes);
    this.declares = declares;
    this.stmts = stmts;
  }

  getSubNodeNames(): string[] {
    return ['declares', 'stmts'];
  }

  getType(): string {
    return 'Stmt_Declare';
  }
}
