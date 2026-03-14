import { Stmt } from '../stmt';

export class TryCatch extends Stmt {
  public stmts: any[];
  public catches: any[];
  public finally: any | null;

  constructor(
    stmts: any[],
    catches: any[],
    finallyNode: any | null = null,
    attributes: Record<string, any> = {}
  ) {
    super(attributes);
    this.stmts = stmts;
    this.catches = catches;
    this.finally = finallyNode;
  }

  getSubNodeNames(): string[] {
    return ['stmts', 'catches', 'finally'];
  }

  getType(): string {
    return 'Stmt_TryCatch';
  }
}
