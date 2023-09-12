import type { Scalar } from '../../node/scalar'; // fullyQualifiedNodeName FullyQualifiedScalar


// eslint-disable-next-line @typescript-eslint/naming-convention
export interface DNumber extends Omit<Scalar, 'nodeType'> {
  nodeType: 'Scalar_DNumber';

  ["value"] : number;
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedScalarDNumber = DNumber;