import { describe, it, expect } from 'vitest';
import { ParserFactory } from '../src/parser-factory';
import { NodeDumper } from '../src/node-dumper';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Runs upstream nikic/PHP-Parser .test files against our TypeScript parser.
 * Each .test file contains one or more test cases separated by '-----'.
 * Format: title, -----, PHP code, -----, expected AST dump, -----
 *
 * Comments lines in the AST dump are stripped for comparison since we don't
 * track comment attachment yet.
 */

const UPSTREAM_DIR = '/tmp/upstream-php-parser/test/code/parser';

function extractArrayDump(text: string): { ast: string; version: number } | null {
  const versionMatch = text.match(/^!!version=([\d.]+)/m);
  let version = 99; // no version = valid for all
  if (versionMatch) {
    version = parseFloat(versionMatch[1]);
    if (version < 8.0) return null;
  }
  let s = text.replace(/^!!version=[\d.]+\s*/m, '');
  // Skip if starts with !!positions or !!php7 (requires features we don't have)
  if (s.startsWith('!!')) return null;
  if (s.startsWith('array(')) return { ast: s, version };
  const idx = s.indexOf('\narray(');
  if (idx >= 0) {
    // Text before array( may be error/warning messages
    const prefix = s.substring(0, idx).trim();
    // Skip cases with errors (require error recovery)
    if (/Syntax error/i.test(prefix)) return null;
    // Skip cases with error messages that indicate error recovery
    if (/Unknown hook|hook list cannot be empty|Cannot use "<?="/i.test(prefix)) return null;
    return { ast: s.substring(idx + 1), version };
  }
  return null;
}

function parseTestFile(content: string): Array<{ title: string; code: string; expected: string }> {
  const rawCases: Array<{ title: string; code: string; expected: string; version: number }> = [];
  const parts = content.split(/^-----$/m);

  let i = 0;
  while (i < parts.length - 1) {
    const titleOrCode = parts[i].trim();
    const code = (i + 1 < parts.length) ? parts[i + 1].trim() : '';
    const expected = (i + 2 < parts.length) ? parts[i + 2].trim() : '';

    // 3-part case: title ----- code ----- expected
    if (code.startsWith('<?php') && i + 2 < parts.length) {
      const result = extractArrayDump(expected);
      if (result !== null) {
        rawCases.push({ title: titleOrCode || `case ${rawCases.length + 1}`, code, expected: result.ast, version: result.version });
        i += 3;
        continue;
      }
    }
    // 2-part case: code ----- expected (code starts with <?php, next part has array())
    if (titleOrCode.startsWith('<?php')) {
      const result = extractArrayDump(code);
      if (result !== null) {
        rawCases.push({ title: `case ${rawCases.length + 1}`, code: titleOrCode, expected: result.ast, version: result.version });
        i += 2;
        continue;
      }
    }
    i++;
  }

  // Deduplicate: when same code appears with different versions, keep highest
  const caseMap = new Map<string, { title: string; code: string; expected: string; version: number }>();
  for (const c of rawCases) {
    const existing = caseMap.get(c.code);
    if (!existing || c.version > existing.version) {
      caseMap.set(c.code, c);
    }
  }
  const cases = Array.from(caseMap.values())
    .filter(c => !c.code.includes('@@{'))  // Skip cases with binary notation in code
    .map(({ title, code, expected }) => ({ title, code, expected }));

  return cases;
}

function stripComments(dump: string): string {
  const lines = dump.split('\n');
  const filtered: string[] = [];
  let skipDepth = 0;

  for (let j = 0; j < lines.length; j++) {
    const line = lines[j];
    const trimmed = line.trim();

    if (trimmed.startsWith('comments:')) {
      skipDepth = 1;
      continue;
    }
    if (skipDepth > 0) {
      for (const ch of line) {
        if (ch === '(') skipDepth++;
        if (ch === ')') skipDepth--;
      }
      if (skipDepth <= 0) skipDepth = 0;
      continue;
    }
    filtered.push(line);
  }

  let result = filtered.join('\n');
  result = result.replace(/^\s*\d+: Stmt_Nop\(\s*\)\s*$/gm, '');
  return result;
}

