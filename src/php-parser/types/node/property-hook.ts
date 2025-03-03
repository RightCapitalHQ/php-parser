import type { NodeAbstract } from '../node'; // fullyQualifiedNodeName NodeAbstract

import type { NodeTypeInheritingFromFullyQualifiedAttributeGroup } from "../types";
import type { NodeTypeInheritingFromFullyQualifiedIdentifier } from "../types";
import type { NodeTypeInheritingFromFullyQualifiedParam } from "../types";
import type { NodeTypeInheritingFromFullyQualifiedExpr } from "../types";
import type { NodeTypeInheritingFromFullyQualifiedStmt } from "../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface PropertyHook extends Omit<NodeAbstract, 'nodeType'> {
  nodeType: 'PropertyHook';

  ["attrGroups"] : NodeTypeInheritingFromFullyQualifiedAttributeGroup[];
  ["flags"] : number;
  ["byRef"] : boolean;
  ["name"] : NodeTypeInheritingFromFullyQualifiedIdentifier;
  ["params"] : NodeTypeInheritingFromFullyQualifiedParam[];
  ["body"] : null | NodeTypeInheritingFromFullyQualifiedExpr | NodeTypeInheritingFromFullyQualifiedStmt[];
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedPropertyHook = PropertyHook;