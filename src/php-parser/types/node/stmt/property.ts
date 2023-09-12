import type { Stmt } from '../../node/stmt'; // fullyQualifiedNodeName FullyQualifiedStmt

import type { NodeTypeInheritingFromFullyQualifiedStmtPropertyProperty } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedIdentifier } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedName } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedComplexType } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedAttributeGroup } from "../../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Property extends Omit<Stmt, 'nodeType'> {
  nodeType: 'Stmt_Property';

  ["flags"] : number;
  ["props"] : NodeTypeInheritingFromFullyQualifiedStmtPropertyProperty[];
  ["type"] : null | NodeTypeInheritingFromFullyQualifiedIdentifier | NodeTypeInheritingFromFullyQualifiedName | NodeTypeInheritingFromFullyQualifiedComplexType;
  ["attrGroups"] : NodeTypeInheritingFromFullyQualifiedAttributeGroup[];
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedStmtProperty = Property;