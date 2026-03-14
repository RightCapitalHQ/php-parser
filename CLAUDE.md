# CLAUDE.md — AI Developer Guide for php-parser-ts

## Project Overview

This is a pure TypeScript port of [nikic/PHP-Parser](https://github.com/nikic/PHP-Parser) v5. It parses PHP 8.x source code into an AST that is structurally identical to the upstream PHP implementation.

**Current state**: 831 tests passing, 198 upstream test cases matched, 125/178 upstream `.test` files fully passing.

## Quick Start

```bash
npm install          # Install dependencies
npm test             # Run all 831 tests
npm run build        # TypeScript compilation
```

For upstream compatibility testing:
```bash
git clone https://github.com/nikic/PHP-Parser.git /tmp/upstream-php-parser
npm test             # Upstream tests auto-run if /tmp/upstream-php-parser exists
```

## Project Structure

```
src/
  parser/php8.ts           — Main parser (~3200 lines), recursive descent + Pratt precedence
  lexer.ts                 — State machine lexer (~950 lines)
  prettyPrinter/standard.ts — Code generator (~850 lines)
  nodeDumper.ts            — AST dump output (upstream-compatible format)
  nodeTraverser.ts         — Tree traversal with visitor pattern
  nodeFinder.ts            — Find nodes by type/predicate
  nodeVisitor/             — NameResolver, CloningVisitor
  node/                    — ~192 AST node types
    expr/                  — Expressions (BinaryOp, AssignOp, Cast, etc.)
    stmt/                  — Statements (Class_, Function_, If_, etc.)
    scalar/                — String_, Int_, Float_, InterpolatedString
    name/                  — Name, FullyQualified, Relative
  builder/                 — Fluent builder API
  constExprEvaluator.ts    — Constant expression evaluator
  parserFactory.ts         — Factory for creating parser instances
  token.ts                 — Token type constants

test/
  parser.test.ts           — 220 core parser tests
  upstreamTestRunner.test.ts — 198 tests from nikic/PHP-Parser .test files
  upstreamCompat.test.ts   — 84 additional upstream compat tests
  builder.test.ts          — 104 builder API tests
  (10 more test files)
```

## Key Patterns and Conventions

### Reserved Word Properties

TypeScript reserves some words that PHP uses as property names. These are suffixed with `_`:

```typescript
// In node classes:
class Class_ extends Declaration { ... }   // not "Class"
class Function_ extends Declaration { ... } // not "Function"
node.class_    // property named 'class'
```

The NodeDumper, NodeTraverser, and PrettyPrinter all use a fallback pattern:
```typescript
const value = node[key] !== undefined ? node[key] : node[key + '_'];
```

### AST Node Hierarchy

```
NodeAbstract
  ├── Expr (expressions)
  │   ├── BinaryOp (Plus, Minus, Concat, ...)
  │   ├── AssignOp (Assign, PlusAssign, ...)
  │   ├── Cast (Int_, String_, ...)
  │   └── (Variable, FuncCall, MethodCall, ...)
  ├── Stmt (statements)
  │   ├── Class_, Interface_, Trait, Enum_
  │   ├── Function_, ClassMethod
  │   ├── If_, While_, For_, Foreach_
  │   └── (Namespace_, Use_, Return_, ...)
  └── Scalar (literal values)
      ├── String_, Int_, Float_
      └── InterpolatedString
```

Every node has:
- `getType()` — returns canonical name like `Stmt_Class`, `Expr_BinaryOp_Plus`
- `getSubNodeNames()` — returns list of child property names
- `getAttributes()` — returns position/comment metadata

### Name Nodes

- **Built-in types** (`int`, `string`, `bool`, etc.) become `Identifier` nodes
- **User types** (`MyClass`, `App\Models\User`) become `Name` nodes
- Class/function/method names are `Identifier` nodes, not plain strings

### Expression Precedence (Pratt Parser)

The parser uses precedence levels matching PHP's operator table:
```
or(1) < xor(2) < and(3) < assign(4) < ternary(5) < ??(6)
< ||(8) < &&(9) < |(10) < ^(11) < &(12) < ==/!=(13)
< </<=/>=/>/<=>/>=(14) < .(15) < <</>>(16)
< +/-(17) < */%//(18) < instanceof(19) < !(20)
< ~,++,--,cast(21) < **(22,right) < |>(14)
```

### Semi-Reserved Keywords

PHP allows some keywords as method/const/enum-case names. Use `expectIdentifierMaybeReserved()` (not `expectIdentifier()`) for:
- Method names
- Class constant names
- Enum case names
- Named argument labels

### Control Flow Body Parsing

Control flow statements (`if`, `while`, `for`, etc.) parse their body with `parseStatementAsArray()` which unwraps `Block` nodes into arrays. This matches how upstream PHP-Parser represents statement bodies.

### Lexer State Machine

The lexer manages states for:
- **Normal mode** — regular PHP code
- **Double-quoted strings** — handles `$var`, `{$expr}`, `${var}` interpolation
- **Heredoc/nowdoc** — multi-line strings with optional interpolation
- **Shell exec** — backtick strings (`` ` ``)

Important: The `#[` attribute syntax must be checked before `#` line comments in the lexer.

## NodeDumper Format

The dumper produces output compatible with upstream PHP-Parser's `NodeDumper`. Key formatting rules:

- **Flags**: `PUBLIC | STATIC (9)` format — names joined with `|`, numeric value in parens
- **Include types**: `TYPE_INCLUDE (1)`, `TYPE_REQUIRE (3)`, etc.
- **Use types**: `TYPE_NORMAL (1)`, `TYPE_FUNCTION (2)`, `TYPE_CONSTANT (3)`
- **Floats**: PHP-style formatting with uppercase `E`, 14 significant digits
- **Integers**: Decimal format (no hex/octal in dump)

## Adding Support for a New PHP Feature

1. **Add tokens** in `src/token.ts` if needed (e.g., `T_PIPE` for `|>`)
2. **Update the lexer** in `src/lexer.ts` to emit new tokens
3. **Create AST node classes** in `src/node/expr/` or `src/node/stmt/`
4. **Add parsing logic** in `src/parser/php8.ts`:
   - For new expressions: add to `parsePrimaryExpression()` or as a binary/unary op
   - For new statements: add to `parseStatement()`
   - For new declarations: add to the relevant declaration parser
5. **Update PrettyPrinter** in `src/prettyPrinter/standard.ts`
6. **Add tests** — both unit tests and upstream compatibility tests
7. **Update NodeDumper** if the new node has special dump formatting

## Fixing Upstream Test Failures

The upstream test runner (`test/upstreamTestRunner.test.ts`) works as follows:

1. Reads `.test` files from `/tmp/upstream-php-parser/test/code/parser/`
2. Each file contains cases separated by `-----`: title, code, expected AST dump
3. Parses the PHP code with our parser, dumps the AST, and compares
4. Comments are stripped from both sides before comparison
5. Cases requiring error recovery are auto-skipped (try-catch around `parser.parse()`)

### Workflow for fixing a failing test

```bash
# 1. Run the upstream tests to see failures
npx vitest run test/upstreamTestRunner.test.ts

# 2. Look at a specific .test file to understand the expected AST
cat /tmp/upstream-php-parser/test/code/parser/stmt/class/newFeature.test

# 3. Identify what parser changes are needed
# 4. Make changes to src/parser/php8.ts (and lexer/nodes if needed)
# 5. Run tests again to verify
npx vitest run
```

### Common failure patterns

- **Missing node type** — need to create a new node class
- **Wrong subnode order** — `getSubNodeNames()` must match upstream order exactly
- **Flag/modifier mismatch** — check `src/modifiers.ts` values match upstream
- **Name vs Identifier** — built-in types use `Identifier`, user types use `Name`
- **String escaping** — heredoc/nowdoc have different escape rules

## Remaining Work

### Not Yet Implemented
- **Error recovery** — parser throws on syntax errors instead of producing partial ASTs
- **JsonDecoder** — JSON-based AST deserialization
- **Emulative Lexer** — lexer that emulates different PHP versions

### Known Gaps
- Variable variables (`$$var`, `${expr}`) are only partially supported (~6 test cases)
- Some heredoc/nowdoc edge cases with complex interpolation
- Encapsed strings: negative array offsets, `${"expr"}` syntax
- `fn` used as a function name (conflicts with arrow function keyword)

### Type System
The TypeScript types have some `Node` vs `Expr` mismatches in the parser. These don't affect runtime behavior but show up as TypeScript errors. A future pass could tighten the types.

## Common Pitfalls

1. **Don't forget the `_` suffix** for reserved word properties (`class_`, `static_`, `var_`)
2. **`instanceof` RHS** is parsed as `Name`/`Variable`, not a general expression
3. **`::` (double colon)** unwraps `ConstFetch` to get the `Name` for `ClassConstFetch`/`StaticCall`
4. **`VarLikeIdentifier`** is used for `StaticPropertyFetch` name (strips `$` prefix)
5. **Integer overflow** uses BigInt comparison against PHP_INT_MAX (2^63-1), promotes to Float
6. **Void cast** uses `parseExpression()` not `parseUnaryExpression()` (captures whole expression)
7. **`For_` constructor** takes a subNodes object: `new For_({ init, cond, loop, stmts }, attrs)`
8. **Binary string prefix** `b"..."` / `b'...'` / `b<<<HEREDOC` must be handled in lexer before identifier check
