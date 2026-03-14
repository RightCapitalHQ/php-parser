import { MagicConst } from '../magicConst';

export class Method extends MagicConst {
  getName(): string { return '__METHOD__'; }
  getType(): string { return 'Scalar_MagicConst_Method'; }
}
