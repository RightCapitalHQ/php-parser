import { NodeAbstract, Node } from '../node';
import { Identifier } from './identifier';

export class Const_ extends NodeAbstract {
  public name: Node;
  public value: Node;
  public namespacedName: Node | null = null;

  constructor(name: string | Node, value: Node, attributes: Record<string, any> = {}) {
    super(attributes);
    this.name = typeof name === 'string' ? new Identifier(name) : name;
    this.value = value;
  }

  getSubNodeNames(): string[] {
    return ['name', 'value'];
  }

  getType(): string {
    return 'Const';
  }
}
