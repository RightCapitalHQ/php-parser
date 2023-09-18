import type { Stmt } from '../node/stmt'; // fullyQualifiedNodeName FullyQualifiedStmt

import type { NodeTypeInheritingFromFullyQualifiedName } from "../types";
import type { NodeTypeInheritingFromFullyQualifiedIdentifier } from "../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface UseItem extends Omit<Stmt, 'nodeType'> {
  nodeType: 'UseItem';

  ["type"] : any;
  ["name"] : NodeTypeInheritingFromFullyQualifiedName;
  ["alias"] : NodeTypeInheritingFromFullyQualifiedIdentifier | null;
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedUseItem = UseItem;