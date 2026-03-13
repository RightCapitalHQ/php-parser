import { NodeAbstract, Node } from '../node';

export class ArrayItem extends NodeAbstract {
  public key: Node | null;
  public value: Node;
  public byRef: boolean;
  public unpack: boolean;

  constructor(
    value: Node,
    key: Node | null = null,
    byRef: boolean = false,
    attributes: Record<string, any> = {},
    unpack: boolean = false,
  ) {
    super(attributes);
    this.key = key;
    this.value = value;
    this.byRef = byRef;
    this.unpack = unpack;
  }

  getSubNodeNames(): string[] {
    return ['key', 'value', 'byRef', 'unpack'];
  }

  getType(): string {
    return 'ArrayItem';
  }
}
