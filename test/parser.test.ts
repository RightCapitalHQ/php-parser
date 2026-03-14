import { describe, it, expect } from 'vitest';
import { ParserFactory } from '../src/parser-factory';
import { PhpVersion } from '../src/php-version';
import { NodeDumper } from '../src/node-dumper';

describe('Parser', () => {
  const factory = new ParserFactory();
  const parser = factory.createForNewestSupportedVersion();

  it('should parse simple echo statement', () => {
    const ast = parser.parse('<?php echo "hello";');
    expect(ast).not.toBeNull();
    expect(ast!.length).toBeGreaterThan(0);
    expect(ast![0].getType()).toBe('Stmt_Echo');
  });

  it('should parse variable assignment', () => {
    const ast = parser.parse('<?php $x = 42;');
    expect(ast).not.toBeNull();
    expect(ast!.length).toBe(1);
    expect(ast![0].getType()).toBe('Stmt_Expression');
  });

  it('should parse function declaration', () => {
    const ast = parser.parse('<?php function add($a, $b) { return $a + $b; }');
    expect(ast).not.toBeNull();
    expect(ast!.length).toBe(1);
    expect(ast![0].getType()).toBe('Stmt_Function');
  });

  it('should parse class declaration', () => {
    const ast = parser.parse('<?php class Foo { public function bar() { return 1; } }');
    expect(ast).not.toBeNull();
    expect(ast!.length).toBe(1);
    expect(ast![0].getType()).toBe('Stmt_Class');
  });

  it('should parse if/else', () => {
    const ast = parser.parse('<?php if ($x) { echo 1; } else { echo 2; }');
    expect(ast).not.toBeNull();
    expect(ast!.length).toBe(1);
    expect(ast![0].getType()).toBe('Stmt_If');
  });

  it('should parse while loop', () => {
    const ast = parser.parse('<?php while ($i < 10) { $i = $i + 1; }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_While');
  });

  it('should parse for loop', () => {
    const ast = parser.parse('<?php for ($i = 0; $i < 10; $i = $i + 1) { echo $i; }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_For');
  });

  it('should parse foreach', () => {
    const ast = parser.parse('<?php foreach ($arr as $key => $value) { echo $value; }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Foreach');
  });

  it('should parse try/catch', () => {
    const ast = parser.parse('<?php try { foo(); } catch (Exception $e) { bar(); }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_TryCatch');
  });

  it('should parse namespace', () => {
    const ast = parser.parse('<?php namespace App\\Models;');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Namespace');
  });

  it('should parse use statement', () => {
    const ast = parser.parse('<?php use App\\Models\\User;');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Use');
  });

  it('should parse interface', () => {
    const ast = parser.parse('<?php interface Foo { public function bar(): void; }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Interface');
  });

  it('should parse trait', () => {
    const ast = parser.parse('<?php trait Foo { public function bar() { return 1; } }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Trait');
  });

  it('should parse enum', () => {
    const ast = parser.parse('<?php enum Color { case Red; case Green; case Blue; }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Enum');
  });

  it('should parse binary expressions', () => {
    const ast = parser.parse('<?php $a + $b;');
    expect(ast).not.toBeNull();
    const exprStmt = ast![0];
    expect(exprStmt.getType()).toBe('Stmt_Expression');
    expect(exprStmt['expr'].getType()).toBe('Expr_BinaryOp_Plus');
  });

  it('should parse comparison', () => {
    const ast = parser.parse('<?php $a === $b;');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_BinaryOp_Identical');
  });

  it('should parse assignment', () => {
    const ast = parser.parse('<?php $x = 42;');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_Assign');
  });

  it('should parse array', () => {
    const ast = parser.parse('<?php [1, 2, 3];');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_Array');
  });

  it('should parse function call', () => {
    const ast = parser.parse('<?php foo(1, 2);');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_FuncCall');
  });

  it('should parse method call', () => {
    const ast = parser.parse('<?php $obj->method(1);');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_MethodCall');
  });

  it('should parse static call', () => {
    const ast = parser.parse('<?php Foo::bar();');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_StaticCall');
  });

  it('should parse new expression', () => {
    const ast = parser.parse('<?php new Foo(1, 2);');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_New');
  });

  it('should parse closure', () => {
    const ast = parser.parse('<?php function($x) { return $x; };');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_Closure');
  });

  it('should parse arrow function', () => {
    const ast = parser.parse('<?php fn($x) => $x * 2;');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_ArrowFunction');
  });

  it('should parse match expression', () => {
    const ast = parser.parse('<?php match($x) { 1 => "one", 2 => "two" };');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_Match');
  });

  it('should parse ternary', () => {
    const ast = parser.parse('<?php $x ? 1 : 2;');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_Ternary');
  });

  it('should parse null coalesce', () => {
    const ast = parser.parse('<?php $x ?? "default";');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_BinaryOp_Coalesce');
  });

  it('should parse inline HTML', () => {
    const ast = parser.parse('<html><?php echo 1; ?></html>');
    expect(ast).not.toBeNull();
    expect(ast!.some(n => n.getType() === 'Stmt_InlineHTML')).toBe(true);
  });

  it('should parse return types', () => {
    const ast = parser.parse('<?php function foo(): int { return 42; }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Function');
    expect(ast![0]['returnType']).not.toBeNull();
  });

  it('should dump AST', () => {
    const ast = parser.parse('<?php $x = 1;');
    const dumper = new NodeDumper();
    const output = dumper.dump(ast!);
    expect(output).toContain('Stmt_Expression');
    expect(output).toContain('Expr_Assign');
  });

  // 1. Switch statement with cases and default
  it('should parse switch statement', () => {
    const ast = parser.parse('<?php switch ($x) { case 1: echo "one"; break; case 2: echo "two"; break; default: echo "other"; }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Switch');
  });

  // 2. Do-while loop
  it('should parse do-while loop', () => {
    const ast = parser.parse('<?php do { $i = $i + 1; } while ($i < 10);');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Do');
  });

  // 3. Break and continue with levels
  it('should parse break with level', () => {
    const ast = parser.parse('<?php while (true) { break 2; }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_While');
  });

  it('should parse continue with level', () => {
    const ast = parser.parse('<?php while (true) { continue 2; }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_While');
  });

  // 4. Global and static variables
  it('should parse global variable declaration', () => {
    const ast = parser.parse('<?php function foo() { global $x, $y; }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Function');
  });

  it('should parse static variable declaration', () => {
    const ast = parser.parse('<?php function foo() { static $count = 0; }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Function');
  });

  // 5. Declare (strict_types)
  it('should parse declare strict_types', () => {
    const ast = parser.parse('<?php declare(strict_types=1);');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Declare');
  });

  // 6. Goto and labels
  it('should parse goto statement', () => {
    const ast = parser.parse('<?php goto end; end:');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Goto');
  });

  it('should parse label', () => {
    const ast = parser.parse('<?php start: echo "hello";');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Label');
  });

  // 7. Const declarations
  it('should parse const declaration', () => {
    const ast = parser.parse('<?php const FOO = 42;');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Const');
  });

  // 8. Class with properties, constants, and multiple methods
  it('should parse class with properties, constants, and methods', () => {
    const ast = parser.parse('<?php class Foo { const BAR = 1; public $x = 10; public function getX() { return $this->x; } public function setX($v) { $this->x = $v; } }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Class');
  });

  // 9. Class with extends and implements
  it('should parse class with extends and implements', () => {
    const ast = parser.parse('<?php class Dog extends Animal implements Speakable, Walkable { public function speak() { return "woof"; } }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Class');
  });

  // 10. Enum with backed types
  it('should parse string-backed enum', () => {
    const ast = parser.parse('<?php enum Color: string { case Red = "red"; case Green = "green"; }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Enum');
  });

  it('should parse int-backed enum', () => {
    const ast = parser.parse('<?php enum Priority: int { case Low = 1; case High = 10; }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Enum');
  });

  // 11. Trait use in class
  it('should parse trait use in class', () => {
    const ast = parser.parse('<?php class Foo { use SomeTrait; public function bar() {} }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Class');
  });

  // 13. Named arguments
  it('should parse named arguments', () => {
    const ast = parser.parse('<?php foo(name: "bar", value: 42);');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_FuncCall');
  });

  // 14. Nullsafe operator
  it('should parse nullsafe operator', () => {
    const ast = parser.parse('<?php $obj?->method();');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_NullsafeMethodCall');
  });

  it('should parse nullsafe property access', () => {
    const ast = parser.parse('<?php $obj?->prop;');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_NullsafePropertyFetch');
  });

  // 15. Spread operator in arrays
  it('should parse spread operator in array', () => {
    const ast = parser.parse('<?php [...$arr, 1, 2];');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_Array');
  });

  // 16. Multiple catch types
  it('should parse multiple catch types', () => {
    const ast = parser.parse('<?php try { foo(); } catch (InvalidArgumentException | RuntimeException $e) { bar(); }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_TryCatch');
  });

  // 17. First-class callable syntax
  it('should parse first-class callable syntax', () => {
    const ast = parser.parse('<?php $fn = strlen(...);');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Expression');
  });

  // 18. Readonly properties
  it('should parse readonly property', () => {
    const ast = parser.parse('<?php class Foo { public readonly string $name; }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Class');
  });

  // 19. Constructor property promotion
  it('should parse constructor property promotion', () => {
    const ast = parser.parse('<?php class Point { public function __construct(public int $x, public int $y) {} }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Class');
  });

  // 22. Match with default arm
  it('should parse match with default', () => {
    const ast = parser.parse('<?php match($x) { 1 => "one", default => "other" };');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_Match');
  });

  // 23. Nested expressions with correct precedence
  it('should parse nested expressions with precedence', () => {
    const ast = parser.parse('<?php $a + $b * $c;');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_BinaryOp_Plus');
  });

  it('should parse parenthesized expression precedence', () => {
    const ast = parser.parse('<?php ($a + $b) * $c;');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_BinaryOp_Mul');
  });

  // 24. String interpolation
  it('should parse string interpolation', () => {
    const ast = parser.parse('<?php "hello $name";');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Expression');
  });

  // 25. Heredoc
  it('should parse heredoc', () => {
    const ast = parser.parse('<?php $x = <<<EOT\nhello world\nEOT;\n');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Expression');
  });

  // 26. Null coalesce assignment
  it('should parse null coalesce assignment', () => {
    const ast = parser.parse('<?php $x ??= "default";');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_AssignOp_Coalesce');
  });

  // 27. Spaceship operator
  it('should parse spaceship operator', () => {
    const ast = parser.parse('<?php $a <=> $b;');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_BinaryOp_Spaceship');
  });

  // 28. Power operator
  it('should parse power operator', () => {
    const ast = parser.parse('<?php $a ** $b;');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_BinaryOp_Pow');
  });

  // 29. Yield and yield from
  it('should parse yield', () => {
    const ast = parser.parse('<?php function gen() { yield 1; }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Function');
  });

  it('should parse yield from', () => {
    const ast = parser.parse('<?php function gen() { yield from [1, 2, 3]; }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Function');
  });

  // 30. Include/require
  it('should parse include', () => {
    const ast = parser.parse('<?php include "file.php";');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_Include');
  });

  it('should parse require_once', () => {
    const ast = parser.parse('<?php require_once "file.php";');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_Include');
  });

  // Type declarations
  it('should parse return type declarations', () => {
    const ast = parser.parse('<?php function foo(): int { return 1; }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Function');
    expect(ast![0]['returnType']).not.toBeNull();
  });

  it('should parse nullable type', () => {
    const ast = parser.parse('<?php function foo(?string $x): ?int { return null; }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Function');
  });

  it('should parse union type', () => {
    const ast = parser.parse('<?php function foo(int|string $x): int|string { return $x; }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Function');
  });

  it('should parse intersection type', () => {
    const ast = parser.parse('<?php function foo(A&B $x): A&B { return $x; }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Function');
  });

  it('should parse void return type', () => {
    const ast = parser.parse('<?php function foo(): void {}');
    expect(ast).not.toBeNull();
    expect(ast![0]['returnType']).not.toBeNull();
  });

  // Abstract/final classes
  it('should parse abstract class', () => {
    const ast = parser.parse('<?php abstract class Foo { abstract public function bar(): void; }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Class');
  });

  it('should parse final class', () => {
    const ast = parser.parse('<?php final class Foo {}');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Class');
  });

  // Interfaces
  it('should parse interface', () => {
    const ast = parser.parse('<?php interface Foo { public function bar(): void; }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Interface');
  });

  it('should parse interface extending multiple', () => {
    const ast = parser.parse('<?php interface Foo extends Bar, Baz {}');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Interface');
  });

  // Anonymous classes
  it('should parse anonymous class', () => {
    const ast = parser.parse('<?php new class { public function foo() {} };');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_New');
  });

  it('should parse anonymous class with constructor args', () => {
    const ast = parser.parse('<?php new class(1, 2) extends Base implements I { };');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_New');
  });

  // Attributes (PHP 8.0)
  it('should parse attributes', () => {
    const ast = parser.parse('<?php #[Attr] class Foo {}');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Class');
    expect(ast![0]['attrGroups'].length).toBe(1);
  });

  it('should parse attributes with arguments', () => {
    const ast = parser.parse('<?php #[Route("/api", methods: ["GET"])] function handler() {}');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Function');
  });

  it('should parse multiple attribute groups', () => {
    const ast = parser.parse('<?php #[Attr1] #[Attr2] class Foo {}');
    expect(ast).not.toBeNull();
    expect(ast![0]['attrGroups'].length).toBe(2);
  });

  // Match expression (complex)
  it('should parse match with no-match arm', () => {
    const ast = parser.parse('<?php match($x) { 1, 2 => "a", 3 => "b", default => "c" };');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_Match');
  });

  // Enum with methods
  it('should parse enum with methods', () => {
    const ast = parser.parse(`<?php
enum Color {
    case Red;
    case Green;
    case Blue;

    public function label(): string {
        return match($this) {
            Color::Red => 'Red',
            Color::Green => 'Green',
            Color::Blue => 'Blue',
        };
    }
}
`);
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Enum');
  });

  // Static methods and properties
  it('should parse static method call', () => {
    const ast = parser.parse('<?php Foo::bar();');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_StaticCall');
  });

  it('should parse static property fetch', () => {
    const ast = parser.parse('<?php Foo::$bar;');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_StaticPropertyFetch');
  });

  it('should parse class constant fetch', () => {
    const ast = parser.parse('<?php Foo::BAR;');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_ClassConstFetch');
  });

  // Readonly properties/classes (PHP 8.1/8.2)
  it('should parse readonly property', () => {
    const ast = parser.parse('<?php class Foo { public readonly string $bar; }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Class');
  });

  it('should parse readonly class', () => {
    const ast = parser.parse('<?php readonly class Foo { public string $bar; }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Class');
  });

  // Closures
  it('should parse static closure', () => {
    const ast = parser.parse('<?php $f = static function() { return 1; };');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr']['expr'].getType()).toBe('Expr_Closure');
  });

  it('should parse closure with use and return type', () => {
    const ast = parser.parse('<?php $f = function(int $x) use ($y, &$z): int { return $x + $y; };');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr']['expr'].getType()).toBe('Expr_Closure');
  });

  // Arrow functions
  it('should parse arrow function', () => {
    const ast = parser.parse('<?php $f = fn($x) => $x * 2;');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr']['expr'].getType()).toBe('Expr_ArrowFunction');
  });

  it('should parse arrow function with return type', () => {
    const ast = parser.parse('<?php $f = fn(int $x): int => $x * 2;');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr']['expr'].getType()).toBe('Expr_ArrowFunction');
  });

  // Try-catch-finally
  it('should parse try-catch-finally', () => {
    const ast = parser.parse('<?php try { foo(); } catch (Exception $e) { bar(); } finally { baz(); }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_TryCatch');
  });

  // Throw expression (PHP 8.0)
  it('should parse throw expression', () => {
    const ast = parser.parse('<?php $x = $y ?? throw new Exception();');
    expect(ast).not.toBeNull();
  });

  // Named arguments
  it('should parse named arguments in function call', () => {
    const ast = parser.parse('<?php foo(x: 1, y: 2);');
    expect(ast).not.toBeNull();
    const call = ast![0]['expr'];
    expect(call.getType()).toBe('Expr_FuncCall');
    expect(call['args'][0]['name']).not.toBeNull();
  });

  // First class callable syntax
  it('should parse first class callable', () => {
    const ast = parser.parse('<?php $f = strlen(...);');
    expect(ast).not.toBeNull();
  });

  // List/array destructuring
  it('should parse list destructuring', () => {
    const ast = parser.parse('<?php [$a, $b] = [1, 2];');
    expect(ast).not.toBeNull();
  });

  it('should parse list() destructuring', () => {
    const ast = parser.parse('<?php list($a, $b) = [1, 2];');
    expect(ast).not.toBeNull();
  });

  // Spread operator
  it('should parse spread in function call', () => {
    const ast = parser.parse('<?php foo(...$args);');
    expect(ast).not.toBeNull();
  });

  it('should parse spread in array', () => {
    const ast = parser.parse('<?php $a = [1, ...$b, 3];');
    expect(ast).not.toBeNull();
  });

  // Null safe operator
  it('should parse nullsafe method chain', () => {
    const ast = parser.parse('<?php $x?->foo()?->bar;');
    expect(ast).not.toBeNull();
  });

  // Complex expressions
  it('should parse complex nested expressions', () => {
    const ast = parser.parse('<?php $x = ($a + $b) * ($c - $d) / $e % $f;');
    expect(ast).not.toBeNull();
  });

  it('should parse chained method calls', () => {
    const ast = parser.parse('<?php $x->foo()->bar()->baz();');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_MethodCall');
  });

  it('should parse array access', () => {
    const ast = parser.parse('<?php $x[0]["key"][$i];');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_ArrayDimFetch');
  });

  // instanceof
  it('should parse instanceof', () => {
    const ast = parser.parse('<?php $x instanceof Foo;');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_Instanceof');
  });

  // Clone
  it('should parse clone', () => {
    const ast = parser.parse('<?php clone $obj;');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_Clone');
  });

  // Print
  it('should parse print', () => {
    const ast = parser.parse('<?php print "hello";');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_Print');
  });

  // Error suppress
  it('should parse error suppress', () => {
    const ast = parser.parse('<?php @file_get_contents("file");');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_ErrorSuppress');
  });

  // Shell exec
  it('should parse shell exec', () => {
    const ast = parser.parse('<?php `ls -la`;');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_ShellExec');
  });

  // Empty and isset
  it('should parse empty', () => {
    const ast = parser.parse('<?php empty($x);');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_Empty');
  });

  it('should parse isset', () => {
    const ast = parser.parse('<?php isset($x, $y);');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_Isset');
  });

  // Eval
  it('should parse eval', () => {
    const ast = parser.parse('<?php eval("echo 1;");');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_Eval');
  });

  // Exit/die
  it('should parse exit', () => {
    const ast = parser.parse('<?php exit(1);');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_Exit');
  });

  // Multiple catch types
  it('should parse multiple catch types', () => {
    const ast = parser.parse('<?php try { } catch (A | B $e) { }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_TryCatch');
  });

  // Use statements
  it('should parse use statement', () => {
    const ast = parser.parse('<?php use Foo\\Bar;');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Use');
  });

  it('should parse grouped use', () => {
    const ast = parser.parse('<?php use Foo\\{Bar, Baz};');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_GroupUse');
  });

  it('should parse function use', () => {
    const ast = parser.parse('<?php use function Foo\\bar;');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Use');
  });

  it('should parse const use', () => {
    const ast = parser.parse('<?php use const Foo\\BAR;');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Use');
  });

  // Namespaced code
  it('should parse namespace', () => {
    const ast = parser.parse('<?php namespace Foo\\Bar; class Baz {}');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Namespace');
  });

  it('should parse braced namespace', () => {
    const ast = parser.parse('<?php namespace Foo\\Bar { class Baz {} }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Namespace');
  });

  // Global namespace
  it('should parse global namespace', () => {
    const ast = parser.parse('<?php namespace { function foo() {} }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Namespace');
  });

  // Halt compiler
  it('should parse halt compiler', () => {
    const ast = parser.parse('<?php __halt_compiler();');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_HaltCompiler');
  });

  // NodeDumper integration
  it('should dump AST correctly', () => {
    const ast = parser.parse('<?php echo "hello";');
    const dumper = new NodeDumper();
    const output = dumper.dump(ast);
    expect(output).toContain('Stmt_Echo');
    expect(output).toContain('hello');
  });

  // Complex class with all features
  it('should parse complex class', () => {
    const ast = parser.parse(`<?php
#[Entity]
abstract class User extends Model implements JsonSerializable, Stringable {
    use HasFactory;
    use SoftDeletes;

    const STATUS_ACTIVE = 1;
    const STATUS_INACTIVE = 0;

    public string $name;
    protected ?int $age = null;
    private static array $instances = [];

    public function __construct(
        public readonly string $email,
        protected string $password,
    ) {}

    abstract public function toArray(): array;

    final public static function create(string $email): static {
        return new static($email, '');
    }
}
`);
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Class');
  });

  // For-each with key
  it('should parse foreach with key', () => {
    const ast = parser.parse('<?php foreach ($items as $key => $value) {}');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Foreach');
    expect(ast![0]['keyVar']).not.toBeNull();
  });

  // Multiple statements
  it('should parse multiple statements', () => {
    const code = `<?php
$a = 1;
$b = 2;
$c = $a + $b;
echo $c;
`;
    const ast = parser.parse(code);
    expect(ast).not.toBeNull();
    expect(ast!.length).toBe(4);
  });

  // Inline HTML
  it('should parse inline HTML', () => {
    const ast = parser.parse('<html><?php echo "hello"; ?></html>');
    expect(ast).not.toBeNull();
    expect(ast!.some(n => n.getType() === 'Stmt_InlineHTML')).toBe(true);
    expect(ast!.some(n => n.getType() === 'Stmt_Echo')).toBe(true);
  });

  // Cast expressions
  it('should parse all cast types', () => {
    const casts = [
      ['(int)$x', 'Expr_Cast_Int'],
      ['(float)$x', 'Expr_Cast_Double'],
      ['(string)$x', 'Expr_Cast_String'],
      ['(bool)$x', 'Expr_Cast_Bool'],
      ['(array)$x', 'Expr_Cast_Array'],
      ['(object)$x', 'Expr_Cast_Object'],
    ];
    for (const [code, type] of casts) {
      const ast = parser.parse(`<?php ${code};`);
      expect(ast).not.toBeNull();
      expect(ast![0]['expr'].getType()).toBe(type);
    }
  });

  // Unary operators
  it('should parse unary operators', () => {
    const ast = parser.parse('<?php -$x; +$x; !$x; ~$x;');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_UnaryMinus');
    expect(ast![1]['expr'].getType()).toBe('Expr_UnaryPlus');
    expect(ast![2]['expr'].getType()).toBe('Expr_BooleanNot');
    expect(ast![3]['expr'].getType()).toBe('Expr_BitwiseNot');
  });

  // Assign operators
  it('should parse all assign operators', () => {
    const ops = [
      ['$x += 1', 'Expr_AssignOp_Plus'],
      ['$x -= 1', 'Expr_AssignOp_Minus'],
      ['$x *= 1', 'Expr_AssignOp_Mul'],
      ['$x /= 1', 'Expr_AssignOp_Div'],
      ['$x %= 1', 'Expr_AssignOp_Mod'],
      ['$x .= "a"', 'Expr_AssignOp_Concat'],
      ['$x &= 1', 'Expr_AssignOp_BitwiseAnd'],
      ['$x |= 1', 'Expr_AssignOp_BitwiseOr'],
      ['$x ^= 1', 'Expr_AssignOp_BitwiseXor'],
      ['$x <<= 1', 'Expr_AssignOp_ShiftLeft'],
      ['$x >>= 1', 'Expr_AssignOp_ShiftRight'],
      ['$x **= 1', 'Expr_AssignOp_Pow'],
      ['$x ??= 1', 'Expr_AssignOp_Coalesce'],
    ];
    for (const [code, type] of ops) {
      const ast = parser.parse(`<?php ${code};`);
      expect(ast).not.toBeNull();
      expect(ast![0]['expr'].getType()).toBe(type);
    }
  });

  // All binary operators
  it('should parse all binary operators', () => {
    const ops = [
      ['$a + $b', 'Expr_BinaryOp_Plus'],
      ['$a - $b', 'Expr_BinaryOp_Minus'],
      ['$a * $b', 'Expr_BinaryOp_Mul'],
      ['$a / $b', 'Expr_BinaryOp_Div'],
      ['$a % $b', 'Expr_BinaryOp_Mod'],
      ['$a ** $b', 'Expr_BinaryOp_Pow'],
      ['$a & $b', 'Expr_BinaryOp_BitwiseAnd'],
      ['$a | $b', 'Expr_BinaryOp_BitwiseOr'],
      ['$a ^ $b', 'Expr_BinaryOp_BitwiseXor'],
      ['$a << $b', 'Expr_BinaryOp_ShiftLeft'],
      ['$a >> $b', 'Expr_BinaryOp_ShiftRight'],
      ['$a . $b', 'Expr_BinaryOp_Concat'],
      ['$a === $b', 'Expr_BinaryOp_Identical'],
      ['$a !== $b', 'Expr_BinaryOp_NotIdentical'],
      ['$a == $b', 'Expr_BinaryOp_Equal'],
      ['$a != $b', 'Expr_BinaryOp_NotEqual'],
      ['$a < $b', 'Expr_BinaryOp_Smaller'],
      ['$a <= $b', 'Expr_BinaryOp_SmallerOrEqual'],
      ['$a > $b', 'Expr_BinaryOp_Greater'],
      ['$a >= $b', 'Expr_BinaryOp_GreaterOrEqual'],
      ['$a <=> $b', 'Expr_BinaryOp_Spaceship'],
      ['$a && $b', 'Expr_BinaryOp_BooleanAnd'],
      ['$a || $b', 'Expr_BinaryOp_BooleanOr'],
      ['$a ?? $b', 'Expr_BinaryOp_Coalesce'],
      ['$a and $b', 'Expr_BinaryOp_LogicalAnd'],
      ['$a or $b', 'Expr_BinaryOp_LogicalOr'],
      ['$a xor $b', 'Expr_BinaryOp_LogicalXor'],
    ];
    for (const [code, type] of ops) {
      const ast = parser.parse(`<?php ${code};`);
      expect(ast).not.toBeNull();
      expect(ast![0]['expr'].getType()).toBe(type);
    }
  });

  // Post/pre increment/decrement
  it('should parse increment and decrement', () => {
    const ast = parser.parse('<?php $x++; $x--; ++$x; --$x;');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_PostInc');
    expect(ast![1]['expr'].getType()).toBe('Expr_PostDec');
    expect(ast![2]['expr'].getType()).toBe('Expr_PreInc');
    expect(ast![3]['expr'].getType()).toBe('Expr_PreDec');
  });

  // Ternary
  it('should parse ternary expression', () => {
    const ast = parser.parse('<?php $x ? $y : $z;');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_Ternary');
  });

  it('should parse short ternary (elvis)', () => {
    const ast = parser.parse('<?php $x ?: $y;');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_Ternary');
  });

  // Assign by reference
  it('should parse assign by reference', () => {
    const ast = parser.parse('<?php $x =& $y;');
    expect(ast).not.toBeNull();
    expect(ast![0]['expr'].getType()).toBe('Expr_AssignRef');
  });

  // Label and goto
  it('should parse label', () => {
    const ast = parser.parse('<?php myLabel: echo "hello";');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Label');
  });

  // Magic constants
  it('should parse magic constants', () => {
    const consts = [
      ['__LINE__', 'Scalar_MagicConst_Line'],
      ['__FILE__', 'Scalar_MagicConst_File'],
      ['__DIR__', 'Scalar_MagicConst_Dir'],
      ['__FUNCTION__', 'Scalar_MagicConst_Function'],
      ['__CLASS__', 'Scalar_MagicConst_Class'],
      ['__TRAIT__', 'Scalar_MagicConst_Trait'],
      ['__METHOD__', 'Scalar_MagicConst_Method'],
      ['__NAMESPACE__', 'Scalar_MagicConst_Namespace'],
    ];
    for (const [code, type] of consts) {
      const ast = parser.parse(`<?php ${code};`);
      expect(ast).not.toBeNull();
      expect(ast![0]['expr'].getType()).toBe(type);
    }
  });

  // Nop (empty statement)
  it('should parse empty statement (nop)', () => {
    const ast = parser.parse('<?php ;');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Nop');
  });

  // Alternative syntax
  it('should parse alternative if syntax', () => {
    const ast = parser.parse('<?php if ($x): echo 1; endif;');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_If');
  });

  it('should parse alternative while syntax', () => {
    const ast = parser.parse('<?php while ($x): echo 1; endwhile;');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_While');
  });

  it('should parse alternative for syntax', () => {
    const ast = parser.parse('<?php for ($i = 0; $i < 10; $i++): echo $i; endfor;');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_For');
  });

  it('should parse alternative foreach syntax', () => {
    const ast = parser.parse('<?php foreach ($items as $item): echo $item; endforeach;');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Foreach');
  });

  it('should parse alternative switch syntax', () => {
    const ast = parser.parse('<?php switch ($x): case 1: echo "one"; break; default: echo "other"; break; endswitch;');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Switch');
  });

  // Complex expressions
  it('should parse nested ternary', () => {
    const ast = parser.parse('<?php $x = $a ? $b : ($c ? $d : $e);');
    expect(ast).not.toBeNull();
  });

  it('should parse array push', () => {
    const ast = parser.parse('<?php $arr[] = 1;');
    expect(ast).not.toBeNull();
  });

  it('should parse list with keys', () => {
    const ast = parser.parse('<?php ["key1" => $a, "key2" => $b] = $arr;');
    expect(ast).not.toBeNull();
  });

  // Multiple catch types
  it('should parse catch without variable', () => {
    const ast = parser.parse('<?php try { } catch (Exception) { }');
    expect(ast).not.toBeNull();
  });

  // Enum with implements
  it('should parse enum implements', () => {
    const ast = parser.parse('<?php enum Status: string implements Stringable { case Active = "active"; }');
    expect(ast).not.toBeNull();
    expect(ast![0].getType()).toBe('Stmt_Enum');
  });

  // Property hooks (PHP 8.4)
  it('should parse property with default value', () => {
    const ast = parser.parse('<?php class Foo { public int $x = 42; }');
    expect(ast).not.toBeNull();
  });

  // DNF types (PHP 8.2)
  it('should parse standalone null type', () => {
    const ast = parser.parse('<?php function foo(): null { return null; }');
    expect(ast).not.toBeNull();
  });

  it('should parse standalone false type', () => {
    const ast = parser.parse('<?php function foo(): false { return false; }');
    expect(ast).not.toBeNull();
  });

  it('should parse standalone true type', () => {
    const ast = parser.parse('<?php function foo(): true { return true; }');
    expect(ast).not.toBeNull();
  });

  // Multi-line expressions
  it('should parse multi-line array', () => {
    const ast = parser.parse(`<?php
$arr = [
    'key1' => 'val1',
    'key2' => 'val2',
    'key3' => 'val3',
];
`);
    expect(ast).not.toBeNull();
  });

  // Global function call
  it('should parse global namespace function', () => {
    const ast = parser.parse('<?php \\strlen("hello");');
    expect(ast).not.toBeNull();
  });

  // String interpolation
  it('should parse simple variable interpolation in double-quoted string', () => {
    const ast = parser.parse('<?php $x = "Hello $name";');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Scalar_InterpolatedString');
    expect(dump).toContain('Expr_Variable');
  });

  it('should parse curly brace interpolation in double-quoted string', () => {
    const ast = parser.parse('<?php $x = "Hello {$name}!";');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Scalar_InterpolatedString');
  });

  it('should parse dollar-curly interpolation in double-quoted string', () => {
    const ast = parser.parse('<?php $x = "Hello ${name}!";');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Scalar_InterpolatedString');
  });

  // Heredoc / Nowdoc
  it('should parse heredoc', () => {
    const ast = parser.parse('<?php $x = <<<EOT\nHello World\nEOT;\n');
    expect(ast).not.toBeNull();
  });

  it('should parse nowdoc', () => {
    const ast = parser.parse("<?php $x = <<<'EOT'\nHello World\nEOT;\n");
    expect(ast).not.toBeNull();
  });

  it('should parse heredoc with interpolation', () => {
    const ast = parser.parse('<?php $x = <<<EOT\nHello $name\nEOT;\n');
    expect(ast).not.toBeNull();
  });

  // Trait use with conflict resolution
  it('should parse trait use with insteadof', () => {
    const ast = parser.parse('<?php class Foo { use A, B { A::foo insteadof B; B::bar as baz; } }');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Stmt_TraitUse');
  });

  // Abstract methods
  it('should parse abstract class with abstract methods', () => {
    const ast = parser.parse('<?php abstract class Foo { abstract public function bar(): void; }');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('ABSTRACT');
  });

  // Named enum (backed enum)
  it('should parse backed string enum', () => {
    const ast = parser.parse('<?php enum Color: string { case Red = "red"; case Blue = "blue"; }');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Stmt_Enum');
    expect(dump).toContain('Stmt_EnumCase');
  });

  it('should parse backed int enum', () => {
    const ast = parser.parse('<?php enum Status: int { case Active = 1; case Inactive = 0; }');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Stmt_Enum');
  });

  // Multiple interfaces
  it('should parse class implementing multiple interfaces', () => {
    const ast = parser.parse('<?php class Foo implements Bar, Baz, Qux {}');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Stmt_Class');
  });

  // Yield
  it('should parse yield expression', () => {
    const ast = parser.parse('<?php function gen() { yield 1; yield $key => $value; }');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Expr_Yield');
  });

  it('should parse yield from expression', () => {
    const ast = parser.parse('<?php function gen() { yield from [1, 2, 3]; }');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Expr_YieldFrom');
  });

  // Static variables
  it('should parse static variable declaration', () => {
    const ast = parser.parse('<?php function foo() { static $x = 0; $x++; return $x; }');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Stmt_Static');
  });

  // Global variables
  it('should parse global variable declaration', () => {
    const ast = parser.parse('<?php function foo() { global $x, $y; }');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Stmt_Global');
  });

  // Unset
  it('should parse unset statement', () => {
    const ast = parser.parse('<?php unset($x, $y[$key]);');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Stmt_Unset');
  });

  // Declare
  it('should parse declare strict_types', () => {
    const ast = parser.parse('<?php declare(strict_types=1);');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Stmt_Declare');
  });

  // Goto
  it('should parse goto statement', () => {
    const ast = parser.parse('<?php goto myLabel; myLabel: echo "here";');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Stmt_Goto');
    expect(dump).toContain('Stmt_Label');
  });

  // Const statement
  it('should parse const statement', () => {
    const ast = parser.parse('<?php const FOO = 1, BAR = 2;');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Stmt_Const');
  });

  // Anonymous class
  it('should parse anonymous class with constructor args', () => {
    const ast = parser.parse('<?php $obj = new class(1, 2) extends Base implements Iface { public function foo() {} };');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Stmt_Class');
    expect(dump).toContain('Expr_New');
  });

  // Nested functions/closures
  it('should parse nested closures', () => {
    const ast = parser.parse('<?php $f = function() { return function($x) { return $x * 2; }; };');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Expr_Closure');
  });

  // Complex match expression
  it('should parse match with multiple conditions per arm', () => {
    const ast = parser.parse('<?php match($x) { 1, 2, 3 => "low", 4, 5, 6 => "high", default => "other" };');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Expr_Match');
    expect(dump).toContain('MatchArm');
  });

  // Nullsafe with chaining
  it('should parse nullsafe operator chain', () => {
    const ast = parser.parse('<?php $result = $obj?->foo()?->bar?->baz();');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Expr_NullsafeMethodCall');
    expect(dump).toContain('Expr_NullsafePropertyFetch');
  });

  // Named arguments
  it('should parse named arguments with spread', () => {
    const ast = parser.parse('<?php foo(name: "test", ...$args);');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Arg');
  });

  // First-class callable syntax
  it('should parse first class callable on static method', () => {
    const ast = parser.parse('<?php $fn = Foo::bar(...);');
    expect(ast).not.toBeNull();
  });

  it('should parse first class callable on method', () => {
    const ast = parser.parse('<?php $fn = $obj->method(...);');
    expect(ast).not.toBeNull();
  });

  // Intersection type in return
  it('should parse intersection type in return type', () => {
    const ast = parser.parse('<?php function foo(): A&B { }');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('IntersectionType');
  });

  // DNF types (PHP 8.2)
  it('should parse union of intersection types', () => {
    const ast = parser.parse('<?php function foo((A&B)|C $x) {}');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('UnionType');
  });

  // Property hooks (PHP 8.4)
  it('should parse readonly properties in constructor promotion', () => {
    const ast = parser.parse('<?php class Foo { public function __construct(private readonly string $name, protected int $age = 0) {} }');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('READONLY');
    expect(dump).toContain('PRIVATE');
    expect(dump).toContain('PROTECTED');
  });

  // Complex expressions
  it('should parse complex array destructuring', () => {
    const ast = parser.parse('<?php [$a, [$b, $c], $d] = $arr;');
    expect(ast).not.toBeNull();
  });

  it('should parse nested ternary with null coalesce', () => {
    const ast = parser.parse('<?php $x = $a ?? $b ?? $c;');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Expr_BinaryOp_Coalesce');
  });

  it('should parse chained null coalesce assignment', () => {
    const ast = parser.parse('<?php $x ??= $default;');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Expr_AssignOp_Coalesce');
  });

  // Multi-catch
  it('should parse catch with multiple exception types', () => {
    const ast = parser.parse('<?php try { foo(); } catch (A|B|C $e) { }');
    expect(ast).not.toBeNull();
  });

  // Static methods and properties
  it('should parse static property assignment', () => {
    const ast = parser.parse('<?php self::$prop = 1; static::$prop = 2; parent::$prop = 3;');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Expr_StaticPropertyFetch');
  });

  it('should parse static constant access', () => {
    const ast = parser.parse('<?php self::FOO; static::BAR; parent::BAZ; Foo::class;');
    expect(ast).not.toBeNull();
  });

  // Variadic parameter
  it('should parse variadic parameter', () => {
    const ast = parser.parse('<?php function foo(int ...$nums) { }');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Param');
  });

  // Default parameter values
  it('should parse complex default parameter values', () => {
    const ast = parser.parse('<?php function foo($x = null, $y = [], $z = 1 + 2) { }');
    expect(ast).not.toBeNull();
  });

  // String concatenation
  it('should parse string concatenation', () => {
    const ast = parser.parse('<?php $x = "hello" . " " . "world";');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Expr_BinaryOp_Concat');
  });

  // Power operator
  it('should parse power operator', () => {
    const ast = parser.parse('<?php $x = 2 ** 10;');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Expr_BinaryOp_Pow');
  });

  // Include/require
  it('should parse include and require', () => {
    const ast = parser.parse('<?php include "file.php"; require_once "other.php";');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Expr_Include');
  });

  // Encapsed (backtick) string
  it('should parse backtick shell execution with interpolation', () => {
    const ast = parser.parse('<?php $out = `ls -la $dir`;');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Expr_ShellExec');
  });

  // Nested array access
  it('should parse nested array access', () => {
    const ast = parser.parse('<?php $x = $arr[0][1]["key"];');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Expr_ArrayDimFetch');
  });

  // Spaceship operator
  it('should parse spaceship operator', () => {
    const ast = parser.parse('<?php $x = $a <=> $b;');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Expr_BinaryOp_Spaceship');
  });

  // Bitwise operations
  it('should parse bitwise operations', () => {
    const ast = parser.parse('<?php $x = $a & $b | $c ^ $d;');
    expect(ast).not.toBeNull();
  });

  // Class with multiple traits
  it('should parse class with multiple trait uses', () => {
    const ast = parser.parse('<?php class Foo { use TraitA; use TraitB, TraitC; }');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Stmt_TraitUse');
  });

  // Interface extending multiple interfaces
  it('should parse interface extending multiple interfaces', () => {
    const ast = parser.parse('<?php interface Foo extends Bar, Baz { public function qux(): void; }');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Stmt_Interface');
  });

  // Trait use adaptations
  it('should parse trait use with alias and visibility', () => {
    const ast = parser.parse('<?php class Foo { use A { foo as protected bar; } }');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Stmt_TraitUseAdaptation_Alias');
  });

  // Closure binding
  it('should parse closure with static and use by reference', () => {
    const ast = parser.parse('<?php $f = static function() use (&$x, $y) { return $x + $y; };');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Expr_Closure');
  });

  // Multiple catch types
  it('should parse try with multiple catch blocks', () => {
    const ast = parser.parse('<?php try { foo(); } catch (A $e) { } catch (B $e) { } catch (C $e) { }');
    expect(ast).not.toBeNull();
  });

  // Nested arrays and function calls
  it('should parse nested function calls with array arguments', () => {
    const ast = parser.parse('<?php array_merge($a, array_map(fn($x) => $x * 2, [1, 2, 3]));');
    expect(ast).not.toBeNull();
  });

  // Ternary chain
  it('should parse complex expression with casts and operations', () => {
    const ast = parser.parse('<?php $x = (int) ($a . $b) + (float) $c;');
    expect(ast).not.toBeNull();
  });

  // Object creation chain
  it('should parse new with immediate method call', () => {
    const ast = parser.parse('<?php (new Foo())->bar()->baz();');
    expect(ast).not.toBeNull();
  });

  // Nullable return type
  it('should parse nullable return type', () => {
    const ast = parser.parse('<?php function foo(): ?string { return null; }');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('NullableType');
  });

  // Self and parent types
  it('should parse self and parent type hints', () => {
    const ast = parser.parse('<?php class Foo { public function bar(self $a): parent { } }');
    expect(ast).not.toBeNull();
  });

  // Mixed type
  it('should parse mixed type', () => {
    const ast = parser.parse('<?php function foo(mixed $x): mixed { return $x; }');
    expect(ast).not.toBeNull();
  });

  // Never type
  it('should parse never return type', () => {
    const ast = parser.parse('<?php function fail(): never { throw new \\Exception(); }');
    expect(ast).not.toBeNull();
  });

  // Complex class
  it('should parse full-featured class', () => {
    const code = `<?php
#[Entity]
#[Table("users")]
final class User extends Model implements Serializable, JsonSerializable
{
    use HasFactory;
    use Notifiable, HasApiTokens {
        Notifiable::notify insteadof HasApiTokens;
        HasApiTokens::token as getToken;
    }

    const STATUS_ACTIVE = 1;
    const STATUS_INACTIVE = 0;

    private static int $instanceCount = 0;
    protected readonly string $name;
    public ?int $age = null;

    public function __construct(
        private string $email,
        protected string $role = 'user',
    ) {
        self::$instanceCount++;
    }

    abstract public function validate(): bool;

    final protected function getStatus(): int
    {
        return match($this->status) {
            self::STATUS_ACTIVE => 1,
            self::STATUS_INACTIVE => 0,
            default => -1,
        };
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'email' => $this->email,
            'age' => $this->age ?? 'unknown',
        ];
    }
}`;
    const ast = parser.parse(code);
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Stmt_Class');
    expect(dump).toContain('Stmt_TraitUse');
    expect(dump).toContain('Stmt_ClassConst');
    expect(dump).toContain('Stmt_Property');
    expect(dump).toContain('Stmt_ClassMethod');
    expect(dump).toContain('Expr_Match');
    expect(dump).toContain('AttributeGroup');
  });

  // Fibers (PHP 8.1)
  it('should parse Fiber usage', () => {
    const ast = parser.parse('<?php $fiber = new Fiber(function(): void { Fiber::suspend("value"); });');
    expect(ast).not.toBeNull();
  });

  // Enum with methods and interfaces
  it('should parse enum with interface and method', () => {
    const code = `<?php
enum Suit: string implements HasColor {
    case Hearts = 'H';
    case Diamonds = 'D';
    case Clubs = 'C';
    case Spades = 'S';

    public function color(): string {
        return match($this) {
            Suit::Hearts, Suit::Diamonds => 'red',
            Suit::Clubs, Suit::Spades => 'black',
        };
    }
}`;
    const ast = parser.parse(code);
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Stmt_Enum');
    expect(dump).toContain('Stmt_EnumCase');
    expect(dump).toContain('Stmt_ClassMethod');
  });

  // String interpolation with array access
  it('should parse string interpolation with variable property', () => {
    const ast = parser.parse('<?php $x = "Value: $obj->prop";');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Scalar_InterpolatedString');
  });

  // Complex list destructuring
  it('should parse list destructuring with nested list', () => {
    const ast = parser.parse('<?php [[$a, $b], [$c, $d]] = $matrix;');
    expect(ast).not.toBeNull();
  });

  // First-class callable with static
  it('should parse first class callable with built-in function', () => {
    const ast = parser.parse('<?php $fn = strlen(...);');
    expect(ast).not.toBeNull();
  });

  // Global scope access
  it('should parse __CLASS__ and __FUNCTION__ magic constants', () => {
    const ast = parser.parse('<?php echo __CLASS__, __FUNCTION__, __METHOD__, __LINE__, __FILE__;');
    expect(ast).not.toBeNull();
  });

  // Property type with default
  it('should parse typed property with complex default', () => {
    const ast = parser.parse('<?php class Foo { public array $data = [1, 2, 3]; }');
    expect(ast).not.toBeNull();
  });

  // Abstract method
  it('should parse abstract method declaration', () => {
    const ast = parser.parse('<?php abstract class Foo { abstract protected function bar(int $x): string; }');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('ABSTRACT');
  });

  // Multiple return types
  it('should parse union return type', () => {
    const ast = parser.parse('<?php function foo(): int|string|null { return null; }');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('UnionType');
  });

  // Negative array index
  it('should parse negative array index', () => {
    const ast = parser.parse('<?php $x = $arr[-1];');
    expect(ast).not.toBeNull();
  });

  // Double-quoted string with expression
  it('should parse double-quoted string with complex interpolation', () => {
    const ast = parser.parse('<?php $x = "Count: {$obj->getCount()}";');
    expect(ast).not.toBeNull();
    const dump = new NodeDumper().dump(ast);
    expect(dump).toContain('Scalar_InterpolatedString');
    expect(dump).toContain('Expr_MethodCall');
  });
});
