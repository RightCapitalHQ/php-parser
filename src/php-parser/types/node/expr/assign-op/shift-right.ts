import type { AssignOp } from '../../../node/expr/assign-op'; // fullyQualifiedNodeName FullyQualifiedExprAssignOp


// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ShiftRight extends Omit<AssignOp, 'nodeType'> {
  nodeType: 'Expr_AssignOp_ShiftRight';

}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedExprAssignOpShiftRight = ShiftRight;