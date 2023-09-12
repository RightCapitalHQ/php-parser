import type { NodeAbstract } from '../node'; // fullyQualifiedNodeName NodeAbstract

import type { NodeTypeInheritingFromFullyQualifiedIdentifier } from "../types";
import type { NodeTypeInheritingFromFullyQualifiedName } from "../types";
import type { NodeTypeInheritingFromFullyQualifiedComplexType } from "../types";
import type { NodeTypeInheritingFromFullyQualifiedExprVariable } from "../types";
import type { NodeTypeInheritingFromFullyQualifiedExprError } from "../types";
import type { NodeTypeInheritingFromFullyQualifiedExpr } from "../types";
import type { NodeTypeInheritingFromFullyQualifiedAttributeGroup } from "../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Param extends Omit<NodeAbstract, 'nodeType'> {
  nodeType: 'Param';

  ["type"] : null | NodeTypeInheritingFromFullyQualifiedIdentifier | NodeTypeInheritingFromFullyQualifiedName | NodeTypeInheritingFromFullyQualifiedComplexType;
  ["byRef"] : boolean;
  ["variadic"] : boolean;
  ["var"] : NodeTypeInheritingFromFullyQualifiedExprVariable | NodeTypeInheritingFromFullyQualifiedExprError;
  ["default"] : null | NodeTypeInheritingFromFullyQualifiedExpr;
  ["flags"] : number;
  ["attrGroups"] : NodeTypeInheritingFromFullyQualifiedAttributeGroup[];
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedParam = Param;