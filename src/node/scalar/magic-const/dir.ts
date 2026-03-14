import { MagicConst } from '../magic-const';

export class Dir extends MagicConst {
  getName(): string { return '__DIR__'; }
  getType(): string { return 'Scalar_MagicConst_Dir'; }
}
