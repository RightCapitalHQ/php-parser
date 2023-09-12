import type { Stmt } from '../../node/stmt'; // fullyQualifiedNodeName FullyQualifiedStmt

import type { NodeTypeInheritingFromFullyQualifiedConst } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedAttributeGroup } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedIdentifier } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedName } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedComplexType } from "../../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ClassConst extends Omit<Stmt, 'nodeType'> {
  nodeType: 'Stmt_ClassConst';

  ["flags"] : number;
  ["consts"] : NodeTypeInheritingFromFullyQualifiedConst[];
  ["attrGroups"] : NodeTypeInheritingFromFullyQualifiedAttributeGroup[];
  ["type"] : NodeTypeInheritingFromFullyQualifiedIdentifier | NodeTypeInheritingFromFullyQualifiedName | NodeTypeInheritingFromFullyQualifiedComplexType | null;
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedStmtClassConst = ClassConst;