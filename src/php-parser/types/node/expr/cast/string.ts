import type { Cast } from '../../../node/expr/cast'; // fullyQualifiedNodeName FullyQualifiedExprCast


// eslint-disable-next-line @typescript-eslint/naming-convention
export interface String_ extends Omit<Cast, 'nodeType'> {
  nodeType: 'Expr_Cast_String';

}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedExprCastString = String_;