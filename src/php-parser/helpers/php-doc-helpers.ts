import { join } from 'path';
import {
  ConstExprParser,
  Lexer,
  type PhpDocNode,
  PhpDocParser,
  type TypeNode as PhpDocTypeNode,
  TokenIterator,
  TypeParser,
  type VarTagValueNode,
  type NameNodePathResolver,
  renderTsNodeToString,
} from '@rightcapital/phpdoc-parser';
import type { ImportDeclaration, TypeNode } from 'typescript';
import { ExtendedTranspiler } from './extended-php-doc-transpiler';
import { FilePathHelpers } from './file-path-helpers';
import type { IUses } from './node-retriever-helpers';
import { TypeGenerationHelpers } from './type-generation-helpers';

export interface ITypeGenerationPackage {
  tsTypeNode: TypeNode;
  importDeclarations: ImportDeclaration[];
  outputTsTypeGeneratedString: string;
  importDeclarationGeneratedStrings: string[];
}

export class PhpDocHelpers {
  public static parseCommentTextToTagValueNode(
    commentText: string,
  ): VarTagValueNode {
    /*
     * For better performance, we could cache the Lexer and Parser
     * instances in the future if.
     */
    const lexer = new Lexer();
    const constExprParser = new ConstExprParser();
    const typeParser = new TypeParser(constExprParser);
    const phpDocParser = new PhpDocParser(typeParser, constExprParser);

    const tokens = new TokenIterator(lexer.tokenize(commentText));
    const astRootNode = phpDocParser.parse(tokens); // PhpDocNode
    const varTagValueNode =
      PhpDocHelpers.getTagValueNodeFromAstRootNode(astRootNode);
    return varTagValueNode;
  }

  /**
   * Parse var tag annotation type node to TypeScript Node
   *
   * Supported annotations:
   * IdentifierTypeNode(Scalar type)
   * @var bool
   * IdentifierTypeNode(Name type)
   * @var Expr
   * ArrayTypeNode->type = IdentifierTypeNode(Expr)
   * @var Arg[]
   * UnionTypeNode(types(IdentifierTypeNode(null)|IdentifierTypeNode(Expr)))
   * @var null|Expr
   * GenericTypeNode(node=IdentifierTypeNode(array)genericTypes(UnionTypeNode(...)))
   * @var array<Node\\Arg|Node\\VariadicPlaceholder>
   * //ArrayTypeNode(UnionTypeNode(....))
   * @var (ArrayItem|null)[]
   */
  public static getTypescriptTypeFromTypeNode(
    typeNode: PhpDocTypeNode,
    filePathParts: string[],
    fileRelativePath: string,
    uses: IUses,
  ): ITypeGenerationPackage {
    const nameNodePathResolver: NameNodePathResolver<ExtendedTranspiler> = (
      nodeParts: string[],
    ) => {
      const targetTypeFilePath = FilePathHelpers.getFilePathFromNameNodeParts(
        nodeParts,
        'Name',
        filePathParts,
        uses,
      );

      const name = TypeGenerationHelpers.getGroupedTypeNameForNode(
        FilePathHelpers.getFullyQualifiedParentNodeNameByFilePath(
          fileRelativePath,
          targetTypeFilePath,
          nodeParts.at(-1),
        ),
      );

      const path = join(
        FilePathHelpers.getRelativePathToTypesRootPathByPhpFileParts(
          filePathParts,
        ),
        'types',
      );
      return {
        name,
        path,
        isTypeOnly: true,
      };
    };
    const transpiler = new ExtendedTranspiler(nameNodePathResolver);

    transpiler.beforeTranspile();
    const transpiledTypeNode = transpiler.transpile(typeNode);
    const importDeclarations = transpiler.getImportDeclarations();
    const outputTsTypeGeneratedString =
      renderTsNodeToString(transpiledTypeNode);
    const importDeclarationGeneratedStrings = importDeclarations.map(
      (importDeclaration) => renderTsNodeToString(importDeclaration),
    );
    return {
      tsTypeNode: transpiledTypeNode,
      importDeclarations,
      outputTsTypeGeneratedString,
      importDeclarationGeneratedStrings,
    };
  }

  public static getTagValueNodeFromAstRootNode(
    astRootNode: PhpDocNode,
  ): VarTagValueNode {
    // It should contains only one tag in comment PHP AST Node
    const varTagValueNode = astRootNode.getVarTagValues()[0];
    if (!varTagValueNode) {
      throw Error('It should have at least one var tag in the comment section');
    }
    return varTagValueNode;
  }
}
