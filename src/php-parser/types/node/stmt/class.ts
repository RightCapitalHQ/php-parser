import type { ClassLike } from './class-like'; // fullyQualifiedNodeName FullyQualifiedStmtClassLike

import type { NodeTypeInheritingFromFullyQualifiedName } from "../../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Class_ extends Omit<ClassLike, 'nodeType'> {
  nodeType: 'Stmt_Class';

  ["flags"] : number;
  ["extends"] : null | NodeTypeInheritingFromFullyQualifiedName;
  ["implements"] : NodeTypeInheritingFromFullyQualifiedName[];
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedStmtClass = Class_;