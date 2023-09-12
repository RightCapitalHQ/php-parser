import type { AssignOp } from '../../../node/expr/assign-op'; // fullyQualifiedNodeName FullyQualifiedExprAssignOp


// eslint-disable-next-line @typescript-eslint/naming-convention
export interface BitwiseXor extends Omit<AssignOp, 'nodeType'> {
  nodeType: 'Expr_AssignOp_BitwiseXor';

}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedExprAssignOpBitwiseXor = BitwiseXor;