import { describe, it, expect } from 'vitest';
import { ParserFactory } from '../src/parser-factory';
import { NodeDumper } from '../src/node-dumper';

/**
 * Tests that verify AST dump output matches upstream nikic/PHP-Parser format.
 * These tests check that our parser produces nodes with the same structure as upstream.
 */
describe('Upstream Compatibility', () => {
  const factory = new ParserFactory();
  const parser = factory.createForNewestSupportedVersion();
  const dumper = new NodeDumper();

  function parseAndDump(code: string): string {
    const ast = parser.parse(code);
    expect(ast).not.toBeNull();
    return dumper.dump(ast);
  }

  describe('Scalar: magic constants', () => {
    it('should match upstream magic constant format', () => {
      const dump = parseAndDump(`<?php
__CLASS__;
__DIR__;
__FILE__;
__FUNCTION__;
__LINE__;
__METHOD__;
__NAMESPACE__;
__TRAIT__;
`);
      expect(dump).toContain('Scalar_MagicConst_Class');
      expect(dump).toContain('Scalar_MagicConst_Dir');
      expect(dump).toContain('Scalar_MagicConst_File');
      expect(dump).toContain('Scalar_MagicConst_Function');
      expect(dump).toContain('Scalar_MagicConst_Line');
      expect(dump).toContain('Scalar_MagicConst_Method');
      expect(dump).toContain('Scalar_MagicConst_Namespace');
      expect(dump).toContain('Scalar_MagicConst_Trait');
    });
  });

  describe('Scalar: integers', () => {
    it('should parse decimal, hex, octal, binary integers', () => {
      const dump = parseAndDump('<?php 0; 1; 9; 0x1A; 0b11; 0777; 0o777;');
      expect(dump).toContain('Scalar_Int');
    });

    it('should parse number separators', () => {
      const dump = parseAndDump('<?php 1_000_000; 0x1A_2B; 0b1010_0101; 0o77_77;');
      expect(dump).toContain('Scalar_Int');
    });
  });

  describe('Scalar: floats', () => {
    it('should parse various float formats', () => {
      const dump = parseAndDump('<?php 1.0; .5; 1.; 1e10; 1E-5; 1.5e3;');
      expect(dump).toContain('Scalar_Float');
    });
  });

  describe('Scalar: strings', () => {
    it('should parse single and double quoted strings', () => {
      const dump = parseAndDump(`<?php 'simple'; "double"; 'esc\\'ape'; "esc\\"ape";`);
      expect(dump).toContain('Scalar_String');
    });
  });

  describe('Scalar: interpolated strings', () => {
    it('should parse simple variable interpolation', () => {
      const dump = parseAndDump('<?php "$A";');
      expect(dump).toContain('Scalar_InterpolatedString');
      expect(dump).toContain('Expr_Variable');
      expect(dump).toContain('name: A');
    });

    it('should parse property fetch in string', () => {
      const dump = parseAndDump('<?php "$A->B";');
      expect(dump).toContain('Expr_PropertyFetch');
    });

    it('should parse curly-brace interpolation', () => {
      const dump = parseAndDump('<?php "{$A}";');
      expect(dump).toContain('Expr_Variable');
      expect(dump).toContain('name: A');
    });

    it('should parse dollar-curly interpolation', () => {
      const dump = parseAndDump('<?php "${A}";');
      expect(dump).toContain('Expr_Variable');
    });

    it('should parse text around interpolation', () => {
      const dump = parseAndDump('<?php "A $B C";');
      expect(dump).toContain('Scalar_InterpolatedString');
      expect(dump).toContain('InterpolatedStringPart');
      expect(dump).toContain('Expr_Variable');
    });
  });

  describe('Expr: assignments', () => {
    it('should produce correct Assign node', () => {
      const dump = parseAndDump('<?php $a = $b;');
      expect(dump).toContain('Expr_Assign');
      expect(dump).toContain('var:');
      expect(dump).toContain('expr:');
    });

    it('should produce correct AssignRef node', () => {
      const dump = parseAndDump('<?php $a =& $b;');
      expect(dump).toContain('Expr_AssignRef');
    });

    it('should produce correct AssignOp nodes', () => {
      const dump = parseAndDump('<?php $a += 1; $b -= 2; $c *= 3; $d /= 4; $e %= 5; $f .= "x"; $g &= 7; $h |= 8; $i ^= 9; $j <<= 10; $k >>= 11; $l **= 12; $m ??= 13;');
      expect(dump).toContain('Expr_AssignOp_Plus');
      expect(dump).toContain('Expr_AssignOp_Minus');
      expect(dump).toContain('Expr_AssignOp_Mul');
      expect(dump).toContain('Expr_AssignOp_Div');
      expect(dump).toContain('Expr_AssignOp_Mod');
      expect(dump).toContain('Expr_AssignOp_Concat');
      expect(dump).toContain('Expr_AssignOp_BitwiseAnd');
      expect(dump).toContain('Expr_AssignOp_BitwiseOr');
      expect(dump).toContain('Expr_AssignOp_BitwiseXor');
      expect(dump).toContain('Expr_AssignOp_ShiftLeft');
      expect(dump).toContain('Expr_AssignOp_ShiftRight');
      expect(dump).toContain('Expr_AssignOp_Pow');
      expect(dump).toContain('Expr_AssignOp_Coalesce');
    });
  });

  describe('Expr: binary operators', () => {
    it('should produce all binary op nodes', () => {
      const dump = parseAndDump(`<?php
$a + $b; $a - $b; $a * $b; $a / $b; $a % $b; $a ** $b;
$a . $b;
$a & $b; $a | $b; $a ^ $b; $a << $b; $a >> $b;
$a && $b; $a || $b;
$a and $b; $a or $b; $a xor $b;
$a == $b; $a != $b; $a === $b; $a !== $b;
$a < $b; $a <= $b; $a > $b; $a >= $b; $a <=> $b;
$a ?? $b;
`);
      expect(dump).toContain('Expr_BinaryOp_Plus');
      expect(dump).toContain('Expr_BinaryOp_Minus');
      expect(dump).toContain('Expr_BinaryOp_Mul');
      expect(dump).toContain('Expr_BinaryOp_Div');
      expect(dump).toContain('Expr_BinaryOp_Mod');
      expect(dump).toContain('Expr_BinaryOp_Pow');
      expect(dump).toContain('Expr_BinaryOp_Concat');
      expect(dump).toContain('Expr_BinaryOp_BitwiseAnd');
      expect(dump).toContain('Expr_BinaryOp_BitwiseOr');
      expect(dump).toContain('Expr_BinaryOp_BitwiseXor');
      expect(dump).toContain('Expr_BinaryOp_ShiftLeft');
      expect(dump).toContain('Expr_BinaryOp_ShiftRight');
      expect(dump).toContain('Expr_BinaryOp_BooleanAnd');
      expect(dump).toContain('Expr_BinaryOp_BooleanOr');
      expect(dump).toContain('Expr_BinaryOp_LogicalAnd');
      expect(dump).toContain('Expr_BinaryOp_LogicalOr');
      expect(dump).toContain('Expr_BinaryOp_LogicalXor');
      expect(dump).toContain('Expr_BinaryOp_Equal');
      expect(dump).toContain('Expr_BinaryOp_NotEqual');
      expect(dump).toContain('Expr_BinaryOp_Identical');
      expect(dump).toContain('Expr_BinaryOp_NotIdentical');
      expect(dump).toContain('Expr_BinaryOp_Smaller');
      expect(dump).toContain('Expr_BinaryOp_SmallerOrEqual');
      expect(dump).toContain('Expr_BinaryOp_Greater');
      expect(dump).toContain('Expr_BinaryOp_GreaterOrEqual');
      expect(dump).toContain('Expr_BinaryOp_Spaceship');
      expect(dump).toContain('Expr_BinaryOp_Coalesce');
    });
  });

  describe('Expr: casts', () => {
    it('should produce all cast nodes', () => {
      const dump = parseAndDump('<?php (int)$a; (float)$a; (string)$a; (array)$a; (object)$a; (bool)$a; (unset)$a;');
      expect(dump).toContain('Expr_Cast_Int');
      expect(dump).toContain('Expr_Cast_Double');
      expect(dump).toContain('Expr_Cast_String');
      expect(dump).toContain('Expr_Cast_Array');
      expect(dump).toContain('Expr_Cast_Object');
      expect(dump).toContain('Expr_Cast_Bool');
      expect(dump).toContain('Expr_Cast_Unset');
    });
  });

  describe('Expr: function calls', () => {
    it('should parse function call with named args', () => {
      const dump = parseAndDump('<?php foo(bar: 1, baz: 2);');
      expect(dump).toContain('Expr_FuncCall');
      expect(dump).toContain('Arg');
      expect(dump).toContain('name:');
    });

    it('should parse first-class callable', () => {
      const dump = parseAndDump('<?php foo(...); $x->bar(...); Foo::bar(...);');
      expect(dump).toContain('Expr_FuncCall');
      expect(dump).toContain('VariadicPlaceholder');
    });
  });

  describe('Expr: closures and arrow functions', () => {
    it('should parse closure with all features', () => {
      const dump = parseAndDump('<?php static function &($x) use (&$y, $z): int { return $x + $y + $z; };');
      expect(dump).toContain('Expr_Closure');
      expect(dump).toContain('static: true');
      expect(dump).toContain('byRef: true');
      expect(dump).toContain('ClosureUse');
    });

    it('should parse arrow function', () => {
      const dump = parseAndDump('<?php fn(int $x): int => $x * 2;');
      expect(dump).toContain('Expr_ArrowFunction');
    });
  });

  describe('Expr: match', () => {
    it('should parse match with multiple conditions', () => {
      const dump = parseAndDump('<?php match($x) { 1, 2 => "low", 3, 4 => "high", default => "other" };');
      expect(dump).toContain('Expr_Match');
      expect(dump).toContain('MatchArm');
    });
  });

  describe('Stmt: class declaration', () => {
    it('should parse full class declaration', () => {
      const dump = parseAndDump(`<?php
class A extends B implements C, D {
    const X = 'Y';
    public $a = 'b';
    protected $c;
    private $d;
    public function e() {}
    public static function f($a) {}
    final public function g(): B {}
    protected function h() {}
    private function i() {}
}
`);
      expect(dump).toContain('Stmt_Class');
      expect(dump).toContain('Stmt_ClassConst');
      expect(dump).toContain('Stmt_Property');
      expect(dump).toContain('Stmt_ClassMethod');
      expect(dump).toContain('extends:');
      expect(dump).toContain('implements:');
      expect(dump).toContain('PUBLIC');
      expect(dump).toContain('PROTECTED');
      expect(dump).toContain('PRIVATE');
      expect(dump).toContain('STATIC');
      expect(dump).toContain('FINAL');
    });

    it('should parse abstract class', () => {
      const dump = parseAndDump('<?php abstract class A { abstract public function b(): void; }');
      expect(dump).toContain('Stmt_Class');
      expect(dump).toContain('ABSTRACT');
    });

    it('should parse readonly class', () => {
      const dump = parseAndDump('<?php readonly class A { public function __construct(public string $x) {} }');
      expect(dump).toContain('Stmt_Class');
      expect(dump).toContain('READONLY');
    });
  });

  describe('Stmt: interface', () => {
    it('should parse interface with extends', () => {
      const dump = parseAndDump('<?php interface A extends B, C { public function d(): void; }');
      expect(dump).toContain('Stmt_Interface');
      expect(dump).toContain('Stmt_ClassMethod');
    });
  });

  describe('Stmt: trait', () => {
    it('should parse trait with methods', () => {
      const dump = parseAndDump('<?php trait A { public function b() {} }');
      expect(dump).toContain('Stmt_Trait');
      expect(dump).toContain('Stmt_ClassMethod');
    });

    it('should parse trait use with adaptations', () => {
      const dump = parseAndDump('<?php class X { use A, B { A::foo insteadof B; B::bar as baz; foo as protected; } }');
      expect(dump).toContain('Stmt_TraitUse');
      expect(dump).toContain('Stmt_TraitUseAdaptation_Precedence');
      expect(dump).toContain('Stmt_TraitUseAdaptation_Alias');
    });
  });

  describe('Stmt: enum', () => {
    it('should parse unit enum', () => {
      const dump = parseAndDump('<?php enum A { case B; case C; }');
      expect(dump).toContain('Stmt_Enum');
      expect(dump).toContain('Stmt_EnumCase');
    });

    it('should parse backed enum', () => {
      const dump = parseAndDump('<?php enum A: string { case B = "b"; case C = "c"; }');
      expect(dump).toContain('Stmt_Enum');
      expect(dump).toContain('scalarType:');
    });
  });

  describe('Stmt: control flow', () => {
    it('should parse if/elseif/else', () => {
      const dump = parseAndDump('<?php if ($a) { } elseif ($b) { } else { }');
      expect(dump).toContain('Stmt_If');
      expect(dump).toContain('Stmt_ElseIf');
      expect(dump).toContain('Stmt_Else');
    });

    it('should parse for loop', () => {
      const dump = parseAndDump('<?php for ($i = 0; $i < 10; $i++) { }');
      expect(dump).toContain('Stmt_For');
      expect(dump).toContain('init:');
      expect(dump).toContain('cond:');
      expect(dump).toContain('loop:');
    });

    it('should parse foreach', () => {
      const dump = parseAndDump('<?php foreach ($a as $k => $v) { }');
      expect(dump).toContain('Stmt_Foreach');
      expect(dump).toContain('keyVar:');
      expect(dump).toContain('valueVar:');
    });

    it('should parse while and do-while', () => {
      const dump = parseAndDump('<?php while ($a) { } do { } while ($b);');
      expect(dump).toContain('Stmt_While');
      expect(dump).toContain('Stmt_Do');
    });

    it('should parse switch', () => {
      const dump = parseAndDump('<?php switch ($x) { case 1: break; case 2: break; default: break; }');
      expect(dump).toContain('Stmt_Switch');
      expect(dump).toContain('Stmt_Case');
    });
  });

  describe('Stmt: try/catch', () => {
    it('should parse try/catch/finally', () => {
      const dump = parseAndDump('<?php try { } catch (A $e) { } catch (B|C $e) { } finally { }');
      expect(dump).toContain('Stmt_TryCatch');
      expect(dump).toContain('Stmt_Catch');
      expect(dump).toContain('Stmt_Finally');
    });

    it('should parse catch without variable', () => {
      const dump = parseAndDump('<?php try { } catch (A) { }');
      expect(dump).toContain('Stmt_TryCatch');
      expect(dump).toContain('Stmt_Catch');
    });
  });

  describe('Stmt: namespace and use', () => {
    it('should parse namespace statement', () => {
      const dump = parseAndDump('<?php namespace Foo\\Bar;');
      expect(dump).toContain('Stmt_Namespace');
    });

    it('should parse braced namespace', () => {
      const dump = parseAndDump('<?php namespace Foo\\Bar { }');
      expect(dump).toContain('Stmt_Namespace');
    });

    it('should parse use statement', () => {
      const dump = parseAndDump('<?php use Foo\\Bar; use Foo\\Bar as Baz;');
      expect(dump).toContain('Stmt_Use');
      expect(dump).toContain('UseItem');
    });

    it('should parse grouped use', () => {
      const dump = parseAndDump('<?php use Foo\\{Bar, Baz as Qux};');
      expect(dump).toContain('Stmt_GroupUse');
    });

    it('should parse function and const use', () => {
      const dump = parseAndDump('<?php use function Foo\\bar; use const Foo\\BAZ;');
      expect(dump).toContain('Stmt_Use');
    });
  });

  describe('Types', () => {
    it('should parse nullable type', () => {
      const dump = parseAndDump('<?php function foo(?int $x): ?string {}');
      expect(dump).toContain('NullableType');
    });

    it('should parse union type', () => {
      const dump = parseAndDump('<?php function foo(int|string $x): int|false {}');
      expect(dump).toContain('UnionType');
    });

    it('should parse intersection type', () => {
      const dump = parseAndDump('<?php function foo(A&B $x): C&D {}');
      expect(dump).toContain('IntersectionType');
    });

    it('should parse DNF type', () => {
      const dump = parseAndDump('<?php function foo((A&B)|C $x) {}');
      expect(dump).toContain('UnionType');
      expect(dump).toContain('IntersectionType');
    });
  });

  describe('Attributes', () => {
    it('should parse class with attributes', () => {
      const dump = parseAndDump('<?php #[Attr1] #[Attr2(1, "x")] class Foo {}');
      expect(dump).toContain('AttributeGroup');
      expect(dump).toContain('Attribute');
    });

    it('should parse method with attributes', () => {
      const dump = parseAndDump('<?php class Foo { #[Route("/api")] public function bar() {} }');
      expect(dump).toContain('AttributeGroup');
    });

    it('should parse parameter with attributes', () => {
      const dump = parseAndDump('<?php function foo(#[Attr] int $x) {}');
      expect(dump).toContain('AttributeGroup');
    });
  });

  describe('Semi-reserved keywords', () => {
    it('should allow reserved words as method names', () => {
      const dump = parseAndDump(`<?php
class Test {
    function array() {}
    function public() {}
    static function list() {}
}
$t = new Test;
$t->array();
Test::list();
`);
      expect(dump).toContain('Stmt_ClassMethod');
      expect(dump).toContain('Expr_MethodCall');
      expect(dump).toContain('Expr_StaticCall');
    });

    it('should allow reserved words as property names', () => {
      const dump = parseAndDump('<?php class Foo { public $class; public $private; }');
      expect(dump).toContain('Stmt_Property');
    });

    it('should allow reserved words as constant names', () => {
      const dump = parseAndDump('<?php class Foo { const TRAIT = 3; const FINAL = 4; }');
      expect(dump).toContain('Stmt_ClassConst');
    });
  });

  describe('Expr: new dereference', () => {
    it('should parse new expression chaining', () => {
      const dump = parseAndDump('<?php (new Foo())->bar();');
      expect(dump).toContain('Expr_MethodCall');
      expect(dump).toContain('Expr_New');
    });

    it('should parse new without parentheses', () => {
      const dump = parseAndDump('<?php new Foo;');
      expect(dump).toContain('Expr_New');
    });
  });

  describe('Generators', () => {
    it('should parse yield', () => {
      const dump = parseAndDump('<?php function gen() { yield; yield $v; yield $k => $v; }');
      expect(dump).toContain('Expr_Yield');
    });

    it('should parse yield from', () => {
      const dump = parseAndDump('<?php function gen() { yield from [1, 2, 3]; }');
      expect(dump).toContain('Expr_YieldFrom');
    });
  });

  describe('Heredoc/Nowdoc', () => {
    it('should parse heredoc', () => {
      const code = '<?php $x = <<<EOT\nHello World\nEOT;\n';
      const ast = parser.parse(code);
      expect(ast).not.toBeNull();
    });

    it('should parse nowdoc', () => {
      const code = "<?php $x = <<<'EOT'\nHello World\nEOT;\n";
      const ast = parser.parse(code);
      expect(ast).not.toBeNull();
    });

    it('should parse heredoc with interpolation', () => {
      const code = '<?php $x = <<<EOT\nHello $name\nEOT;\n';
      const ast = parser.parse(code);
      expect(ast).not.toBeNull();
      const dump = dumper.dump(ast);
      expect(dump).toContain('Scalar_InterpolatedString');
    });
  });

  describe('Declare', () => {
    it('should parse declare strict_types', () => {
      const dump = parseAndDump('<?php declare(strict_types=1);');
      expect(dump).toContain('Stmt_Declare');
      expect(dump).toContain('DeclareItem');
    });

    it('should parse declare with block', () => {
      const dump = parseAndDump('<?php declare(ticks=1) { echo 1; }');
      expect(dump).toContain('Stmt_Declare');
    });
  });

  describe('Typed class constants (PHP 8.3)', () => {
    it('should parse typed class constants', () => {
      const dump = parseAndDump(`<?php
class Foo {
    const int BAR = 1;
    const string BAZ = 'hello';
}`);
      expect(dump).toContain('Stmt_ClassConst');
      expect(dump).toContain('Identifier');
      expect(dump).toContain('BAR');
      expect(dump).toContain('BAZ');
    });

    it('should parse untyped class constants', () => {
      const dump = parseAndDump('<?php class Foo { const BAR = 1; }');
      expect(dump).toContain('Stmt_ClassConst');
      expect(dump).toContain('BAR');
    });

    it('should parse nullable typed constant', () => {
      const dump = parseAndDump('<?php class Foo { const ?int BAR = null; }');
      expect(dump).toContain('Stmt_ClassConst');
      expect(dump).toContain('NullableType');
    });

    it('should parse union typed constant', () => {
      const dump = parseAndDump('<?php class Foo { const int|string BAR = 1; }');
      expect(dump).toContain('Stmt_ClassConst');
      expect(dump).toContain('UnionType');
    });
  });

  describe('Match expression edge cases', () => {
    it('should parse match without subject', () => {
      const dump = parseAndDump(`<?php
$result = match(true) {
    $x > 0 => 'positive',
    $x < 0 => 'negative',
    default => 'zero',
};`);
      expect(dump).toContain('Expr_Match');
    });

    it('should parse match with no arms', () => {
      const dump = parseAndDump('<?php $x = match($y) {};');
      expect(dump).toContain('Expr_Match');
    });

    it('should parse nested match', () => {
      const dump = parseAndDump(`<?php
$x = match($a) {
    1 => match($b) {
        2 => 'two',
        default => 'other',
    },
    default => 'none',
};`);
      expect(dump).toContain('Expr_Match');
    });
  });

  describe('Enum edge cases', () => {
    it('should parse enum with interface and constant', () => {
      const dump = parseAndDump(`<?php
enum Color: string implements HasLabel {
    const DEFAULT = self::Red;
    case Red = 'red';
    case Green = 'green';

    public function label(): string {
        return $this->value;
    }
}`);
      expect(dump).toContain('Stmt_Enum');
      expect(dump).toContain('Stmt_ClassConst');
      expect(dump).toContain('Stmt_EnumCase');
      expect(dump).toContain('Stmt_ClassMethod');
    });
  });

  describe('Static methods and properties', () => {
    it('should parse static method call on variable', () => {
      const dump = parseAndDump('<?php $class::method();');
      expect(dump).toContain('Expr_StaticCall');
    });

    it('should parse static property on variable', () => {
      const dump = parseAndDump('<?php $class::$prop;');
      expect(dump).toContain('Expr_StaticPropertyFetch');
    });

    it('should parse late static binding', () => {
      const dump = parseAndDump(`<?php
class Foo {
    public static function create(): static {
        return new static();
    }
}`);
      expect(dump).toContain('Expr_New');
      expect(dump).toContain('Stmt_ClassMethod');
    });
  });

  describe('Complex expressions', () => {
    it('should parse chained null coalesce assignment', () => {
      const dump = parseAndDump('<?php $a ??= $b ?? $c ?? $d;');
      expect(dump).toContain('Expr_AssignOp_Coalesce');
      expect(dump).toContain('Expr_BinaryOp_Coalesce');
    });

    it('should parse ternary vs null coalesce precedence', () => {
      const dump = parseAndDump('<?php $a ?? $b ? $c : $d;');
      expect(dump).toContain('Expr_BinaryOp_Coalesce');
      expect(dump).toContain('Expr_Ternary');
    });

    it('should parse instanceof with expression', () => {
      const dump = parseAndDump('<?php $a instanceof $b;');
      expect(dump).toContain('Expr_Instanceof');
    });

    it('should parse complex array/string access chain', () => {
      const dump = parseAndDump('<?php $a[0][1]->b->c[2];');
      expect(dump).toContain('Expr_ArrayDimFetch');
      expect(dump).toContain('Expr_PropertyFetch');
    });

    it('should parse throw expression (PHP 8.0)', () => {
      const dump = parseAndDump('<?php $x = $y ?? throw new Exception();');
      expect(dump).toContain('Expr_Throw');
      expect(dump).toContain('Expr_BinaryOp_Coalesce');
    });
  });

  describe('Closure edge cases', () => {
    it('should parse closure with return type and use by ref', () => {
      const dump = parseAndDump('<?php $f = function() use (&$x, $y): int { return $x + $y; };');
      expect(dump).toContain('Expr_Closure');
      expect(dump).toContain('ClosureUse');
      expect(dump).toContain('byRef: true');
    });

    it('should parse static closure', () => {
      const dump = parseAndDump('<?php $f = static function() {};');
      expect(dump).toContain('Expr_Closure');
      expect(dump).toContain('static: true');
    });

    it('should parse static arrow function', () => {
      const dump = parseAndDump('<?php $f = static fn() => 1;');
      expect(dump).toContain('Expr_ArrowFunction');
      expect(dump).toContain('static: true');
    });
  });

  describe('Named arguments', () => {
    it('should parse named arguments in function call', () => {
      const dump = parseAndDump('<?php array_slice(array: $a, offset: 1, length: 2);');
      expect(dump).toContain('Arg');
      expect(dump).toContain('name: Identifier');
    });

    it('should parse mixed positional and named arguments', () => {
      const dump = parseAndDump('<?php foo($a, name: $b, other: $c);');
      expect(dump).toContain('Arg');
    });
  });

  describe('Readonly class and properties', () => {
    it('should parse readonly class', () => {
      const dump = parseAndDump('<?php readonly class Dto { public string $name; }');
      expect(dump).toContain('Stmt_Class');
      expect(dump).toContain('READONLY');
    });

    it('should parse readonly promoted property', () => {
      const dump = parseAndDump(`<?php
class Foo {
    public function __construct(
        public readonly string $name,
        protected readonly int $age,
    ) {}
}`);
      expect(dump).toContain('Param');
      expect(dump).toContain('READONLY');
    });
  });

  describe('Complex real-world code', () => {
    it('should parse Laravel-style controller', () => {
      const code = `<?php
namespace App\\Http\\Controllers;

use App\\Models\\User;
use Illuminate\\Http\\Request;
use Illuminate\\Http\\Response;

class UserController extends Controller
{
    public function __construct(
        private readonly UserRepository $users,
    ) {}

    #[Route('/users', methods: ['GET'])]
    public function index(Request $request): Response
    {
        $page = (int) ($request->query('page') ?? 1);
        $users = $this->users->paginate($page);

        return match(true) {
            $request->wantsJson() => new Response(json_encode($users)),
            default => view('users.index', ['users' => $users]),
        };
    }

    public function show(int $id): Response
    {
        $user = $this->users->find($id)
            ?? throw new ModelNotFoundException();

        return new Response($user->toArray());
    }
}`;
      const ast = parser.parse(code);
      expect(ast).not.toBeNull();
      const dump = dumper.dump(ast);
      expect(dump).toContain('Stmt_Namespace');
      expect(dump).toContain('Stmt_Use');
      expect(dump).toContain('Stmt_Class');
      expect(dump).toContain('Stmt_ClassMethod');
      expect(dump).toContain('Expr_Match');
      expect(dump).toContain('AttributeGroup');
      expect(dump).toContain('Arg');
    });

    it('should parse PHP 8.1+ features', () => {
      const code = `<?php
enum Status: string {
    case Active = 'active';
    case Inactive = 'inactive';

    public function label(): string {
        return match($this) {
            self::Active => 'Active User',
            self::Inactive => 'Inactive User',
        };
    }
}

readonly class UserDTO {
    public function __construct(
        public string $name,
        public string $email,
        public Status $status = Status::Active,
    ) {}
}

function processUsers(UserDTO ...$users): array {
    return array_map(
        fn(UserDTO $u) => [
            'name' => $u->name,
            'status' => $u->status->label(),
        ],
        $users,
    );
}`;
      const ast = parser.parse(code);
      expect(ast).not.toBeNull();
      const dump = dumper.dump(ast);
      expect(dump).toContain('Stmt_Enum');
      expect(dump).toContain('Stmt_Class');
      expect(dump).toContain('READONLY');
      expect(dump).toContain('Expr_ArrowFunction');
    });
  });
});
