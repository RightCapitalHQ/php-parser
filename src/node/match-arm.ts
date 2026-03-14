import { NodeAbstract, Node } from '../node';

export class MatchArm extends NodeAbstract {
  public conds: Node[] | null;
  public body: Node;

  constructor(conds: Node[] | null, body: Node, attributes: Record<string, any> = {}) {
    super(attributes);
    this.conds = conds;
    this.body = body;
  }

  getSubNodeNames(): string[] {
    return ['conds', 'body'];
  }

  getType(): string {
    return 'MatchArm';
  }
}
