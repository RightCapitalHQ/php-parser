import type { Expr } from '../../node/expr'; // fullyQualifiedNodeName FullyQualifiedExpr

import type { NodeTypeInheritingFromFullyQualifiedName } from "../../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ConstFetch extends Omit<Expr, 'nodeType'> {
  nodeType: 'Expr_ConstFetch';

  ["name"] : NodeTypeInheritingFromFullyQualifiedName;
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedExprConstFetch = ConstFetch;