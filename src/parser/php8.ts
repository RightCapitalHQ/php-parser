import { Parser } from '../parser';
import { Node, NodeAbstract } from '../node';
import { Token } from '../token';
import { Lexer } from '../lexer';
import { PhpParserError } from '../error';
import { ErrorHandler, ThrowingErrorHandler, CollectingErrorHandler } from '../errorHandler';
import { PhpVersion } from '../phpVersion';
import * as T from '../phpToken';
import { Comment, DocComment } from '../comment';
import { Name, FullyQualified, Relative } from '../node/name';
import { Identifier, VarLikeIdentifier } from '../node/identifier';
import { Modifiers } from '../modifiers';

// Stmt nodes
import { InlineHTML } from '../node/stmt/inlineHTML';
import { Echo_ } from '../node/stmt/echo';
import { Nop } from '../node/stmt/nop';
import { Block } from '../node/stmt/block';
import { Expression as StmtExpression } from '../node/stmt/expression';
import { ElseIf_ } from '../node/stmt/elseIf';
import { Else_ } from '../node/stmt/else';
import { If_ } from '../node/stmt/if';
import { While_ } from '../node/stmt/while';
import { Do_ } from '../node/stmt/do';
import { For_ } from '../node/stmt/for';
import { Foreach_ } from '../node/stmt/foreach';
import { Case_ } from '../node/stmt/case';
import { Switch_ } from '../node/stmt/switch';
import { Break_ } from '../node/stmt/break';
import { Continue_ } from '../node/stmt/continue';
import { Return_ } from '../node/stmt/return';
import { Global_ } from '../node/stmt/global';
import { Static_ } from '../node/stmt/static';
import { Unset_ as StmtUnset_ } from '../node/stmt/unset';
import { Declare_ } from '../node/stmt/declare';
import { Catch_ } from '../node/stmt/catch';
import { Finally_ } from '../node/stmt/finally';
import { TryCatch } from '../node/stmt/tryCatch';
import { Goto_ } from '../node/stmt/goto';
import { Label } from '../node/stmt/label';
import { Namespace_ as StmtNamespace_ } from '../node/stmt/namespace';
import { GroupUse } from '../node/stmt/groupUse';
import { Use_ } from '../node/stmt/use';
import { Const_ as ConstStmt } from '../node/stmt/const';
import { Function_ as StmtFunction_ } from '../node/stmt/function';
import { Class_ as StmtClass_ } from '../node/stmt/class';
import { Interface_ } from '../node/stmt/interface';
import { Trait_ as StmtTrait_ } from '../node/stmt/trait';
import { Enum_ } from '../node/stmt/enum';
import { HaltCompiler } from '../node/stmt/haltCompiler';
import { ClassMethod } from '../node/stmt/classMethod';
import { ClassConst } from '../node/stmt/classConst';
import { Property as StmtProperty } from '../node/stmt/property';
import { EnumCase } from '../node/stmt/enumCase';
import { TraitUse } from '../node/stmt/traitUse';
import { Precedence as TraitUsePrecedence } from '../node/stmt/traitUseAdaptation/precedence';
import { Alias as TraitUseAlias } from '../node/stmt/traitUseAdaptation/alias';

import { PropertyHook } from '../node/propertyHook';

// Helper nodes
import { Const_ } from '../node/const';
import { StaticVar } from '../node/staticVar';
import { DeclareItem } from '../node/declareItem';
import { UseItem } from '../node/useItem';
import { PropertyItem } from '../node/propertyItem';
import { Attribute } from '../node/attribute';
import { Arg } from '../node/arg';
import { AttributeGroup } from '../node/attributeGroup';
import { NullableType } from '../node/nullableType';
import { UnionType } from '../node/unionType';
import { IntersectionType } from '../node/intersectionType';
import { Param } from '../node/param';
import { ArrayItem } from '../node/arrayItem';
import { ClosureUse } from '../node/closureUse';
import { MatchArm } from '../node/matchArm';
import { VariadicPlaceholder } from '../node/variadicPlaceholder';
import { InterpolatedStringPart } from '../node/interpolatedStringPart';

// Expr nodes
import { Variable } from '../node/expr/variable';
import { Assign } from '../node/expr/assign';
import { AssignRef } from '../node/expr/assignRef';
import { Throw_ } from '../node/expr/throw';
import { Ternary } from '../node/expr/ternary';
import { Instanceof_ } from '../node/expr/instanceof';
import { PreInc } from '../node/expr/preInc';
import { PreDec } from '../node/expr/preDec';
import { PostInc } from '../node/expr/postInc';
import { PostDec } from '../node/expr/postDec';
import { BooleanNot } from '../node/expr/booleanNot';
import { BitwiseNot } from '../node/expr/bitwiseNot';
import { UnaryMinus } from '../node/expr/unaryMinus';
import { UnaryPlus } from '../node/expr/unaryPlus';
import { ErrorSuppress } from '../node/expr/errorSuppress';
import { Clone_ } from '../node/expr/clone';
import { Print_ } from '../node/expr/print';
import { NullsafeMethodCall } from '../node/expr/nullsafeMethodCall';
import { MethodCall } from '../node/expr/methodCall';
import { NullsafePropertyFetch } from '../node/expr/nullsafePropertyFetch';
import { PropertyFetch } from '../node/expr/propertyFetch';
import { StaticCall } from '../node/expr/staticCall';
import { StaticPropertyFetch } from '../node/expr/staticPropertyFetch';
import { ClassConstFetch } from '../node/expr/classConstFetch';
import { ArrayDimFetch } from '../node/expr/arrayDimFetch';
import { FuncCall } from '../node/expr/funcCall';
import { ConstFetch } from '../node/expr/constFetch';
import { Empty_ } from '../node/expr/empty';
import { Isset_ } from '../node/expr/isset';
import { Eval_ } from '../node/expr/eval';
import { Exit_ } from '../node/expr/exit';
import { New_ } from '../node/expr/new';
import { Array_ as ExprArray_ } from '../node/expr/array';
import { List_ } from '../node/expr/list';
import { Closure } from '../node/expr/closure';
import { ArrowFunction } from '../node/expr/arrowFunction';
import { Yield_ } from '../node/expr/yield';
import { YieldFrom } from '../node/expr/yieldFrom';
import { Include_ } from '../node/expr/include';
import { Match_ } from '../node/expr/match';
import { ShellExec } from '../node/expr/shellExec';

// Cast nodes
import { Int_ as CastInt_ } from '../node/expr/cast/int';
import { Double as CastDouble } from '../node/expr/cast/double';
import { String_ as CastString_ } from '../node/expr/cast/string';
import { Array_ as CastArray_ } from '../node/expr/cast/array';
import { Object_ as CastObject_ } from '../node/expr/cast/object';
import { Bool_ as CastBool_ } from '../node/expr/cast/bool';
import { Unset_ as CastUnset_ } from '../node/expr/cast/unset';
import { Void_ as CastVoid_ } from '../node/expr/cast/void';

// Scalar nodes
import { Int_ as ScalarInt_ } from '../node/scalar/int';
import { Float_ as ScalarFloat_ } from '../node/scalar/float';
import { String_ as ScalarString } from '../node/scalar/string';
import { InterpolatedString } from '../node/scalar/interpolatedString';

// Magic constants
import { Line as MagicLine } from '../node/scalar/magicConst/line';
import { File as MagicFile } from '../node/scalar/magicConst/file';
import { Dir as MagicDir } from '../node/scalar/magicConst/dir';
import { Class_ as MagicClass_ } from '../node/scalar/magicConst/class';
import { Trait_ as MagicTrait_ } from '../node/scalar/magicConst/trait';
import { Method as MagicMethod } from '../node/scalar/magicConst/method';
import { Function_ as MagicFunction_ } from '../node/scalar/magicConst/function';
import { Namespace_ as MagicNamespace_ } from '../node/scalar/magicConst/namespace';
import { Property as MagicProperty } from '../node/scalar/magicConst/property';

// BinaryOp nodes
import { BitwiseAnd as BinBitwiseAnd } from '../node/expr/binaryOp/bitwiseAnd';
import { BitwiseOr as BinBitwiseOr } from '../node/expr/binaryOp/bitwiseOr';
import { BitwiseXor as BinBitwiseXor } from '../node/expr/binaryOp/bitwiseXor';
import { BooleanAnd as BinBooleanAnd } from '../node/expr/binaryOp/booleanAnd';
import { BooleanOr as BinBooleanOr } from '../node/expr/binaryOp/booleanOr';
import { Coalesce as BinCoalesce } from '../node/expr/binaryOp/coalesce';
import { Concat as BinConcat } from '../node/expr/binaryOp/concat';
import { Div as BinDiv } from '../node/expr/binaryOp/div';
import { Equal as BinEqual } from '../node/expr/binaryOp/equal';
import { Greater as BinGreater } from '../node/expr/binaryOp/greater';
import { GreaterOrEqual as BinGreaterOrEqual } from '../node/expr/binaryOp/greaterOrEqual';
import { Identical as BinIdentical } from '../node/expr/binaryOp/identical';
import { LogicalAnd as BinLogicalAnd } from '../node/expr/binaryOp/logicalAnd';
import { LogicalOr as BinLogicalOr } from '../node/expr/binaryOp/logicalOr';
import { LogicalXor as BinLogicalXor } from '../node/expr/binaryOp/logicalXor';
import { Minus as BinMinus } from '../node/expr/binaryOp/minus';
import { Mod as BinMod } from '../node/expr/binaryOp/mod';
import { Mul as BinMul } from '../node/expr/binaryOp/mul';
import { NotEqual as BinNotEqual } from '../node/expr/binaryOp/notEqual';
import { NotIdentical as BinNotIdentical } from '../node/expr/binaryOp/notIdentical';
import { Pipe as BinPipe } from '../node/expr/binaryOp/pipe';
import { Plus as BinPlus } from '../node/expr/binaryOp/plus';
import { Pow as BinPow } from '../node/expr/binaryOp/pow';
import { ShiftLeft as BinShiftLeft } from '../node/expr/binaryOp/shiftLeft';
import { ShiftRight as BinShiftRight } from '../node/expr/binaryOp/shiftRight';
import { Smaller as BinSmaller } from '../node/expr/binaryOp/smaller';
import { SmallerOrEqual as BinSmallerOrEqual } from '../node/expr/binaryOp/smallerOrEqual';
import { Spaceship as BinSpaceship } from '../node/expr/binaryOp/spaceship';

// AssignOp nodes
import { BitwiseAnd as AssignBitwiseAnd } from '../node/expr/assignOp/bitwiseAnd';
import { BitwiseOr as AssignBitwiseOr } from '../node/expr/assignOp/bitwiseOr';
import { BitwiseXor as AssignBitwiseXor } from '../node/expr/assignOp/bitwiseXor';
import { Coalesce as AssignCoalesce } from '../node/expr/assignOp/coalesce';
import { Concat as AssignConcat } from '../node/expr/assignOp/concat';
import { Div as AssignDiv } from '../node/expr/assignOp/div';
import { Minus as AssignMinus } from '../node/expr/assignOp/minus';
import { Mod as AssignMod } from '../node/expr/assignOp/mod';
import { Mul as AssignMul } from '../node/expr/assignOp/mul';
import { Plus as AssignPlus } from '../node/expr/assignOp/plus';
import { Pow as AssignPow } from '../node/expr/assignOp/pow';
import { ShiftLeft as AssignShiftLeft } from '../node/expr/assignOp/shiftLeft';
import { ShiftRight as AssignShiftRight } from '../node/expr/assignOp/shiftRight';

export class Php8Parser implements Parser {
  private lexer: Lexer;
  private tokens: Token[] = [];
  private pos: number = 0;
  private encapsedQuoteChar: string = '"';
  private phpVersion: PhpVersion;
  private errorHandler: ErrorHandler;
  private semStack: any[] = [];
  private semValue: any = null;

  constructor(lexer?: Lexer, phpVersion?: PhpVersion) {
    this.lexer = lexer ?? new Lexer();
    this.phpVersion = phpVersion ?? PhpVersion.getNewestSupported();
    this.errorHandler = new ThrowingErrorHandler();
  }

  parse(code: string, errorHandler?: ErrorHandler): Node[] | null {
    this.errorHandler = errorHandler ?? new ThrowingErrorHandler();
    this.tokens = this.lexer.tokenize(code, this.errorHandler);
    this.pos = 0;
    this.skipNonCode();

    try {
      const stmts = this.parseTopStatements();
      this.annotateComments(stmts);
      return stmts;
    } catch (e) {
      if (e instanceof PhpParserError) {
        this.errorHandler.handleError(e);
        return null;
      }
      throw e;
    }
  }

  getTokens(): Token[] {
    return this.tokens;
  }

  // ─── Token management ──────────────────────────────────────────

  private current(): Token {
    return this.tokens[this.pos] ?? new Token(0, '\0', 1, 0);
  }

  private currentId(): number {
    return this.current().id;
  }

  private advance(): Token {
    const token = this.current();
    this.pos++;
    this.skipNonCode();
    return token;
  }

  private skipNonCode(): void {
    while (this.pos < this.tokens.length) {
      const id = this.tokens[this.pos].id;
      if (id === T.T_WHITESPACE || id === T.T_COMMENT || id === T.T_DOC_COMMENT) {
        this.pos++;
        continue;
      }
      break;
    }
  }

  private expect(id: number): Token {
    if (this.currentId() !== id) {
      const expected = id < 256 ? `'${String.fromCharCode(id)}'` : T.tokenName(id);
      const got = this.current().id < 256 ? `'${this.current().text}'` : T.tokenName(this.current().id);
      this.throwSyntaxError(`Syntax error, unexpected ${got}, expecting ${expected}`);
    }
    return this.advance();
  }

  private expectSemicolon(): Token {
    if (this.currentId() === ';'.charCodeAt(0)) {
      return this.advance();
    }
    if (this.currentId() === T.T_CLOSE_TAG) {
      return this.advance();
    }
    const got = this.current().id < 256 ? `'${this.current().text}'` : T.tokenName(this.current().id);
    this.throwSyntaxError(`Syntax error, unexpected ${got}, expecting ';'`);
    return this.current(); // unreachable
  }

  private eat(id: number): Token | null {
    if (this.currentId() === id) {
      return this.advance();
    }
    return null;
  }

  private is(id: number): boolean {
    return this.currentId() === id;
  }

  private isAny(...ids: number[]): boolean {
    return ids.includes(this.currentId());
  }

  private startAttributes(): Record<string, any> {
    const token = this.current();
    return {
      startLine: token.line,
      startTokenPos: this.pos,
      startFilePos: token.pos,
    };
  }

  private endAttributes(startAttrs: Record<string, any>): Record<string, any> {
    const prevPos = this.pos - 1;
    const token = this.tokens[prevPos] ?? this.current();
    return {
      ...startAttrs,
      endLine: token.getEndLine(),
      endTokenPos: prevPos,
      endFilePos: token.getEndPos() - 1,
    };
  }

  private throwSyntaxError(message: string): never {
    const token = this.current();
    throw new PhpParserError(message, {
      startLine: token.line,
      endLine: token.line,
      startFilePos: token.pos,
      endFilePos: token.pos + token.text.length - 1,
    });
  }

  // ─── Comment annotation ────────────────────────────────────────

  private annotateComments(stmts: Node[]): void {
    // Collect all comments from the token stream and assign them to adjacent nodes
    const comments: Comment[] = [];
    for (const token of this.tokens) {
      if (token.id === T.T_COMMENT) {
        comments.push(new Comment(token.text, token.line, token.pos, 0,
          token.getEndLine(), token.getEndPos() - 1, 0));
      } else if (token.id === T.T_DOC_COMMENT) {
        comments.push(new DocComment(token.text, token.line, token.pos, 0,
          token.getEndLine(), token.getEndPos() - 1, 0));
      }
    }
    // Simple approach: assign comments to the first statement
    if (comments.length > 0 && stmts.length > 0) {
      const firstNode = stmts[0];
      if (firstNode && typeof firstNode.setAttribute === 'function') {
        firstNode.setAttribute('comments', comments);
      }
    }
  }

  // ─── Top-level parsing ─────────────────────────────────────────

