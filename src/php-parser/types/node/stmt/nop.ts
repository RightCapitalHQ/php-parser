import type { Stmt } from '../../node/stmt'; // fullyQualifiedNodeName FullyQualifiedStmt


// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Nop extends Omit<Stmt, 'nodeType'> {
  nodeType: 'Stmt_Nop';

}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedStmtNop = Nop;