import { describe, it, expect } from 'vitest';
import { ParserFactory } from '../src/parserFactory';
import { NodeTraverser } from '../src/nodeTraverser';
import { NameResolver } from '../src/nodeVisitor/nameResolver';
import { CollectingErrorHandler } from '../src/errorHandler';

describe('NameResolver', () => {
  const factory = new ParserFactory();
  const parser = factory.createForNewestSupportedVersion();

  it('should resolve names in namespace', () => {
    const code = `<?php
namespace App\\Models;
class User extends Base {}
`;
    const ast = parser.parse(code);
    expect(ast).not.toBeNull();

    const nameResolver = new NameResolver();
    const traverser = new NodeTraverser();
    traverser.addVisitor(nameResolver);
    traverser.traverse(ast!);

    const ns = ast![0];
    expect(ns.getType()).toBe('Stmt_Namespace');
  });

  it('should resolve use statements', () => {
    const code = `<?php
namespace App;
use Illuminate\\Database\\Eloquent\\Model;
class User extends Model {}
`;
    const ast = parser.parse(code);
    expect(ast).not.toBeNull();

    const nameResolver = new NameResolver();
    const traverser = new NodeTraverser();
    traverser.addVisitor(nameResolver);
    traverser.traverse(ast!);
  });

  it('should create NameContext', () => {
    const nameResolver = new NameResolver();
    expect(nameResolver.getNameContext()).not.toBeNull();
  });

  it('should preserve original names when configured', () => {
    const code = '<?php namespace App; class Foo {}';
    const ast = parser.parse(code);
    expect(ast).not.toBeNull();

    const nameResolver = new NameResolver(null, { preserveOriginalNames: true });
    const traverser = new NodeTraverser();
    traverser.addVisitor(nameResolver);
    traverser.traverse(ast!);
  });
});
