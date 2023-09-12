import type { Stmt } from '../../node/stmt'; // fullyQualifiedNodeName FullyQualifiedStmt

import type { NodeTypeInheritingFromFullyQualifiedIdentifier } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedParam } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedName } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedComplexType } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedStmt } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedAttributeGroup } from "../../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Function_ extends Omit<Stmt, 'nodeType'> {
  nodeType: 'Stmt_Function';

  ["byRef"] : boolean;
  ["name"] : NodeTypeInheritingFromFullyQualifiedIdentifier;
  ["params"] : NodeTypeInheritingFromFullyQualifiedParam[];
  ["returnType"] : null | NodeTypeInheritingFromFullyQualifiedIdentifier | NodeTypeInheritingFromFullyQualifiedName | NodeTypeInheritingFromFullyQualifiedComplexType;
  ["stmts"] : NodeTypeInheritingFromFullyQualifiedStmt[];
  ["attrGroups"] : NodeTypeInheritingFromFullyQualifiedAttributeGroup[];
  ["namespacedName"] : NodeTypeInheritingFromFullyQualifiedName | null;
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedStmtFunction = Function_;