import { TraitUseAdaptation } from '../traitUseAdaptation';

export class Precedence extends TraitUseAdaptation {
  public insteadof: any[];

  constructor(
    trait: any,
    method: any,
    insteadof: any[],
    attributes: Record<string, any> = {}
  ) {
    super(attributes);
    this.trait = trait;
    this.method = typeof method === 'string' ? { name: method, toString: () => method, toLowerString: () => method.toLowerCase() } : method;
    this.insteadof = insteadof;
  }

  getSubNodeNames(): string[] {
    return ['trait', 'method', 'insteadof'];
  }

  getType(): string {
    return 'Stmt_TraitUseAdaptation_Precedence';
  }
}
