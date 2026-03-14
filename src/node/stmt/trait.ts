import { ClassLike } from './classLike';

export class Trait_ extends ClassLike {
  constructor(
    name: any,
    subNodes: {
      stmts?: any[];
      attrGroups?: any[];
    } = {},
    attributes: Record<string, any> = {}
  ) {
    super(attributes);
    this.name = typeof name === 'string' ? { name, toString: () => name, toLowerString: () => name.toLowerCase() } : name;
    this.stmts = subNodes.stmts ?? [];
    this.attrGroups = subNodes.attrGroups ?? [];
  }

  getSubNodeNames(): string[] {
    return ['attrGroups', 'name', 'stmts'];
  }

  getType(): string {
    return 'Stmt_Trait';
  }
}
