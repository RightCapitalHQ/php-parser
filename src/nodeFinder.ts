import { Node } from './node';
import { NodeTraverser } from './nodeTraverser';
import { NodeVisitorAbstract, STOP_TRAVERSAL } from './nodeVisitor';

export class NodeFinder {
  find(nodes: Node | Node[], filter: (node: Node) => boolean): Node[] {
    if (!Array.isArray(nodes)) {
      nodes = [nodes];
    }
    const foundNodes: Node[] = [];
    const traverser = new NodeTraverser(new class extends NodeVisitorAbstract {
      enterNode(node: Node) {
        if (filter(node)) {
          foundNodes.push(node);
        }
        return null;
      }
    });
    traverser.traverse(nodes);
    return foundNodes;
  }

  findInstanceOf(nodes: Node | Node[], className: new (...args: any[]) => Node): Node[] {
    return this.find(
      Array.isArray(nodes) ? nodes : [nodes],
      (node) => node instanceof className
    );
  }

  findFirst(nodes: Node | Node[], filter: (node: Node) => boolean): Node | null {
    if (!Array.isArray(nodes)) {
      nodes = [nodes];
    }
    let foundNode: Node | null = null;
    const traverser = new NodeTraverser(new class extends NodeVisitorAbstract {
      enterNode(node: Node) {
        if (filter(node)) {
          foundNode = node;
          return STOP_TRAVERSAL;
        }
        return null;
      }
    });
    traverser.traverse(nodes);
    return foundNode;
  }

  findFirstInstanceOf(nodes: Node | Node[], className: new (...args: any[]) => Node): Node | null {
    return this.findFirst(
      Array.isArray(nodes) ? nodes : [nodes],
      (node) => node instanceof className
    );
  }
}
