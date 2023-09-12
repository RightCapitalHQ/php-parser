import type { NodeAbstract } from '../node'; // fullyQualifiedNodeName NodeAbstract

import type { NodeTypeInheritingFromFullyQualifiedIdentifier } from "../types";
import type { NodeTypeInheritingFromFullyQualifiedExpr } from "../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Arg extends Omit<NodeAbstract, 'nodeType'> {
  nodeType: 'Arg';

  ["name"] : NodeTypeInheritingFromFullyQualifiedIdentifier | null;
  ["value"] : NodeTypeInheritingFromFullyQualifiedExpr;
  ["byRef"] : boolean;
  ["unpack"] : boolean;
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedArg = Arg;