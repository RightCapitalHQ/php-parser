import { Stmt } from '../stmt';

/**
 * @deprecated Use PropertyItem instead.
 */
export class PropertyProperty extends Stmt {
  public name: any;
  public default: any | null;

  constructor(name: any, defaultValue: any | null = null, attributes: Record<string, any> = {}) {
    super(attributes);
    this.name = typeof name === 'string' ? { name, toString: () => name, toLowerString: () => name.toLowerCase() } : name;
    this.default = defaultValue;
  }

  getSubNodeNames(): string[] {
    return ['name', 'default'];
  }

  getType(): string {
    return 'Stmt_PropertyProperty';
  }
}
