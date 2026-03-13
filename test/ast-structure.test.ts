import { describe, it, expect } from 'vitest';
import { ParserFactory } from '../src/parser-factory';
import { NodeDumper } from '../src/node-dumper';

/**
 * These tests verify the detailed AST structure matches upstream PHP-Parser expectations.
 * They use NodeDumper output to verify node types and sub-node values.
 */
describe('AST Structure Verification', () => {
  const factory = new ParserFactory();
  const parser = factory.createForNewestSupportedVersion();
  const dumper = new NodeDumper();

  function parseAndDump(code: string): string {
    const ast = parser.parse(code);
    expect(ast).not.toBeNull();
    return dumper.dump(ast);
  }

  describe('Scalar nodes', () => {
    it('should produce correct Int node', () => {
      const dump = parseAndDump('<?php 42;');
      expect(dump).toContain('Scalar_Int');
      expect(dump).toContain('42');
    });

    it('should produce correct Float node', () => {
      const dump = parseAndDump('<?php 3.14;');
      expect(dump).toContain('Scalar_Float');
      expect(dump).toContain('3.14');
    });

    it('should produce correct String node', () => {
      const dump = parseAndDump("<?php 'hello';");
      expect(dump).toContain('Scalar_String');
      expect(dump).toContain('hello');
    });
  });

  describe('Expression nodes', () => {
    it('should produce correct Variable node', () => {
      const dump = parseAndDump('<?php $foo;');
      expect(dump).toContain('Expr_Variable');
      expect(dump).toContain('foo');
    });

    it('should produce correct Assign node', () => {
      const dump = parseAndDump('<?php $x = 1;');
      expect(dump).toContain('Expr_Assign');
      expect(dump).toContain('var:');
      expect(dump).toContain('expr:');
    });

    it('should produce correct BinaryOp node', () => {
      const dump = parseAndDump('<?php $a + $b;');
      expect(dump).toContain('Expr_BinaryOp_Plus');
      expect(dump).toContain('left:');
      expect(dump).toContain('right:');
    });

    it('should produce correct FuncCall node', () => {
      const dump = parseAndDump('<?php foo(1, 2);');
      expect(dump).toContain('Expr_FuncCall');
      expect(dump).toContain('name:');
      expect(dump).toContain('args:');
      expect(dump).toContain('Arg');
    });

    it('should produce correct MethodCall node', () => {
      const dump = parseAndDump('<?php $obj->method();');
      expect(dump).toContain('Expr_MethodCall');
      expect(dump).toContain('var:');
      expect(dump).toContain('name:');
    });

    it('should produce correct PropertyFetch node', () => {
      const dump = parseAndDump('<?php $obj->prop;');
      expect(dump).toContain('Expr_PropertyFetch');
    });

    it('should produce correct Array node', () => {
      const dump = parseAndDump("<?php ['a' => 1, 'b' => 2];");
      expect(dump).toContain('Expr_Array');
      expect(dump).toContain('ArrayItem');
    });

    it('should produce correct Closure node', () => {
      const dump = parseAndDump('<?php function($x) { return $x; };');
      expect(dump).toContain('Expr_Closure');
      expect(dump).toContain('params:');
      expect(dump).toContain('stmts:');
    });

    it('should produce correct ArrowFunction node', () => {
      const dump = parseAndDump('<?php fn($x) => $x * 2;');
      expect(dump).toContain('Expr_ArrowFunction');
      expect(dump).toContain('expr:');
    });

    it('should produce correct Match node', () => {
      const dump = parseAndDump('<?php match($x) { 1 => "one", default => "other" };');
      expect(dump).toContain('Expr_Match');
      expect(dump).toContain('MatchArm');
    });

    it('should produce correct New node', () => {
      const dump = parseAndDump('<?php new Foo(1, 2);');
      expect(dump).toContain('Expr_New');
      expect(dump).toContain('class:');
      expect(dump).toContain('args:');
    });

    it('should produce correct Ternary node', () => {
      const dump = parseAndDump('<?php $a ? $b : $c;');
      expect(dump).toContain('Expr_Ternary');
      expect(dump).toContain('cond:');
    });

    it('should produce correct Cast nodes', () => {
      const dump = parseAndDump('<?php (int)$x; (string)$y; (array)$z;');
      expect(dump).toContain('Expr_Cast_Int');
      expect(dump).toContain('Expr_Cast_String');
      expect(dump).toContain('Expr_Cast_Array');
    });

    it('should produce correct Instanceof node', () => {
      const dump = parseAndDump('<?php $x instanceof Foo;');
      expect(dump).toContain('Expr_Instanceof');
      expect(dump).toContain('expr:');
      expect(dump).toContain('class');
    });
  });

  describe('Statement nodes', () => {
    it('should produce correct Function node', () => {
      const dump = parseAndDump('<?php function foo($a, $b) { return $a + $b; }');
      expect(dump).toContain('Stmt_Function');
      expect(dump).toContain('name:');
      expect(dump).toContain('params:');
      expect(dump).toContain('stmts:');
    });

    it('should produce correct Class node', () => {
      const dump = parseAndDump('<?php class Foo extends Bar {}');
      expect(dump).toContain('Stmt_Class');
      expect(dump).toContain('name:');
      expect(dump).toContain('extends:');
      expect(dump).toContain('stmts:');
    });

    it('should produce correct If node', () => {
      const dump = parseAndDump('<?php if ($x) { echo 1; } elseif ($y) { echo 2; } else { echo 3; }');
      expect(dump).toContain('Stmt_If');
      expect(dump).toContain('cond:');
      expect(dump).toContain('stmts:');
      expect(dump).toContain('elseifs:');
      expect(dump).toContain('Stmt_ElseIf');
      expect(dump).toContain('Stmt_Else');
    });

    it('should produce correct For node', () => {
      const dump = parseAndDump('<?php for ($i = 0; $i < 10; $i++) { echo $i; }');
      expect(dump).toContain('Stmt_For');
      expect(dump).toContain('init:');
      expect(dump).toContain('cond:');
      expect(dump).toContain('loop:');
      expect(dump).toContain('stmts:');
    });

    it('should produce correct Foreach node', () => {
      const dump = parseAndDump('<?php foreach ($items as $key => $value) {}');
      expect(dump).toContain('Stmt_Foreach');
      expect(dump).toContain('expr:');
      expect(dump).toContain('keyVar:');
      expect(dump).toContain('valueVar:');
    });

    it('should produce correct TryCatch node', () => {
      const dump = parseAndDump('<?php try { foo(); } catch (Exception $e) { } finally { }');
      expect(dump).toContain('Stmt_TryCatch');
      expect(dump).toContain('Stmt_Catch');
      expect(dump).toContain('Stmt_Finally');
    });

    it('should produce correct Namespace node', () => {
      const dump = parseAndDump('<?php namespace App\\Models;');
      expect(dump).toContain('Stmt_Namespace');
      expect(dump).toContain('name:');
    });

    it('should produce correct Use node', () => {
      const dump = parseAndDump('<?php use Foo\\Bar;');
      expect(dump).toContain('Stmt_Use');
      expect(dump).toContain('uses:');
      expect(dump).toContain('UseItem');
    });

    it('should produce correct Enum node', () => {
      const dump = parseAndDump('<?php enum Color { case Red; case Blue; }');
      expect(dump).toContain('Stmt_Enum');
      expect(dump).toContain('Stmt_EnumCase');
    });

    it('should produce correct Trait node', () => {
      const dump = parseAndDump('<?php trait Foo { public function bar() {} }');
      expect(dump).toContain('Stmt_Trait');
      expect(dump).toContain('Stmt_ClassMethod');
    });

    it('should produce correct Interface node', () => {
      const dump = parseAndDump('<?php interface Foo { public function bar(): void; }');
      expect(dump).toContain('Stmt_Interface');
      expect(dump).toContain('Stmt_ClassMethod');
    });

    it('should produce correct Switch node', () => {
      const dump = parseAndDump('<?php switch ($x) { case 1: echo "one"; break; default: echo "other"; }');
      expect(dump).toContain('Stmt_Switch');
      expect(dump).toContain('Stmt_Case');
    });

    it('should produce correct While node', () => {
      const dump = parseAndDump('<?php while ($x) { $x--; }');
      expect(dump).toContain('Stmt_While');
      expect(dump).toContain('cond:');
      expect(dump).toContain('stmts:');
    });

    it('should produce correct Do node', () => {
      const dump = parseAndDump('<?php do { $x--; } while ($x > 0);');
      expect(dump).toContain('Stmt_Do');
    });

    it('should produce correct Echo node', () => {
      const dump = parseAndDump('<?php echo "hello", "world";');
      expect(dump).toContain('Stmt_Echo');
      expect(dump).toContain('exprs:');
    });

    it('should produce correct Return node', () => {
      const dump = parseAndDump('<?php return 42;');
      expect(dump).toContain('Stmt_Return');
      expect(dump).toContain('expr:');
    });
  });

  describe('Type nodes', () => {
    it('should produce NullableType', () => {
      const dump = parseAndDump('<?php function foo(?int $x) {}');
      expect(dump).toContain('NullableType');
    });

    it('should produce UnionType', () => {
      const dump = parseAndDump('<?php function foo(int|string $x) {}');
      expect(dump).toContain('UnionType');
    });

    it('should produce IntersectionType', () => {
      const dump = parseAndDump('<?php function foo(A&B $x) {}');
      expect(dump).toContain('IntersectionType');
    });
  });

  describe('Complex node structures', () => {
    it('should produce correct attribute groups', () => {
      const dump = parseAndDump('<?php #[Attr1(1)] #[Attr2("x")] class Foo {}');
      expect(dump).toContain('attrGroups:');
      expect(dump).toContain('AttributeGroup');
      expect(dump).toContain('Attribute');
    });

    it('should produce correct class const', () => {
      const dump = parseAndDump('<?php class Foo { const BAR = 42; }');
      expect(dump).toContain('Stmt_ClassConst');
      expect(dump).toContain('consts:');
    });

    it('should produce correct property declaration', () => {
      const dump = parseAndDump('<?php class Foo { public int $x = 1; }');
      expect(dump).toContain('Stmt_Property');
      expect(dump).toContain('flags:');
      expect(dump).toContain('PUBLIC');
    });

    it('should produce correct class method with modifiers', () => {
      const dump = parseAndDump('<?php class Foo { final public static function bar(): void {} }');
      expect(dump).toContain('Stmt_ClassMethod');
      expect(dump).toContain('PUBLIC');
      expect(dump).toContain('STATIC');
      expect(dump).toContain('FINAL');
    });

    it('should produce correct constructor promotion', () => {
      const dump = parseAndDump('<?php class Foo { public function __construct(public readonly string $name) {} }');
      expect(dump).toContain('Stmt_ClassMethod');
      expect(dump).toContain('Param');
      expect(dump).toContain('PUBLIC');
      expect(dump).toContain('READONLY');
    });
  });
});
