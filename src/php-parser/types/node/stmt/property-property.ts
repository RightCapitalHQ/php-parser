import type { Stmt } from '../../node/stmt'; // fullyQualifiedNodeName FullyQualifiedStmt

import type { NodeTypeInheritingFromFullyQualifiedVarLikeIdentifier } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedExpr } from "../../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface PropertyProperty extends Omit<Stmt, 'nodeType'> {
  nodeType: 'Stmt_PropertyProperty';

  ["name"] : NodeTypeInheritingFromFullyQualifiedVarLikeIdentifier;
  ["default"] : null | NodeTypeInheritingFromFullyQualifiedExpr;
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedStmtPropertyProperty = PropertyProperty;