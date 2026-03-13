import { NodeAbstract, Node } from '../node';

export class StaticVar extends NodeAbstract {
  public var: Node;
  public default: Node | null;

  constructor(varNode: Node, defaultValue: Node | null = null, attributes: Record<string, any> = {}) {
    super(attributes);
    this.var = varNode;
    this.default = defaultValue;
  }

  getSubNodeNames(): string[] {
    return ['var', 'default'];
  }

  getType(): string {
    return 'StaticVar';
  }
}
