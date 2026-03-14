import { Stmt } from '../stmt';

export class Catch_ extends Stmt {
  public types: any[];
  public var: any | null;
  public stmts: any[];

  constructor(
    types: any[],
    varNode: any | null = null,
    stmts: any[] = [],
    attributes: Record<string, any> = {}
  ) {
    super(attributes);
    this.types = types;
    this.var = varNode;
    this.stmts = stmts;
  }

  getSubNodeNames(): string[] {
    return ['types', 'var', 'stmts'];
  }

  getType(): string {
    return 'Stmt_Catch';
  }
}
