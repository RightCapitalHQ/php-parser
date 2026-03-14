import { Enum_ } from '../node/stmt/enum';
import { Name } from '../node/name';
import { Identifier } from '../node/identifier';
import { Node } from '../node';
import { normalizeType } from './param';

export class EnumBuilder {
  protected name: string;
  protected scalarType: Node | null = null;
  protected implements_: any[] = [];
  protected stmts: any[] = [];
  protected attrGroups: any[] = [];

  constructor(name: string) {
    this.name = name;
  }

  setScalarType(type: string | Identifier | Node): this {
    this.scalarType = normalizeType(type);
    return this;
  }

  implement(...names: (string | Name)[]): this {
    for (const name of names) {
      this.implements_.push(typeof name === 'string' ? new Name(name) : name);
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

  getNode(): Enum_ {
    return new Enum_(this.name, {
      scalarType: this.scalarType,
      implements: this.implements_,
      stmts: this.stmts,
      attrGroups: this.attrGroups,
    });
  }
}
