import type { Stmt } from '../../node/stmt'; // fullyQualifiedNodeName FullyQualifiedStmt

import type { NodeTypeInheritingFromFullyQualifiedIdentifier } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedExpr } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedAttributeGroup } from "../../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface EnumCase extends Omit<Stmt, 'nodeType'> {
  nodeType: 'Stmt_EnumCase';

  ["name"] : NodeTypeInheritingFromFullyQualifiedIdentifier;
  ["expr"] : NodeTypeInheritingFromFullyQualifiedExpr | null;
  ["attrGroups"] : NodeTypeInheritingFromFullyQualifiedAttributeGroup[];
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedStmtEnumCase = EnumCase;