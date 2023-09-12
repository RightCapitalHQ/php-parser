import type { Expr } from '../../node/expr'; // fullyQualifiedNodeName FullyQualifiedExpr

import type { NodeTypeInheritingFromFullyQualifiedExpr } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedIdentifier } from "../../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface PropertyFetch extends Omit<Expr, 'nodeType'> {
  nodeType: 'Expr_PropertyFetch';

  ["var"] : NodeTypeInheritingFromFullyQualifiedExpr;
  ["name"] : NodeTypeInheritingFromFullyQualifiedIdentifier | NodeTypeInheritingFromFullyQualifiedExpr;
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedExprPropertyFetch = PropertyFetch;