import type { Stmt } from '../../node/stmt'; // fullyQualifiedNodeName FullyQualifiedStmt

import type { NodeTypeInheritingFromFullyQualifiedExpr } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedStmtCase } from "../../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Switch_ extends Omit<Stmt, 'nodeType'> {
  nodeType: 'Stmt_Switch';

  ["cond"] : NodeTypeInheritingFromFullyQualifiedExpr;
  ["cases"] : NodeTypeInheritingFromFullyQualifiedStmtCase[];
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedStmtSwitch = Switch_;