import type { Stmt } from '../../node/stmt'; // fullyQualifiedNodeName FullyQualifiedStmt

import type { NodeTypeInheritingFromFullyQualifiedStmtUseUse } from "../../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Use_ extends Omit<Stmt, 'nodeType'> {
  nodeType: 'Stmt_Use';

  ["type"] : number;
  ["uses"] : NodeTypeInheritingFromFullyQualifiedStmtUseUse[];
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedStmtUse = Use_;