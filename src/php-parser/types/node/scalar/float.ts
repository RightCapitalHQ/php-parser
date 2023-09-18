import type { Scalar } from '../../node/scalar'; // fullyQualifiedNodeName FullyQualifiedScalar


// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Float_ extends Omit<Scalar, 'nodeType'> {
  nodeType: 'Scalar_Float';

  ["value"] : number;
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedScalarFloat = Float_;