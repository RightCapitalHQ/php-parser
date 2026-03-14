import { Namespace_ } from '../node/stmt/namespace';
import { Name } from '../node/name';

export class NamespaceBuilder {
  protected name: Name | null;
  protected stmts: any[] = [];

  constructor(name: string | Name | null) {
    if (typeof name === 'string') {
      this.name = new Name(name);
    } else {
      this.name = name;
    }
  }

  addStmt(stmt: any): this {
    this.stmts.push(stmt);
    return this;
  }

  addStmts(stmts: any[]): this {
    this.stmts.push(...stmts);
    return this;
  }

  getNode(): Namespace_ {
    return new Namespace_(this.name, this.stmts);
  }
}
