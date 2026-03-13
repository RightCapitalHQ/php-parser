import { Stmt } from '../stmt';

export class TraitUse extends Stmt {
  public traits: any[];
  public adaptations: any[];

  constructor(traits: any[], adaptations: any[] = [], attributes: Record<string, any> = {}) {
    super(attributes);
    this.traits = traits;
    this.adaptations = adaptations;
  }

  getSubNodeNames(): string[] {
    return ['traits', 'adaptations'];
  }

  getType(): string {
    return 'Stmt_TraitUse';
  }
}
