import type { Expr } from '../../node/expr'; // fullyQualifiedNodeName FullyQualifiedExpr

import type { NodeTypeInheritingFromFullyQualifiedName } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedExpr } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedIdentifier } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedExprError } from "../../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ClassConstFetch extends Omit<Expr, 'nodeType'> {
  nodeType: 'Expr_ClassConstFetch';

  ["class"] : NodeTypeInheritingFromFullyQualifiedName | NodeTypeInheritingFromFullyQualifiedExpr;
  ["name"] : NodeTypeInheritingFromFullyQualifiedIdentifier | NodeTypeInheritingFromFullyQualifiedExpr | NodeTypeInheritingFromFullyQualifiedExprError;
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedExprClassConstFetch = ClassConstFetch;