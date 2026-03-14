import { MagicConst } from '../magic-const';

export class Namespace_ extends MagicConst {
  getName(): string { return '__NAMESPACE__'; }
  getType(): string { return 'Scalar_MagicConst_Namespace'; }
}
