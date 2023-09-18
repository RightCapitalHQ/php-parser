import type { Expr } from '../../node/expr'; // fullyQualifiedNodeName FullyQualifiedExpr

import type { NodeTypeInheritingFromFullyQualifiedExpr } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedInterpolatedStringPart } from "../../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ShellExec extends Omit<Expr, 'nodeType'> {
  nodeType: 'Expr_ShellExec';

  ["parts"] : (NodeTypeInheritingFromFullyQualifiedExpr | NodeTypeInheritingFromFullyQualifiedInterpolatedStringPart)[];
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedExprShellExec = ShellExec;