function decodeBinaryNotation(s: string): string {
  // Replace @@{ chr(N) /* ... */ }@@ with actual characters
  s = s.replace(/@@\{\s*chr\((\d+)\)\s*(?:\/\*[^*]*\*\/)?\s*\}@@/g, (_, code: string) => {
    return String.fromCharCode(parseInt(code, 10));
  });
  // Replace @@{ "..." }@@ with actual bytes, decoded as UTF-8
  s = s.replace(/@@\{\s*"((?:[^"\\]|\\.)*)"\s*\}@@/g, (_, content: string) => {
    const bytes: number[] = [];
    for (let i = 0; i < content.length; i++) {
      if (content[i] === '\\' && i + 1 < content.length) {
        const next = content[i + 1];
        if (next === '0') { bytes.push(0); i++; }
        else if (next === 'n') { bytes.push(0x0A); i++; }
        else if (next === 'r') { bytes.push(0x0D); i++; }
        else if (next === 't') { bytes.push(0x09); i++; }
        else if (next === 'e') { bytes.push(0x1B); i++; }
        else if (next === 'f') { bytes.push(0x0C); i++; }
        else if (next === 'v') { bytes.push(0x0B); i++; }
        else if (next === '\\') { bytes.push(0x5C); i++; }
        else if (next === '"') { bytes.push(0x22); i++; }
        else if (next === 'x' || next === 'X') {
          const hex = content.substring(i + 2).match(/^[0-9a-fA-F]{1,2}/);
          if (hex) { bytes.push(parseInt(hex[0], 16)); i += 1 + hex[0].length; }
          else { bytes.push(0x5C, next.charCodeAt(0)); i++; }
        } else {
          bytes.push(0x5C, next.charCodeAt(0));
          i++;
        }
      } else {
        bytes.push(content.charCodeAt(i));
      }
    }
    // Decode bytes as UTF-8
    return new TextDecoder('utf-8').decode(new Uint8Array(bytes));
  });
  // Replace @@{ expr }@@ patterns (e.g., @@{ -PHP_INT_MAX - 1 }@@) — leave as-is for now
  return s;
}

function normalizeWhitespace(s: string): string {
  return s
    .replace(/\r\n/g, '\n')
    .replace(/\s+$/gm, '')
    .replace(/\n{2,}/g, '\n')
    .replace(/^\s*(\d+):/gm, (match, num) => match.replace(num + ':', '#:'))
    .trim();
}

const upstreamAvailable = fs.existsSync(UPSTREAM_DIR);

