import { ClassLike } from './classLike';

export class Interface_ extends ClassLike {
  public extends: any[];

  constructor(
    name: any,
    subNodes: {
      extends?: any[];
      stmts?: any[];
      attrGroups?: any[];
    } = {},
    attributes: Record<string, any> = {}
  ) {
    super(attributes);
    this.name = typeof name === 'string' ? { name, toString: () => name, toLowerString: () => name.toLowerCase() } : name;
    this.extends = subNodes.extends ?? [];
    this.stmts = subNodes.stmts ?? [];
    this.attrGroups = subNodes.attrGroups ?? [];
  }

  getSubNodeNames(): string[] {
    return ['attrGroups', 'name', 'extends', 'stmts'];
  }

  getType(): string {
    return 'Stmt_Interface';
  }
}
