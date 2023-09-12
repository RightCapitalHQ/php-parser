import type { Stmt } from '../../node/stmt'; // fullyQualifiedNodeName FullyQualifiedStmt

import type { NodeTypeInheritingFromFullyQualifiedStmt } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedExpr } from "../../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Do_ extends Omit<Stmt, 'nodeType'> {
  nodeType: 'Stmt_Do';

  ["stmts"] : NodeTypeInheritingFromFullyQualifiedStmt[];
  ["cond"] : NodeTypeInheritingFromFullyQualifiedExpr;
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedStmtDo = Do_;