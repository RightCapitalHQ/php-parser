import { Stmt } from '../stmt';

export class HaltCompiler extends Stmt {
  public remaining: string;

  constructor(remaining: string, attributes: Record<string, any> = {}) {
    super(attributes);
    this.remaining = remaining;
  }

  getSubNodeNames(): string[] {
    return ['remaining'];
  }

  getType(): string {
    return 'Stmt_HaltCompiler';
  }
}
