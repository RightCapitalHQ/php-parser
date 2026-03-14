import { describe, it, expect } from 'vitest';
import { ParserFactory } from '../src/parserFactory';
import { NodeTraverser } from '../src/nodeTraverser';
import { NodeVisitorAbstract, DONT_TRAVERSE_CHILDREN, STOP_TRAVERSAL, REMOVE_NODE } from '../src/nodeVisitor';
import { Node } from '../src/node';

describe('NodeTraverser', () => {
  const factory = new ParserFactory();
  const parser = factory.createForNewestSupportedVersion();

  it('should traverse all nodes', () => {
    const ast = parser.parse('<?php $x = 1 + 2;');
    expect(ast).not.toBeNull();

    const types: string[] = [];
    const traverser = new NodeTraverser();
    traverser.addVisitor(new class extends NodeVisitorAbstract {
      enterNode(node: Node) {
        types.push(node.getType());
        return null;
      }
    });
    traverser.traverse(ast!);
    expect(types.length).toBeGreaterThan(0);
    expect(types).toContain('Stmt_Expression');
  });

  it('should support DONT_TRAVERSE_CHILDREN', () => {
    const ast = parser.parse('<?php function foo() { return 1; }');
    expect(ast).not.toBeNull();

    const types: string[] = [];
    const traverser = new NodeTraverser();
    traverser.addVisitor(new class extends NodeVisitorAbstract {
      enterNode(node: Node) {
        types.push(node.getType());
        if (node.getType() === 'Stmt_Function') {
          return DONT_TRAVERSE_CHILDREN;
        }
        return null;
      }
    });
    traverser.traverse(ast!);
    expect(types).toContain('Stmt_Function');
    expect(types).not.toContain('Stmt_Return');
  });

  it('should support STOP_TRAVERSAL', () => {
    const ast = parser.parse('<?php $a = 1; $b = 2; $c = 3;');
    expect(ast).not.toBeNull();

    const types: string[] = [];
    const traverser = new NodeTraverser();
    traverser.addVisitor(new class extends NodeVisitorAbstract {
      enterNode(node: Node) {
        types.push(node.getType());
        if (types.length >= 2) {
          return STOP_TRAVERSAL;
        }
        return null;
      }
    });
    traverser.traverse(ast!);
    expect(types.length).toBe(2);
  });

  it('should support REMOVE_NODE in arrays', () => {
    const ast = parser.parse('<?php $a = 1; $b = 2; $c = 3;');
    expect(ast).not.toBeNull();
    expect(ast!.length).toBe(3);

    const traverser = new NodeTraverser();
    traverser.addVisitor(new class extends NodeVisitorAbstract {
      enterNode(node: Node) {
        if (node.getType() === 'Stmt_Expression') {
          const expr = (node as any).expr;
          if (expr && expr.getType() === 'Expr_Assign') {
            const v = expr.var;
            if (v && v.name === 'b') {
              return REMOVE_NODE;
            }
          }
        }
        return null;
      }
    });
    const result = traverser.traverse(ast!);
    expect(result.length).toBe(2);
  });

  it('should call beforeTraverse and afterTraverse', () => {
    const ast = parser.parse('<?php echo "hello";');
    expect(ast).not.toBeNull();

    let beforeCalled = false;
    let afterCalled = false;
    const traverser = new NodeTraverser();
    traverser.addVisitor(new class extends NodeVisitorAbstract {
      beforeTraverse(nodes: Node[]) {
        beforeCalled = true;
        return null;
      }
      afterTraverse(nodes: Node[]) {
        afterCalled = true;
        return null;
      }
    });
    traverser.traverse(ast!);
    expect(beforeCalled).toBe(true);
    expect(afterCalled).toBe(true);
  });

  it('should support multiple visitors', () => {
    const ast = parser.parse('<?php $x = 1;');
    expect(ast).not.toBeNull();

    const visitor1Types: string[] = [];
    const visitor2Types: string[] = [];

    const traverser = new NodeTraverser();
    traverser.addVisitor(new class extends NodeVisitorAbstract {
      enterNode(node: Node) {
        visitor1Types.push(node.getType());
        return null;
      }
    });
    traverser.addVisitor(new class extends NodeVisitorAbstract {
      enterNode(node: Node) {
        visitor2Types.push(node.getType());
        return null;
      }
    });
    traverser.traverse(ast!);
    expect(visitor1Types).toEqual(visitor2Types);
  });

  it('should support leaveNode', () => {
    const ast = parser.parse('<?php $x = 1;');
    expect(ast).not.toBeNull();

    const leaveTypes: string[] = [];
    const traverser = new NodeTraverser();
    traverser.addVisitor(new class extends NodeVisitorAbstract {
      leaveNode(node: Node) {
        leaveTypes.push(node.getType());
        return null;
      }
    });
    traverser.traverse(ast!);
    expect(leaveTypes.length).toBeGreaterThan(0);
  });

  it('should support removeVisitor', () => {
    const traverser = new NodeTraverser();
    const visitor = new class extends NodeVisitorAbstract {};
    traverser.addVisitor(visitor);
    traverser.removeVisitor(visitor);
    // Should not throw when traversing
    const ast = parser.parse('<?php echo 1;');
    traverser.traverse(ast!);
  });
});
