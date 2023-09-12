import type { BinaryOp } from '../../../node/expr/binary-op'; // fullyQualifiedNodeName FullyQualifiedExprBinaryOp


// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Smaller extends Omit<BinaryOp, 'nodeType'> {
  nodeType: 'Expr_BinaryOp_Smaller';

}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedExprBinaryOpSmaller = Smaller;