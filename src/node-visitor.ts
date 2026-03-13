import { Node } from './node';

export const DONT_TRAVERSE_CHILDREN = 1;
export const STOP_TRAVERSAL = 2;
export const REMOVE_NODE = 3;
export const DONT_TRAVERSE_CURRENT_AND_CHILDREN = 4;
export const REPLACE_WITH_NULL = 5;

export interface NodeVisitor {
  beforeTraverse(nodes: Node[]): Node[] | null;
  enterNode(node: Node): Node | Node[] | number | null;
  leaveNode(node: Node): Node | Node[] | number | null;
  afterTraverse(nodes: Node[]): Node[] | null;
}

export abstract class NodeVisitorAbstract implements NodeVisitor {
  beforeTraverse(nodes: Node[]): Node[] | null {
    return null;
  }

  enterNode(node: Node): Node | Node[] | number | null {
    return null;
  }

  leaveNode(node: Node): Node | Node[] | number | null {
    return null;
  }

  afterTraverse(nodes: Node[]): Node[] | null {
    return null;
  }
}
