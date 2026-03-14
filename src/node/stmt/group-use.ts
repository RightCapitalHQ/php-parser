import { Stmt } from '../stmt';

export class GroupUse extends Stmt {
  public type: number;
  public prefix: any;
  public uses: any[];

  constructor(
    prefix: any,
    uses: any[],
    type: number = 1, // Use_::TYPE_NORMAL
    attributes: Record<string, any> = {}
  ) {
    super(attributes);
    this.type = type;
    this.prefix = prefix;
    this.uses = uses;
  }

  getSubNodeNames(): string[] {
    return ['type', 'prefix', 'uses'];
  }

  getType(): string {
    return 'Stmt_GroupUse';
  }
}
