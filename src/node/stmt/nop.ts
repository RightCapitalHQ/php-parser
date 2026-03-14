import { Stmt } from '../stmt';

/** Nop/empty statement (;). */
export class Nop extends Stmt {
  getSubNodeNames(): string[] {
    return [];
  }

  getType(): string {
    return 'Stmt_Nop';
  }
}
