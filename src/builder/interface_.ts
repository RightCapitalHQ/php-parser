import { Interface_ } from '../node/stmt/interface';
import { Name } from '../node/name';

export class InterfaceBuilder {
  protected name: string;
  protected extends_: any[] = [];
  protected stmts: any[] = [];
  protected attrGroups: any[] = [];

  constructor(name: string) {
    this.name = name;
  }

  extend(...names: (string | Name)[]): this {
    for (const name of names) {
      this.extends_.push(typeof name === 'string' ? new Name(name) : name);
    }
    return this;
  }

  addStmt(stmt: any): this {
    this.stmts.push(stmt);
    return this;
  }

  addStmts(stmts: any[]): this {
    this.stmts.push(...stmts);
    return this;
  }

  addAttribute(attrGroup: any): this {
    this.attrGroups.push(attrGroup);
    return this;
  }

  getNode(): Interface_ {
    return new Interface_(this.name, {
      extends: this.extends_,
      stmts: this.stmts,
      attrGroups: this.attrGroups,
    });
  }
}
