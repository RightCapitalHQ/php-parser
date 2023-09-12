import type { MagicConst } from '../../../node/scalar/magic-const'; // fullyQualifiedNodeName FullyQualifiedScalarMagicConst


// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Trait_ extends Omit<MagicConst, 'nodeType'> {
  nodeType: 'Scalar_MagicConst_Trait';

}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedScalarMagicConstTrait = Trait_;