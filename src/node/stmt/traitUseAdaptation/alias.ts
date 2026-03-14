import { TraitUseAdaptation } from '../traitUseAdaptation';

export class Alias extends TraitUseAdaptation {
  public newModifier: number | null;
  public newName: any | null;

  constructor(
    trait: any | null,
    method: any,
    newModifier: number | null,
    newName: any | null,
    attributes: Record<string, any> = {}
  ) {
    super(attributes);
    this.trait = trait;
    this.method = typeof method === 'string' ? { name: method, toString: () => method, toLowerString: () => method.toLowerCase() } : method;
    this.newModifier = newModifier;
    this.newName = typeof newName === 'string' ? { name: newName, toString: () => newName, toLowerString: () => newName.toLowerCase() } : newName;
  }

  getSubNodeNames(): string[] {
    return ['trait', 'method', 'newModifier', 'newName'];
  }

  getType(): string {
    return 'Stmt_TraitUseAdaptation_Alias';
  }
}