  private parseTopStatements(): Node[] {
    const stmts: Node[] = [];

    while (!this.is(0)) {
      if (this.is(T.T_INLINE_HTML)) {
        stmts.push(this.parseInlineHtml());
        continue;
      }
      if (this.is(T.T_OPEN_TAG)) {
        this.advance();
        continue;
      }
      if (this.is(T.T_OPEN_TAG_WITH_ECHO)) {
        stmts.push(this.parseOpenTagWithEcho());
        continue;
      }
      if (this.is(T.T_CLOSE_TAG)) {
        this.advance();
        continue;
      }

      const stmt = this.parseStatement();
      if (stmt !== null) {
        if (Array.isArray(stmt)) {
          stmts.push(...stmt);
        } else {
          stmts.push(stmt);
        }
      }
    }

    return stmts;
  }

  private parseInlineHtml(): Node {
    const attrs = this.startAttributes();
    const token = this.advance();
    return new InlineHTML(token.text, this.endAttributes(attrs));
  }

  private parseOpenTagWithEcho(): Node {
    const attrs = this.startAttributes();
    this.advance();
    const expr = this.parseExpression();
    this.eat(';'.charCodeAt(0));
    return new Echo_([expr], this.endAttributes(attrs));
  }

  // ─── Statement parsing ─────────────────────────────────────────

  private parseStatement(): Node | Node[] | null {
    const attrs = this.startAttributes();

    // Handle top-level attributes
    if (this.is(T.T_ATTRIBUTE)) {
      return this.parseAttributedDecl();
    }

    switch (this.currentId()) {
      case T.T_IF:
        return this.parseIf();
      case T.T_WHILE:
        return this.parseWhile();
      case T.T_DO:
        return this.parseDo();
      case T.T_FOR:
        return this.parseFor();
      case T.T_FOREACH:
        return this.parseForeach();
      case T.T_SWITCH:
        return this.parseSwitch();
      case T.T_BREAK:
        return this.parseBreak();
      case T.T_CONTINUE:
        return this.parseContinue();
      case T.T_RETURN:
        return this.parseReturn();
      case T.T_GLOBAL:
        return this.parseGlobal();
      case T.T_STATIC:
        if (this.lookAhead(T.T_VARIABLE)) {
          return this.parseStaticVars();
        }
        return this.parseExpressionStatement();
      case T.T_ECHO:
        return this.parseEcho();
      case T.T_INLINE_HTML:
        return this.parseInlineHtml();
      case T.T_UNSET:
        return this.parseUnset();
      case T.T_FOREACH:
        return this.parseForeach();
      case T.T_DECLARE:
        return this.parseDeclare();
      case T.T_TRY:
        return this.parseTryCatch();
      case T.T_THROW:
        return this.parseThrowStatement();
      case T.T_GOTO:
        return this.parseGoto();
      case T.T_STRING:
        // Label or expression statement
        if (this.lookAhead(':'.charCodeAt(0))) {
          return this.parseLabel();
        }
        return this.parseExpressionStatement();
      case T.T_NAMESPACE:
        return this.parseNamespace();
      case T.T_USE:
        return this.parseUse();
      case T.T_CONST:
        return this.parseConstDecl();
      case T.T_FUNCTION:
        if (this.lookAhead('('.charCodeAt(0)) || this.lookAheadIsRef()) {
          return this.parseExpressionStatement();
        }
        return this.parseFunctionDecl();
      case T.T_CLASS:
        return this.parseClassDecl();
      case T.T_INTERFACE:
        return this.parseInterfaceDecl();
      case T.T_TRAIT:
        return this.parseTraitDecl();
      case T.T_ENUM:
        return this.parseEnumDecl();
      case T.T_ABSTRACT:
      case T.T_FINAL:
        return this.parseModifiedDecl();
      case T.T_READONLY:
        // readonly can be a modifier (readonly class) or a function call (readonly())
        if (this.lookAhead('('.charCodeAt(0))) {
          return this.parseExpressionStatement();
        }
        return this.parseModifiedDecl();
      case T.T_HALT_COMPILER:
        return this.parseHaltCompiler();
      case '{'.charCodeAt(0):
        return this.parseBlock();
      case ';'.charCodeAt(0):
        this.advance();
        return new Nop(this.endAttributes(attrs));
      case T.T_OPEN_TAG:
        this.advance();
        return null;
      case T.T_CLOSE_TAG:
        this.advance();
        return null;
      default:
        return this.parseExpressionStatement();
    }
  }

  // Check if current token (identifier) is followed by '=' (skipping whitespace)
  // Used to distinguish "const FOO = 1" from "const int FOO = 1"
  private isFollowedByEquals(): boolean {
    let pos = this.pos + 1;
    while (pos < this.tokens.length) {
      const token = this.tokens[pos];
      if (token.id === T.T_WHITESPACE || token.id === T.T_COMMENT || token.id === T.T_DOC_COMMENT) {
        pos++;
        continue;
      }
      return token.id === '='.charCodeAt(0);
    }
    return false;
  }

  private lookAheadToken(skip: number): Token | null {
    let pos = this.pos + 1;
    let count = 0;
    while (pos < this.tokens.length) {
      const token = this.tokens[pos];
      if (token.id === T.T_WHITESPACE || token.id === T.T_COMMENT || token.id === T.T_DOC_COMMENT) {
        pos++;
        continue;
      }
      if (count === skip) return token;
      count++;
      pos++;
    }
    return null;
  }

  private lookAhead(id: number): boolean {
    let pos = this.pos + 1;
    while (pos < this.tokens.length) {
      const token = this.tokens[pos];
      if (token.id === T.T_WHITESPACE || token.id === T.T_COMMENT || token.id === T.T_DOC_COMMENT) {
        pos++;
        continue;
      }
      return token.id === id;
    }
    return false;
  }

  private lookAheadIsRef(): boolean {
    // Check if next token after function is & followed by (
    let pos = this.pos + 1;
    while (pos < this.tokens.length) {
      const token = this.tokens[pos];
      if (token.id === T.T_WHITESPACE || token.id === T.T_COMMENT || token.id === T.T_DOC_COMMENT) {
        pos++;
        continue;
      }
      if (token.id === '&'.charCodeAt(0) || token.id === T.T_AMPERSAND_FOLLOWED_BY_VAR_OR_VARARG || token.id === T.T_AMPERSAND_NOT_FOLLOWED_BY_VAR_OR_VARARG) {
        // Check next non-whitespace is (
        pos++;
        while (pos < this.tokens.length) {
          const t2 = this.tokens[pos];
          if (t2.id === T.T_WHITESPACE || t2.id === T.T_COMMENT || t2.id === T.T_DOC_COMMENT) {
            pos++;
            continue;
          }
          return t2.id === '('.charCodeAt(0);
        }
      }
      return false;
    }
    return false;
  }

  // Parse a statement body for control structures (if/while/for/etc.)
  // If the body is a block { }, return the inner statements (not a Block node)
  // If it's a single statement, return it wrapped in an array
  private parseStatementAsArray(): Node[] {
    if (this.is('{'.charCodeAt(0))) {
      this.advance();
      const stmts = this.parseInnerStatements('}'.charCodeAt(0));
      this.expect('}'.charCodeAt(0));
      return stmts;
    }
    const stmt = this.parseStatement();
    return stmt ? [stmt as Node] : [];
  }

  private parseBlock(): Node {
    const attrs = this.startAttributes();
    this.expect('{'.charCodeAt(0));
    const stmts: Node[] = [];
    while (!this.is('}'.charCodeAt(0)) && !this.is(0)) {
      const stmt = this.parseStatement();
      if (stmt !== null) {
        if (Array.isArray(stmt)) {
          stmts.push(...stmt);
        } else {
          stmts.push(stmt);
        }
      }
    }
    this.expect('}'.charCodeAt(0));
    return new Block(stmts, this.endAttributes(attrs));
  }

  private parseExpressionStatement(): Node {
    const attrs = this.startAttributes();
    const expr = this.parseExpression();
    this.expectSemicolon();
    return new StmtExpression(expr, this.endAttributes(attrs));
  }

  // ─── Control flow statements ───────────────────────────────────

  private parseIf(): Node {
    const attrs = this.startAttributes();
    this.expect(T.T_IF);
    this.expect('('.charCodeAt(0));
    const cond = this.parseExpression();
    this.expect(')'.charCodeAt(0));

    // Alternative syntax: if(...):
    if (this.eat(':'.charCodeAt(0))) {
      const stmts = this.parseInnerStatements(T.T_ELSEIF, T.T_ELSE, T.T_ENDIF);
      const elseifs: Node[] = [];
      while (this.eat(T.T_ELSEIF)) {
        const eiAttrs = this.startAttributes();
        this.expect('('.charCodeAt(0));
        const eiCond = this.parseExpression();
        this.expect(')'.charCodeAt(0));
        this.expect(':'.charCodeAt(0));
        const eiStmts = this.parseInnerStatements(T.T_ELSEIF, T.T_ELSE, T.T_ENDIF);
        elseifs.push(new ElseIf_(eiCond, eiStmts, this.endAttributes(eiAttrs)));
      }
      let elseNode: Node | null = null;
      if (this.eat(T.T_ELSE)) {
        const elseAttrs = this.startAttributes();
        this.expect(':'.charCodeAt(0));
        const elseStmts = this.parseInnerStatements(T.T_ENDIF);
        elseNode = new Else_(elseStmts, this.endAttributes(elseAttrs));
      }
      this.expect(T.T_ENDIF);
      this.expectSemicolon();
      return new If_(cond, { stmts, elseifs, else: elseNode }, this.endAttributes(attrs));
    }

    const stmts = this.parseStatementAsArray();
    const elseifs: Node[] = [];
    while (this.eat(T.T_ELSEIF)) {
      const eiAttrs = this.startAttributes();
      this.expect('('.charCodeAt(0));
      const eiCond = this.parseExpression();
      this.expect(')'.charCodeAt(0));
      const eiStmts = this.parseStatementAsArray();
      elseifs.push(new ElseIf_(eiCond, eiStmts, this.endAttributes(eiAttrs)));
    }
    let elseNode: Node | null = null;
    if (this.eat(T.T_ELSE)) {
      const elseAttrs = this.startAttributes();
      const elseStmts = this.parseStatementAsArray();
      elseNode = new Else_(elseStmts, this.endAttributes(elseAttrs));
    }
    return new If_(cond, { stmts, elseifs, else: elseNode }, this.endAttributes(attrs));
  }

  private parseInnerStatements(...terminators: (number | boolean)[]): Node[] {
    const stopAtNamespace = terminators.length > 0 && terminators[terminators.length - 1] === true;
    const numTerminators = stopAtNamespace ? terminators.slice(0, -1) as number[] : terminators as number[];
    const stmts: Node[] = [];
    while (!numTerminators.includes(this.currentId()) && !this.is(0)) {
      if (stopAtNamespace && (this.is(T.T_NAMESPACE) || this.is(T.T_HALT_COMPILER))) break;
      const stmt = this.parseStatement();
      if (stmt !== null) {
        if (Array.isArray(stmt)) {
          stmts.push(...stmt);
        } else {
          stmts.push(stmt);
        }
      }
    }
    return stmts;
  }

  private parseWhile(): Node {
    const attrs = this.startAttributes();
    this.expect(T.T_WHILE);
    this.expect('('.charCodeAt(0));
    const cond = this.parseExpression();
    this.expect(')'.charCodeAt(0));

    if (this.eat(':'.charCodeAt(0))) {
      const stmts = this.parseInnerStatements(T.T_ENDWHILE);
      this.expect(T.T_ENDWHILE);
      this.expectSemicolon();
      return new While_(cond, stmts, this.endAttributes(attrs));
    }

    const stmts = this.parseStatementAsArray();
    return new While_(cond, stmts, this.endAttributes(attrs));
  }

  private parseDo(): Node {
    const attrs = this.startAttributes();
    this.expect(T.T_DO);
    const stmts = this.parseStatementAsArray();
    this.expect(T.T_WHILE);
    this.expect('('.charCodeAt(0));
    const cond = this.parseExpression();
    this.expect(')'.charCodeAt(0));
    this.expectSemicolon();
    return new Do_(cond, stmts, this.endAttributes(attrs));
  }

  private parseFor(): Node {
    const attrs = this.startAttributes();
    this.expect(T.T_FOR);
    this.expect('('.charCodeAt(0));
    const init = this.parseExpressionList();
    this.expect(';'.charCodeAt(0));
    const cond = this.parseExpressionList();
    this.expect(';'.charCodeAt(0));
    const loop = this.parseExpressionList();
    this.expect(')'.charCodeAt(0));

    if (this.eat(':'.charCodeAt(0))) {
      const stmts = this.parseInnerStatements(T.T_ENDFOR);
      this.expect(T.T_ENDFOR);
      this.expectSemicolon();
      return new For_({ init, cond, loop, stmts }, this.endAttributes(attrs));
    }

    const stmts = this.parseStatementAsArray();
    return new For_({ init, cond, loop, stmts }, this.endAttributes(attrs));
  }

  private parseForeach(): Node {
    const attrs = this.startAttributes();
    this.expect(T.T_FOREACH);
    this.expect('('.charCodeAt(0));
    const expr = this.parseExpression();
    this.expect(T.T_AS);

    let keyVar: Node | null = null;
    let byRef = false;

    // Check for & (by reference)
    if (this.is('&'.charCodeAt(0)) || this.is(T.T_AMPERSAND_FOLLOWED_BY_VAR_OR_VARARG)) {
      byRef = true;
      this.advance();
    }
    let valueVar = this.parseExpression();

    if (this.eat(T.T_DOUBLE_ARROW)) {
      keyVar = valueVar;
      byRef = false;
      // Check for & after =>
      if (this.is('&'.charCodeAt(0)) || this.is(T.T_AMPERSAND_FOLLOWED_BY_VAR_OR_VARARG)) {
        byRef = true;
        this.advance();
      }
      valueVar = this.parseExpression();
    }
    this.expect(')'.charCodeAt(0));

    if (this.eat(':'.charCodeAt(0))) {
      const stmts = this.parseInnerStatements(T.T_ENDFOREACH);
      this.expect(T.T_ENDFOREACH);
      this.expectSemicolon();
      return new Foreach_(expr, valueVar, { keyVar, byRef, stmts }, this.endAttributes(attrs));
    }

    const stmts = this.parseStatementAsArray();
    return new Foreach_(expr, valueVar, { keyVar, byRef, stmts }, this.endAttributes(attrs));
  }

  private parseSwitch(): Node {
    const attrs = this.startAttributes();
    this.expect(T.T_SWITCH);
    this.expect('('.charCodeAt(0));
    const cond = this.parseExpression();
    this.expect(')'.charCodeAt(0));

    const isAlternative = !!this.eat(':'.charCodeAt(0));
    if (!isAlternative) this.expect('{'.charCodeAt(0));

    const cases: Node[] = [];
    // Skip leading semicolons (PHP allows them)
    while (this.eat(';'.charCodeAt(0))) {}
    while (!this.is('}'.charCodeAt(0)) && !this.is(T.T_ENDSWITCH) && !this.is(0)) {
      const caseAttrs = this.startAttributes();
      let caseCond: Node | null = null;
      if (this.eat(T.T_CASE)) {
        caseCond = this.parseExpression();
      } else {
        this.expect(T.T_DEFAULT);
      }
      // PHP allows both : and ; as case/default separator
      if (!this.eat(':'.charCodeAt(0))) {
        this.expectSemicolon();
      }
      const caseStmts = this.parseInnerStatements(T.T_CASE, T.T_DEFAULT, '}'.charCodeAt(0), T.T_ENDSWITCH);
      cases.push(new Case_(caseCond, caseStmts, this.endAttributes(caseAttrs)));
    }

    if (isAlternative) {
      this.expect(T.T_ENDSWITCH);
      this.expectSemicolon();
    } else {
      this.expect('}'.charCodeAt(0));
    }
    return new Switch_(cond, cases, this.endAttributes(attrs));
  }

  private parseBreak(): Node {
    const attrs = this.startAttributes();
    this.expect(T.T_BREAK);
    let num: Node | null = null;
    if (!this.is(';'.charCodeAt(0))) {
      num = this.parseExpression();
    }
    this.expectSemicolon();
    return new Break_(num, this.endAttributes(attrs));
  }

