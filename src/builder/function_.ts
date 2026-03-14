import { Function_ } from '../node/stmt/function';
import { Node } from '../node';
import { normalizeType } from './param';

export class FunctionBuilder {
  protected name: string;
  protected stmts: any[] = [];
  protected params: any[] = [];
  protected returnType: Node | null = null;
  protected byRef: boolean = false;
  protected attrGroups: any[] = [];

  constructor(name: string) {
    this.name = name;
  }

  makeReturnByRef(): this {
    this.byRef = true;
    return this;
  }

  addParam(param: any): this {
    this.params.push(param);
    return this;
  }

  addParams(params: any[]): this {
    this.params.push(...params);
    return this;
  }

  setReturnType(type: string | Node): this {
    this.returnType = normalizeType(type);
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

  getNode(): Function_ {
    return new Function_(this.name, {
      byRef: this.byRef,
      params: this.params,
      returnType: this.returnType,
      stmts: this.stmts,
      attrGroups: this.attrGroups,
    });
  }
}
