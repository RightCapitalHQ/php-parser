import type { Expr } from '../../node/expr'; // fullyQualifiedNodeName FullyQualifiedExpr

import type { NodeTypeInheritingFromFullyQualifiedArrayItem } from "../../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface List_ extends Omit<Expr, 'nodeType'> {
  nodeType: 'Expr_List';

  ["items"] : (NodeTypeInheritingFromFullyQualifiedArrayItem | null)[];
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedExprList = List_;