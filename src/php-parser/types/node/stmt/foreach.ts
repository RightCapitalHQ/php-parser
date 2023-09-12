import type { Stmt } from '../../node/stmt'; // fullyQualifiedNodeName FullyQualifiedStmt

import type { NodeTypeInheritingFromFullyQualifiedExpr } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedStmt } from "../../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Foreach_ extends Omit<Stmt, 'nodeType'> {
  nodeType: 'Stmt_Foreach';

  ["expr"] : NodeTypeInheritingFromFullyQualifiedExpr;
  ["keyVar"] : null | NodeTypeInheritingFromFullyQualifiedExpr;
  ["byRef"] : boolean;
  ["valueVar"] : NodeTypeInheritingFromFullyQualifiedExpr;
  ["stmts"] : NodeTypeInheritingFromFullyQualifiedStmt[];
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedStmtForeach = Foreach_;