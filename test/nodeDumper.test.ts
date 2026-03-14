import { describe, it, expect } from 'vitest';
import { ParserFactory } from '../src/parserFactory';
import { NodeDumper } from '../src/nodeDumper';

describe('NodeDumper', () => {
  const factory = new ParserFactory();
  const parser = factory.createForNewestSupportedVersion();
  const dumper = new NodeDumper();

  it('should dump echo statement', () => {
    const ast = parser.parse('<?php echo "hello";');
    const output = dumper.dump(ast);
    expect(output).toContain('Stmt_Echo');
    expect(output).toContain('hello');
  });

  it('should dump variable assignment', () => {
    const ast = parser.parse('<?php $x = 42;');
    const output = dumper.dump(ast);
    expect(output).toContain('Expr_Assign');
    expect(output).toContain('Expr_Variable');
    expect(output).toContain('Scalar_Int');
  });

  it('should dump class declaration', () => {
    const ast = parser.parse('<?php class Foo extends Bar { public function baz() {} }');
    const output = dumper.dump(ast);
    expect(output).toContain('Stmt_Class');
    expect(output).toContain('Stmt_ClassMethod');
    expect(output).toContain('Foo');
    expect(output).toContain('baz');
  });

  it('should dump with positions', () => {
    const code = '<?php $x = 1;';
    const ast = parser.parse(code);
    const positionDumper = new NodeDumper({ dumpPositions: true });
    const output = positionDumper.dump(ast, code);
    expect(output).toContain('[');
    expect(output).toContain(']');
  });

  it('should dump array', () => {
    const ast = parser.parse('<?php [1, 2, 3];');
    const output = dumper.dump(ast);
    expect(output).toContain('Expr_Array');
    expect(output).toContain('ArrayItem');
  });

  it('should dump function with params', () => {
    const ast = parser.parse('<?php function add(int $a, int $b): int { return $a + $b; }');
    const output = dumper.dump(ast);
    expect(output).toContain('Stmt_Function');
    expect(output).toContain('Param');
    expect(output).toContain('returnType');
  });

  it('should dump null values', () => {
    const ast = parser.parse('<?php function foo() {}');
    const output = dumper.dump(ast);
    expect(output).toContain('null');
  });

  it('should dump flags', () => {
    const ast = parser.parse('<?php class Foo { public static function bar() {} }');
    const output = dumper.dump(ast);
    expect(output).toContain('PUBLIC');
    expect(output).toContain('STATIC');
  });

  it('should dump binary operations', () => {
    const ast = parser.parse('<?php $a + $b;');
    const output = dumper.dump(ast);
    expect(output).toContain('Expr_BinaryOp_Plus');
  });

  it('should dump ternary expression', () => {
    const ast = parser.parse('<?php $a ? $b : $c;');
    const output = dumper.dump(ast);
    expect(output).toContain('Expr_Ternary');
  });
});
