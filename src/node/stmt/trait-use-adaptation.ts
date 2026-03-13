import { Stmt } from '../stmt';

export abstract class TraitUseAdaptation extends Stmt {
  public trait: any | null = null;
  public method: any = null;
}
