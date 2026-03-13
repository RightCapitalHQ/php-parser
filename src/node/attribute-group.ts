import { NodeAbstract, Node } from '../node';

export class AttributeGroup extends NodeAbstract {
  public attrs: Node[];

  constructor(attrs: Node[], attributes: Record<string, any> = {}) {
    super(attributes);
    this.attrs = attrs;
  }

  getSubNodeNames(): string[] {
    return ['attrs'];
  }

  getType(): string {
    return 'AttributeGroup';
  }
}
