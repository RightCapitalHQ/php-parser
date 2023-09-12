import type { Stmt } from '../../node/stmt'; // fullyQualifiedNodeName FullyQualifiedStmt

import type { NodeTypeInheritingFromFullyQualifiedExpr } from "../../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Global_ extends Omit<Stmt, 'nodeType'> {
  nodeType: 'Stmt_Global';

  ["vars"] : NodeTypeInheritingFromFullyQualifiedExpr[];
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedStmtGlobal = Global_;