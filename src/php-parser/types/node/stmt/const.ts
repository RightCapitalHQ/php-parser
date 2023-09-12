import type { Stmt } from '../../node/stmt'; // fullyQualifiedNodeName FullyQualifiedStmt

import type { NodeTypeInheritingFromFullyQualifiedConst } from "../../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Const_ extends Omit<Stmt, 'nodeType'> {
  nodeType: 'Stmt_Const';

  ["consts"] : NodeTypeInheritingFromFullyQualifiedConst[];
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedStmtConst = Const_;