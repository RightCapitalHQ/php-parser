import { Node } from '../node';
import { ComplexType } from './complexType';

export class UnionType extends ComplexType {
  public types: Node[];

  constructor(types: Node[], attributes: Record<string, any> = {}) {
    super(attributes);
    this.types = types;
  }

  getSubNodeNames(): string[] {
    return ['types'];
  }

  getType(): string {
    return 'UnionType';
  }
}
