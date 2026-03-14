import { ClassLike } from './classLike';

export class Enum_ extends ClassLike {
  public scalarType: any | null;
  public implements: any[];

  constructor(
    name: any | null,
    subNodes: {
      scalarType?: any | null;
      implements?: any[];
      stmts?: any[];
      attrGroups?: any[];
    } = {},
    attributes: Record<string, any> = {}
  ) {
    super(attributes);
    this.name = typeof name === 'string' ? { name, toString: () => name, toLowerString: () => name.toLowerCase() } : name;
    this.scalarType = subNodes.scalarType ?? null;
    this.implements = subNodes.implements ?? [];
    this.stmts = subNodes.stmts ?? [];
    this.attrGroups = subNodes.attrGroups ?? [];
  }

  getSubNodeNames(): string[] {
    return ['attrGroups', 'name', 'scalarType', 'implements', 'stmts'];
  }

  getType(): string {
    return 'Stmt_Enum';
  }
}