  private parseContinue(): Node {
    const attrs = this.startAttributes();
    this.expect(T.T_CONTINUE);
    let num: Node | null = null;
    if (!this.is(';'.charCodeAt(0))) {
      num = this.parseExpression();
    }
    this.expectSemicolon();
    return new Continue_(num, this.endAttributes(attrs));
  }

  private parseReturn(): Node {
    const attrs = this.startAttributes();
    this.expect(T.T_RETURN);
    let expr: Node | null = null;
    if (!this.is(';'.charCodeAt(0))) {
      expr = this.parseExpression();
    }
    this.expectSemicolon();
    return new Return_(expr, this.endAttributes(attrs));
  }

  private parseGlobal(): Node {
    const attrs = this.startAttributes();
    this.expect(T.T_GLOBAL);
    const vars: Node[] = [];
    do {
      vars.push(this.parseCallableVariable());
    } while (this.eat(','.charCodeAt(0)));
    this.expectSemicolon();
    return new Global_(vars, this.endAttributes(attrs));
  }

  private parseStaticVars(): Node {
    const attrs = this.startAttributes();
    this.expect(T.T_STATIC);
    const vars: Node[] = [];
    do {
      const varAttrs = this.startAttributes();
      const varNode = this.parseSimpleVariable();
      let defaultVal: Node | null = null;
      if (this.eat('='.charCodeAt(0))) {
        defaultVal = this.parseExpression();
      }
      vars.push(new StaticVar(varNode, defaultVal, this.endAttributes(varAttrs)));
    } while (this.eat(','.charCodeAt(0)));
    this.expectSemicolon();
    return new Static_(vars, this.endAttributes(attrs));
  }

  private parseEcho(): Node {
    const attrs = this.startAttributes();
    this.expect(T.T_ECHO);
    const exprs = this.parseExpressionList();
    this.expectSemicolon();
    return new Echo_(exprs, this.endAttributes(attrs));
  }

  private parseUnset(): Node {
    const attrs = this.startAttributes();
    this.expect(T.T_UNSET);
    this.expect('('.charCodeAt(0));
    const vars = this.parseExpressionList();
    this.expect(')'.charCodeAt(0));
    this.expectSemicolon();
    return new StmtUnset_(vars, this.endAttributes(attrs));
  }

  private parseDeclare(): Node {
    const attrs = this.startAttributes();
    this.expect(T.T_DECLARE);
    this.expect('('.charCodeAt(0));
    const declares: Node[] = [];
    do {
      const dAttrs = this.startAttributes();
      const key = this.expect(T.T_STRING);
      this.expect('='.charCodeAt(0));
      const value = this.parseExpression();
      declares.push(new DeclareItem(key.text, value, this.endAttributes(dAttrs)));
    } while (this.eat(','.charCodeAt(0)));
    this.expect(')'.charCodeAt(0));

    let stmts: Node[] | null = null;
    if (this.eat(';'.charCodeAt(0))) {
      stmts = null;
    } else if (this.eat(':'.charCodeAt(0))) {
      stmts = this.parseInnerStatements(T.T_ENDDECLARE);
      this.expect(T.T_ENDDECLARE);
      this.expectSemicolon();
    } else if (this.is('{'.charCodeAt(0))) {
      this.advance();
      stmts = this.parseInnerStatements('}'.charCodeAt(0));
      this.expect('}'.charCodeAt(0));
    } else {
      stmts = this.parseStatementAsArray();
    }
    return new Declare_(declares, stmts, this.endAttributes(attrs));
  }

  private parseTryCatch(): Node {
    const attrs = this.startAttributes();
    this.expect(T.T_TRY);
    this.expect('{'.charCodeAt(0));
    const stmts = this.parseInnerStatements('}'.charCodeAt(0));
    this.expect('}'.charCodeAt(0));

    const catches: Node[] = [];
    while (this.eat(T.T_CATCH)) {
      const catchAttrs = this.startAttributes();
      this.expect('('.charCodeAt(0));
      const types: Node[] = [];
      types.push(this.parseName());
      while (this.eat('|'.charCodeAt(0))) {
        types.push(this.parseName());
      }
      let varNode: Node | null = null;
      if (this.is(T.T_VARIABLE)) {
        varNode = this.parseSimpleVariable();
      }
      this.expect(')'.charCodeAt(0));
      this.expect('{'.charCodeAt(0));
      const catchStmts = this.parseInnerStatements('}'.charCodeAt(0));
      this.expect('}'.charCodeAt(0));
      catches.push(new Catch_(types, varNode, catchStmts, this.endAttributes(catchAttrs)));
    }

    let finallyNode: Node | null = null;
    if (this.eat(T.T_FINALLY)) {
      const finallyAttrs = this.startAttributes();
      this.expect('{'.charCodeAt(0));
      const finallyStmts = this.parseInnerStatements('}'.charCodeAt(0));
      this.expect('}'.charCodeAt(0));
      finallyNode = new Finally_(finallyStmts, this.endAttributes(finallyAttrs));
    }
    return new TryCatch(stmts, catches, finallyNode, this.endAttributes(attrs));
  }

  private parseThrowStatement(): Node {
    const attrs = this.startAttributes();
    this.expect(T.T_THROW);
    const expr = this.parseExpression();
    this.expectSemicolon();
    return new StmtExpression(new Throw_(expr, this.endAttributes(attrs)), this.endAttributes(attrs));
  }

  private parseGoto(): Node {
    const attrs = this.startAttributes();
    this.expect(T.T_GOTO);
    const label = this.expect(T.T_STRING);
    this.expectSemicolon();
    return new Goto_(new Identifier(label.text), this.endAttributes(attrs));
  }

  private parseLabel(): Node {
    const attrs = this.startAttributes();
    const label = this.expect(T.T_STRING);
    this.expect(':'.charCodeAt(0));
    return new Label(new Identifier(label.text), this.endAttributes(attrs));
  }

  private parseNamespace(): Node {
    const attrs = this.startAttributes();
    this.expect(T.T_NAMESPACE);

    if (this.is('{'.charCodeAt(0))) {
      this.expect('{'.charCodeAt(0));
      const stmts = this.parseInnerStatements('}'.charCodeAt(0));
      this.expect('}'.charCodeAt(0));
      return new StmtNamespace_(null, stmts, this.endAttributes(attrs));
    }

    const name = this.parseName();

    if (this.eat('{'.charCodeAt(0))) {
      const stmts = this.parseInnerStatements('}'.charCodeAt(0));
      this.expect('}'.charCodeAt(0));
      return new StmtNamespace_(name, stmts, this.endAttributes(attrs));
    }

    this.expectSemicolon();
    // Non-braced namespace: collect statements until next namespace or EOF
    const stmts = this.parseInnerStatements(0, true);
    return new StmtNamespace_(name, stmts, this.endAttributes(attrs));
  }

  private parseUse(): Node {
    const attrs = this.startAttributes();
    this.expect(T.T_USE);

    let type = 1; // TYPE_NORMAL
    if (this.eat(T.T_FUNCTION)) {
      type = 2;
    } else if (this.eat(T.T_CONST)) {
      type = 3;
    }
    const uses: Node[] = [];

    const firstName = this.parseName(true);

    // Group use: use Foo\{Bar, Baz} - after parseName consumed "Foo",
    // current token might be \ (T_NS_SEPARATOR or char code 92)
    if (this.current().text === '\\') {
      // Check if next non-whitespace token is {
      let lookPos = this.pos + 1;
      while (lookPos < this.tokens.length && this.tokens[lookPos].id === T.T_WHITESPACE) lookPos++;
      if (lookPos < this.tokens.length && this.tokens[lookPos].text === '{') {
        this.advance(); // consume the backslash
      }
    }

    // Group use: use Foo\{Bar, Baz}
    if (this.is('{'.charCodeAt(0))) {
      this.expect('{'.charCodeAt(0));
      // For group use: if no function/const keyword at group level, group type is TYPE_UNKNOWN
      // and each item defaults to TYPE_NORMAL. If group has function/const, items default to TYPE_UNKNOWN.
      const groupType = type === 1 ? 0 : type; // TYPE_NORMAL -> TYPE_UNKNOWN for group
      const defaultItemType = type === 1 ? 1 : 0; // items get TYPE_NORMAL if group was plain use
      do {
        if (this.is('}'.charCodeAt(0))) break; // trailing comma
        const useAttrs = this.startAttributes();
        let itemType = defaultItemType;
        if (this.eat(T.T_FUNCTION)) {
          itemType = 2;
        } else if (this.eat(T.T_CONST)) {
          itemType = 3;
        } else if (type !== 1) {
          itemType = 0; // TYPE_UNKNOWN when inheriting from group
        }
        const useName = this.parseName(true);
        let alias: string | null = null;
        if (this.eat(T.T_AS)) {
          alias = this.expect(T.T_STRING).text;
        }
        uses.push(new UseItem(useName, alias, itemType, this.endAttributes(useAttrs)));
      } while (this.eat(','.charCodeAt(0)));
      this.expect('}'.charCodeAt(0));
      this.expectSemicolon();
      return new GroupUse(firstName, uses, groupType, this.endAttributes(attrs));
    }

    // Regular use
    let alias: string | null = null;
    if (this.eat(T.T_AS)) {
      alias = this.expect(T.T_STRING).text;
    }
    uses.push(new UseItem(firstName, alias, 0, this.endAttributes(attrs)));

    while (this.eat(','.charCodeAt(0))) {
      const useAttrs = this.startAttributes();
      const useName = this.parseName(true);
      let useAlias: string | null = null;
      if (this.eat(T.T_AS)) {
        useAlias = this.expect(T.T_STRING).text;
      }
      uses.push(new UseItem(useName, useAlias, 0, this.endAttributes(useAttrs)));
    }

    this.expectSemicolon();
    return new Use_(uses, type, this.endAttributes(attrs));
  }

  private parseConstDecl(attrGroups: Node[] = []): Node {
    const attrs = this.startAttributes();
    this.expect(T.T_CONST);
    const consts: Node[] = [];
    do {
      const cAttrs = this.startAttributes();
      const name = this.expect(T.T_STRING);
      this.expect('='.charCodeAt(0));
      const value = this.parseExpression();
      consts.push(new Const_(name.text, value, this.endAttributes(cAttrs)));
    } while (this.eat(','.charCodeAt(0)));
    this.expectSemicolon();
    return new ConstStmt(consts, this.endAttributes(attrs), attrGroups);
  }

  private parseFunctionDecl(attrGroups: Node[] = []): Node {
    const attrs = this.startAttributes();
    this.expect(T.T_FUNCTION);
    const byRef = !!this.eat('&'.charCodeAt(0)) || !!this.eat(T.T_AMPERSAND_FOLLOWED_BY_VAR_OR_VARARG) || !!this.eat(T.T_AMPERSAND_NOT_FOLLOWED_BY_VAR_OR_VARARG);
    const name = this.expectIdentifierMaybeReserved();
    this.expect('('.charCodeAt(0));
    const params = this.parseParameterList();
    this.expect(')'.charCodeAt(0));
    const returnType = this.parseOptionalReturnType();
    this.expect('{'.charCodeAt(0));
    const stmts = this.parseInnerStatements('}'.charCodeAt(0));
    this.expect('}'.charCodeAt(0));
    return new StmtFunction_(new Identifier(name.text), { byRef, params, returnType, stmts, attrGroups }, this.endAttributes(attrs));
  }

  private parseClassDecl(flags: number = 0, attrGroups: Node[] = []): Node {
    const attrs = this.startAttributes();
    this.expect(T.T_CLASS);
    let name: Node | null = null;
    if (this.is(T.T_STRING) || this.isSemiReservedKeyword()) {
      const nameToken = this.advance();
      name = new Identifier(nameToken.text);
    }
    let extendsNode: Node | null = null;
    if (this.eat(T.T_EXTENDS)) {
      extendsNode = this.parseName();
    }
    const implementsNodes: Node[] = [];
    if (this.eat(T.T_IMPLEMENTS)) {
      do {
        implementsNodes.push(this.parseName());
      } while (this.eat(','.charCodeAt(0)));
    }
    this.expect('{'.charCodeAt(0));
    const stmts = this.parseClassBody();
    this.expect('}'.charCodeAt(0));
    return new StmtClass_(name, { flags, extends: extendsNode, implements: implementsNodes, stmts, attrGroups }, this.endAttributes(attrs));
  }

  private parseInterfaceDecl(attrGroups: Node[] = []): Node {
    const attrs = this.startAttributes();
    this.expect(T.T_INTERFACE);
    const name = this.expect(T.T_STRING);
    const extendsNodes: Node[] = [];
    if (this.eat(T.T_EXTENDS)) {
      do {
        extendsNodes.push(this.parseName());
      } while (this.eat(','.charCodeAt(0)));
    }
    this.expect('{'.charCodeAt(0));
    const stmts = this.parseClassBody();
    this.expect('}'.charCodeAt(0));
    return new Interface_(new Identifier(name.text), { extends: extendsNodes, stmts, attrGroups }, this.endAttributes(attrs));
  }

  private parseTraitDecl(attrGroups: Node[] = []): Node {
    const attrs = this.startAttributes();
    this.expect(T.T_TRAIT);
    const name = this.expect(T.T_STRING);
    this.expect('{'.charCodeAt(0));
    const stmts = this.parseClassBody();
    this.expect('}'.charCodeAt(0));
    return new StmtTrait_(new Identifier(name.text), { stmts, attrGroups }, this.endAttributes(attrs));
  }

  private parseEnumDecl(attrGroups: Node[] = []): Node {
    const attrs = this.startAttributes();
    this.expect(T.T_ENUM);
    const name = this.expect(T.T_STRING);
    let scalarType: Node | null = null;
    if (this.eat(':'.charCodeAt(0))) {
      scalarType = this.parseTypeExpr();
    }
    const implementsNodes: Node[] = [];
    if (this.eat(T.T_IMPLEMENTS)) {
      do {
        implementsNodes.push(this.parseName());
      } while (this.eat(','.charCodeAt(0)));
    }
    this.expect('{'.charCodeAt(0));
    const stmts = this.parseClassBody();
    this.expect('}'.charCodeAt(0));
    return new Enum_(new Identifier(name.text), { scalarType, implements: implementsNodes, stmts, attrGroups }, this.endAttributes(attrs));
  }

  private parseAttributedDecl(): Node {
    const attrGroups: Node[] = [];
    while (this.is(T.T_ATTRIBUTE)) {
      attrGroups.push(this.parseAttributeGroup());
    }
    // After attributes, parse modifiers then declaration
    let flags = 0;
    while (true) {
      if (this.eat(T.T_ABSTRACT)) flags |= Modifiers.ABSTRACT;
      else if (this.eat(T.T_FINAL)) flags |= Modifiers.FINAL;
      else if (this.eat(T.T_READONLY)) flags |= Modifiers.READONLY;
      else break;
    }
    if (this.is(T.T_CLASS)) return this.parseClassDecl(flags, attrGroups);
    if (this.is(T.T_INTERFACE)) return this.parseInterfaceDecl(attrGroups);
    if (this.is(T.T_TRAIT)) return this.parseTraitDecl(attrGroups);
    if (this.is(T.T_ENUM)) return this.parseEnumDecl(attrGroups);
    if (this.is(T.T_FUNCTION)) return this.parseFunctionDecl(attrGroups);
    if (this.is(T.T_CONST)) return this.parseConstDecl(attrGroups);
    return this.parseExpressionStatement();
  }

  private parseModifiedDecl(): Node {
    const attrs = this.startAttributes();
    let flags = 0;
    while (true) {
      if (this.eat(T.T_ABSTRACT)) {
        flags |= Modifiers.ABSTRACT;
      } else if (this.eat(T.T_FINAL)) {
        flags |= Modifiers.FINAL;
      } else if (this.eat(T.T_READONLY)) {
        flags |= Modifiers.READONLY;
      } else {
        break;
      }
    }
    if (this.is(T.T_CLASS)) {
      return this.parseClassDecl(flags);
    }
    // Could be abstract function in trait/interface
    return this.parseExpressionStatement();
  }

