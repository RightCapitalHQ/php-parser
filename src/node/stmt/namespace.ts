import { Stmt } from '../stmt';

export class Namespace_ extends Stmt {
  public static readonly KIND_SEMICOLON = 1;
  public static readonly KIND_BRACED = 2;

  public name: any | null;
  public stmts: any[] | null;

  constructor(
    name: any | null = null,
    stmts: any[] | null = [],
    attributes: Record<string, any> = {}
  ) {
    super(attributes);
    this.name = name;
    this.stmts = stmts;
  }

  getSubNodeNames(): string[] {
    return ['name', 'stmts'];
  }

  getType(): string {
    return 'Stmt_Namespace';
  }
}
