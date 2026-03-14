import { MagicConst } from '../magic-const';

export class Class_ extends MagicConst {
  getName(): string { return '__CLASS__'; }
  getType(): string { return 'Scalar_MagicConst_Class'; }
}
