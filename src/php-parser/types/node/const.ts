import type { NodeAbstract } from '../node'; // fullyQualifiedNodeName NodeAbstract

import type { NodeTypeInheritingFromFullyQualifiedIdentifier } from "../types";
import type { NodeTypeInheritingFromFullyQualifiedExpr } from "../types";
import type { NodeTypeInheritingFromFullyQualifiedName } from "../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Const_ extends Omit<NodeAbstract, 'nodeType'> {
  nodeType: 'Const';

  ["name"] : NodeTypeInheritingFromFullyQualifiedIdentifier;
  ["value"] : NodeTypeInheritingFromFullyQualifiedExpr;
  ["namespacedName"] : NodeTypeInheritingFromFullyQualifiedName | null;
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedConst = Const_;