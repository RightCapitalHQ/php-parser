import { Use_ } from '../node/stmt/use';
import { UseItem } from '../node/use-item';
import { Name } from '../node/name';
import { Identifier } from '../node/identifier';

export class UseBuilder {
  protected name: Name;
  protected type: number = Use_.TYPE_NORMAL;
  protected alias: string | null = null;

  constructor(name: string | Name) {
    this.name = typeof name === 'string' ? new Name(name) : name;
  }

  as(alias: string): this {
    this.alias = alias;
    return this;
  }

  asFunction(): this {
    this.type = Use_.TYPE_FUNCTION;
    return this;
  }

  asConstant(): this {
    this.type = Use_.TYPE_CONSTANT;
    return this;
  }

  getNode(): Use_ {
    const alias = this.alias !== null ? new Identifier(this.alias) : null;
    const useItem = new UseItem(this.name, alias, Use_.TYPE_UNKNOWN);
    return new Use_([useItem], this.type);
  }
}
