import type { Expr } from '../../node/expr'; // fullyQualifiedNodeName FullyQualifiedExpr

import type { NodeTypeInheritingFromFullyQualifiedExpr } from "../../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Exit_ extends Omit<Expr, 'nodeType'> {
  nodeType: 'Expr_Exit';

  ["expr"] : null | NodeTypeInheritingFromFullyQualifiedExpr;
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedExprExit = Exit_;