  private parseHaltCompiler(): Node {
    const attrs = this.startAttributes();
    this.expect(T.T_HALT_COMPILER);
    this.expect('('.charCodeAt(0));
    this.expect(')'.charCodeAt(0));
    // Don't use expectSemicolon's advance() which skips whitespace
    // We need the raw position right after the terminator
    if (this.currentId() === ';'.charCodeAt(0) || this.currentId() === T.T_CLOSE_TAG) {
      this.pos++; // Move past ; or ?> without skipping whitespace
    }
    // Consume rest from raw position (include whitespace, exclude sentinel)
    const restTokens = this.tokens.slice(this.pos);
    const remaining = restTokens.filter(t => t.id !== 0).map(t => t.text).join('');
    this.pos = this.tokens.length - 1; // Move to sentinel
    return new HaltCompiler(remaining, this.endAttributes(attrs));
  }

  // ─── Class body parsing ────────────────────────────────────────

  private parseClassBody(): Node[] {
    const stmts: Node[] = [];
    while (!this.is('}'.charCodeAt(0)) && !this.is(0)) {
      if (this.is(T.T_USE)) {
        stmts.push(this.parseTraitUse());
        continue;
      }

      const attrs = this.startAttributes();
      let flags = 0;

      // Parse attribute groups
      const attrGroups: Node[] = [];
      while (this.is(T.T_ATTRIBUTE)) {
        attrGroups.push(this.parseAttributeGroup());
      }

      // Parse modifiers
      while (true) {
        if (this.eat(T.T_PUBLIC)) {
          if (this.isSetModifier()) flags |= Modifiers.PUBLIC_SET;
          else flags |= Modifiers.PUBLIC;
        }
        else if (this.eat(T.T_PROTECTED)) {
          if (this.isSetModifier()) flags |= Modifiers.PROTECTED_SET;
          else flags |= Modifiers.PROTECTED;
        }
        else if (this.eat(T.T_PRIVATE)) {
          if (this.isSetModifier()) flags |= Modifiers.PRIVATE_SET;
          else flags |= Modifiers.PRIVATE;
        }
        else if (this.eat(T.T_STATIC)) flags |= Modifiers.STATIC;
        else if (this.eat(T.T_ABSTRACT)) flags |= Modifiers.ABSTRACT;
        else if (this.eat(T.T_FINAL)) flags |= Modifiers.FINAL;
        else if (this.eat(T.T_READONLY)) flags |= Modifiers.READONLY;
        else if (this.eat(T.T_VAR)) {} // var = public (legacy, flags stay 0)
        else break;
      }

      if (this.is(T.T_FUNCTION)) {
        stmts.push(this.parseClassMethod(flags, attrGroups, attrs));
      } else if (this.is(T.T_CONST)) {
        stmts.push(this.parseClassConst(flags, attrGroups, attrs));
      } else if (this.is(T.T_VARIABLE)) {
        stmts.push(this.parseProperty(flags, attrGroups, attrs));
      } else if (this.is(T.T_CASE)) {
        stmts.push(this.parseEnumCase(attrGroups, attrs));
      } else if (this.is(';'.charCodeAt(0))) {
        this.advance();
      } else {
        // Might be a typed property
        const type = this.parseTypeExpr();
        if (this.is(T.T_VARIABLE)) {
          stmts.push(this.parsePropertyWithType(flags, type, attrGroups, attrs));
        } else {
          this.throwSyntaxError('Unexpected token in class body');
        }
      }
    }
    return stmts;
  }

  private parseClassMethod(flags: number, attrGroups: Node[], attrs: Record<string, any>): Node {
    this.expect(T.T_FUNCTION);
    const byRef = !!this.eat('&'.charCodeAt(0)) || !!this.eat(T.T_AMPERSAND_FOLLOWED_BY_VAR_OR_VARARG) || !!this.eat(T.T_AMPERSAND_NOT_FOLLOWED_BY_VAR_OR_VARARG);
    const name = this.expectIdentifierMaybeReserved();
    this.expect('('.charCodeAt(0));
    const params = this.parseParameterList();
    this.expect(')'.charCodeAt(0));
    const returnType = this.parseOptionalReturnType();
    let stmts: Node[] | null = null;
    if (this.eat('{'.charCodeAt(0))) {
      stmts = this.parseInnerStatements('}'.charCodeAt(0));
      this.expect('}'.charCodeAt(0));
    } else {
      this.expectSemicolon();
    }
    return new ClassMethod(new Identifier(name.text), { flags, byRef, params, returnType, stmts, attrGroups }, this.endAttributes(attrs));
  }

  private parseClassConst(flags: number, attrGroups: Node[], attrs: Record<string, any>): Node {
    this.expect(T.T_CONST);

    // Check for typed constant (PHP 8.3): const int FOO = 1;
    // We need to distinguish "const FOO = 1" from "const int FOO = 1"
    // Strategy: save position, try to parse a type, check if next is identifier + '='
    let type: Node | null = null;
    const savedPos = this.pos;
    if (!this.isFollowedByEquals()) {
      // Not immediately "NAME =", so there might be a type
      try {
        type = this.parseTypeExpr();
        // After parsing type, verify next token is identifier (constant name)
        if (!this.is(T.T_STRING) && !this.isSemiReservedKeyword()) {
          // Not a valid typed const, backtrack
          type = null;
          this.pos = savedPos;
        }
      } catch {
        type = null;
        this.pos = savedPos;
      }
    }
    const consts: Node[] = [];
    do {
      const cAttrs = this.startAttributes();
      const name = this.expectIdentifierMaybeReserved();
      this.expect('='.charCodeAt(0));
      const value = this.parseExpression();
      consts.push(new Const_(name.text, value, this.endAttributes(cAttrs)));
    } while (this.eat(','.charCodeAt(0)));
    this.expectSemicolon();
    return new ClassConst(consts, flags, this.endAttributes(attrs), attrGroups, type);
  }

  private parseProperty(flags: number, attrGroups: Node[], attrs: Record<string, any>): Node {
    return this.parsePropertyWithType(flags, null, attrGroups, attrs);
  }

  private parsePropertyWithType(flags: number, type: Node | null, attrGroups: Node[], attrs: Record<string, any>): Node {
    const props: Node[] = [];
    do {
      const pAttrs = this.startAttributes();
      const varToken = this.expect(T.T_VARIABLE);
      const varName = varToken.text.substring(1); // Remove $
      let defaultVal: Node | null = null;
      if (this.eat('='.charCodeAt(0))) {
        defaultVal = this.parseExpression();
      }
      props.push(new PropertyItem(varName, defaultVal, this.endAttributes(pAttrs)));
    } while (this.eat(','.charCodeAt(0)));
    let hooks: Node[] = [];
    if (this.is('{'.charCodeAt(0))) {
      hooks = this.parsePropertyHooks();
    } else {
      this.expectSemicolon();
    }
    return new StmtProperty(flags, props, this.endAttributes(attrs), type, attrGroups, hooks);
  }

  private parsePropertyHooks(): Node[] {
    this.expect('{'.charCodeAt(0));
    const hooks: Node[] = [];
    while (!this.is('}'.charCodeAt(0)) && !this.is(0)) {
      const hookAttrs = this.startAttributes();
      const hookAttrGroups: Node[] = [];
      while (this.is(T.T_ATTRIBUTE)) {
        hookAttrGroups.push(this.parseAttributeGroup());
      }
      let hookFlags = 0;
      if (this.eat(T.T_FINAL)) hookFlags |= Modifiers.FINAL;
      const byRef = !!this.eat('&'.charCodeAt(0)) || !!this.eat(T.T_AMPERSAND_FOLLOWED_BY_VAR_OR_VARARG) || !!this.eat(T.T_AMPERSAND_NOT_FOLLOWED_BY_VAR_OR_VARARG);
      const hookName = this.expectIdentifierMaybeReserved();
      let params: Node[] = [];
      if (this.eat('('.charCodeAt(0))) {
        params = this.parseParameterList();
        this.expect(')'.charCodeAt(0));
      }
      let body: Node | Node[] | null = null;
      if (this.eat(T.T_DOUBLE_ARROW)) {
        body = this.parseExpression();
        this.expectSemicolon();
      } else if (this.eat('{'.charCodeAt(0))) {
        body = this.parseInnerStatements('}'.charCodeAt(0));
        this.expect('}'.charCodeAt(0));
      } else {
        this.expectSemicolon();
      }
      hooks.push(new PropertyHook(hookName.text, body, {
        flags: hookFlags,
        byRef,
        params,
        attrGroups: hookAttrGroups,
      }, this.endAttributes(hookAttrs)));
    }
    this.expect('}'.charCodeAt(0));
    return hooks;
  }

  private parseEnumCase(attrGroups: Node[], attrs: Record<string, any>): Node {
    this.expect(T.T_CASE);
    const name = this.expectIdentifierMaybeReserved();
    let expr: Node | null = null;
    if (this.eat('='.charCodeAt(0))) {
      expr = this.parseExpression();
    }
    this.expectSemicolon();
    return new EnumCase(new Identifier(name.text), expr, attrGroups, this.endAttributes(attrs));
  }

  private parseTraitUse(): Node {
    const attrs = this.startAttributes();
    this.expect(T.T_USE);
    const traits: Node[] = [];
    do {
      traits.push(this.parseName());
    } while (this.eat(','.charCodeAt(0)));

    const adaptations: Node[] = [];
    if (this.eat('{'.charCodeAt(0))) {
      while (!this.is('}'.charCodeAt(0)) && !this.is(0)) {
        adaptations.push(this.parseTraitUseAdaptation());
        this.expectSemicolon();
      }
      this.expect('}'.charCodeAt(0));
    } else {
      this.expectSemicolon();
    }
    return new TraitUse(traits, adaptations, this.endAttributes(attrs));
  }

  private parseTraitUseAdaptation(): Node {
    const attrs = this.startAttributes();
    let trait: Node | null = null;
    let method: Node;

    // Parse trait::method or just method
    // First token could be a name (for trait::method) or a semi-reserved keyword (for method alone)
    let firstName: Node;
    if (this.isSemiReservedKeyword() && !this.lookAhead(T.T_DOUBLE_COLON) && !this.lookAhead(T.T_NS_SEPARATOR)) {
      // Semi-reserved keyword used directly as method name (e.g., "exit as die")
      const token = this.advance();
      firstName = new Name(token.text);
    } else {
      firstName = this.parseName();
    }
    if (this.eat(T.T_DOUBLE_COLON)) {
      // trait::method
      trait = firstName;
      method = new Identifier(this.expectIdentifierMaybeReserved().text);
    } else {
      // Just method name - firstName is a Name, convert to Identifier
      method = new Identifier(firstName.toString());
    }

    if (this.is(T.T_INSTEADOF)) {
      // Precedence: A::foo insteadof B, C;
      this.advance();
      const insteadof: Node[] = [];
      do {
        insteadof.push(this.parseName());
      } while (this.eat(','.charCodeAt(0)));
      return new TraitUsePrecedence(trait, method, insteadof, this.endAttributes(attrs));
    }

    // Alias: A::foo as [visibility] newName;
    this.expect(T.T_AS);
    let newModifier: number | null = null;
    let newName: string | null = null;

    // Check for visibility modifier
    if (this.is(T.T_PUBLIC) || this.is(T.T_PROTECTED) || this.is(T.T_PRIVATE)) {
      const modToken = this.advance();
      switch (modToken.id) {
        case T.T_PUBLIC: newModifier = Modifiers.PUBLIC; break;
        case T.T_PROTECTED: newModifier = Modifiers.PROTECTED; break;
        case T.T_PRIVATE: newModifier = Modifiers.PRIVATE; break;
      }
    }

    // Check for new name (may be a keyword used as identifier)
    let newNameNode: Node | null = null;
    if (this.is(T.T_STRING) || this.isSemiReservedKeyword()) {
      newNameNode = new Identifier(this.advance().text);
    }

    return new TraitUseAlias(trait, method, newModifier, newNameNode, this.endAttributes(attrs));
  }

  private isKeywordAsIdentifier(): boolean {
    const id = this.current().id;
    return id === T.T_STATIC || id === T.T_ABSTRACT || id === T.T_FINAL ||
           id === T.T_PRIVATE || id === T.T_PROTECTED || id === T.T_PUBLIC ||
           id === T.T_READONLY;
  }

  // ─── Attribute parsing ─────────────────────────────────────────

  private parseAttributeGroup(): Node {
    const attrs = this.startAttributes();
    this.expect(T.T_ATTRIBUTE); // #[
    const attrList: Node[] = [];
    do {
      if (this.is(']'.charCodeAt(0))) break; // trailing comma
      const aAttrs = this.startAttributes();
      const name = this.parseName();
      const args: Node[] = [];
      if (this.eat('('.charCodeAt(0))) {
        if (!this.is(')'.charCodeAt(0))) {
          args.push(...this.parseArgumentList());
        }
        this.expect(')'.charCodeAt(0));
      }
      attrList.push(new Attribute(name, args, this.endAttributes(aAttrs)));
    } while (this.eat(','.charCodeAt(0)));
    this.expect(']'.charCodeAt(0));
    return new AttributeGroup(attrList, this.endAttributes(attrs));
  }

  // ─── Type parsing ──────────────────────────────────────────────

  private parseTypeExpr(): Node {
    if (this.eat('?'.charCodeAt(0))) {
      const inner = this.parseSimpleType();
      return new NullableType(inner);
    }
    const type = this.parseSimpleType();
    // Check for union type (|)
    if (this.is('|'.charCodeAt(0))) {
      const types: Node[] = [type];
      while (this.eat('|'.charCodeAt(0))) {
        types.push(this.parseSimpleType());
      }
      return new UnionType(types);
    }
    // Check for intersection type (&)
    if (this.is('&'.charCodeAt(0)) || this.is(T.T_AMPERSAND_NOT_FOLLOWED_BY_VAR_OR_VARARG)) {
      const types: Node[] = [type];
      while (this.eat('&'.charCodeAt(0)) || this.eat(T.T_AMPERSAND_NOT_FOLLOWED_BY_VAR_OR_VARARG) || this.eat(T.T_AMPERSAND_FOLLOWED_BY_VAR_OR_VARARG)) {
        types.push(this.parseSimpleType());
      }
      return new IntersectionType(types);
    }
    return type;
  }

  private static readonly BUILTIN_TYPES = new Set([
    'int', 'float', 'string', 'bool', 'void', 'never', 'null',
    'false', 'true', 'mixed', 'iterable', 'object',
  ]);

  private parseSimpleType(): Node {
    if (this.is(T.T_STRING)) {
      const text = this.current().text.toLowerCase();
      if (Php8Parser.BUILTIN_TYPES.has(text)) {
        const token = this.advance();
        return new Identifier(text); // Use lowercased form for built-in types
      }
      return this.parseName();
    }
    if (this.is(T.T_NAME_QUALIFIED) || this.is(T.T_NAME_FULLY_QUALIFIED) || this.is(T.T_NAME_RELATIVE)) {
      return this.parseName();
    }
    if (this.is(T.T_ARRAY)) {
      this.advance();
      return new Identifier('array');
    }
    if (this.is(T.T_CALLABLE)) {
      this.advance();
      return new Identifier('callable');
    }
    if (this.is(T.T_STATIC)) {
      const token = this.advance();
      return new Name(token.text);
    }
    // Parenthesized types for DNF (e.g., (A&B)|C)
    if (this.is('('.charCodeAt(0))) {
      this.advance();
      const innerType = this.parseSimpleType();
      const types: Node[] = [innerType];
      while (this.eat('&'.charCodeAt(0)) || this.eat(T.T_AMPERSAND_NOT_FOLLOWED_BY_VAR_OR_VARARG) || this.eat(T.T_AMPERSAND_FOLLOWED_BY_VAR_OR_VARARG)) {
        types.push(this.parseSimpleType());
      }
      this.expect(')'.charCodeAt(0));
      if (types.length > 1) {
        return new IntersectionType(types);
      }
      return types[0];
    }
    // Built-in types parsed as identifiers
    this.throwSyntaxError('Expected type');
  }

