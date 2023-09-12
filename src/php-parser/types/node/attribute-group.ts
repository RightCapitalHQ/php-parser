import type { NodeAbstract } from '../node'; // fullyQualifiedNodeName NodeAbstract

import type { NodeTypeInheritingFromFullyQualifiedAttribute } from "../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface AttributeGroup extends Omit<NodeAbstract, 'nodeType'> {
  nodeType: 'AttributeGroup';

  ["attrs"] : NodeTypeInheritingFromFullyQualifiedAttribute[];
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedAttributeGroup = AttributeGroup;