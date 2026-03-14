import { Stmt } from '../stmt';

export class For_ extends Stmt {
  public init: any[];
  public cond: any[];
  public loop: any[];
  public stmts: any[];

  constructor(
    subNodes: {
      init?: any[];
      cond?: any[];
      loop?: any[];
      stmts?: any[];
    } = {},
    attributes: Record<string, any> = {}
  ) {
    super(attributes);
    this.init = subNodes.init ?? [];
    this.cond = subNodes.cond ?? [];
    this.loop = subNodes.loop ?? [];
    this.stmts = subNodes.stmts ?? [];
  }

  getSubNodeNames(): string[] {
    return ['init', 'cond', 'loop', 'stmts'];
  }

  getType(): string {
    return 'Stmt_For';
  }
}