  private parseOptionalReturnType(): Node | null {
    if (this.eat(':'.charCodeAt(0))) {
      return this.parseTypeExpr();
    }
    return null;
  }

  // ─── Parameter parsing ─────────────────────────────────────────

  private parseParameterList(): Node[] {
    const params: Node[] = [];
    if (this.is(')'.charCodeAt(0))) return params;

    do {
      params.push(this.parseParameter());
    } while (this.eat(','.charCodeAt(0)) && !this.is(')'.charCodeAt(0)));

    return params;
  }

  private parseParameter(): Node {
    const attrs = this.startAttributes();

    const attrGroups: Node[] = [];
    while (this.is(T.T_ATTRIBUTE)) {
      attrGroups.push(this.parseAttributeGroup());
    }

    let flags = 0;
    while (true) {
      if (this.eat(T.T_PUBLIC)) {
        if (this.isSetModifier()) flags |= Modifiers.PUBLIC_SET;
        else flags |= Modifiers.PUBLIC;
      }
      else if (this.eat(T.T_PROTECTED)) {
        if (this.isSetModifier()) flags |= Modifiers.PROTECTED_SET;
        else flags |= Modifiers.PROTECTED;
      }
      else if (this.eat(T.T_PRIVATE)) {
        if (this.isSetModifier()) flags |= Modifiers.PRIVATE_SET;
        else flags |= Modifiers.PRIVATE;
      }
      else if (this.eat(T.T_READONLY)) flags |= Modifiers.READONLY;
      else if (this.eat(T.T_FINAL)) flags |= Modifiers.FINAL;
      else break;
    }

    let type: Node | null = null;
    // Check if next tokens look like a type
    if (!this.is(T.T_VARIABLE) && !this.is(T.T_ELLIPSIS) && !this.is('&'.charCodeAt(0))
      && !this.is(T.T_AMPERSAND_FOLLOWED_BY_VAR_OR_VARARG) && !this.is(T.T_AMPERSAND_NOT_FOLLOWED_BY_VAR_OR_VARARG)) {
      type = this.parseTypeExpr();
    }

    const byRef = !!this.eat('&'.charCodeAt(0)) || !!this.eat(T.T_AMPERSAND_FOLLOWED_BY_VAR_OR_VARARG) || !!this.eat(T.T_AMPERSAND_NOT_FOLLOWED_BY_VAR_OR_VARARG);
    const variadic = !!this.eat(T.T_ELLIPSIS);

    const varNode = this.parseSimpleVariable();

    let defaultVal: Node | null = null;
    if (this.eat('='.charCodeAt(0))) {
      defaultVal = this.parseExpression();
    }

    let hooks: Node[] = [];
    if (this.is('{'.charCodeAt(0))) {
      hooks = this.parsePropertyHooks();
    }

    return new Param(varNode, defaultVal, type, byRef, variadic, this.endAttributes(attrs), flags, attrGroups, hooks);
  }

  // ─── Expression parsing (Pratt parser / precedence climbing) ──

  private parseExpressionList(): Node[] {
    const exprs: Node[] = [];
    if (this.is(';'.charCodeAt(0)) || this.is(')'.charCodeAt(0))) return exprs;
    do {
      if (this.is(')'.charCodeAt(0))) break; // trailing comma
      exprs.push(this.parseExpression());
    } while (this.eat(','.charCodeAt(0)));
    return exprs;
  }

  // Precedence levels:
  // 1: or    2: xor    3: and    4: assignment (=, +=, etc.)
  // 5: ternary (?:)    6: ?? (coalesce)    7: pipe    8: ||
  // 9: &&   10: |   11: ^   12: &   13: ==/===/!=/!==/<=>
  // 14: </<=/>/>= 15: <</>  16: +/-/.  17: */%  18: instanceof 19: **
  private parseExpression(minPrec: number = 0): Node {
    let left = this.parseUnaryExpression();

    while (true) {
      // Check binary operators first
      const op = this.getBinaryOp();
      if (op !== null && op.prec >= minPrec) {
        this.advance();
        let right: Node;
        if (op.type === 'Instanceof') {
          right = this.parseInstanceofRhs();
        } else {
          const nextMinPrec = op.rightAssoc ? op.prec : op.prec + 1;
          right = this.parseExpression(nextMinPrec);
        }
        left = this.createBinaryOp(op.type, left, right, {
          ...left.getAttributes(),
          endLine: (right as any).getEndLine?.() ?? -1,
        });
        continue;
      }

      // Check ternary (?:) at precedence 5 — left-associative
      if (this.is('?'.charCodeAt(0)) && minPrec <= 5) {
        this.advance();
        let ifTrue: Node | null = null;
        if (!this.is(':'.charCodeAt(0))) {
          ifTrue = this.parseExpression();
        }
        this.expect(':'.charCodeAt(0));
        // Use prec 6 to prevent right-associative nesting of ternary
        const ifFalse = this.parseExpression(6);
        left = new Ternary(left, ifTrue, ifFalse, left.getAttributes());
        continue;
      }

      // Check assignment operators at precedence 4
      if (minPrec <= 4) {
        const assignOp = this.getAssignmentOp();
        if (assignOp !== null) {
          this.advance();
          if (assignOp === 'Assign' && (this.is('&'.charCodeAt(0)) || this.is(T.T_AMPERSAND_FOLLOWED_BY_VAR_OR_VARARG) || this.is(T.T_AMPERSAND_NOT_FOLLOWED_BY_VAR_OR_VARARG))) {
            this.advance();
            const right = this.parseExpression(4);
            left = new AssignRef(left, right, left.getAttributes());
          } else {
            const right = this.parseExpression(4);
            left = this.createAssignOp(assignOp, left, right, left.getAttributes());
          }
          continue;
        }
      }

      break;
    }

    return left;
  }

  private getBinaryOp(): { type: string; prec: number; rightAssoc: boolean } | null {
    const id = this.currentId();
    switch (id) {
      case T.T_LOGICAL_OR:       return { type: 'LogicalOr', prec: 1, rightAssoc: false };
      case T.T_LOGICAL_XOR:      return { type: 'LogicalXor', prec: 2, rightAssoc: false };
      case T.T_LOGICAL_AND:      return { type: 'LogicalAnd', prec: 3, rightAssoc: false };
      // Precedence: and/or/xor are 1-3, assignment is 4, ternary is 5,
      // then binary ops start at 6+
      case T.T_COALESCE:        return { type: 'Coalesce', prec: 6, rightAssoc: true };
      case T.T_BOOLEAN_OR:       return { type: 'BooleanOr', prec: 7, rightAssoc: false };
      case T.T_BOOLEAN_AND:      return { type: 'BooleanAnd', prec: 8, rightAssoc: false };
      case '|'.charCodeAt(0):    return { type: 'BitwiseOr', prec: 9, rightAssoc: false };
      case '^'.charCodeAt(0):    return { type: 'BitwiseXor', prec: 10, rightAssoc: false };
      case T.T_AMPERSAND_NOT_FOLLOWED_BY_VAR_OR_VARARG:
      case T.T_AMPERSAND_FOLLOWED_BY_VAR_OR_VARARG:
                                  return { type: 'BitwiseAnd', prec: 11, rightAssoc: false };
      case T.T_IS_EQUAL:         return { type: 'Equal', prec: 12, rightAssoc: false };
      case T.T_IS_NOT_EQUAL:     return { type: 'NotEqual', prec: 12, rightAssoc: false };
      case T.T_IS_IDENTICAL:     return { type: 'Identical', prec: 12, rightAssoc: false };
      case T.T_IS_NOT_IDENTICAL: return { type: 'NotIdentical', prec: 12, rightAssoc: false };
      case T.T_SPACESHIP:        return { type: 'Spaceship', prec: 12, rightAssoc: false };
      case '<'.charCodeAt(0):    return { type: 'Smaller', prec: 13, rightAssoc: false };
      case T.T_IS_SMALLER_OR_EQUAL: return { type: 'SmallerOrEqual', prec: 13, rightAssoc: false };
      case '>'.charCodeAt(0):    return { type: 'Greater', prec: 13, rightAssoc: false };
      case T.T_IS_GREATER_OR_EQUAL: return { type: 'GreaterOrEqual', prec: 13, rightAssoc: false };
      case T.T_PIPE:             return { type: 'Pipe', prec: 14, rightAssoc: false };
      case '.'.charCodeAt(0):    return { type: 'Concat', prec: 15, rightAssoc: false };
      case T.T_SL:               return { type: 'ShiftLeft', prec: 16, rightAssoc: false };
      case T.T_SR:               return { type: 'ShiftRight', prec: 16, rightAssoc: false };
      case '+'.charCodeAt(0):    return { type: 'Plus', prec: 17, rightAssoc: false };
      case '-'.charCodeAt(0):    return { type: 'Minus', prec: 17, rightAssoc: false };
      case '*'.charCodeAt(0):    return { type: 'Mul', prec: 18, rightAssoc: false };
      case '/'.charCodeAt(0):    return { type: 'Div', prec: 18, rightAssoc: false };
      case '%'.charCodeAt(0):    return { type: 'Mod', prec: 18, rightAssoc: false };
      case T.T_INSTANCEOF:      return { type: 'Instanceof', prec: 19, rightAssoc: false };
      case T.T_POW:             return { type: 'Pow', prec: 20, rightAssoc: true };
      default: return null;
    }
  }

  private getAssignmentOp(): string | null {
    switch (this.currentId()) {
      case '='.charCodeAt(0):    return 'Assign';
      case T.T_PLUS_EQUAL:       return 'AssignOp_Plus';
      case T.T_MINUS_EQUAL:      return 'AssignOp_Minus';
      case T.T_MUL_EQUAL:        return 'AssignOp_Mul';
      case T.T_DIV_EQUAL:        return 'AssignOp_Div';
      case T.T_CONCAT_EQUAL:     return 'AssignOp_Concat';
      case T.T_MOD_EQUAL:        return 'AssignOp_Mod';
      case T.T_AND_EQUAL:        return 'AssignOp_BitwiseAnd';
      case T.T_OR_EQUAL:         return 'AssignOp_BitwiseOr';
      case T.T_XOR_EQUAL:        return 'AssignOp_BitwiseXor';
      case T.T_SL_EQUAL:         return 'AssignOp_ShiftLeft';
      case T.T_SR_EQUAL:         return 'AssignOp_ShiftRight';
      case T.T_POW_EQUAL:        return 'AssignOp_Pow';
      case T.T_COALESCE_EQUAL:   return 'AssignOp_Coalesce';
      default: return null;
    }
  }

  private static readonly BINARY_OP_MAP: Record<string, new (left: Node, right: Node, attrs: Record<string, any>) => Node> = {
    'BitwiseAnd': BinBitwiseAnd,
    'BitwiseOr': BinBitwiseOr,
    'BitwiseXor': BinBitwiseXor,
    'BooleanAnd': BinBooleanAnd,
    'BooleanOr': BinBooleanOr,
    'Coalesce': BinCoalesce,
    'Concat': BinConcat,
    'Div': BinDiv,
    'Equal': BinEqual,
    'Greater': BinGreater,
    'GreaterOrEqual': BinGreaterOrEqual,
    'Identical': BinIdentical,
    'LogicalAnd': BinLogicalAnd,
    'LogicalOr': BinLogicalOr,
    'LogicalXor': BinLogicalXor,
    'Minus': BinMinus,
    'Mod': BinMod,
    'Mul': BinMul,
    'NotEqual': BinNotEqual,
    'NotIdentical': BinNotIdentical,
    'Pipe': BinPipe,
    'Plus': BinPlus,
    'Pow': BinPow,
    'ShiftLeft': BinShiftLeft,
    'ShiftRight': BinShiftRight,
    'Smaller': BinSmaller,
    'SmallerOrEqual': BinSmallerOrEqual,
    'Spaceship': BinSpaceship,
  };

  private parseInstanceofRhs(): Node {
    // instanceof accepts: Name, Variable, or parenthesized expression
    if (this.is(T.T_VARIABLE)) {
      return this.parseSimpleVariable();
    }
    if (this.is(T.T_STRING) || this.is(T.T_NAME_QUALIFIED) || this.is(T.T_NAME_FULLY_QUALIFIED) || this.is(T.T_NAME_RELATIVE)) {
      return this.parseName();
    }
    if (this.is(T.T_STATIC)) {
      const attrs = this.startAttributes();
      this.advance();
      return new Name('static', this.endAttributes(attrs));
    }
    if (this.is(T.T_SELF)) {
      const attrs = this.startAttributes();
      this.advance();
      return new Name('self', this.endAttributes(attrs));
    }
    if (this.is(T.T_PARENT)) {
      const attrs = this.startAttributes();
      this.advance();
      return new Name('parent', this.endAttributes(attrs));
    }
    // Fallback to expression
    return this.parseUnaryExpression();
  }

  private createBinaryOp(type: string, left: Node, right: Node, attrs: Record<string, any>): Node {
    if (type === 'Instanceof') {
      return new Instanceof_(left, right, attrs);
    }
    const Ctor = Php8Parser.BINARY_OP_MAP[type];
    if (Ctor) {
      return new Ctor(left, right, attrs);
    }
    throw new Error('Unknown binary op: ' + type);
  }

  private static readonly ASSIGN_OP_MAP: Record<string, new (var_: Node, expr: Node, attrs: Record<string, any>) => Node> = {
    'BitwiseAnd': AssignBitwiseAnd,
    'BitwiseOr': AssignBitwiseOr,
    'BitwiseXor': AssignBitwiseXor,
    'Coalesce': AssignCoalesce,
    'Concat': AssignConcat,
    'Div': AssignDiv,
    'Minus': AssignMinus,
    'Mod': AssignMod,
    'Mul': AssignMul,
    'Plus': AssignPlus,
    'Pow': AssignPow,
    'ShiftLeft': AssignShiftLeft,
    'ShiftRight': AssignShiftRight,
  };

  private arrayToList(node: Node): Node {
    if (node instanceof ExprArray_) {
      // Recursively convert nested arrays to lists
      const items = node.items.map((item: any) => {
        if (item === null) return null;
        if (item instanceof ArrayItem && item.value instanceof ExprArray_) {
          return new ArrayItem(this.arrayToList(item.value), item.key, item.byRef, item.getAttributes(), item.unpack);
        }
        return item;
      });
      return new List_(items, node.getAttributes());
    }
    return node;
  }

  private createAssignOp(type: string, left: Node, right: Node, attrs: Record<string, any>): Node {
    if (type === 'Assign') {
      return new Assign(this.arrayToList(left), right, attrs);
    }
    const opName = type.replace('AssignOp_', '');
    const Ctor = Php8Parser.ASSIGN_OP_MAP[opName];
    if (Ctor) {
      return new Ctor(left, right, attrs);
    }
    return new Assign(left, right, attrs);
  }

