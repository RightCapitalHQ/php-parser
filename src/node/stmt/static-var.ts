import { Stmt } from '../stmt';

/**
 * @deprecated Use Node\StaticVar instead.
 */
export class StaticVar extends Stmt {
  public var: any;
  public default: any | null;

  constructor(varNode: any, defaultValue: any | null = null, attributes: Record<string, any> = {}) {
    super(attributes);
    this.var = varNode;
    this.default = defaultValue;
  }

  getSubNodeNames(): string[] {
    return ['var', 'default'];
  }

  getType(): string {
    return 'Stmt_StaticVar';
  }
}
