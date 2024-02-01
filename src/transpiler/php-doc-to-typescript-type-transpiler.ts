import type { TypeNode as PhpTypeNode } from '@rightcapital/phpdoc-parser';
import { SyntaxKind, type TypeNode, factory } from 'typescript';
import { BaseTypeTranspiler } from './base-type-transpiler';

export type NameNodePathResolver = (nodeParts: string[]) => {
  path: string;
  name: string;
  isTypeOnly: boolean;
};

export class PhpDocToTypescriptTypeTranspiler extends BaseTypeTranspiler<
  PhpTypeNode,
  NameNodePathResolver
> {
  public override transpile(sourceTypeNode: PhpTypeNode): TypeNode {
    // type_a | type_b | type_c
    if (sourceTypeNode.isUnionTypeNode()) {
      return factory.createUnionTypeNode(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        sourceTypeNode.types.map(this.transpile.bind(this)),
      );
    }

    // type[]
    if (sourceTypeNode.isArrayTypeNode()) {
      return factory.createArrayTypeNode(this.transpile(sourceTypeNode.type));
    }

    // case 1: array<Type>, non-empty-array<Type>, list<Type>, non-empty-list<Type>
    // case 2: array<int, Type>, non-empty-array<int, Type>;
    if (sourceTypeNode.isGenericTypeNode()) {
      if (
        ['array', 'non-empty-array', 'list', 'non-empty-list'].includes(
          sourceTypeNode.type.name,
        )
      ) {
        if (sourceTypeNode.genericTypes.length === 1) {
          // turn into regular Array like Type[]
          return factory.createArrayTypeNode(
            this.transpile(sourceTypeNode.genericTypes[0]),
          );
        }
        if (sourceTypeNode.genericTypes.length === 2) {
          // Record<KeyType, ValueType>
          factory.createTypeReferenceNode(factory.createIdentifier('Record'), [
            this.transpile(sourceTypeNode.genericTypes[0]),
            this.transpile(sourceTypeNode.genericTypes[1]),
          ]);
        }
      }
      throw Error('Not yet supported Generic type so far');
    }

    if (sourceTypeNode.isIdentifierTypeNode()) {
      // Ref: the Basic type defined here
      // https://phpstan.org/writing-php-code/phpdoc-types#basic-types
      if (['bool', 'boolean', 'true', 'fales'].includes(sourceTypeNode.name)) {
        return factory.createKeywordTypeNode(SyntaxKind.BooleanKeyword);
      }

      if (['int', 'integer', 'float', 'double'].includes(sourceTypeNode.name)) {
        return factory.createKeywordTypeNode(SyntaxKind.NumberKeyword);
      }

      if (sourceTypeNode.name === 'string') {
        return factory.createKeywordTypeNode(SyntaxKind.StringKeyword);
      }

      if (sourceTypeNode.name === 'array-key') {
        // array-key equals (string | int)
        return factory.createUnionTypeNode([
          factory.createKeywordTypeNode(SyntaxKind.StringKeyword),
          factory.createKeywordTypeNode(SyntaxKind.NumberKeyword),
        ]);
      }

      if (sourceTypeNode.name === 'scalar') {
        // scalar is equals (float|integer|string|boolean)
        // https://github.com/phpDocumentor/phpDocumentor/issues/694
        return factory.createUnionTypeNode([
          factory.createKeywordTypeNode(SyntaxKind.StringKeyword),
          factory.createKeywordTypeNode(SyntaxKind.NumberKeyword),
          factory.createKeywordTypeNode(SyntaxKind.BooleanKeyword),
        ]);
      }

      if (sourceTypeNode.name === 'mixed') {
        // PHP mixed to TS any
        factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
      }

      if (sourceTypeNode.name === 'void') {
        return factory.createToken(SyntaxKind.VoidKeyword);
      }

      if (sourceTypeNode.name === 'null') {
        return factory.createLiteralTypeNode(factory.createNull());
      }

      // Possibly Class Node
      // Expr
      // Node\Arg
      // \Ast\Node\Arg
      // the Name starts with uppercase character or '\'
      if (/^[A-Z\\]/.test(sourceTypeNode.name)) {
        const nameNodeParts = sourceTypeNode.name.split('\\');

        const tsImportPathAndName = this.nameNodePathResolver(nameNodeParts);

        this.importDeclarations.push(
          factory.createImportDeclaration(
            undefined,
            factory.createImportClause(
              tsImportPathAndName.isTypeOnly,
              undefined,
              factory.createNamedImports([
                factory.createImportSpecifier(
                  false,
                  undefined,
                  factory.createIdentifier(tsImportPathAndName.name),
                ),
              ]),
            ),
            factory.createStringLiteral(tsImportPathAndName.path),
            undefined,
          ),
        );

        return factory.createTypeReferenceNode(
          factory.createIdentifier(tsImportPathAndName.name),
          undefined,
        );
      }
    }

    // return any type as a fallback
    return factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
  }
}
