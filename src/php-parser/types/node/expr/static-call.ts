import type { CallLike } from './call-like'; // fullyQualifiedNodeName FullyQualifiedExprCallLike

import type { NodeTypeInheritingFromFullyQualifiedName } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedExpr } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedIdentifier } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedArg } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedVariadicPlaceholder } from "../../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface StaticCall extends Omit<CallLike, 'nodeType'> {
  nodeType: 'Expr_StaticCall';

  ["class"] : NodeTypeInheritingFromFullyQualifiedName | NodeTypeInheritingFromFullyQualifiedExpr;
  ["name"] : NodeTypeInheritingFromFullyQualifiedIdentifier | NodeTypeInheritingFromFullyQualifiedExpr;
  ["args"] : (NodeTypeInheritingFromFullyQualifiedArg | NodeTypeInheritingFromFullyQualifiedVariadicPlaceholder)[];
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedExprStaticCall = StaticCall;