  private parseUnaryExpression(): Node {
    const attrs = this.startAttributes();
    const id = this.currentId();

    switch (id) {
      case T.T_INC: {
        this.advance();
        const expr = this.parseUnaryExpression();
        return new PreInc(expr, this.endAttributes(attrs));
      }
      case T.T_DEC: {
        this.advance();
        const expr = this.parseUnaryExpression();
        return new PreDec(expr, this.endAttributes(attrs));
      }
      case T.T_INT_CAST: {
        this.advance();
        const expr = this.parseUnaryExpression();
        return new CastInt_(expr, this.endAttributes(attrs));
      }
      case T.T_DOUBLE_CAST: {
        this.advance();
        const expr = this.parseUnaryExpression();
        return new CastDouble(expr, this.endAttributes(attrs));
      }
      case T.T_STRING_CAST: {
        this.advance();
        const expr = this.parseUnaryExpression();
        return new CastString_(expr, this.endAttributes(attrs));
      }
      case T.T_ARRAY_CAST: {
        this.advance();
        const expr = this.parseUnaryExpression();
        return new CastArray_(expr, this.endAttributes(attrs));
      }
      case T.T_OBJECT_CAST: {
        this.advance();
        const expr = this.parseUnaryExpression();
        return new CastObject_(expr, this.endAttributes(attrs));
      }
      case T.T_BOOL_CAST: {
        this.advance();
        const expr = this.parseUnaryExpression();
        return new CastBool_(expr, this.endAttributes(attrs));
      }
      case T.T_UNSET_CAST: {
        this.advance();
        const expr = this.parseUnaryExpression();
        return new CastUnset_(expr, this.endAttributes(attrs));
      }
      case T.T_VOID_CAST: {
        this.advance();
        const expr = this.parseExpression();
        return new CastVoid_(expr, this.endAttributes(attrs));
      }
      case '!'.charCodeAt(0): {
        this.advance();
        const expr = this.parseUnaryExpression();
        return new BooleanNot(expr, this.endAttributes(attrs));
      }
      case '~'.charCodeAt(0): {
        this.advance();
        const expr = this.parseUnaryExpression();
        return new BitwiseNot(expr, this.endAttributes(attrs));
      }
      case '-'.charCodeAt(0): {
        this.advance();
        const expr = this.parseUnaryExpression();
        return new UnaryMinus(expr, this.endAttributes(attrs));
      }
      case '+'.charCodeAt(0): {
        this.advance();
        const expr = this.parseUnaryExpression();
        return new UnaryPlus(expr, this.endAttributes(attrs));
      }
      case '@'.charCodeAt(0): {
        this.advance();
        const expr = this.parseUnaryExpression();
        return new ErrorSuppress(expr, this.endAttributes(attrs));
      }
      case T.T_CLONE: {
        const cloneToken = this.advance();
        if (this.is('('.charCodeAt(0))) {
          const savedPos = this.pos;
          this.advance(); // (
          // Check for variadic placeholder, named args, or unpack
          if (this.is(')'.charCodeAt(0))) {
            // clone() - error in PHP but parse as FuncCall
            this.advance();
            return new FuncCall(new Name(cloneToken.text, this.endAttributes(attrs)), [], this.endAttributes(attrs));
          }
          if (this.is(T.T_ELLIPSIS)) {
            this.pos = savedPos;
            this.advance(); // (
            const args = this.parseArgumentList();
            this.expect(')'.charCodeAt(0));
            return new FuncCall(new Name(cloneToken.text, this.endAttributes(attrs)), args, this.endAttributes(attrs));
          }
          if ((this.is(T.T_STRING) || this.isSemiReservedKeyword()) && this.lookAhead(':'.charCodeAt(0))) {
            this.pos = savedPos;
            this.advance(); // (
            const args = this.parseArgumentList();
            this.expect(')'.charCodeAt(0));
            return new FuncCall(new Name(cloneToken.text, this.endAttributes(attrs)), args, this.endAttributes(attrs));
          }
          const firstExpr = this.parseExpression();
          if (this.is(','.charCodeAt(0))) {
            // Multiple args or trailing comma → FuncCall
            const args: Node[] = [new Arg(firstExpr, false, false, this.endAttributes(attrs))];
            while (this.eat(','.charCodeAt(0))) {
              if (this.is(')'.charCodeAt(0))) break;
              const argAttrs = this.startAttributes();
              let name: Node | null = null;
              if ((this.is(T.T_STRING) || this.isSemiReservedKeyword()) && this.lookAhead(':'.charCodeAt(0))) {
                const nameToken = this.advance();
                this.expect(':'.charCodeAt(0));
                name = new Identifier(nameToken.text);
              }
              const unpack = !!this.eat(T.T_ELLIPSIS);
              const value = this.parseExpression();
              args.push(new Arg(value, false, unpack, this.endAttributes(argAttrs), name));
            }
            this.expect(')'.charCodeAt(0));
            return new FuncCall(new Name(cloneToken.text, this.endAttributes(attrs)), args, this.endAttributes(attrs));
          }
          this.expect(')'.charCodeAt(0));
          return new Clone_(firstExpr, this.endAttributes(attrs));
        }
        const expr = this.parseUnaryExpression();
        return new Clone_(expr, this.endAttributes(attrs));
      }
      case T.T_PRINT: {
        this.advance();
        const expr = this.parseExpression();
        return new Print_(expr, this.endAttributes(attrs));
      }
      case T.T_YIELD: {
        return this.parseYield();
      }
      case T.T_YIELD_FROM: {
        return this.parseYieldFrom();
      }
      case T.T_THROW: {
        this.advance();
        const expr = this.parseExpression();
        return new Throw_(expr, this.endAttributes(attrs));
      }
      case T.T_INCLUDE: case T.T_INCLUDE_ONCE: case T.T_REQUIRE: case T.T_REQUIRE_ONCE: {
        return this.parseInclude();
      }
    }

    return this.parsePostfixExpression();
  }

  private parsePostfixExpression(): Node {
    let expr = this.parsePrimaryExpression();

    while (true) {
      if (this.is(T.T_OBJECT_OPERATOR) || this.is(T.T_NULLSAFE_OBJECT_OPERATOR)) {
        const isNullsafe = this.is(T.T_NULLSAFE_OBJECT_OPERATOR);
        this.advance();
        const name = this.parseMemberName();

        if (this.is('('.charCodeAt(0))) {
          this.advance();
          const args = this.parseArgumentList();
          this.expect(')'.charCodeAt(0));
          if (isNullsafe) {
            expr = new NullsafeMethodCall(expr, name, args, expr.getAttributes());
          } else {
            expr = new MethodCall(expr, name, args, expr.getAttributes());
          }
        } else {
          if (isNullsafe) {
            expr = new NullsafePropertyFetch(expr, name, expr.getAttributes());
          } else {
            expr = new PropertyFetch(expr, name, expr.getAttributes());
          }
        }
      } else if (this.is(T.T_DOUBLE_COLON)) {
        this.advance();
        // Unwrap ConstFetch to get the Name for static access
        if (expr instanceof ConstFetch) {
          expr = (expr as any).name;
        }
        if (this.is(T.T_VARIABLE)) {
          // Static property fetch: Foo::$bar or static method call: Foo::$method()
          if (this.lookAhead('('.charCodeAt(0))) {
            const prop = this.parseSimpleVariable();
            this.advance();
            const args = this.parseArgumentList();
            this.expect(')'.charCodeAt(0));
            expr = new StaticCall(expr, prop, args, expr.getAttributes());
          } else {
            const prop = this.parseStaticPropertyName();
            expr = new StaticPropertyFetch(expr, prop, expr.getAttributes());
          }
        } else if (this.is('$'.charCodeAt(0))) {
          // Variable variable static property: Foo::$$bar, Foo::${'expr'}
          const attrs2 = this.startAttributes();
          this.advance(); // skip $
          let prop: Node;
          if (this.is('{'.charCodeAt(0))) {
            this.advance();
            prop = this.parseExpression();
            this.expect('}'.charCodeAt(0));
          } else {
            prop = this.parseCallableVariable();
          }
          if (this.is('('.charCodeAt(0))) {
            this.advance();
            const args = this.parseArgumentList();
            this.expect(')'.charCodeAt(0));
            expr = new StaticCall(expr, prop, args, expr.getAttributes());
          } else {
            expr = new StaticPropertyFetch(expr, prop, expr.getAttributes());
          }
        } else {
          const name = this.parseMemberName();
          if (this.is('('.charCodeAt(0))) {
            this.advance();
            const args = this.parseArgumentList();
            this.expect(')'.charCodeAt(0));
            expr = new StaticCall(expr, name, args, expr.getAttributes());
          } else {
            expr = new ClassConstFetch(expr, name, expr.getAttributes());
          }
        }
      } else if (this.is('['.charCodeAt(0))) {
        this.advance();
        let dim: Node | null = null;
        if (!this.is(']'.charCodeAt(0))) {
          dim = this.parseExpression();
        }
        this.expect(']'.charCodeAt(0));
        expr = new ArrayDimFetch(expr, dim, expr.getAttributes());
      } else if (this.is('('.charCodeAt(0))) {
        this.advance();
        const args = this.parseArgumentList();
        this.expect(')'.charCodeAt(0));
        expr = new FuncCall(expr, args, expr.getAttributes());
      } else {
        break;
      }
    }

    // Postfix ++ and --
    if (this.is(T.T_INC)) {
      this.advance();
      expr = new PostInc(expr, expr.getAttributes());
    } else if (this.is(T.T_DEC)) {
      this.advance();
      expr = new PostDec(expr, expr.getAttributes());
    }

    return expr;
  }

  private parsePrimaryExpression(): Node {
    const attrs = this.startAttributes();

    switch (this.currentId()) {
      case T.T_VARIABLE:
        return this.parseCallableVariable();

      case '$'.charCodeAt(0):
        return this.parseCallableVariable();

      case T.T_LNUMBER: {
        const token = this.advance();
        return ScalarInt_.fromString(token.text, this.endAttributes(attrs));
      }

      case T.T_DNUMBER: {
        const token = this.advance();
        return ScalarFloat_.fromString(token.text, this.endAttributes(attrs));
      }

      case T.T_CONSTANT_ENCAPSED_STRING: {
        const token = this.advance();
        return ScalarString.fromString(token.text, this.endAttributes(attrs));
      }

      case '"'.charCodeAt(0): {
        return this.parseInterpolatedString();
      }

      case T.T_START_HEREDOC: {
        return this.parseHeredoc();
      }

      case T.T_STRING:
      case T.T_NAME_QUALIFIED:
      case T.T_NAME_FULLY_QUALIFIED:
      case T.T_NAME_RELATIVE: {
        const name = this.parseName();
        if (this.is('('.charCodeAt(0))) {
          this.advance();
          const args = this.parseArgumentList();
          this.expect(')'.charCodeAt(0));
          return new FuncCall(name, args, this.endAttributes(attrs));
        }
        return new ConstFetch(name, this.endAttributes(attrs));
      }

      case T.T_LINE: {
        this.advance();
        return new MagicLine(this.endAttributes(attrs));
      }
      case T.T_FILE: {
        this.advance();
        return new MagicFile(this.endAttributes(attrs));
      }
      case T.T_DIR: {
        this.advance();
        return new MagicDir(this.endAttributes(attrs));
      }
      case T.T_CLASS_C: {
        this.advance();
        return new MagicClass_(this.endAttributes(attrs));
      }
      case T.T_TRAIT_C: {
        this.advance();
        return new MagicTrait_(this.endAttributes(attrs));
      }
      case T.T_METHOD_C: {
        this.advance();
        return new MagicMethod(this.endAttributes(attrs));
      }
      case T.T_FUNC_C: {
        this.advance();
        return new MagicFunction_(this.endAttributes(attrs));
      }
      case T.T_NS_C: {
        this.advance();
        return new MagicNamespace_(this.endAttributes(attrs));
      }
      case T.T_PROPERTY_C: {
        this.advance();
        return new MagicProperty(this.endAttributes(attrs));
      }

      case T.T_NEW:
        return this.parseNew();

      case T.T_ARRAY:
        return this.parseArrayLong();

      case '['.charCodeAt(0):
        return this.parseArrayShort();

      case T.T_LIST:
        return this.parseList();

      case T.T_FUNCTION:
        return this.parseClosure();

      case T.T_FN:
        return this.parseArrowFunction();

      case T.T_ATTRIBUTE: {
        // Attributes on closures/arrow functions in expression context
        const attrGroups: Node[] = [];
        while (this.is(T.T_ATTRIBUTE)) {
          attrGroups.push(this.parseAttributeGroup());
        }
        if (this.is(T.T_STATIC)) {
          return this.parseStaticClosure(attrGroups);
        }
        if (this.is(T.T_FN)) {
          return this.parseArrowFunction(attrGroups);
        }
        return this.parseClosure(attrGroups);
      }

      case T.T_STATIC:
        if (this.lookAhead(T.T_FUNCTION) || this.lookAhead(T.T_FN)) {
          return this.parseStaticClosure();
        }
        return this.parseStaticRef();

      case '('.charCodeAt(0): {
        this.advance();
        const expr = this.parseExpression();
        this.expect(')'.charCodeAt(0));
        return expr;
      }

      case T.T_EMPTY: {
        this.advance();
        this.expect('('.charCodeAt(0));
        const expr = this.parseExpression();
        this.expect(')'.charCodeAt(0));
        return new Empty_(expr, this.endAttributes(attrs));
      }

      case T.T_ISSET: {
        this.advance();
        this.expect('('.charCodeAt(0));
        const vars = this.parseExpressionList();
        this.expect(')'.charCodeAt(0));
        return new Isset_(vars, this.endAttributes(attrs));
      }

      case T.T_EVAL: {
        this.advance();
        this.expect('('.charCodeAt(0));
        const expr = this.parseExpression();
        this.expect(')'.charCodeAt(0));
        return new Eval_(expr, this.endAttributes(attrs));
      }

      case T.T_EXIT: {
        const exitToken = this.advance();
        if (this.is('('.charCodeAt(0))) {
          // Save position to potentially backtrack
          const savedPos = this.pos;
          this.advance(); // consume (
          if (this.is(')'.charCodeAt(0))) {
            this.advance();
            return new Exit_(null, this.endAttributes(attrs));
          }
          // Check if this should be FuncCall: named args, unpack, first-class callable
          if (this.is(T.T_ELLIPSIS) ||
              ((this.is(T.T_STRING) || this.isSemiReservedKeyword()) && this.lookAhead(':'.charCodeAt(0)))) {
            this.pos = savedPos;
            this.advance(); // (
            const args = this.parseArgumentList();
            this.expect(')'.charCodeAt(0));
            return new FuncCall(new Name(exitToken.text, this.endAttributes(attrs)), args, this.endAttributes(attrs));
          }
          // Parse first expression
          const firstExpr = this.parseExpression();
          if (this.is(','.charCodeAt(0))) {
            // Multiple args → FuncCall
            const firstArgAttrs = { ...attrs };
            const args: Node[] = [new Arg(firstExpr, false, false, firstArgAttrs)];
            while (this.eat(','.charCodeAt(0))) {
              if (this.is(')'.charCodeAt(0))) break;
              const argAttrs = this.startAttributes();
              const unpack = !!this.eat(T.T_ELLIPSIS);
              const value = this.parseExpression();
              args.push(new Arg(value, false, unpack, this.endAttributes(argAttrs)));
            }
            this.expect(')'.charCodeAt(0));
            return new FuncCall(new Name(exitToken.text, this.endAttributes(attrs)), args, this.endAttributes(attrs));
          }
          this.expect(')'.charCodeAt(0));
          return new Exit_(firstExpr, this.endAttributes(attrs));
        }
        return new Exit_(null, this.endAttributes(attrs));
      }

      case T.T_MATCH:
        return this.parseMatch();

      case '`'.charCodeAt(0):
        return this.parseShellExec();

      default:
        // Semi-reserved keywords used as function calls (e.g., readonly(), fn())
        if (this.isSemiReservedKeyword() && this.lookAhead('('.charCodeAt(0))) {
          const token = this.advance();
          const name = new Name(token.text, this.endAttributes(attrs));
          this.expect('('.charCodeAt(0));
          const args = this.parseArgumentList();
          this.expect(')'.charCodeAt(0));
          return new FuncCall(name, args, this.endAttributes(attrs));
        }
        this.throwSyntaxError(`Unexpected token ${T.tokenName(this.currentId())} ('${this.current().text}')`);
    }
  }

  // Check if `(set)` follows (for asymmetric visibility like `public(set)`)
  private isSetModifier(): boolean {
    if (this.is('('.charCodeAt(0))) {
      const next = this.lookAheadToken(0);
      if (next && next.text === 'set') {
        const next2 = this.lookAheadToken(1);
        if (next2 && next2.id === ')'.charCodeAt(0)) {
          this.advance(); // (
          this.advance(); // set
          this.advance(); // )
          return true;
        }
      }
    }
    return false;
  }

  // ─── Helper expression parsers ─────────────────────────────────

  private parseCallableVariable(): Node {
    const attrs = this.startAttributes();
    if (this.is('$'.charCodeAt(0))) {
      this.advance(); // consume $
      if (this.is('{'.charCodeAt(0))) {
        // ${expr} - variable variable with expression
        this.advance(); // consume {
        const expr = this.parseExpression();
        this.expect('}'.charCodeAt(0));
        return new Variable(expr, this.endAttributes(attrs));
      }
      // $$var or $$$var etc. - variable variable
      const inner = this.parseCallableVariable();
      return new Variable(inner, this.endAttributes(attrs));
    }
    // Regular $var
    const token = this.expect(T.T_VARIABLE);
    return new Variable(token.text.substring(1), this.endAttributes(attrs));
  }

