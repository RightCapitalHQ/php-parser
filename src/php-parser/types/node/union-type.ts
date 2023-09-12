import type { ComplexType } from './complex-type'; // fullyQualifiedNodeName FullyQualifiedComplexType

import type { NodeTypeInheritingFromFullyQualifiedIdentifier } from "../types";
import type { NodeTypeInheritingFromFullyQualifiedName } from "../types";
import type { NodeTypeInheritingFromFullyQualifiedIntersectionType } from "../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface UnionType extends Omit<ComplexType, 'nodeType'> {
  nodeType: 'UnionType';

  ["types"] : (NodeTypeInheritingFromFullyQualifiedIdentifier | NodeTypeInheritingFromFullyQualifiedName | NodeTypeInheritingFromFullyQualifiedIntersectionType)[];
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedUnionType = UnionType;