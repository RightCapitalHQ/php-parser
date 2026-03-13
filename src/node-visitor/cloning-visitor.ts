import { Node, NodeAbstract } from '../node';
import { NodeVisitorAbstract } from '../node-visitor';

export class CloningVisitor extends NodeVisitorAbstract {
  enterNode(node: Node): Node | null {
    // Clone the node by creating a new object with the same prototype and properties
    const clone = Object.create(Object.getPrototypeOf(node));
    const subNodeNames = node.getSubNodeNames();

    // Copy attributes
    if (node instanceof NodeAbstract) {
      clone.attributes = { ...(node as any).attributes };
    }

    // Deep clone sub-nodes
    for (const name of subNodeNames) {
      // Handle property names that conflict with reserved words (e.g., 'class' -> 'class_')
      const propName = (node as any)[name] !== undefined ? name : (name + '_' in (node as any) ? name + '_' : name);
      const value = (node as any)[propName];
      clone[propName] = this.deepClone(value);
    }

    return clone;
  }

  private deepClone(value: any): any {
    if (value === null || value === undefined) return value;
    if (typeof value !== 'object') return value;
    if (Array.isArray(value)) return value.map((item: any) => this.deepClone(item));
    // Node objects are handled by the traverser visiting them
    if (typeof value.getType === 'function' && typeof value.getSubNodeNames === 'function') {
      return value; // Will be cloned by the traverser
    }
    // Plain objects
    return { ...value };
  }
}