  private parseSimpleVariable(): Node {
    const attrs = this.startAttributes();
    const token = this.expect(T.T_VARIABLE);
    return new Variable(token.text.substring(1), this.endAttributes(attrs));
  }

  private parseStaticPropertyName(): Node {
    const attrs = this.startAttributes();
    const token = this.expect(T.T_VARIABLE);
    return new VarLikeIdentifier(token.text.substring(1), this.endAttributes(attrs));
  }

  private parseName(inUseContext: boolean = false): Node {
    const attrs = this.startAttributes();
    const token = this.current();

    if (token.id === T.T_NAME_FULLY_QUALIFIED) {
      this.advance();
      if (inUseContext) {
        // In use statements, \A is treated as plain Name (use is always absolute)
        return new Name(token.text.substring(1), this.endAttributes(attrs));
      }
      return new FullyQualified(token.text.substring(1), this.endAttributes(attrs));
    }
    if (token.id === T.T_NAME_RELATIVE) {
      this.advance();
      const parts = token.text.split('\\');
      parts.shift(); // Remove 'namespace'
      return new Relative(parts, this.endAttributes(attrs));
    }
    if (token.id === T.T_NAME_QUALIFIED) {
      this.advance();
      return new Name(token.text, this.endAttributes(attrs));
    }
    if (token.id === T.T_STRING) {
      this.advance();
      return new Name(token.text, this.endAttributes(attrs));
    }
    // PHP 8.0+: keywords can be used as namespace names (e.g., namespace fn; fn\use())
    if (this.isSemiReservedKeyword() || token.id === T.T_SELF || token.id === T.T_PARENT || token.id === T.T_STATIC) {
      this.advance();
      return new Name(token.text, this.endAttributes(attrs));
    }

    this.throwSyntaxError('Expected name');
  }

  private parseMemberName(): Node {
    if (this.is(T.T_STRING)) {
      const attrs = this.startAttributes();
      const token = this.advance();
      return new Identifier(token.text, this.endAttributes(attrs));
    }
    if (this.is(T.T_VARIABLE)) {
      return this.parseSimpleVariable();
    }
    if (this.is('$'.charCodeAt(0))) {
      // Variable variable in member context: $$b, ${expr}
      return this.parseCallableVariable();
    }
    if (this.is('{'.charCodeAt(0))) {
      this.advance();
      const expr = this.parseExpression();
      this.expect('}'.charCodeAt(0));
      return expr;
    }
    if (this.is(T.T_CLASS)) {
      const attrs = this.startAttributes();
      this.advance();
      return new Identifier('class', this.endAttributes(attrs));
    }
    // Semi-reserved keywords can be used as member names
    if (this.isSemiReservedKeyword()) {
      const attrs = this.startAttributes();
      const token = this.advance();
      return new Identifier(token.text, this.endAttributes(attrs));
    }
    this.throwSyntaxError('Expected member name');
  }

  private expectIdentifierMaybeReserved(): { text: string; id: number; line: number } {
    if (this.is(T.T_STRING) || this.isSemiReservedKeyword()) {
      return this.advance();
    }
    return this.expect(T.T_STRING); // will throw
  }

  private canStartExpression(): boolean {
    const id = this.currentId();
    // These tokens cannot start an expression — they are binary/postfix operators or terminators
    if (id === ';'.charCodeAt(0) || id === ')'.charCodeAt(0) || id === ']'.charCodeAt(0) ||
        id === ','.charCodeAt(0) || id === '}'.charCodeAt(0) || id === T.T_DOUBLE_ARROW ||
        id === '*'.charCodeAt(0) || id === '/'.charCodeAt(0) || id === '%'.charCodeAt(0) ||
        id === '='.charCodeAt(0) || id === '^'.charCodeAt(0) || id === '?'.charCodeAt(0) ||
        id === ':'.charCodeAt(0) || id === '|'.charCodeAt(0) || id === '.'.charCodeAt(0) ||
        id === '<'.charCodeAt(0) || id === '>'.charCodeAt(0) ||
        id === T.T_IS_EQUAL || id === T.T_IS_NOT_EQUAL ||
        id === T.T_IS_IDENTICAL || id === T.T_IS_NOT_IDENTICAL ||
        id === T.T_IS_SMALLER_OR_EQUAL || id === T.T_IS_GREATER_OR_EQUAL ||
        id === T.T_SPACESHIP || id === T.T_BOOLEAN_AND || id === T.T_BOOLEAN_OR ||
        id === T.T_COALESCE || id === T.T_SL || id === T.T_SR ||
        id === T.T_PLUS_EQUAL || id === T.T_MINUS_EQUAL || id === T.T_MUL_EQUAL ||
        id === T.T_DIV_EQUAL || id === T.T_CONCAT_EQUAL || id === T.T_MOD_EQUAL ||
        id === T.T_AND_EQUAL || id === T.T_OR_EQUAL || id === T.T_XOR_EQUAL ||
        id === T.T_SL_EQUAL || id === T.T_SR_EQUAL || id === T.T_POW_EQUAL ||
        id === T.T_COALESCE_EQUAL || id === T.T_POW ||
        id === T.T_LOGICAL_AND || id === T.T_LOGICAL_OR || id === T.T_LOGICAL_XOR ||
        id === T.T_INC || id === T.T_DEC || id === T.T_INSTANCEOF ||
        id === T.T_OBJECT_OPERATOR || id === T.T_NULLSAFE_OBJECT_OPERATOR ||
        id === T.T_DOUBLE_COLON || id === T.T_CLOSE_TAG ||
        id === T.T_AMPERSAND_NOT_FOLLOWED_BY_VAR_OR_VARARG ||
        id === 0 /* EOF */) {
      return false;
    }
    return true;
  }

  private isSemiReservedKeyword(): boolean {
    const id = this.current().id;
    // List of tokens that are keywords but can be used as identifiers in certain contexts
    return id === T.T_ABSTRACT || id === T.T_ARRAY || id === T.T_AS ||
      id === T.T_BREAK || id === T.T_CALLABLE || id === T.T_CASE ||
      id === T.T_CATCH || id === T.T_CLASS || id === T.T_CLONE ||
      id === T.T_CONST || id === T.T_CONTINUE || id === T.T_DECLARE ||
      id === T.T_DEFAULT || id === T.T_DO || id === T.T_ECHO ||
      id === T.T_ELSE || id === T.T_ELSEIF || id === T.T_EMPTY ||
      id === T.T_ENUM || id === T.T_EVAL || id === T.T_EXIT ||
      id === T.T_EXTENDS || id === T.T_FINAL || id === T.T_FINALLY ||
      id === T.T_FN || id === T.T_FOR || id === T.T_FOREACH ||
      id === T.T_FUNCTION || id === T.T_GLOBAL || id === T.T_GOTO ||
      id === T.T_IF || id === T.T_IMPLEMENTS || id === T.T_INCLUDE ||
      id === T.T_INCLUDE_ONCE || id === T.T_INSTANCEOF || id === T.T_INSTEADOF ||
      id === T.T_INTERFACE || id === T.T_ISSET || id === T.T_LIST ||
      id === T.T_LOGICAL_AND || id === T.T_LOGICAL_OR || id === T.T_LOGICAL_XOR ||
      id === T.T_MATCH || id === T.T_NAMESPACE || id === T.T_NEW ||
      id === T.T_PRINT || id === T.T_PRIVATE || id === T.T_PROTECTED ||
      id === T.T_PUBLIC || id === T.T_READONLY || id === T.T_REQUIRE ||
      id === T.T_REQUIRE_ONCE || id === T.T_RETURN || id === T.T_STATIC ||
      id === T.T_SWITCH || id === T.T_THROW || id === T.T_TRAIT ||
      id === T.T_TRY || id === T.T_UNSET || id === T.T_USE ||
      id === T.T_VAR || id === T.T_WHILE || id === T.T_YIELD ||
      id === T.T_YIELD_FROM ||
      // Magic constants used as identifiers
      id === T.T_LINE || id === T.T_FILE || id === T.T_DIR ||
      id === T.T_CLASS_C || id === T.T_TRAIT_C || id === T.T_METHOD_C ||
      id === T.T_FUNC_C || id === T.T_NS_C || id === T.T_PROPERTY_C;
  }

  private parseArgumentList(): Node[] {
    const args: Node[] = [];
    if (this.is(')'.charCodeAt(0))) return args;

    // Check for variadic placeholder: foo(...)
    if (this.is(T.T_ELLIPSIS) && this.lookAhead(')'.charCodeAt(0))) {
      const attrs = this.startAttributes();
      this.advance();
      return [new VariadicPlaceholder(this.endAttributes(attrs))];
    }

    do {
      const argAttrs = this.startAttributes();
      let name: Node | null = null;

      // Named argument: name: value (also allows semi-reserved keywords as names)
      if ((this.is(T.T_STRING) || this.isSemiReservedKeyword()) && this.lookAhead(':'.charCodeAt(0))) {
        const nameToken = this.advance();
        this.expect(':'.charCodeAt(0));
        name = new Identifier(nameToken.text);
      }

      let byRef = false;
      if (this.eat('&'.charCodeAt(0)) || this.eat(T.T_AMPERSAND_FOLLOWED_BY_VAR_OR_VARARG) || this.eat(T.T_AMPERSAND_NOT_FOLLOWED_BY_VAR_OR_VARARG)) {
        byRef = true;
      }

      const unpack = !!this.eat(T.T_ELLIPSIS);
      const value = this.parseExpression();
      args.push(new Arg(value, byRef, unpack, this.endAttributes(argAttrs), name));
    } while (this.eat(','.charCodeAt(0)) && !this.is(')'.charCodeAt(0)));

    return args;
  }

  private parseNew(): Node {
    const attrs = this.startAttributes();
    this.expect(T.T_NEW);
    if (this.is(T.T_CLASS)) {
      // Anonymous class: new class(args) extends Foo implements Bar { ... }
      return this.parseAnonymousClass(attrs);
    }
    if (this.is(T.T_READONLY) && this.lookAhead(T.T_CLASS)) {
      // Readonly anonymous class: new readonly class {}
      return this.parseAnonymousClass(attrs, Modifiers.READONLY);
    }
    const classRef = this.parseNewClassName();
    let args: Node[] = [];
    if (this.eat('('.charCodeAt(0))) {
      args = this.parseArgumentList();
      this.expect(')'.charCodeAt(0));
    }
    return new New_(classRef, args, this.endAttributes(attrs));
  }

  private parseNewClassName(): Node {
    if (this.is(T.T_STATIC)) {
      const attrs = this.startAttributes();
      this.advance();
      return new Name('static', this.endAttributes(attrs));
    }
    if (this.is('('.charCodeAt(0))) {
      // Parenthesized expression: new ('Foo' . $bar)
      this.advance();
      const expr = this.parseExpression();
      this.expect(')'.charCodeAt(0));
      return expr;
    }
    if (this.is(T.T_VARIABLE)) {
      // Dynamic class: new $a, new $a->b, new $a['b'], new $a::$b
      let node: Node = this.parseCallableVariable();
      // Handle property access, array access, static property chains
      while (true) {
        if (this.is(T.T_OBJECT_OPERATOR)) {
          this.advance();
          const prop = this.parseMemberName();
          node = new PropertyFetch(node, prop, node.getAttributes());
        } else if (this.is(T.T_NULLSAFE_OBJECT_OPERATOR)) {
          this.advance();
          const prop = this.parseMemberName();
          node = new NullsafePropertyFetch(node, prop, node.getAttributes());
        } else if (this.is('['.charCodeAt(0))) {
          this.advance();
          const dim = this.parseExpression();
          this.expect(']'.charCodeAt(0));
          node = new ArrayDimFetch(node, dim, node.getAttributes());
        } else if (this.is(T.T_DOUBLE_COLON) && this.lookAhead(T.T_VARIABLE)) {
          this.advance();
          const prop = this.parseStaticPropertyName();
          node = new StaticPropertyFetch(node, prop, node.getAttributes());
        } else {
          break;
        }
      }
      return node;
    }
    const name = this.parseName();
    // Handle Name::$var
    if (this.is(T.T_DOUBLE_COLON)) {
      this.advance();
      const prop = this.parseStaticPropertyName();
      return new StaticPropertyFetch(name, prop, name.getAttributes());
    }
    return name;
  }

  private parseAnonymousClass(newAttrs: Record<string, any>, flags: number = 0): Node {
    if (flags & Modifiers.READONLY) {
      this.expect(T.T_READONLY);
    }
    this.expect(T.T_CLASS);
    // Parse constructor arguments (before extends/implements)
    let args: Node[] = [];
    if (this.eat('('.charCodeAt(0))) {
      if (!this.is(')'.charCodeAt(0))) {
        args = this.parseArgumentList();
      }
      this.expect(')'.charCodeAt(0));
    }
    let extendsNode: Node | null = null;
    if (this.eat(T.T_EXTENDS)) {
      extendsNode = this.parseName();
    }
    const implementsNodes: Node[] = [];
    if (this.eat(T.T_IMPLEMENTS)) {
      do {
        implementsNodes.push(this.parseName());
      } while (this.eat(','.charCodeAt(0)));
    }
    this.expect('{'.charCodeAt(0));
    const stmts = this.parseClassBody();
    this.expect('}'.charCodeAt(0));
    const classNode = new StmtClass_(null, { flags, extends: extendsNode, implements: implementsNodes, stmts }, this.endAttributes(newAttrs));
    return new New_(classNode, args, this.endAttributes(newAttrs));
  }

  private parseArrayLong(): Node {
    const attrs = this.startAttributes();
    this.expect(T.T_ARRAY);
    this.expect('('.charCodeAt(0));
    const items = this.parseArrayItemList(')'.charCodeAt(0));
    this.expect(')'.charCodeAt(0));
    return new ExprArray_(items, this.endAttributes(attrs));
  }

  private parseArrayShort(): Node {
    const attrs = this.startAttributes();
    this.expect('['.charCodeAt(0));
    const items = this.parseArrayItemList(']'.charCodeAt(0));
    this.expect(']'.charCodeAt(0));
    return new ExprArray_(items, this.endAttributes(attrs));
  }

  private parseArrayItemList(endToken: number): Node[] {
    const items: Node[] = [];
    if (this.is(endToken)) return items;
    do {
      if (this.is(endToken)) break;
      // Empty element (e.g., [, $a] or [$a, , $b])
      if (this.is(','.charCodeAt(0))) {
        items.push(null as any);
        continue;
      }
      const iAttrs = this.startAttributes();
      const unpack = !!this.eat(T.T_ELLIPSIS);
      let byRef = !unpack && (!!this.eat('&'.charCodeAt(0)) || !!this.eat(T.T_AMPERSAND_FOLLOWED_BY_VAR_OR_VARARG) || !!this.eat(T.T_AMPERSAND_NOT_FOLLOWED_BY_VAR_OR_VARARG));
      let value = this.parseExpression();
      let key: Node | null = null;
      if (this.eat(T.T_DOUBLE_ARROW)) {
        key = value;
        byRef = !!this.eat('&'.charCodeAt(0)) || !!this.eat(T.T_AMPERSAND_FOLLOWED_BY_VAR_OR_VARARG) || !!this.eat(T.T_AMPERSAND_NOT_FOLLOWED_BY_VAR_OR_VARARG);
        value = this.parseExpression();
      }
      items.push(new ArrayItem(value, key, byRef, this.endAttributes(iAttrs), unpack));
    } while (this.eat(','.charCodeAt(0)));

    return items;
  }

  private parseList(): Node {
    const attrs = this.startAttributes();
    this.expect(T.T_LIST);
    this.expect('('.charCodeAt(0));
    const items = this.parseListItems();
    this.expect(')'.charCodeAt(0));
    return new List_(items, this.endAttributes(attrs));
  }

