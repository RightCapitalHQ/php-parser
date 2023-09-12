import type { NodeAbstract } from '../node'; // fullyQualifiedNodeName NodeAbstract

import type { NodeTypeInheritingFromFullyQualifiedName } from "../types";
import type { NodeTypeInheritingFromFullyQualifiedArg } from "../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Attribute extends Omit<NodeAbstract, 'nodeType'> {
  nodeType: 'Attribute';

  ["name"] : NodeTypeInheritingFromFullyQualifiedName;
  ["args"] : NodeTypeInheritingFromFullyQualifiedArg[];
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedAttribute = Attribute;