import { Stmt } from '../stmt';

export class Continue_ extends Stmt {
  public num: any | null;

  constructor(num: any | null = null, attributes: Record<string, any> = {}) {
    super(attributes);
    this.num = num;
  }

  getSubNodeNames(): string[] {
    return ['num'];
  }

  getType(): string {
    return 'Stmt_Continue';
  }
}
