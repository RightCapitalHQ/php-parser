import type { Scalar } from '../../node/scalar'; // fullyQualifiedNodeName FullyQualifiedScalar

import type { NodeTypeInheritingFromFullyQualifiedExpr } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedInterpolatedStringPart } from "../../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface InterpolatedString extends Omit<Scalar, 'nodeType'> {
  nodeType: 'Scalar_InterpolatedString';

  ["parts"] : (NodeTypeInheritingFromFullyQualifiedExpr | NodeTypeInheritingFromFullyQualifiedInterpolatedStringPart)[];
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedScalarInterpolatedString = InterpolatedString;