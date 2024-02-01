import type { ImportDeclaration, TypeNode } from 'typescript';

export abstract class BaseTypeTranspiler<SourceTypeNode, NameNodePathResolver> {
  constructor(public nameNodePathResolver: NameNodePathResolver) {}

  public abstract transpile(typeNode: SourceTypeNode): TypeNode;

  public beforeTranspile() {
    // Reset importDeclarations
    this.importDeclarations = [];
  }

  public getImportDeclarations() {
    return this.importDeclarations;
  }

  protected importDeclarations: ImportDeclaration[];
}
