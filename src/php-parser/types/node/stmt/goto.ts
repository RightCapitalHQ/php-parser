import type { Stmt } from '../../node/stmt'; // fullyQualifiedNodeName FullyQualifiedStmt

import type { NodeTypeInheritingFromFullyQualifiedIdentifier } from "../../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Goto_ extends Omit<Stmt, 'nodeType'> {
  nodeType: 'Stmt_Goto';

  ["name"] : NodeTypeInheritingFromFullyQualifiedIdentifier;
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedStmtGoto = Goto_;