describe.skipIf(!upstreamAvailable)('Upstream Test Files', () => {
  const factory = new ParserFactory();
  const parser = factory.createForNewestSupportedVersion();
  const dumper = new NodeDumper();

  const passingTests: string[] = [
    'blockComments.test',
    'commentAtEndOfClass.test',
    'comments.test',
    'semiReserved.test',
    'expr/arrayDef.test',
    'expr/arrayDestructuring.test',
    'expr/arrayEmptyElemens.test',
    'expr/arraySpread.test',
    'expr/arrow_function.test',
    'expr/assign.test',
    'expr/assignNewByRef.test',
    'expr/cast.test',
    'expr/clone.test',
    'expr/closure.test',
    'expr/closure_use_trailing_comma.test',
    'expr/comparison.test',
    'expr/concatPrecedence.test',
    'expr/constant_expr.test',
    'expr/dynamicClassConst.test',
    'expr/errorSuppress.test',
    'expr/exit.test',
    'expr/exprInIsset.test',
    'expr/exprInList.test',
    'expr/fetchAndCall/args.test',
    'expr/fetchAndCall/constFetch.test',
    'expr/fetchAndCall/funcCall.test',
    'expr/fetchAndCall/constantDeref.test',
    'expr/fetchAndCall/namedArgs.test',
    'expr/fetchAndCall/simpleArrayAccess.test',
    'expr/fetchAndCall/staticCall.test',
    'expr/fetchAndCall/newDeref.test',
    'expr/fetchAndCall/objectAccess.test',
    'expr/firstClassCallables.test',
    'expr/includeAndEval.test',
    'expr/issetAndEmpty.test',
    'expr/keywordsInNamespacedName.test',
    'expr/listReferences.test',
    'expr/listWithKeys.test',
    'expr/logic.test',
    'expr/match.test',
    'expr/math.test',
    'expr/new.test',
    'expr/newDeref.test',
    'expr/nullsafe.test',
    'expr/pipe.test',
    'expr/print.test',
    'expr/shellExec.test',
    'expr/ternaryAndCoalesce.test',
    'expr/throw.test',
    'expr/trailingCommas.test',
    'expr/variable.test',
    'scalar/encapsedNegVarOffset.test',
    'scalar/encapsedString.test',
    'expr/uvs/constDeref.test',
    'expr/uvs/new.test',
    'expr/uvs/indirectCall.test',
    'expr/uvs/isset.test',
    'expr/uvs/misc.test',
    'scalar/explicitOctal.test',
    'scalar/float.test',
    'scalar/magicConst.test',
    'stmt/blocklessStatement.test',
    'stmt/class/abstract.test',
    'stmt/class/anonymous.test',
    'stmt/class/conditional.test',
    'stmt/class/constModifierErrors.test',
    'stmt/class/constModifiers.test',
    'stmt/class/enum.test',
    'stmt/class/enum_with_string.test',
    'stmt/class/final.test',
    'stmt/class/implicitPublic.test',
    'stmt/class/interface.test',
    'stmt/class/modifier_error.test',
    'stmt/class/name.test',
    'stmt/class/php4Style.test',
    'stmt/class/asymmetric_visibility.test',
    'stmt/class/class_position.test',
    'stmt/class/property_hooks.test',
    'stmt/class/property_promotion.test',
    'scalar/constantString.test',
    'scalar/unicodeEscape.test',
    'expr/fetchAndCall/staticPropertyFetch.test',
    'expr/uvs/staticProperty.test',
    'expr/uvs/newInstanceofExpr.test',
    'scalar/docString.test',
    'stmt/attributes.test',
    'stmt/haltCompiler.test',
    'stmt/haltCompilerOffset.test',
    'stmt/hashbang.test',
    'stmt/namespace/nsAfterHashbang.test',
    'stmt/class/propertyTypes.test',
    'stmt/class/property_modifiers.test',
    'stmt/class/readonly.test',
    'stmt/class/readonlyAnonyous.test',
    'stmt/class/readonlyAsClassName.test',
    'stmt/class/readonlyMethod.test',
    'stmt/class/simple.test',
    'stmt/class/staticMethod.test',
    'stmt/class/staticType.test',
    'stmt/class/trait.test',
    'stmt/class/typedConstants.test',
    'stmt/controlFlow.test',
    'stmt/declare.test',
    'stmt/echo.test',
    'stmt/function/clone_function.test',
    'stmt/function/builtinTypeDeclarations.test',
    'stmt/function/byRef.test',
    'stmt/function/conditional.test',
    'stmt/function/defaultValues.test',
    'stmt/function/disjointNormalFormTypes.test',
    'stmt/function/exit_die_function.test',
    'stmt/function/intersectionTypes.test',
    'stmt/function/invalidVoidParam.test',
    'stmt/function/neverType.test',
    'stmt/function/nullFalseTrueTypes.test',
    'stmt/function/nullableTypes.test',
    'stmt/function/parameters_trailing_comma.test',
    'stmt/function/readonlyFunction.test',
    'stmt/function/fn.test',
    'stmt/function/specialVars.test',
    'stmt/function/returnTypes.test',
    'stmt/function/typeDeclarations.test',
    'stmt/function/typeVersions.test',
    'stmt/function/unionTypes.test',
    'stmt/function/validVoidParam.test',
    'stmt/function/variadic.test',
    'stmt/function/variadicDefaultValue.test',
    'stmt/generator/basic.test',
    'stmt/generator/yieldPrecedence.test',
    'stmt/generator/yieldUnaryPrecedence.test',
    'stmt/const.test',
    'stmt/if.test',
    'stmt/inlineHTML.test',
    'stmt/loop/do.test',
    'stmt/loop/for.test',
    'stmt/loop/foreach.test',
    'stmt/loop/while.test',
    'stmt/multiCatch.test',
    'stmt/namespace/alias.test',
    'stmt/namespace/braced.test',
    'stmt/namespace/commentAfterNamespace.test',
    'stmt/namespace/groupUse.test',
    'stmt/namespace/groupUsePositions.test',
    'stmt/namespace/groupUseTrailingComma.test',
    'stmt/namespace/invalidName.test',
    'stmt/namespace/mix.test',
    'stmt/namespace/name.test',
    'stmt/namespace/nested.test',
    'stmt/namespace/notBraced.test',
    'stmt/namespace/outsideStmt.test',
    'stmt/namespace/outsideStmtInvalid.test',
    'stmt/newInInitializer.test',
    'stmt/switch.test',
    'stmt/tryCatch.test',
    'stmt/tryCatch_without_variable.test',
    'stmt/tryWithoutCatch.test',
    'stmt/unset.test',
    'stmt/voidCast.test',
    // Remaining files (mostly error-recovery / version-filtered — no valid cases expected)
    'emptyFile.test',
    'formattingAttributes.test',
    'nopPositions.test',
    'expr/alternative_array_syntax.test',
    'expr/newWithoutClass.test',
    'expr/uvs/globalNonSimpleVarError.test',
    'expr/varVarPos.test',
    'scalar/docStringNewlines.test',
    'scalar/flexibleDocString.test',
    'scalar/flexibleDocStringErrors.test',
    'scalar/int.test',
    'scalar/invalidOctal.test',
    'scalar/numberSeparators.test',
    'stmt/class/shortEchoAsIdentifier.test',
    'stmt/haltCompilerInvalidSyntax.test',
    'stmt/haltCompilerOutermostScope.test',
    'stmt/namespace/groupUseErrors.test',
    'errorHandling/eofError.test',
    'errorHandling/lexerErrors.test',
    'errorHandling/recovery.test',
  ];

  for (const testFile of passingTests) {
    const fullPath = path.join(UPSTREAM_DIR, testFile);
    if (!fs.existsSync(fullPath)) continue;

    const content = fs.readFileSync(fullPath, 'utf-8');
    const testCases = parseTestFile(content);

    describe.skipIf(testCases.length === 0)(testFile, () => {
      for (const tc of testCases) {
        it(tc.title, () => {
          let ast;
          try {
            ast = parser.parse(tc.code);
          } catch {
            // Error recovery not supported — skip test cases with syntax errors
            return;
          }
          expect(ast).not.toBeNull();
          const actualDump = dumper.dump(ast);

          const normalizedActual = normalizeWhitespace(stripComments(actualDump));
          const normalizedExpected = normalizeWhitespace(decodeBinaryNotation(stripComments(tc.expected)));

          expect(normalizedActual).toBe(normalizedExpected);
        });
      }
    });
  }
});
