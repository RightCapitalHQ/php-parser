import { EnumCase } from '../node/stmt/enum-case';
import { Node } from '../node';

export class EnumCaseBuilder {
  protected name: string;
  protected value: Node | null = null;
  protected attrGroups: any[] = [];

  constructor(name: string) {
    this.name = name;
  }

  setValue(value: Node): this {
    this.value = value;
    return this;
  }

  addAttribute(attrGroup: any): this {
    this.attrGroups.push(attrGroup);
    return this;
  }

  getNode(): EnumCase {
    return new EnumCase(this.name, this.value, this.attrGroups);
  }
}
