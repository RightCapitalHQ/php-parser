import { Node } from '../node';
import { ComplexType } from './complexType';

export class NullableType extends ComplexType {
  public type: Node;

  constructor(type: Node, attributes: Record<string, any> = {}) {
    super(attributes);
    this.type = type;
  }

  getSubNodeNames(): string[] {
    return ['type'];
  }

  getType(): string {
    return 'NullableType';
  }
}
