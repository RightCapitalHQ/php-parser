# PHP Parser TypeScript version

<!-- Badges area start -->

[![made by RightCapital](https://img.shields.io/badge/made_by-RightCapital-5070e6)](https://rightcapital.com)
![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/RightCapitalHQ/php-parser/ci.yml)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)
[![RightCapital frontend style guide](https://img.shields.io/badge/code_style-RightCapital-5c4c64?labelColor=f0ede8)](https://github.com/RightCapitalHQ/frontend-style-guide)

<!-- Badges area end -->

# Introduction

This NPM package is focusing on providing to following abilities:

- A TypeScript/JavaScript wrapper for calling nicki's PHP-Parser
- Sort of auto generated type definitions to annotate the AST (represented as JSON) from nicki's PHP-Parser cli
- Some util/helper functions to easily retrieving proper PHP AST node with correct type annotation

# Installation

This package needs you have PHP with composer installed first

```bash
# pnpm
pnpm add @rightcapital/php-parser
# yarn
yarn add @rightcapital/php-parser
# npm
npm install --save @rightcapital/php-parser
```

# Basic Usage

Supposed you have a PHP file named `hello.php` with the following content

```php
 <?php
echo "Hello";
```

Here is your TypeScript code for parsing and retrieving the AST nodes of the above PHP file.

```typescript
import {
  CliHelpers,
  FullyQualifiedScalarString,
  FullyQualifiedStmtEcho,
  NodeRetrieverHelpers,
  NodeTypeInheritingFromNodeAbstract,
} from '@rightcapital/php-parser';

// Get the root AST nodes from PHP file
const rootNodes: NodeTypeInheritingFromNodeAbstract[] =
  CliHelpers.parsePhpFileToAst('./hello.php');
// or if you prefer to get AST from code string, just use
// CliHelpers.parsePhpCodeStringToAst(`<?php echo "Hello";`)

console.log(rootNodes);
// [
//   {
//     nodeType: "Stmt_Echo",
//     attributes: { startLine: 2, startFilePos: 6, endLine: 2, endFilePos: 18 },
//     exprs: [[Object]],
//   },
// ];

const echoNode =
  NodeRetrieverHelpers.findNodeByNodeType<FullyQualifiedStmtEcho>(
    rootNodes,
    'Stmt_Echo',
  );

// Get the specified node with type annotation
console.log(echoNode);
// {
//   nodeType: 'Stmt_Echo',
//   attributes: { startLine: 2, startFilePos: 6, endLine: 2, endFilePos: 18 },
//   exprs: [
//     { nodeType: 'Scalar_String', attributes: [Object], value: 'Hello' }
//   ]
// }

const scalarStringNode =
  NodeRetrieverHelpers.findNodeByNodeType<FullyQualifiedScalarString>(
    echoNode!.exprs,
    'Scalar_String',
  );
console.log(scalarStringNode?.value);
// Hello
```

## License

MIT License © 2023-Present
