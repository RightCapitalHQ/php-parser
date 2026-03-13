import { NodeAbstract, Node } from '../node';
import { Identifier } from './identifier';
import { Modifiers } from '../modifiers';

export class PropertyHook extends NodeAbstract {
  public attrGroups: Node[];
  public flags: number;
  public byRef: boolean;
  public name: Node;
  public params: Node[];
  public body: Node | Node[] | null;

  constructor(
    name: string | Node,
    body: Node | Node[] | null,
    subNodes: Record<string, any> = {},
    attributes: Record<string, any> = {},
  ) {
    super(attributes);
    this.name = typeof name === 'string' ? new Identifier(name) : name;
    this.body = body;
    this.flags = subNodes['flags'] ?? 0;
    this.byRef = subNodes['byRef'] ?? false;
    this.params = subNodes['params'] ?? [];
    this.attrGroups = subNodes['attrGroups'] ?? [];
  }

  returnsByRef(): boolean {
    return this.byRef;
  }

  getParams(): Node[] {
    return this.params;
  }

  getReturnType(): null {
    return null;
  }

  isFinal(): boolean {
    return !!(this.flags & Modifiers.FINAL);
  }

  getAttrGroups(): Node[] {
    return this.attrGroups;
  }

  getSubNodeNames(): string[] {
    return ['attrGroups', 'flags', 'byRef', 'name', 'params', 'body'];
  }

  getType(): string {
    return 'PropertyHook';
  }
}
