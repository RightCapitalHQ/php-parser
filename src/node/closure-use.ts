import { NodeAbstract, Node } from '../node';

export class ClosureUse extends NodeAbstract {
  public var: Node;
  public byRef: boolean;

  constructor(varNode: Node, byRef: boolean = false, attributes: Record<string, any> = {}) {
    super(attributes);
    this.var = varNode;
    this.byRef = byRef;
  }

  getSubNodeNames(): string[] {
    return ['var', 'byRef'];
  }

  getType(): string {
    return 'ClosureUse';
  }
}
