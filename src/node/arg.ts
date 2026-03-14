import { NodeAbstract, Node } from '../node';

export class Arg extends NodeAbstract {
  public name: Node | null;
  public value: Node;
  public byRef: boolean;
  public unpack: boolean;

  constructor(
    value: Node,
    byRef: boolean = false,
    unpack: boolean = false,
    attributes: Record<string, any> = {},
    name: Node | null = null,
  ) {
    super(attributes);
    this.name = name;
    this.value = value;
    this.byRef = byRef;
    this.unpack = unpack;
  }

  getSubNodeNames(): string[] {
    return ['name', 'value', 'byRef', 'unpack'];
  }

  getType(): string {
    return 'Arg';
  }
}
