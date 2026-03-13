import { NodeAbstract, Node } from '../node';
import { Identifier } from './identifier';
import { Name } from './name';

export const USE_TYPE_UNKNOWN = 0;
export const USE_TYPE_NORMAL = 1;
export const USE_TYPE_FUNCTION = 2;
export const USE_TYPE_CONSTANT = 3;

export class UseItem extends NodeAbstract {
  public type: number;
  public name: Node;
  public alias: Node | null;

  constructor(
    name: Node,
    alias: string | Node | null = null,
    type: number = USE_TYPE_UNKNOWN,
    attributes: Record<string, any> = {},
  ) {
    super(attributes);
    this.type = type;
    this.name = name;
    this.alias = typeof alias === 'string' ? new Identifier(alias) : alias;
  }

  getSubNodeNames(): string[] {
    return ['type', 'name', 'alias'];
  }

  getAlias(): Node {
    if (this.alias !== null) {
      return this.alias;
    }
    return new Identifier((this.name as Name).getLast());
  }

  getType(): string {
    return 'UseItem';
  }
}
