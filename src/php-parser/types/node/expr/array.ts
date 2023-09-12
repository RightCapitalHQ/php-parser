import type { Expr } from '../../node/expr'; // fullyQualifiedNodeName FullyQualifiedExpr

import type { NodeTypeInheritingFromFullyQualifiedExprArrayItem } from "../../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Array_ extends Omit<Expr, 'nodeType'> {
  nodeType: 'Expr_Array';

  ["items"] : (NodeTypeInheritingFromFullyQualifiedExprArrayItem | null)[];
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedExprArray = Array_;