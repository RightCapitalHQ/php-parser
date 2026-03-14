import { describe, it, expect } from 'vitest';
import { Lexer } from '../src/lexer';
import * as T from '../src/php-token';

describe('Lexer', () => {
  const lexer = new Lexer();

  it('should tokenize simple PHP code', () => {
    const tokens = lexer.tokenize('<?php echo "hello";');
    const tokenIds = tokens.filter(t => t.id !== T.T_WHITESPACE && t.id !== 0).map(t => t.id);
    expect(tokenIds).toContain(T.T_OPEN_TAG);
    expect(tokenIds).toContain(T.T_ECHO);
    expect(tokenIds).toContain(T.T_CONSTANT_ENCAPSED_STRING);
  });

  it('should tokenize variables', () => {
    const tokens = lexer.tokenize('<?php $foo = 42;');
    const nonWs = tokens.filter(t => t.id !== T.T_WHITESPACE && t.id !== 0);
    expect(nonWs.some(t => t.id === T.T_VARIABLE && t.text === '$foo')).toBe(true);
    expect(nonWs.some(t => t.id === T.T_LNUMBER && t.text === '42')).toBe(true);
  });

  it('should tokenize operators', () => {
    const tokens = lexer.tokenize('<?php $a === $b;');
    const nonWs = tokens.filter(t => t.id !== T.T_WHITESPACE && t.id !== 0);
    expect(nonWs.some(t => t.id === T.T_IS_IDENTICAL)).toBe(true);
  });

  it('should tokenize strings', () => {
    const tokens = lexer.tokenize("<?php 'hello world';");
    const nonWs = tokens.filter(t => t.id !== T.T_WHITESPACE && t.id !== 0);
    expect(nonWs.some(t => t.id === T.T_CONSTANT_ENCAPSED_STRING && t.text === "'hello world'")).toBe(true);
  });

  it('should track line numbers', () => {
    const tokens = lexer.tokenize("<?php\n$a = 1;\n$b = 2;");
    const varA = tokens.find(t => t.text === '$a');
    const varB = tokens.find(t => t.text === '$b');
    expect(varA?.line).toBe(2);
    expect(varB?.line).toBe(3);
  });

  it('should tokenize function declarations', () => {
    const tokens = lexer.tokenize('<?php function foo($a, $b) { return $a + $b; }');
    const nonWs = tokens.filter(t => t.id !== T.T_WHITESPACE && t.id !== 0);
    expect(nonWs.some(t => t.id === T.T_FUNCTION)).toBe(true);
    expect(nonWs.some(t => t.id === T.T_RETURN)).toBe(true);
  });

  it('should tokenize class declarations', () => {
    const tokens = lexer.tokenize('<?php class Foo extends Bar implements Baz {}');
    const nonWs = tokens.filter(t => t.id !== T.T_WHITESPACE && t.id !== 0);
    expect(nonWs.some(t => t.id === T.T_CLASS)).toBe(true);
    expect(nonWs.some(t => t.id === T.T_EXTENDS)).toBe(true);
    expect(nonWs.some(t => t.id === T.T_IMPLEMENTS)).toBe(true);
  });

  it('should handle inline HTML', () => {
    const tokens = lexer.tokenize('<html><?php echo 1; ?></html>');
    const nonWs = tokens.filter(t => t.id !== T.T_WHITESPACE && t.id !== 0);
    expect(nonWs[0].id).toBe(T.T_INLINE_HTML);
    expect(nonWs[0].text).toBe('<html>');
  });

  it('should add sentinel token', () => {
    const tokens = lexer.tokenize('<?php 1;');
    expect(tokens[tokens.length - 1].id).toBe(0);
  });

  it('should tokenize comments', () => {
    const tokens = lexer.tokenize('<?php // comment\n$x = 1;');
    expect(tokens.some(t => t.id === T.T_COMMENT)).toBe(true);
  });

  it('should tokenize doc comments', () => {
    const tokens = lexer.tokenize('<?php /** doc */ function foo() {}');
    expect(tokens.some(t => t.id === T.T_DOC_COMMENT)).toBe(true);
  });

  it('should tokenize namespace', () => {
    const tokens = lexer.tokenize('<?php namespace App\\Models;');
    const nonWs = tokens.filter(t => t.id !== T.T_WHITESPACE && t.id !== 0);
    expect(nonWs.some(t => t.id === T.T_NAMESPACE)).toBe(true);
  });

  it('should tokenize array syntax', () => {
    const tokens = lexer.tokenize('<?php $a = [1, 2, 3];');
    const nonWs = tokens.filter(t => t.id !== T.T_WHITESPACE && t.id !== 0);
    expect(nonWs.some(t => t.id === T.T_VARIABLE)).toBe(true);
    expect(nonWs.some(t => t.id === T.T_LNUMBER)).toBe(true);
  });

  it('should tokenize double arrow', () => {
    const tokens = lexer.tokenize('<?php $a => $b;');
    expect(tokens.some(t => t.id === T.T_DOUBLE_ARROW)).toBe(true);
  });

  it('should tokenize increment and decrement', () => {
    const tokens = lexer.tokenize('<?php $x++; --$y;');
    const nonWs = tokens.filter(t => t.id !== T.T_WHITESPACE && t.id !== 0);
    expect(nonWs.some(t => t.id === T.T_INC)).toBe(true);
    expect(nonWs.some(t => t.id === T.T_DEC)).toBe(true);
  });

  it('should tokenize attribute', () => {
    const tokens = lexer.tokenize('<?php #[Attr] class Foo {}');
    const nonWs = tokens.filter(t => t.id !== T.T_WHITESPACE && t.id !== 0);
    expect(nonWs.some(t => t.id === T.T_ATTRIBUTE)).toBe(true);
  });

  it('should tokenize comparison operators', () => {
    const tokens = lexer.tokenize('<?php $a === $b !== $c <=> $d;');
    const nonWs = tokens.filter(t => t.id !== T.T_WHITESPACE && t.id !== 0);
    expect(nonWs.some(t => t.id === T.T_IS_IDENTICAL)).toBe(true);
    expect(nonWs.some(t => t.id === T.T_IS_NOT_IDENTICAL)).toBe(true);
    expect(nonWs.some(t => t.id === T.T_SPACESHIP)).toBe(true);
  });

  it('should tokenize null coalesce operators', () => {
    const tokens = lexer.tokenize('<?php $a ?? $b ??= $c;');
    const nonWs = tokens.filter(t => t.id !== T.T_WHITESPACE && t.id !== 0);
    expect(nonWs.some(t => t.id === T.T_COALESCE)).toBe(true);
    expect(nonWs.some(t => t.id === T.T_COALESCE_EQUAL)).toBe(true);
  });

  it('should tokenize ellipsis', () => {
    const tokens = lexer.tokenize('<?php foo(...$args);');
    expect(tokens.some(t => t.id === T.T_ELLIPSIS)).toBe(true);
  });

  it('should tokenize nullsafe operator', () => {
    const tokens = lexer.tokenize('<?php $x?->y;');
    expect(tokens.some(t => t.id === T.T_NULLSAFE_OBJECT_OPERATOR)).toBe(true);
  });

  it('should tokenize namespace-qualified names', () => {
    const tokens = lexer.tokenize('<?php Foo\\Bar\\Baz;');
    const nonWs = tokens.filter(t => t.id !== T.T_WHITESPACE && t.id !== 0);
    expect(nonWs.some(t => t.id === T.T_NAME_QUALIFIED)).toBe(true);
  });

  it('should tokenize fully qualified names', () => {
    const tokens = lexer.tokenize('<?php \\Foo\\Bar;');
    const nonWs = tokens.filter(t => t.id !== T.T_WHITESPACE && t.id !== 0);
    expect(nonWs.some(t => t.id === T.T_NAME_FULLY_QUALIFIED)).toBe(true);
  });
});
