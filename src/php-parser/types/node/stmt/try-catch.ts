import type { Stmt } from '../../node/stmt'; // fullyQualifiedNodeName FullyQualifiedStmt

import type { NodeTypeInheritingFromFullyQualifiedStmt } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedStmtCatch } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedStmtFinally } from "../../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface TryCatch extends Omit<Stmt, 'nodeType'> {
  nodeType: 'Stmt_TryCatch';

  ["stmts"] : NodeTypeInheritingFromFullyQualifiedStmt[];
  ["catches"] : NodeTypeInheritingFromFullyQualifiedStmtCatch[];
  ["finally"] : null | NodeTypeInheritingFromFullyQualifiedStmtFinally;
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedStmtTryCatch = TryCatch;