import { MagicConst } from '../magic-const';

export class Property extends MagicConst {
  getName(): string { return '__PROPERTY__'; }
  getType(): string { return 'Scalar_MagicConst_Property'; }
}
