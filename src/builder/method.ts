import { ClassMethod } from '../node/stmt/classMethod';
import { Modifiers } from '../modifiers';
import { Node } from '../node';
import { normalizeType } from './param';

export class MethodBuilder {
  protected name: string;
  protected flags: number = 0;
  protected stmts: any[] | null = [];
  protected params: any[] = [];
  protected returnType: Node | null = null;
  protected byRef: boolean = false;
  protected attrGroups: any[] = [];

  constructor(name: string) {
    this.name = name;
  }

  makePublic(): this {
    this.flags = Modifiers.PUBLIC | (this.flags & ~Modifiers.VISIBILITY_MASK);
    return this;
  }

  makeProtected(): this {
    this.flags = Modifiers.PROTECTED | (this.flags & ~Modifiers.VISIBILITY_MASK);
    return this;
  }

  makePrivate(): this {
    this.flags = Modifiers.PRIVATE | (this.flags & ~Modifiers.VISIBILITY_MASK);
    return this;
  }

  makeStatic(): this {
    this.flags |= Modifiers.STATIC;
    return this;
  }

  makeAbstract(): this {
    this.flags |= Modifiers.ABSTRACT;
    this.stmts = null;
    return this;
  }

  makeFinal(): this {
    this.flags |= Modifiers.FINAL;
    return this;
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
    if (this.stmts === null) {
      throw new Error('Cannot add statements to an abstract method');
    }
    this.stmts.push(stmt);
    return this;
  }

  addStmts(stmts: any[]): this {
    if (this.stmts === null) {
      throw new Error('Cannot add statements to an abstract method');
    }
    this.stmts.push(...stmts);
    return this;
  }

  addAttribute(attrGroup: any): this {
    this.attrGroups.push(attrGroup);
    return this;
  }

  getNode(): ClassMethod {
    return new ClassMethod(this.name, {
      flags: this.flags,
      byRef: this.byRef,
      params: this.params,
      returnType: this.returnType,
      stmts: this.stmts,
      attrGroups: this.attrGroups,
    });
  }
}