  private parseListItems(): Node[] {
    const items: Node[] = [];
    do {
      if (this.is(')'.charCodeAt(0))) break;
      const iAttrs = this.startAttributes();
      if (this.is(','.charCodeAt(0))) {
        items.push(null as any);
        continue;
      }
      let byRef = !!this.eat('&'.charCodeAt(0)) || !!this.eat(T.T_AMPERSAND_FOLLOWED_BY_VAR_OR_VARARG) || !!this.eat(T.T_AMPERSAND_NOT_FOLLOWED_BY_VAR_OR_VARARG);
      let value = this.parseExpression();
      let key: Node | null = null;
      if (this.eat(T.T_DOUBLE_ARROW)) {
        key = value;
        byRef = !!this.eat('&'.charCodeAt(0)) || !!this.eat(T.T_AMPERSAND_FOLLOWED_BY_VAR_OR_VARARG) || !!this.eat(T.T_AMPERSAND_NOT_FOLLOWED_BY_VAR_OR_VARARG);
        value = this.parseExpression();
      }
      items.push(new ArrayItem(value, key, byRef, this.endAttributes(iAttrs)));
    } while (this.eat(','.charCodeAt(0)));
    return items;
  }

  private parseClosure(attrGroups: Node[] = []): Node {
    const attrs = this.startAttributes();
    const isStatic = false;
    this.expect(T.T_FUNCTION);
    const byRef = !!this.eat('&'.charCodeAt(0)) || !!this.eat(T.T_AMPERSAND_FOLLOWED_BY_VAR_OR_VARARG) || !!this.eat(T.T_AMPERSAND_NOT_FOLLOWED_BY_VAR_OR_VARARG);
    this.expect('('.charCodeAt(0));
    const params = this.parseParameterList();
    this.expect(')'.charCodeAt(0));
    const uses = this.parseClosureUses();
    const returnType = this.parseOptionalReturnType();
    this.expect('{'.charCodeAt(0));
    const stmts = this.parseInnerStatements('}'.charCodeAt(0));
    this.expect('}'.charCodeAt(0));
    return new Closure({ static: isStatic, byRef, params, uses, returnType, stmts, attrGroups }, this.endAttributes(attrs));
  }

  private parseStaticClosure(attrGroups: Node[] = []): Node {
    const attrs = this.startAttributes();
    this.expect(T.T_STATIC);
    if (this.is(T.T_FN)) {
      return this.parseArrowFunctionInner(true, attrs, attrGroups);
    }
    this.expect(T.T_FUNCTION);
    const byRef = !!this.eat('&'.charCodeAt(0)) || !!this.eat(T.T_AMPERSAND_FOLLOWED_BY_VAR_OR_VARARG) || !!this.eat(T.T_AMPERSAND_NOT_FOLLOWED_BY_VAR_OR_VARARG);
    this.expect('('.charCodeAt(0));
    const params = this.parseParameterList();
    this.expect(')'.charCodeAt(0));
    const uses = this.parseClosureUses();
    const returnType = this.parseOptionalReturnType();
    this.expect('{'.charCodeAt(0));
    const stmts = this.parseInnerStatements('}'.charCodeAt(0));
    this.expect('}'.charCodeAt(0));
    return new Closure({ static: true, byRef, params, uses, returnType, stmts, attrGroups }, this.endAttributes(attrs));
  }

  private parseStaticRef(): Node {
    const attrs = this.startAttributes();
    this.advance();
    return new Name('static', this.endAttributes(attrs));
  }

  private parseClosureUses(): Node[] {
    if (!this.eat(T.T_USE)) return [];
    this.expect('('.charCodeAt(0));
    const uses: Node[] = [];
    do {
      if (this.is(')'.charCodeAt(0))) break; // trailing comma
      const uAttrs = this.startAttributes();
      const byRef = !!this.eat('&'.charCodeAt(0)) || !!this.eat(T.T_AMPERSAND_FOLLOWED_BY_VAR_OR_VARARG) || !!this.eat(T.T_AMPERSAND_NOT_FOLLOWED_BY_VAR_OR_VARARG);
      const varNode = this.parseSimpleVariable();
      uses.push(new ClosureUse(varNode, byRef, this.endAttributes(uAttrs)));
    } while (this.eat(','.charCodeAt(0)));
    this.expect(')'.charCodeAt(0));
    return uses;
  }

  private parseArrowFunction(attrGroups: Node[] = []): Node {
    const attrs = this.startAttributes();
    return this.parseArrowFunctionInner(false, attrs, attrGroups);
  }

  private parseArrowFunctionInner(isStatic: boolean, attrs: Record<string, any>, attrGroups: Node[] = []): Node {
    this.expect(T.T_FN);
    const byRef = !!this.eat('&'.charCodeAt(0)) || !!this.eat(T.T_AMPERSAND_FOLLOWED_BY_VAR_OR_VARARG) || !!this.eat(T.T_AMPERSAND_NOT_FOLLOWED_BY_VAR_OR_VARARG);
    this.expect('('.charCodeAt(0));
    const params = this.parseParameterList();
    this.expect(')'.charCodeAt(0));
    const returnType = this.parseOptionalReturnType();
    this.expect(T.T_DOUBLE_ARROW);
    const body = this.parseExpression();
    return new ArrowFunction({ static: isStatic, byRef, params, returnType, expr: body, attrGroups }, this.endAttributes(attrs));
  }

  private parseYield(): Node {
    const attrs = this.startAttributes();
    this.expect(T.T_YIELD);
    let key: Node | null = null;
    let value: Node | null = null;
    if (this.canStartExpression()) {
      // yield binds at assignment level - doesn't consume and/or/xor
      value = this.parseExpression(4);
      if (this.eat(T.T_DOUBLE_ARROW)) {
        key = value;
        value = this.parseExpression(4);
      }
    }
    return new Yield_(value, key, this.endAttributes(attrs));
  }

  private parseYieldFrom(): Node {
    const attrs = this.startAttributes();
    this.advance();
    // yield from binds at assignment level
    const expr = this.parseExpression(4);
    return new YieldFrom(expr, this.endAttributes(attrs));
  }

  private parseInclude(): Node {
    const attrs = this.startAttributes();
    const token = this.advance();
    const expr = this.parseExpression();
    let type: number;
    switch (token.id) {
      case T.T_INCLUDE: type = 1; break;
      case T.T_INCLUDE_ONCE: type = 2; break;
      case T.T_REQUIRE: type = 3; break;
      case T.T_REQUIRE_ONCE: type = 4; break;
      default: type = 1;
    }
    return new Include_(expr, type, this.endAttributes(attrs));
  }

  private parseMatch(): Node {
    const attrs = this.startAttributes();
    this.expect(T.T_MATCH);
    this.expect('('.charCodeAt(0));
    const cond = this.parseExpression();
    this.expect(')'.charCodeAt(0));
    this.expect('{'.charCodeAt(0));
    const arms: Node[] = [];
    while (!this.is('}'.charCodeAt(0))) {
      const aAttrs = this.startAttributes();
      let conds: Node[] | null = null;
      if (!this.eat(T.T_DEFAULT)) {
        conds = [];
        do {
          if (this.is(T.T_DOUBLE_ARROW)) break; // trailing comma
          conds.push(this.parseExpression());
        } while (this.eat(','.charCodeAt(0)));
      } else {
        this.eat(','.charCodeAt(0)); // optional trailing comma after default
      }
      this.expect(T.T_DOUBLE_ARROW);
      const body = this.parseExpression();
      arms.push(new MatchArm(conds, body, this.endAttributes(aAttrs)));
      if (!this.eat(','.charCodeAt(0))) break;
    }
    this.expect('}'.charCodeAt(0));
    return new Match_(cond, arms, this.endAttributes(attrs));
  }

  private parseShellExec(): Node {
    const attrs = this.startAttributes();
    this.expect('`'.charCodeAt(0));
    const savedQuote = this.encapsedQuoteChar;
    this.encapsedQuoteChar = '`';
    const parts: Node[] = [];
    while (!this.is('`'.charCodeAt(0)) && !this.is(0)) {
      const part = this.parseEncapsedPart();
      if (part) {
        parts.push(part);
      } else {
        this.advance();
      }
    }
    this.expect('`'.charCodeAt(0));
    this.encapsedQuoteChar = savedQuote;
    return new ShellExec(parts, this.endAttributes(attrs));
  }

  private parseDollarOpenCurlyBraces(): Node {
    // Handle ${name} and ${expr} syntax
    this.advance(); // consume T_DOLLAR_OPEN_CURLY_BRACES
    if (this.is(T.T_STRING_VARNAME)) {
      const token = this.advance();
      const varNode = new Variable(token.text, { startLine: token.line, endLine: token.line });
      // Check for ${name[expr]} array access
      if (this.is('['.charCodeAt(0))) {
        this.advance();
        const dim = this.parseExpression();
        this.expect(']'.charCodeAt(0));
        this.expect('}'.charCodeAt(0));
        return new ArrayDimFetch(varNode, dim, varNode.getAttributes());
      }
      this.expect('}'.charCodeAt(0));
      return varNode;
    }
    const expr = this.parseExpression();
    this.expect('}'.charCodeAt(0));
    return new Variable(expr, expr.getAttributes());
  }

  private processDoubleQuotedEscapes(s: string, quoteChar: string = '"'): string {
    let result = '';
    for (let i = 0; i < s.length; i++) {
      if (s[i] === '\\' && i + 1 < s.length) {
        const next = s[i + 1];
        switch (next) {
          case 'n': result += '\n'; i++; continue;
          case 'r': result += '\r'; i++; continue;
          case 't': result += '\t'; i++; continue;
          case 'v': result += '\v'; i++; continue;
          case 'e': result += '\x1B'; i++; continue;
          case 'f': result += '\f'; i++; continue;
          case '\\': result += '\\'; i++; continue;
          case '$': result += '$'; i++; continue;
          case '"': if (quoteChar === '"') { result += '"'; i++; continue; } break;
          case '`': if (quoteChar === '`') { result += '`'; i++; continue; } break;
          case 'x': case 'X': {
            const hexMatch = s.substring(i + 2).match(/^[0-9a-fA-F]{1,2}/);
            if (hexMatch) {
              result += String.fromCharCode(parseInt(hexMatch[0], 16));
              i += 1 + hexMatch[0].length;
              continue;
            }
            break;
          }
          case 'u': {
            if (s[i + 2] === '{') {
              const end = s.indexOf('}', i + 3);
              if (end !== -1) {
                const hex = s.substring(i + 3, end);
                result += String.fromCodePoint(parseInt(hex, 16));
                i = end;
                continue;
              }
            }
            break;
          }
          default: {
            if (next >= '0' && next <= '7') {
              const octMatch = s.substring(i + 1).match(/^[0-7]{1,3}/);
              if (octMatch) {
                result += String.fromCharCode(parseInt(octMatch[0], 8));
                i += octMatch[0].length;
                continue;
              }
            }
          }
        }
      }
      result += s[i];
    }
    return result;
  }

  private parseEncapsedPart(): Node | null {
    if (this.is(T.T_ENCAPSED_AND_WHITESPACE)) {
      const token = this.advance();
      return new InterpolatedStringPart(this.processDoubleQuotedEscapes(token.text, this.encapsedQuoteChar));
    } else if (this.is(T.T_VARIABLE)) {
      let node: Node = this.parseSimpleVariable();
      // Handle $var->prop and $var?->prop in encapsed strings
      if (this.is(T.T_OBJECT_OPERATOR)) {
        this.advance();
        const prop = new Identifier(this.expect(T.T_STRING).text);
        node = new PropertyFetch(node, prop, node.getAttributes());
      } else if (this.is(T.T_NULLSAFE_OBJECT_OPERATOR)) {
        this.advance();
        const prop = new Identifier(this.expect(T.T_STRING).text);
        node = new NullsafePropertyFetch(node, prop, node.getAttributes());
      }
      // Handle $var[expr] array access in encapsed strings
      if (this.is('['.charCodeAt(0))) {
        this.advance();
        let dim: Node | null = null;
        if (this.is(T.T_STRING)) {
          // String key (bareword)
          dim = new ScalarString(this.advance().text, {});
        } else if (this.is(T.T_VARIABLE)) {
          dim = this.parseSimpleVariable();
        } else if (this.is(T.T_LNUMBER)) {
          dim = new ScalarInt_(parseInt(this.advance().text, 10), {});
        } else if (this.is(T.T_NUM_STRING)) {
          const numText = this.advance().text;
          if (/^(0|[1-9][0-9]*)$/.test(numText) && numText.length < 19) {
            dim = new ScalarInt_(parseInt(numText, 10), {});
          } else {
            dim = new ScalarString(numText, {});
          }
        } else if (this.is('-'.charCodeAt(0))) {
          this.advance();
          if (this.is(T.T_NUM_STRING)) {
            const numText = this.advance().text;
            if (/^[1-9][0-9]*$/.test(numText) && numText.length < 19) {
              dim = new ScalarInt_(-parseInt(numText, 10), {});
            } else {
              dim = new ScalarString('-' + numText, {});
            }
          } else if (this.is(T.T_LNUMBER)) {
            dim = new UnaryMinus(new ScalarInt_(parseInt(this.advance().text, 10), {}), {});
          }
        }
        this.expect(']'.charCodeAt(0));
        node = new ArrayDimFetch(node, dim, node.getAttributes());
      }
      return node;
    } else if (this.is(T.T_CURLY_OPEN)) {
      this.advance();
      const expr = this.parseExpression();
      this.expect('}'.charCodeAt(0));
      return expr;
    } else if (this.is(T.T_DOLLAR_OPEN_CURLY_BRACES)) {
      return this.parseDollarOpenCurlyBraces();
    }
    return null;
  }

  private parseInterpolatedString(): Node {
    const attrs = this.startAttributes();
    this.expect('"'.charCodeAt(0));
    const parts: Node[] = [];
    while (!this.is('"'.charCodeAt(0)) && !this.is(0)) {
      const part = this.parseEncapsedPart();
      if (part) {
        parts.push(part);
      } else {
        this.advance();
      }
    }
    this.expect('"'.charCodeAt(0));
    return new InterpolatedString(parts, this.endAttributes(attrs));
  }

  private parseHeredoc(): Node {
    const attrs = this.startAttributes();
    const startToken = this.advance(); // T_START_HEREDOC
    const isNowdoc = startToken.text.includes("'");
    const parts: Node[] = [];

    while (!this.is(T.T_END_HEREDOC) && !this.is(0)) {
      if (isNowdoc && this.is(T.T_ENCAPSED_AND_WHITESPACE)) {
        // Nowdoc: no escape processing
        const token = this.advance();
        parts.push(new InterpolatedStringPart(token.text));
      } else {
        const part = this.parseEncapsedPart();
        if (part) {
          parts.push(part);
        } else {
          this.advance();
        }
      }
    }

    // Get indentation from end label for flexible heredoc
    const endToken = this.current();
    const endLabel = endToken?.text || '';
    const indentMatch = endLabel.match(/^([ \t]+)/);
    const indent = indentMatch ? indentMatch[1] : '';

    this.expect(T.T_END_HEREDOC);

    // Strip trailing newline from last part (the newline before the closing label)
    if (parts.length > 0) {
      const last = parts[parts.length - 1];
      if (last.getType() === 'InterpolatedStringPart') {
        let val = (last as any).value;
        if (val.endsWith('\n')) val = val.slice(0, -1);
        if (val === '') {
          parts.pop(); // Remove empty trailing part
        } else {
          (last as any).value = val;
        }
      }
    }

    // Strip indentation if flexible heredoc
    if (indent) {
      for (const part of parts) {
        if (part.getType() === 'InterpolatedStringPart') {
          const val = (part as any).value;
          (part as any).value = val.split('\n').map((line: string) => {
            if (line.startsWith(indent)) return line.substring(indent.length);
            return line;
          }).join('\n');
        }
      }
    }

    const kind = isNowdoc ? 4 : 3; // KIND_NOWDOC=4, KIND_HEREDOC=3

    if (parts.length === 1 && parts[0].getType() === 'InterpolatedStringPart') {
      return new ScalarString((parts[0] as any).value, {
        ...this.endAttributes(attrs),
        kind,
      });
    }

    if (parts.length === 0) {
      return new ScalarString('', {
        ...this.endAttributes(attrs),
        kind,
      });
    }
    return new InterpolatedString(parts, {
      ...this.endAttributes(attrs),
      kind,
    });
  }
}
