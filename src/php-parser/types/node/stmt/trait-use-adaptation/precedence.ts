import type { TraitUseAdaptation } from '../../../node/stmt/trait-use-adaptation'; // fullyQualifiedNodeName FullyQualifiedStmtTraitUseAdaptation

import type { NodeTypeInheritingFromFullyQualifiedName } from "../../../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Precedence extends Omit<TraitUseAdaptation, 'nodeType'> {
  nodeType: 'Stmt_TraitUseAdaptation_Precedence';

  ["insteadof"] : NodeTypeInheritingFromFullyQualifiedName[];
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedStmtTraitUseAdaptationPrecedence = Precedence;