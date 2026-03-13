import { Stmt } from '../stmt';

export class InlineHTML extends Stmt {
  public value: string;

  constructor(value: string, attributes: Record<string, any> = {}) {
    super(attributes);
    this.value = value;
  }

  getSubNodeNames(): string[] {
    return ['value'];
  }

  getType(): string {
    return 'Stmt_InlineHTML';
  }
}
