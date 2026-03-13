import { Scalar } from '../scalar';

export abstract class MagicConst extends Scalar {
  constructor(attributes: Record<string, any> = {}) {
    super(attributes);
  }

  getSubNodeNames(): string[] {
    return [];
  }

  abstract getName(): string;
}
