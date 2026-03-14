import { NodeAbstract, Node } from '../node';
import { Identifier } from './identifier';

export class DeclareItem extends NodeAbstract {
  public key: Node;
  public value: Node;

  constructor(key: string | Node, value: Node, attributes: Record<string, any> = {}) {
    super(attributes);
    this.key = typeof key === 'string' ? new Identifier(key) : key;
    this.value = value;
  }

  getSubNodeNames(): string[] {
    return ['key', 'value'];
  }

  getType(): string {
    return 'DeclareItem';
  }
}
