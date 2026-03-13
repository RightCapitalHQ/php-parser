import { Stmt } from '../stmt';

export abstract class ClassLike extends Stmt {
  public name: any | null = null;
  public stmts: any[] = [];
  public attrGroups: any[] = [];
  public namespacedName: any | null = null;

  getTraitUses(): any[] {
    const traitUses: any[] = [];
    for (const stmt of this.stmts) {
      if (stmt && stmt.getType && stmt.getType() === 'Stmt_TraitUse') {
        traitUses.push(stmt);
      }
    }
    return traitUses;
  }

  getConstants(): any[] {
    const constants: any[] = [];
    for (const stmt of this.stmts) {
      if (stmt && stmt.getType && stmt.getType() === 'Stmt_ClassConst') {
        constants.push(stmt);
      }
    }
    return constants;
  }

  getProperties(): any[] {
    const properties: any[] = [];
    for (const stmt of this.stmts) {
      if (stmt && stmt.getType && stmt.getType() === 'Stmt_Property') {
        properties.push(stmt);
      }
    }
    return properties;
  }

  getProperty(name: string): any | null {
    for (const stmt of this.stmts) {
      if (stmt && stmt.getType && stmt.getType() === 'Stmt_Property') {
        for (const prop of stmt.props) {
          if (prop && prop.name && name === prop.name.toString()) {
            return stmt;
          }
        }
      }
    }
    return null;
  }

  getMethods(): any[] {
    const methods: any[] = [];
    for (const stmt of this.stmts) {
      if (stmt && stmt.getType && stmt.getType() === 'Stmt_ClassMethod') {
        methods.push(stmt);
      }
    }
    return methods;
  }

  getMethod(name: string): any | null {
    const lowerName = name.toLowerCase();
    for (const stmt of this.stmts) {
      if (
        stmt &&
        stmt.getType &&
        stmt.getType() === 'Stmt_ClassMethod' &&
        lowerName === stmt.name.toLowerString()
      ) {
        return stmt;
      }
    }
    return null;
  }
}
