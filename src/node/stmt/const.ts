import { Stmt } from '../stmt';

export class Const_ extends Stmt {
  public consts: any[];
  public attrGroups: any[];

  constructor(consts: any[], attributes: Record<string, any> = {}, attrGroups: any[] = []) {
    super(attributes);
    this.attrGroups = attrGroups;
    this.consts = consts;
  }

  getSubNodeNames(): string[] {
    return ['attrGroups', 'consts'];
  }

  getType(): string {
    return 'Stmt_Const';
  }
}
