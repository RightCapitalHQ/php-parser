import type { Name } from '../../node/name'; // fullyQualifiedNodeName FullyQualifiedName


// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Relative extends Omit<Name, 'nodeType'> {
  nodeType: 'Name_Relative';

}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedNameRelative = Relative;