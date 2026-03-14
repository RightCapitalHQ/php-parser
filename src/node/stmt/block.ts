import { Stmt } from '../stmt';

export class Block extends Stmt {
  public stmts: any[];

  constructor(stmts: any[], attributes: Record<string, any> = {}) {
    super(attributes);
    this.stmts = stmts;
  }

  getSubNodeNames(): string[] {
    return ['stmts'];
  }

  getType(): string {
    return 'Stmt_Block';
  }
}
