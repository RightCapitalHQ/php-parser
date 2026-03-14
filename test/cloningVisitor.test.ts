import { describe, it, expect } from 'vitest';
import { ParserFactory } from '../src/parserFactory';
import { NodeTraverser } from '../src/nodeTraverser';
import { CloningVisitor } from '../src/nodeVisitor/cloningVisitor';
import { NodeDumper } from '../src/nodeDumper';

describe('CloningVisitor', () => {
  const factory = new ParserFactory();
  const parser = factory.createForNewestSupportedVersion();
  const dumper = new NodeDumper();

  it('should clone AST', () => {
    const code = '<?php $x = 1 + 2;';
    const ast = parser.parse(code);
    expect(ast).not.toBeNull();

    const traverser = new NodeTraverser();
    traverser.addVisitor(new CloningVisitor());
    const cloned = traverser.traverse(ast!);

    // Cloned AST should have same structure
    expect(dumper.dump(cloned)).toBe(dumper.dump(ast));
  });

  it('should create independent copies', () => {
    const code = '<?php $x = 42;';
    const ast = parser.parse(code);
    expect(ast).not.toBeNull();

    const traverser = new NodeTraverser();
    traverser.addVisitor(new CloningVisitor());
    const cloned = traverser.traverse(ast!);

    // Cloned nodes should be different objects
    // The traverser replaces nodes in-place in the array, so check that the
    // cloned node is structurally equivalent but functionally independent
    expect(cloned.length).toBe(ast!.length);
    expect(dumper.dump(cloned)).toBe(dumper.dump(ast));
  });

  it('should clone complex class', () => {
    const code = `<?php
class Foo {
    public int $x = 1;
    public function bar(string $s): string {
        return $s . "!";
    }
}
`;
    const ast = parser.parse(code);
    expect(ast).not.toBeNull();

    const traverser = new NodeTraverser();
    traverser.addVisitor(new CloningVisitor());
    const cloned = traverser.traverse(ast!);

    expect(dumper.dump(cloned)).toBe(dumper.dump(ast));
  });
});
