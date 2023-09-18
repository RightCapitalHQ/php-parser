import type { Expr } from '../../node/expr'; // fullyQualifiedNodeName FullyQualifiedExpr

import type { NodeTypeInheritingFromFullyQualifiedParam } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedClosureUse } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedIdentifier } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedName } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedComplexType } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedStmt } from "../../types";
import type { NodeTypeInheritingFromFullyQualifiedAttributeGroup } from "../../types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Closure extends Omit<Expr, 'nodeType'> {
  nodeType: 'Expr_Closure';

  ["static"] : boolean;
  ["byRef"] : boolean;
  ["params"] : NodeTypeInheritingFromFullyQualifiedParam[];
  ["uses"] : NodeTypeInheritingFromFullyQualifiedClosureUse[];
  ["returnType"] : null | NodeTypeInheritingFromFullyQualifiedIdentifier | NodeTypeInheritingFromFullyQualifiedName | NodeTypeInheritingFromFullyQualifiedComplexType;
  ["stmts"] : NodeTypeInheritingFromFullyQualifiedStmt[];
  ["attrGroups"] : NodeTypeInheritingFromFullyQualifiedAttributeGroup[];
}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedExprClosure = Closure;