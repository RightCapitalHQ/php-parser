import type { Stmt } from '../../node/stmt'; // fullyQualifiedNodeName FullyQualifiedStmt

import type { NodeTypeInheritingFromFullyQualifiedExpr } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedStmt } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedStmtElseIf } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedStmtElse } from "../../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface If_ extends Omit<Stmt, 'nodeType'> {
  nodeType: 'Stmt_If';

  ["cond"] : NodeTypeInheritingFromFullyQualifiedExpr;
  ["stmts"] : NodeTypeInheritingFromFullyQualifiedStmt[];
  ["elseifs"] : NodeTypeInheritingFromFullyQualifiedStmtElseIf[];
  ["else"] : null | NodeTypeInheritingFromFullyQualifiedStmtElse;
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedStmtIf = If_;