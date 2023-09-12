import type { NodeAbstract } from '../node'; // fullyQualifiedNodeName NodeAbstract


// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Name extends Omit<NodeAbstract, 'nodeType'> {
  nodeType: 'Name';

  ["parts"] : string[];
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedName = Name;