import { NodeAbstract, Node } from '../node';
import { VarLikeIdentifier } from './identifier';

export class PropertyItem extends NodeAbstract {
  public name: Node;
  public default: Node | null;

  constructor(name: string | Node, defaultValue: Node | null = null, attributes: Record<string, any> = {}) {
    super(attributes);
    this.name = typeof name === 'string' ? new VarLikeIdentifier(name) : name;
    this.default = defaultValue;
  }

  getSubNodeNames(): string[] {
    return ['name', 'default'];
  }

  getType(): string {
    return 'PropertyItem';
  }
}
