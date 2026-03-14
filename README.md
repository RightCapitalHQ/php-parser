# @rightcapital/php-parser — A Pure TypeScript Port of nikic/PHP-Parser

<!-- Badges area start -->

[![made by RightCapital](https://img.shields.io/badge/made_by-RightCapital-4966d0)](https://rightcapital.com)
![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/RightCapitalHQ/php-parser/ci.yml)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)
[![RightCapital frontend style guide](https://img.shields.io/badge/code_style-RightCapital-5c4c64?labelColor=f0ede8)](https://github.com/RightCapitalHQ/frontend-style-guide)

<!-- Badges area end -->

A pure TypeScript port of [nikic/PHP-Parser](https://github.com/nikic/PHP-Parser) — a PHP 8.x parser that produces an AST fully compatible with the upstream PHP implementation.

## Background

This project is a faithful port of nikic/PHP-Parser v5 from PHP to TypeScript. It implements a recursive descent parser with Pratt precedence climbing for expressions, producing the same AST node types and structure as the original. The goal is to enable PHP static analysis, code transformation, and tooling in JavaScript/TypeScript environments without requiring a PHP runtime.

## Current Status

- **831 tests passing** across 14 test suites
- **198 upstream test cases** from nikic/PHP-Parser's test suite pass with exact AST dump matching
- **125 out of 178** upstream `.test` files fully supported (remaining are error-recovery or version-filtered cases)
- **~220 source files**, **~192 AST node types**

### Test Suite Breakdown

| Test File | Tests | Description |
|-----------|-------|-------------|
| parser.test.ts | 220 | Core parser functionality |
| upstreamTestRunner.test.ts | 198 | Upstream nikic/PHP-Parser .test file compatibility |
| builder.test.ts | 104 | AST builder API |
| upstreamCompat.test.ts | 84 | Additional upstream compatibility |
| constExprEvaluator.test.ts | 56 | Constant expression evaluation |
| prettyPrinter.test.ts | 43 | Code generation / pretty printing |
| astStructure.test.ts | 41 | AST node structure validation |
| integration.test.ts | 32 | End-to-end integration tests |
| lexer.test.ts | 22 | Lexer / tokenizer |
| nodeDumper.test.ts | 10 | AST dump output |
| nodeTraverser.test.ts | 8 | Tree traversal |
| nodeFinder.test.ts | 6 | Node finding utilities |
| nameResolver.test.ts | 4 | Name resolution (use statements, namespaces) |
| cloningVisitor.test.ts | 3 | Deep AST cloning |

## Features

### PHP 8.x Support
- Named arguments, match expressions, nullsafe operator (`?->`)
- Union types, intersection types, DNF (disjunctive normal form) types
- Enums (unit and backed), fibers, readonly properties/classes
- First-class callable syntax, `never`/`null`/`false`/`true` types
- Attributes (`#[...]`)
- Property hooks (PHP 8.4), asymmetric visibility
- Pipe operator (`|>`)
- `clone()` as expression, `exit()`/`die()` as functions

### Components
- **Parser** — Recursive descent parser with Pratt precedence for PHP 8.x
- **Lexer** — State machine lexer supporting all PHP tokens including heredoc/nowdoc
- **PrettyPrinter** — AST to PHP code generation
- **NodeTraverser / NodeVisitor** — Tree traversal and transformation
- **NodeDumper** — Human-readable AST dump (compatible with upstream format)
- **NodeFinder** — Find nodes by type or predicate
- **NameResolver** — Resolve names using `use` statements and namespace context
- **BuilderFactory** — Fluent API for constructing AST nodes
- **ConstExprEvaluator** — Evaluate constant expressions

## Installation

```bash
npm install @rightcapital/php-parser
```

## Usage

### Parsing PHP Code

```typescript
import { ParserFactory } from '@rightcapital/php-parser';

const factory = new ParserFactory();
const parser = factory.createForNewestSupportedVersion();
const ast = parser.parse('<?php echo "Hello, World!";');
```

### Dumping the AST

```typescript
import { NodeDumper } from '@rightcapital/php-parser';

const dumper = new NodeDumper();
console.log(dumper.dump(ast));
```

### Pretty Printing

```typescript
import { StandardPrettyPrinter } from '@rightcapital/php-parser';

const printer = new StandardPrettyPrinter();
console.log(printer.prettyPrintFile(ast));
```

### Traversing and Transforming

```typescript
import { NodeTraverser, NodeVisitor } from '@rightcapital/php-parser';

class MyVisitor extends NodeVisitor {
  enterNode(node) {
    // Visit each node
  }
}

const traverser = new NodeTraverser();
traverser.addVisitor(new MyVisitor());
const modified = traverser.traverse(ast);
```

### Building AST Nodes

```typescript
import { BuilderFactory } from '@rightcapital/php-parser';

const factory = new BuilderFactory();
const classNode = factory.class_('MyClass')
  .extend('BaseClass')
  .implement('MyInterface')
  .addStmt(factory.method('hello')
    .makePublic()
    .getNode())
  .getNode();
```

## Architecture

```
src/
  parser/
    php8.ts          — Main recursive descent parser (~3200 lines)
  lexer.ts           — PHP lexer with state machine (~950 lines)
  prettyPrinter/
    standard.ts      — PHP code generator (~850 lines)
  nodeDumper.ts      — AST dump for debugging/testing
  nodeTraverser.ts   — Tree traversal engine
  nodeFinder.ts      — Node search utilities
  nodeVisitor/       — Visitor implementations (NameResolver, CloningVisitor)
  node/
    expr/            — Expression nodes (~50 types)
    stmt/            — Statement nodes (~40 types)
    scalar/          — Scalar value nodes (String, Int, Float)
    name/            — Name nodes (FullyQualified, Relative)
  builder/           — Fluent AST builder classes
  constExprEvaluator.ts — Constant expression evaluation
  parserFactory.ts   — Parser creation factory
  token.ts           — Token types and definitions
```

### Parser Design

The parser uses **recursive descent** for statements and declarations, combined with **Pratt precedence climbing** for expressions. This mirrors the upstream PHP-Parser's approach while being idiomatic TypeScript.

Key design choices:
- Expression precedence levels follow PHP's operator precedence table exactly
- Statement parsing uses `parseStatementAsArray()` to unwrap `Block` nodes for control flow bodies
- The lexer uses a state machine for heredoc/nowdoc, double-quoted strings, and shell exec (backtick) strings
- AST nodes extend `NodeAbstract` with `getType()` returning the canonical PHP-Parser type name (e.g., `Stmt_Class`, `Expr_BinaryOp_Plus`)

## Development

### Prerequisites
- Node.js 18+
- TypeScript 5.4+

### Running Tests

```bash
npm test              # Run all tests once
npm run test:watch    # Watch mode
```

### Upstream Compatibility Testing

To run tests against the upstream nikic/PHP-Parser test suite:

```bash
# Clone the upstream repo to /tmp
git clone https://github.com/nikic/PHP-Parser.git /tmp/upstream-php-parser

# Run tests (the upstream test runner auto-detects the cloned repo)
npm test
```

### Building

```bash
npm run build
```

## Known Limitations

- **Error recovery** is not implemented — the parser throws on syntax errors rather than producing partial ASTs
- **Variable variables** (`$$var`, `${expr}`) are partially supported
- **JsonDecoder** and **Emulative Lexer** are not ported
- Some edge cases in heredoc/nowdoc with complex interpolation
- Type checking has some `Node` vs `Expr` type mismatches that don't affect runtime behavior

## License

MIT
