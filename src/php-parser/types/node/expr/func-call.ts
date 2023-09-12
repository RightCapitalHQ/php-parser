import type { CallLike } from './call-like'; // fullyQualifiedNodeName FullyQualifiedExprCallLike

import type { NodeTypeInheritingFromFullyQualifiedName } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedExpr } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedArg } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedVariadicPlaceholder } from "../../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface FuncCall extends Omit<CallLike, 'nodeType'> {
  nodeType: 'Expr_FuncCall';

  ["name"] : NodeTypeInheritingFromFullyQualifiedName | NodeTypeInheritingFromFullyQualifiedExpr;
  ["args"] : (NodeTypeInheritingFromFullyQualifiedArg | NodeTypeInheritingFromFullyQualifiedVariadicPlaceholder)[];
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedExprFuncCall = FuncCall;