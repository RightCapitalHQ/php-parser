import { MagicConst } from '../magicConst';

export class Line extends MagicConst {
  getName(): string { return '__LINE__'; }
  getType(): string { return 'Scalar_MagicConst_Line'; }
}
