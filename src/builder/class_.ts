import { Class_ } from '../node/stmt/class';
import { Name } from '../node/name';
import { Modifiers } from '../modifiers';

export class ClassBuilder {
  protected name: string;
  protected extends_: any | null = null;
  protected implements_: any[] = [];
  protected flags: number = 0;
  protected stmts: any[] = [];
  protected attrGroups: any[] = [];

  constructor(name: string) {
    this.name = name;
  }

  extend(name: string | Name): this {
    this.extends_ = typeof name === 'string' ? new Name(name) : name;
    return this;
  }

  implement(...names: (string | Name)[]): this {
    for (const name of names) {
      this.implements_.push(typeof name === 'string' ? new Name(name) : name);
    }
    return this;
  }

  makeAbstract(): this {
    this.flags |= Modifiers.ABSTRACT;
    return this;
  }

  makeFinal(): this {
    this.flags |= Modifiers.FINAL;
    return this;
  }

  makeReadonly(): this {
    this.flags |= Modifiers.READONLY;
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

  getNode(): Class_ {
    return new Class_(this.name, {
      flags: this.flags,
      extends: this.extends_,
      implements: this.implements_,
      stmts: this.stmts,
      attrGroups: this.attrGroups,
    });
  }
}
