import type { ClassLike } from './class-like'; // fullyQualifiedNodeName FullyQualifiedStmtClassLike

import type { NodeTypeInheritingFromFullyQualifiedIdentifier } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedName } from "../../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Enum_ extends Omit<ClassLike, 'nodeType'> {
  nodeType: 'Stmt_Enum';

  ["scalarType"] : null | NodeTypeInheritingFromFullyQualifiedIdentifier;
  ["implements"] : NodeTypeInheritingFromFullyQualifiedName[];
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedStmtEnum = Enum_;