import type { Stmt } from '../../node/stmt'; // fullyQualifiedNodeName FullyQualifiedStmt

import type { NodeTypeInheritingFromFullyQualifiedName } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedExprVariable } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedStmt } from "../../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Catch_ extends Omit<Stmt, 'nodeType'> {
  nodeType: 'Stmt_Catch';

  ["types"] : NodeTypeInheritingFromFullyQualifiedName[];
  ["var"] : NodeTypeInheritingFromFullyQualifiedExprVariable | null;
  ["stmts"] : NodeTypeInheritingFromFullyQualifiedStmt[];
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedStmtCatch = Catch_;