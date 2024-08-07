import type { VarTagValueNode } from '@rightcapital/phpdoc-parser';

import { ClassModifier } from '../types/constants';
import type { INode } from '../types/node';
import type { String_ } from '../types/node/scalar/string';
import type { Class_ } from '../types/node/stmt/class';
import type { Property } from '../types/node/stmt/property';
import {
  NodeType,
  type NodeTypeInheritingFromNodeAbstract,
  type NodeTypeToInterfaceMap,
} from '../types/types';
import { type ITypeGenerationPackage, PhpDocHelpers } from './php-doc-helpers';

export type IUseFullQualifiedNameParts = string[];
export type IUses = {
  [name: string]: IUseFullQualifiedNameParts;
};
export interface IProperty {
  name: string;
  commentText: string;
  varTagValueNode: VarTagValueNode;
  typeGenerationPackage: ITypeGenerationPackage;
}

export class NodeRetrieverHelpers {
  /**
   *
   * Most nodes have class, in very few cases, we
   * met interface like:
   *  `interface FunctionLike extends Node`
   * just ignore the generation for interface.
   *
   * @param node Root of AST
   */
  public static getRootClassNode(
    rootNode: NodeTypeInheritingFromNodeAbstract[],
  ): Class_ {
    const namespaceNode = NodeRetrieverHelpers.findNodeByNodeType(
      rootNode as INode[],
      NodeType.Stmt_Namespace,
    );

    if (namespaceNode?.stmts) {
      return this.findNodeByNodeType(namespaceNode.stmts, NodeType.Stmt_Class);
    }

    return undefined;
  }

  public static getPropertiesFromClassNode(
    classNode: Class_,
    filePathParts: string[],
    fileRelativePath: string,
    uses: IUses,
  ): IProperty[] {
    if (classNode.stmts) {
      return this.filterNodeByNodeType(classNode.stmts, NodeType.Stmt_Property)
        .filter(
          /**
           * Filter out all static properties, all we need are object properties
           */
          (propertyNode): propertyNode is Property =>
            // eslint-disable-next-line no-bitwise
            (propertyNode.flags & ClassModifier.ModifierStatic) === 0,
        )
        .map((propertyNode) => {
          const varTagValueNode = PhpDocHelpers.parseCommentTextToTagValueNode(
            propertyNode.attributes.comments?.at(-1).text,
          );

          const typeGenerationPackage =
            PhpDocHelpers.getTypescriptTypeFromTypeNode(
              varTagValueNode.type,
              filePathParts,
              fileRelativePath,
              uses,
            );
          return {
            name: propertyNode.props[0].name.name,
            commentText: propertyNode.attributes.comments?.at(-1).text,
            varTagValueNode,
            typeGenerationPackage,
          };
        });
    }

    return [];
  }

  /**
   * A Sample AST snippet for Stmt_Use
   *   {
   *     "nodeType": "Stmt_Use",
   *     "uses": [
   *       {
   *         "nodeType": "Stmt_UseUse",
   *         "name": {
   *           "nodeType": "Name",
   *           "parts": [
   *             "PhpParser",
   *             "NodeAbstract"
   *           ]
   *         },
   *       }
   *     ]
   *   }
   */
  public static getUsesMap(
    rootNode: NodeTypeInheritingFromNodeAbstract[],
  ): IUses {
    const namespaceNode = NodeRetrieverHelpers.findNodeByNodeType(
      rootNode,
      NodeType.Stmt_Namespace,
    );

    if (namespaceNode?.stmts) {
      return Object.fromEntries(
        this.filterNodeByNodeType(namespaceNode.stmts, NodeType.Stmt_Use)
          // https://github.com/nikic/PHP-Parser/blob/master/UPGRADE-5.0.md#changes-to-the-name-representation
          .map((useNode) =>
            NodeRetrieverHelpers.getPartsByName(useNode.uses[0].name.name),
          )
          .map((parts) => [parts.slice(-1), parts]),
      ) as IUses;
    }

    return {} as IUses;
  }

  public static getGetTypeFunctionReturnValue(
    classNode: Class_,
  ): string | undefined {
    if (classNode.stmts) {
      const classMethodNodes = this.filterNodeByNodeType(
        classNode.stmts,
        NodeType.Stmt_ClassMethod,
      );

      const getTypeMethodNode = classMethodNodes.find(
        (node) => node.name.name === 'getType',
      );

      if (getTypeMethodNode) {
        const returnNode = this.findNodeByNodeType(
          getTypeMethodNode.stmts,
          NodeType.Stmt_Return,
        );

        if (returnNode) {
          // should be a Scalar_String node here
          return (returnNode.expr as String_).value;
        }
      }
    }

    return undefined;
  }

  public static findNodeByNodeType<T extends NodeType>(
    nodes: INode[],
    nodeType: T,
  ): NodeTypeToInterfaceMap[T] | undefined {
    return nodes.find((node) => node.nodeType === nodeType) as
      | NodeTypeToInterfaceMap[T]
      | undefined;
  }

  public static filterNodeByNodeType<T extends NodeType>(
    nodes: INode[],
    nodeType: T,
  ): NodeTypeToInterfaceMap[T][] {
    return nodes.filter(
      (node) => node.nodeType === nodeType,
    ) as NodeTypeToInterfaceMap[T][];
  }

  /**
   * Get parts of name (split by the namespace separator).
   *
   * @param name the Full name with namespace separator
   * @returns string[] Parts of name
   */
  public static getPartsByName(name: string): string[] {
    return name.split('\\');
  }
}
