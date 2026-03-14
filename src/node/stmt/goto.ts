import { Stmt } from '../stmt';

export class Goto_ extends Stmt {
  public name: any;

  constructor(name: any, attributes: Record<string, any> = {}) {
    super(attributes);
    this.name = typeof name === 'string' ? { name, toString: () => name, toLowerString: () => name.toLowerCase() } : name;
  }

  getSubNodeNames(): string[] {
    return ['name'];
  }

  getType(): string {
    return 'Stmt_Goto';
  }
}
