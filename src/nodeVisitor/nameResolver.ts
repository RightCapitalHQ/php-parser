import { Node } from '../node';
import { NodeVisitorAbstract } from '../nodeVisitor';
import { NameContext } from '../nameContext';
import { Name, FullyQualified } from '../node/name';
import { ErrorHandler, ThrowingErrorHandler } from '../errorHandler';

export interface NameResolverOptions {
  preserveOriginalNames?: boolean;
  replaceNodes?: boolean;
}

export class NameResolver extends NodeVisitorAbstract {
  private nameContext: NameContext;
  private errorHandler: ErrorHandler;
  private preserveOriginalNames: boolean;
  private replaceNodes: boolean;

  constructor(errorHandler: ErrorHandler | null = null, options: NameResolverOptions = {}) {
    super();
    this.errorHandler = errorHandler ?? new ThrowingErrorHandler();
    this.nameContext = new NameContext();
    this.preserveOriginalNames = options.preserveOriginalNames ?? false;
    this.replaceNodes = options.replaceNodes ?? true;
  }

  getNameContext(): NameContext {
    return this.nameContext;
  }

  beforeTraverse(nodes: Node[]): Node[] | null {
    this.nameContext.startNamespace();
    return null;
  }

  enterNode(node: Node): Node | Node[] | number | null {
    const type = node.getType();

    if (type === 'Stmt_Namespace') {
      this.nameContext.startNamespace((node as any).name);
      return null;
    }

    if (type === 'Stmt_Use') {
      for (const use of (node as any).uses) {
        this.addAlias(use, (node as any).type);
      }
      return null;
    }

    if (type === 'Stmt_GroupUse') {
      const prefix = (node as any).prefix;
      for (const use of (node as any).uses) {
        const useName = use.name;
        const fullName = new Name(
          prefix.toString() + '\\' + useName.toString(),
          useName.getAttributes()
        );
        const alias = use.alias ?? useName.getLast();
        const useType = use.type !== 0 ? use.type : (node as any).type;
        try {
          this.nameContext.addAlias(fullName, alias, useType);
        } catch (e) {
          // Ignore alias conflicts
        }
      }
      return null;
    }

    if (type === 'Stmt_Class') {
      if ((node as any).extends) {
        (node as any).extends = this.resolveClassName((node as any).extends);
      }
      for (let i = 0; i < ((node as any).implements?.length ?? 0); i++) {
        (node as any).implements[i] = this.resolveClassName((node as any).implements[i]);
      }
      return null;
    }

    if (type === 'Stmt_Interface') {
      for (let i = 0; i < ((node as any).extends?.length ?? 0); i++) {
        (node as any).extends[i] = this.resolveClassName((node as any).extends[i]);
      }
      return null;
    }

    if (type === 'Stmt_Enum') {
      for (let i = 0; i < ((node as any).implements?.length ?? 0); i++) {
        (node as any).implements[i] = this.resolveClassName((node as any).implements[i]);
      }
      return null;
    }

    if (type === 'Stmt_TraitUse') {
      for (let i = 0; i < (node as any).traits.length; i++) {
        (node as any).traits[i] = this.resolveClassName((node as any).traits[i]);
      }
      return null;
    }

    if (type === 'Expr_New' || type === 'Expr_Instanceof') {
      const classNode = (node as any).class ?? (node as any).class_;
      if (classNode instanceof Name) {
        const resolved = this.resolveClassName(classNode);
        if ((node as any).class !== undefined) {
          (node as any).class = resolved;
        } else {
          (node as any).class_ = resolved;
        }
      }
      return null;
    }

    if (type === 'Expr_StaticCall' || type === 'Expr_StaticPropertyFetch' || type === 'Expr_ClassConstFetch') {
      const classNode = (node as any).class ?? (node as any).class_;
      if (classNode instanceof Name) {
        const resolved = this.resolveClassName(classNode);
        if ((node as any).class !== undefined) {
          (node as any).class = resolved;
        } else {
          (node as any).class_ = resolved;
        }
      }
      return null;
    }

    if (type === 'Stmt_Catch') {
      for (let i = 0; i < (node as any).types.length; i++) {
        (node as any).types[i] = this.resolveClassName((node as any).types[i]);
      }
      return null;
    }

    if (type === 'Expr_FuncCall') {
      const name = (node as any).name;
      if (name instanceof Name) {
        (node as any).name = this.resolveName(name, NameContext.TYPE_FUNCTION);
      }
      return null;
    }

    if (type === 'Expr_ConstFetch') {
      const name = (node as any).name;
      if (name instanceof Name) {
        // Special constants: true, false, null
        const lower = name.toLowerString();
        if (lower === 'true' || lower === 'false' || lower === 'null') {
          return null;
        }
        (node as any).name = this.resolveName(name, NameContext.TYPE_CONSTANT);
      }
      return null;
    }

    return null;
  }

  private addAlias(use: any, stmtType: number): void {
    const type = use.type !== 0 ? use.type : stmtType;
    const alias = use.alias ?? use.name.getLast();
    try {
      this.nameContext.addAlias(use.name, alias, type);
    } catch (e) {
      // Ignore
    }
  }

  private resolveClassName(name: Name): Name {
    return this.resolveName(name, NameContext.TYPE_NORMAL);
  }

  private resolveName(name: Name, type: number): Name {
    if (name.isFullyQualified()) return name;

    // Special class names should not be resolved
    if (type === NameContext.TYPE_NORMAL && name.isSpecialClassName()) {
      return name;
    }

    const resolved = this.nameContext.getResolvedName(name, type);

    if (this.preserveOriginalNames) {
      resolved.setAttribute('originalName', name);
    }

    return resolved;
  }
}
