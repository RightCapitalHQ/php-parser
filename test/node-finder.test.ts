import { describe, it, expect } from 'vitest';
import { ParserFactory } from '../src/parser-factory';
import { NodeFinder } from '../src/node-finder';
import { Node } from '../src/node';

describe('NodeFinder', () => {
  const factory = new ParserFactory();
  const parser = factory.createForNewestSupportedVersion();
  const finder = new NodeFinder();

  it('should find nodes matching filter', () => {
    const ast = parser.parse('<?php $a = 1; $b = 2; $c = 3;');
    expect(ast).not.toBeNull();

    const exprs = finder.find(ast!, (node: Node) => node.getType() === 'Stmt_Expression');
    expect(exprs.length).toBe(3);
  });

  it('should find first matching node', () => {
    const ast = parser.parse('<?php $a = 1; $b = 2;');
    expect(ast).not.toBeNull();

    const first = finder.findFirst(ast!, (node: Node) => node.getType() === 'Stmt_Expression');
    expect(first).not.toBeNull();
    expect(first!.getType()).toBe('Stmt_Expression');
  });

  it('should return null when no match found', () => {
    const ast = parser.parse('<?php echo "hello";');
    expect(ast).not.toBeNull();

    const result = finder.findFirst(ast!, (node: Node) => node.getType() === 'Stmt_Class');
    expect(result).toBeNull();
  });

  it('should find nested nodes', () => {
    const ast = parser.parse('<?php function foo() { $x = 1; $y = 2; }');
    expect(ast).not.toBeNull();

    const assigns = finder.find(ast!, (node: Node) => node.getType() === 'Expr_Assign');
    expect(assigns.length).toBe(2);
  });

  it('should work with single node input', () => {
    const ast = parser.parse('<?php $x = 1;');
    expect(ast).not.toBeNull();

    const result = finder.find(ast![0], (node: Node) => node.getType() === 'Expr_Assign');
    expect(result.length).toBe(1);
  });

  it('should find all variables', () => {
    const ast = parser.parse('<?php $a = $b + $c;');
    expect(ast).not.toBeNull();

    const vars = finder.find(ast!, (node: Node) => node.getType() === 'Expr_Variable');
    expect(vars.length).toBe(3);
  });
});
