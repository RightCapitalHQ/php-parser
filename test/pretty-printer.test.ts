import { describe, it, expect } from 'vitest';
import { ParserFactory } from '../src/parser-factory';
import { PrettyPrinter } from '../src/pretty-printer';

describe('PrettyPrinter', () => {
  const factory = new ParserFactory();
  const parser = factory.createForNewestSupportedVersion();
  const printer = new PrettyPrinter();

  function roundTrip(code: string): string {
    const ast = parser.parse('<?php ' + code);
    expect(ast).not.toBeNull();
    return printer.prettyPrint(ast!).trim();
  }

  it('should print echo statement', () => {
    expect(roundTrip("echo 'hello';")).toBe("echo 'hello';");
  });

  it('should print variable assignment', () => {
    const result = roundTrip('$x = 42;');
    expect(result).toContain('$x');
    expect(result).toContain('= 42');
  });

  it('should print function declaration', () => {
    const result = roundTrip('function foo($a, $b) { return $a + $b; }');
    expect(result).toContain('function foo');
    expect(result).toContain('return');
  });

  it('should print class declaration', () => {
    const result = roundTrip('class Foo { public function bar() { return 1; } }');
    expect(result).toContain('class Foo');
    expect(result).toContain('public function bar');
  });

  it('should print if/else', () => {
    const result = roundTrip('if ($x) { echo 1; } else { echo 2; }');
    expect(result).toContain('if ($x)');
    expect(result).toContain('else');
  });

  it('should print while loop', () => {
    const result = roundTrip('while ($i < 10) { $i = $i + 1; }');
    expect(result).toContain('while');
  });

  it('should print for loop', () => {
    const result = roundTrip('for ($i = 0; $i < 10; $i = $i + 1) { echo $i; }');
    expect(result).toContain('for');
  });

  it('should print foreach', () => {
    const result = roundTrip('foreach ($arr as $key => $value) { echo $value; }');
    expect(result).toContain('foreach');
    expect(result).toContain('=>');
  });

  it('should print try/catch', () => {
    const result = roundTrip('try { foo(); } catch (Exception $e) { bar(); }');
    expect(result).toContain('try');
    expect(result).toContain('catch');
  });

  it('should print array', () => {
    const result = roundTrip('[1, 2, 3];');
    expect(result).toContain('[1, 2, 3]');
  });

  it('should print binary operations', () => {
    expect(roundTrip('$a + $b;')).toContain('$a + $b');
    expect(roundTrip('$a * $b;')).toContain('$a * $b');
    expect(roundTrip('$a === $b;')).toContain('$a === $b');
  });

  it('should print ternary', () => {
    const result = roundTrip('$x ? 1 : 2;');
    expect(result).toContain('?');
    expect(result).toContain(':');
  });

  it('should print closure', () => {
    const result = roundTrip('function($x) { return $x; };');
    expect(result).toContain('function');
    expect(result).toContain('$x');
  });

  it('should print arrow function', () => {
    const result = roundTrip('fn($x) => $x * 2;');
    expect(result).toContain('fn');
    expect(result).toContain('=>');
  });

  it('should print match', () => {
    const result = roundTrip('match($x) { 1 => "one", default => "other" };');
    expect(result).toContain('match');
  });

  it('should print prettyPrintFile', () => {
    const ast = parser.parse('<?php echo 1;');
    expect(ast).not.toBeNull();
    const output = printer.prettyPrintFile(ast!);
    expect(output).toContain('<?php');
    expect(output).toContain('echo 1;');
  });

  it('should print namespace', () => {
    const result = roundTrip('namespace App\\Models;');
    expect(result).toContain('namespace');
    expect(result).toContain('App\\Models');
  });

  it('should print use statement', () => {
    const result = roundTrip('use App\\Models\\User;');
    expect(result).toContain('use');
  });

  it('should print interface', () => {
    const result = roundTrip('interface Foo { public function bar(): void; }');
    expect(result).toContain('interface Foo');
  });

  it('should print enum', () => {
    const result = roundTrip('enum Color { case Red; case Green; }');
    expect(result).toContain('enum Color');
    expect(result).toContain('case Red');
  });

  it('should print switch', () => {
    const result = roundTrip('switch ($x) { case 1: echo "one"; break; default: echo "other"; }');
    expect(result).toContain('switch');
    expect(result).toContain('case');
    expect(result).toContain('default');
  });

  it('should print static method call', () => {
    const result = roundTrip('Foo::bar(1, 2);');
    expect(result).toContain('Foo::bar(1, 2)');
  });

  it('should print class constant fetch', () => {
    const result = roundTrip('Foo::BAR;');
    expect(result).toContain('Foo::BAR');
  });

  it('should print static property fetch', () => {
    const result = roundTrip('Foo::$bar;');
    expect(result).toContain('Foo::$bar');
  });

  it('should print instanceof', () => {
    const result = roundTrip('$x instanceof Foo;');
    expect(result).toContain('$x instanceof Foo');
  });

  it('should print new expression', () => {
    const result = roundTrip('new Foo(1, 2);');
    expect(result).toContain('new Foo(1, 2)');
  });

  it('should print casts', () => {
    expect(roundTrip('(int) $x;')).toContain('(int)');
    expect(roundTrip('(string) $y;')).toContain('(string)');
  });

  it('should print unary operators', () => {
    expect(roundTrip('!$x;')).toContain('!$x');
    expect(roundTrip('-$x;')).toContain('-$x');
  });

  it('should print increment/decrement', () => {
    expect(roundTrip('++$x;')).toContain('++$x');
    expect(roundTrip('$x++;')).toContain('$x++');
  });

  it('should print yield', () => {
    const result = roundTrip('function gen() { yield 1; yield $k => $v; }');
    expect(result).toContain('yield');
  });

  it('should print magic constants', () => {
    expect(roundTrip('__LINE__;')).toContain('__LINE__');
    expect(roundTrip('__CLASS__;')).toContain('__CLASS__');
    expect(roundTrip('__NAMESPACE__;')).toContain('__NAMESPACE__');
  });

  it('should print assign by reference', () => {
    const result = roundTrip('$x =& $y;');
    expect(result).toContain('$x =& $y');
  });

  it('should print assign operators', () => {
    expect(roundTrip('$x += 1;')).toContain('$x += 1');
    expect(roundTrip('$x .= "s";')).toContain('$x .= ');
    expect(roundTrip('$x ??= $default;')).toContain('$x ??= ');
  });

  it('should print trait use', () => {
    const result = roundTrip('class Foo { use Bar; }');
    expect(result).toContain('use Bar');
  });

  it('should print class with extends and implements', () => {
    const result = roundTrip('class Foo extends Bar implements Baz {}');
    expect(result).toContain('class Foo');
    expect(result).toContain('extends Bar');
    expect(result).toContain('implements Baz');
  });

  it('should print abstract class', () => {
    const result = roundTrip('abstract class Foo { abstract public function bar(): void; }');
    expect(result).toContain('abstract class Foo');
    expect(result).toContain('abstract');
    expect(result).toContain('public');
    expect(result).toContain('function bar');
  });

  it('should print closure with use', () => {
    const result = roundTrip('function() use ($x, &$y) { return $x + $y; };');
    expect(result).toContain('use(');
    expect(result).toContain('$x');
    expect(result).toContain('&$y');
  });

  it('should print backed enum', () => {
    const result = roundTrip('enum Color: string { case Red = "red"; }');
    expect(result).toContain('enum Color: string');
    expect(result).toContain('case Red =');
  });

  it('should print global and static', () => {
    const result = roundTrip('function f() { global $x; static $y = 0; }');
    expect(result).toContain('global $x');
    expect(result).toContain('static $y = 0');
  });

  it('should print declare', () => {
    const result = roundTrip('declare(strict_types=1);');
    expect(result).toContain('declare(strict_types = 1)');
  });

  it('should print nullsafe', () => {
    const result = roundTrip('$x?->foo()?->bar;');
    expect(result).toContain('?->foo()');
    expect(result).toContain('?->bar');
  });

  it('should print nullable type', () => {
    const result = roundTrip('function foo(?int $x): ?string {}');
    expect(result).toContain('?int');
    expect(result).toContain('?string');
  });

  it('should print union type', () => {
    const result = roundTrip('function foo(int|string $x) {}');
    expect(result).toContain('int|string');
  });
});
