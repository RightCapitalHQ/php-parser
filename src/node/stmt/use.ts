import { Stmt } from '../stmt';

export class Use_ extends Stmt {
  public static readonly TYPE_UNKNOWN = 0;
  public static readonly TYPE_NORMAL = 1;
  public static readonly TYPE_FUNCTION = 2;
  public static readonly TYPE_CONSTANT = 3;

  public type: number;
  public uses: any[];

  constructor(uses: any[], type: number = Use_.TYPE_NORMAL, attributes: Record<string, any> = {}) {
    super(attributes);
    this.type = type;
    this.uses = uses;
  }

  getSubNodeNames(): string[] {
    return ['type', 'uses'];
  }

  getType(): string {
    return 'Stmt_Use';
  }
}
