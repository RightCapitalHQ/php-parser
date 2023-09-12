import type { Expr } from '../../node/expr'; // fullyQualifiedNodeName FullyQualifiedExpr

import type { NodeTypeInheritingFromFullyQualifiedName } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedExpr } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedVarLikeIdentifier } from "../../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface StaticPropertyFetch extends Omit<Expr, 'nodeType'> {
  nodeType: 'Expr_StaticPropertyFetch';

  ["class"] : NodeTypeInheritingFromFullyQualifiedName | NodeTypeInheritingFromFullyQualifiedExpr;
  ["name"] : NodeTypeInheritingFromFullyQualifiedVarLikeIdentifier | NodeTypeInheritingFromFullyQualifiedExpr;
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedExprStaticPropertyFetch = StaticPropertyFetch;