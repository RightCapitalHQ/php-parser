import type { TraitUseAdaptation } from '../../../node/stmt/trait-use-adaptation'; // fullyQualifiedNodeName FullyQualifiedStmtTraitUseAdaptation

import type { NodeTypeInheritingFromFullyQualifiedIdentifier } from "../../../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Alias extends Omit<TraitUseAdaptation, 'nodeType'> {
  nodeType: 'Stmt_TraitUseAdaptation_Alias';

  ["newModifier"] : null | number;
  ["newName"] : null | NodeTypeInheritingFromFullyQualifiedIdentifier;
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedStmtTraitUseAdaptationAlias = Alias;