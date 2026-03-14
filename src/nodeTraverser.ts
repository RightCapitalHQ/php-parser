import { Node, NodeAbstract } from './node';
import {
  NodeVisitor,
  DONT_TRAVERSE_CHILDREN,
  STOP_TRAVERSAL,
  REMOVE_NODE,
  DONT_TRAVERSE_CURRENT_AND_CHILDREN,
  REPLACE_WITH_NULL,
} from './nodeVisitor';
import { Expr } from './node/expr';
import { Stmt } from './node/stmt';

export class NodeTraverser {
  protected visitors: NodeVisitor[] = [];
  protected stopTraversal: boolean = false;

  constructor(...visitors: NodeVisitor[]) {
    this.visitors = visitors;
  }

  addVisitor(visitor: NodeVisitor): void {
    this.visitors.push(visitor);
  }

  removeVisitor(visitor: NodeVisitor): void {
    const index = this.visitors.indexOf(visitor);
    if (index !== -1) {
      this.visitors.splice(index, 1);
    }
  }

  traverse(nodes: Node[]): Node[] {
    this.stopTraversal = false;

    for (const visitor of this.visitors) {
      const result = visitor.beforeTraverse(nodes);
      if (result !== null) {
        nodes = result;
      }
    }

    nodes = this.traverseArray(nodes);

    for (let i = this.visitors.length - 1; i >= 0; i--) {
      const result = this.visitors[i].afterTraverse(nodes);
      if (result !== null) {
        nodes = result;
      }
    }

    return nodes;
  }

  protected traverseNode(node: Node): void {
    for (const rawName of node.getSubNodeNames()) {
      const name = resolvePropertyName(node, rawName);
      const subNode = node[name];

      if (Array.isArray(subNode)) {
        node[name] = this.traverseArray(subNode);
        if (this.stopTraversal) break;
        continue;
      }

      if (!isNode(subNode)) continue;

      let currentSubNode: Node = subNode;
      let traverseChildren = true;
      let visitorIndex = -1;

      for (visitorIndex = 0; visitorIndex < this.visitors.length; visitorIndex++) {
        const visitor = this.visitors[visitorIndex];
        const ret = visitor.enterNode(currentSubNode);
        if (ret !== null) {
          if (isNode(ret)) {
            this.ensureReplacementReasonable(currentSubNode, ret);
            currentSubNode = ret;
            node[name] = ret;
          } else if (ret === DONT_TRAVERSE_CHILDREN) {
            traverseChildren = false;
          } else if (ret === DONT_TRAVERSE_CURRENT_AND_CHILDREN) {
            traverseChildren = false;
            break;
          } else if (ret === STOP_TRAVERSAL) {
            this.stopTraversal = true;
            return;
          } else if (ret === REPLACE_WITH_NULL) {
            node[name] = null;
            continue;
          }
        }
      }

      if (traverseChildren) {
        this.traverseNode(currentSubNode);
        if (this.stopTraversal) break;
      }

      for (visitorIndex--; visitorIndex >= 0; visitorIndex--) {
        const visitor = this.visitors[visitorIndex];
        const ret = visitor.leaveNode(currentSubNode);
        if (ret !== null) {
          if (isNode(ret)) {
            this.ensureReplacementReasonable(currentSubNode, ret);
            currentSubNode = ret;
            node[name] = ret;
          } else if (ret === STOP_TRAVERSAL) {
            this.stopTraversal = true;
            return;
          } else if (ret === REPLACE_WITH_NULL) {
            node[name] = null;
            break;
          } else if (Array.isArray(ret)) {
            throw new Error(
              'leaveNode() may only return an array if the parent structure is an array'
            );
          }
        }
      }
    }
  }

  protected traverseArray(nodes: Node[]): Node[] {
    const doNodes: [number, Node[]][] = [];

    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];

      if (!isNode(node)) {
        if (Array.isArray(node)) {
          throw new Error('Invalid node structure: Contains nested arrays');
        }
        continue;
      }

      let traverseChildren = true;
      let visitorIndex = -1;

      for (visitorIndex = 0; visitorIndex < this.visitors.length; visitorIndex++) {
        const visitor = this.visitors[visitorIndex];
        const ret = visitor.enterNode(node);
        if (ret !== null) {
          if (isNode(ret)) {
            this.ensureReplacementReasonable(node, ret);
            nodes[i] = node = ret;
          } else if (Array.isArray(ret)) {
            doNodes.push([i, ret]);
            continue;
          } else if (ret === REMOVE_NODE) {
            doNodes.push([i, []]);
            continue;
          } else if (ret === DONT_TRAVERSE_CHILDREN) {
            traverseChildren = false;
          } else if (ret === DONT_TRAVERSE_CURRENT_AND_CHILDREN) {
            traverseChildren = false;
            break;
          } else if (ret === STOP_TRAVERSAL) {
            this.stopTraversal = true;
            break;
          } else if (ret === REPLACE_WITH_NULL) {
            throw new Error(
              'REPLACE_WITH_NULL can not be used if the parent structure is an array'
            );
          }
        }
      }

      if (this.stopTraversal) break;

      if (traverseChildren) {
        this.traverseNode(node);
        if (this.stopTraversal) break;
      }

      for (visitorIndex--; visitorIndex >= 0; visitorIndex--) {
        const visitor = this.visitors[visitorIndex];
        const ret = visitor.leaveNode(node);
        if (ret !== null) {
          if (isNode(ret)) {
            this.ensureReplacementReasonable(node, ret);
            nodes[i] = node = ret;
          } else if (Array.isArray(ret)) {
            doNodes.push([i, ret]);
            break;
          } else if (ret === REMOVE_NODE) {
            doNodes.push([i, []]);
            break;
          } else if (ret === STOP_TRAVERSAL) {
            this.stopTraversal = true;
            break;
          } else if (ret === REPLACE_WITH_NULL) {
            throw new Error(
              'REPLACE_WITH_NULL can not be used if the parent structure is an array'
            );
          }
        }
      }
    }

    if (doNodes.length > 0) {
      while (doNodes.length > 0) {
        const [i, replace] = doNodes.pop()!;
        nodes.splice(i, 1, ...replace);
      }
    }

    return nodes;
  }

  private ensureReplacementReasonable(oldNode: Node, newNode: Node): void {
    if (oldNode instanceof Stmt && newNode instanceof Expr) {
      throw new Error(
        `Trying to replace statement (${oldNode.getType()}) ` +
        `with expression (${newNode.getType()}). Are you missing a ` +
        `Stmt_Expression wrapper?`
      );
    }
    if (oldNode instanceof Expr && newNode instanceof Stmt) {
      throw new Error(
        `Trying to replace expression (${oldNode.getType()}) ` +
        `with statement (${newNode.getType()})`
      );
    }
  }
}

function isNode(value: any): value is Node {
  return value !== null && typeof value === 'object' && typeof value.getType === 'function' && typeof value.getSubNodeNames === 'function';
}

// Resolve sub-node property name - handles cases where property names
// conflict with reserved words (e.g., 'class' -> 'class_')
function resolvePropertyName(node: any, name: string): string {
  if (node[name] !== undefined || !(name + '_' in node)) return name;
  return name + '_';
}
