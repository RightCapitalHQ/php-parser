import { MagicConst } from '../magic-const';

export class Function_ extends MagicConst {
  getName(): string { return '__FUNCTION__'; }
  getType(): string { return 'Scalar_MagicConst_Function'; }
}
