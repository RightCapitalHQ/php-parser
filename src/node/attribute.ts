import { NodeAbstract, Node } from '../node';

export class Attribute extends NodeAbstract {
  public name: Node;
  public args: Node[];

  constructor(name: Node, args: Node[] = [], attributes: Record<string, any> = {}) {
    super(attributes);
    this.name = name;
    this.args = args;
  }

  getSubNodeNames(): string[] {
    return ['name', 'args'];
  }

  getType(): string {
    return 'Attribute';
  }
}
