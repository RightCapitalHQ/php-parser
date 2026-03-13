import { Stmt } from '../stmt';

/**
 * @deprecated Use DeclareItem instead.
 */
export class DeclareDeclare extends Stmt {
  public key: any;
  public value: any;

  constructor(key: any, value: any, attributes: Record<string, any> = {}) {
    super(attributes);
    this.key = key;
    this.value = value;
  }

  getSubNodeNames(): string[] {
    return ['key', 'value'];
  }

  getType(): string {
    return 'Stmt_DeclareDeclare';
  }
}
