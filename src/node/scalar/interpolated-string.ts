import { Scalar } from '../scalar';
import { Node } from '../../node';

export class InterpolatedString extends Scalar {
  public parts: Node[];

  constructor(parts: Node[], attributes: Record<string, any> = {}) {
    super(attributes);
    this.parts = parts;
  }

  getSubNodeNames(): string[] {
    return ['parts'];
  }

  getType(): string {
    return 'Scalar_InterpolatedString';
  }
}
