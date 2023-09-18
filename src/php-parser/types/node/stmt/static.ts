import type { Stmt } from '../../node/stmt'; // fullyQualifiedNodeName FullyQualifiedStmt

import type { NodeTypeInheritingFromFullyQualifiedStaticVar } from "../../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Static_ extends Omit<Stmt, 'nodeType'> {
  nodeType: 'Stmt_Static';

  ["vars"] : NodeTypeInheritingFromFullyQualifiedStaticVar[];
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedStmtStatic = Static_;