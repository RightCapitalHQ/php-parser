import type { Expr } from './expr'; // fullyQualifiedNodeName FullyQualifiedExpr


// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Scalar extends Omit<Expr, 'nodeType'> {

}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedScalar = Scalar;