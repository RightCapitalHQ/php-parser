import { Trait_ } from '../node/stmt/trait';

export class TraitBuilder {
  protected name: string;
  protected stmts: any[] = [];
  protected attrGroups: any[] = [];

  constructor(name: string) {
    this.name = name;
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

  getNode(): Trait_ {
    return new Trait_(this.name, {
      stmts: this.stmts,
      attrGroups: this.attrGroups,
    });
  }
}
