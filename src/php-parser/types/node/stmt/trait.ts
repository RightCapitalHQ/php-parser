import type { ClassLike } from './class-like'; // fullyQualifiedNodeName FullyQualifiedStmtClassLike


// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Trait_ extends Omit<ClassLike, 'nodeType'> {
  nodeType: 'Stmt_Trait';

}

// We also need to export a symbol by using node type
// since the nodeName is possibly duplicated
// for the files need to import all nodes, we needs to use nodeType insteads
export type FullyQualifiedStmtTrait = Trait_;