import type { Stmt } from '../../node/stmt'; // fullyQualifiedNodeName FullyQualifiedStmt


// eslint-disable-next-line @typescript-eslint/naming-convention
export interface InlineHTML extends Omit<Stmt, 'nodeType'> {
  nodeType: 'Stmt_InlineHTML';

  ["value"] : string;
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedStmtInlineHtml = InlineHTML;