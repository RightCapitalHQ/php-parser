import type { AssignOp } from '../../../node/expr/assign-op'; // fullyQualifiedNodeName FullyQualifiedExprAssignOp


// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Concat extends Omit<AssignOp, 'nodeType'> {
  nodeType: 'Expr_AssignOp_Concat';

}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedExprAssignOpConcat = Concat;