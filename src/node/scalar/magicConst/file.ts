import { MagicConst } from '../magicConst';

export class File extends MagicConst {
  getName(): string { return '__FILE__'; }
  getType(): string { return 'Scalar_MagicConst_File'; }
}
