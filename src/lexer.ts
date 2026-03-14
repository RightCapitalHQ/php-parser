import { Token } from './token';
import { PhpParserError } from './error';
import { ErrorHandler, ThrowingErrorHandler } from './errorHandler';
import * as T from './phpToken';

export class Lexer {
  tokenize(code: string, errorHandler?: ErrorHandler): Token[] {
    if (!errorHandler) {
      errorHandler = new ThrowingErrorHandler();
    }
    const tokens = phpTokenize(code, errorHandler);
    this.postprocessTokens(tokens, errorHandler);
    return tokens;
  }

  private handleInvalidCharacter(token: Token, errorHandler: ErrorHandler): void {
    const chr = token.text;
    let errorMsg: string;
    if (chr === '\0') {
      errorMsg = 'Unexpected null byte';
    } else {
      errorMsg = `Unexpected character "${chr}" (ASCII ${chr.charCodeAt(0)})`;
    }
    errorHandler.handleError(new PhpParserError(errorMsg, {
      startLine: token.line,
      endLine: token.line,
      startFilePos: token.pos,
      endFilePos: token.pos,
    }));
  }

  private isUnterminatedComment(token: Token): boolean {
    return token.is([T.T_COMMENT, T.T_DOC_COMMENT])
      && token.text.substring(0, 2) === '/*'
      && token.text.substring(token.text.length - 2) !== '*/';
  }

  protected postprocessTokens(tokens: Token[], errorHandler: ErrorHandler): void {
    const numTokens = tokens.length;
    if (numTokens === 0) {
      tokens.push(new Token(0, '\0', 1, 0));
      return;
    }

    for (let i = 0; i < numTokens; i++) {
      const token = tokens[i];
      if (token.id === T.T_BAD_CHARACTER) {
        this.handleInvalidCharacter(token, errorHandler);
      }

      if (token.id === '&'.charCodeAt(0)) {
        let next = i + 1;
        while (next < tokens.length && tokens[next].id === T.T_WHITESPACE) {
          next++;
        }
        const followedByVarOrVarArg = next < tokens.length &&
          tokens[next].is([T.T_VARIABLE, T.T_ELLIPSIS]);
        token.id = followedByVarOrVarArg
          ? T.T_AMPERSAND_FOLLOWED_BY_VAR_OR_VARARG
          : T.T_AMPERSAND_NOT_FOLLOWED_BY_VAR_OR_VARARG;
      }
    }

    const lastToken = tokens[numTokens - 1];
    if (this.isUnterminatedComment(lastToken)) {
      errorHandler.handleError(new PhpParserError('Unterminated comment', {
        startLine: lastToken.line,
        endLine: lastToken.getEndLine(),
        startFilePos: lastToken.pos,
        endFilePos: lastToken.getEndPos(),
      }));
    }

    tokens.push(new Token(0, '\0', lastToken.getEndLine(), lastToken.getEndPos()));
  }
}

// Pure TypeScript PHP tokenizer
function phpTokenize(code: string, errorHandler: ErrorHandler): Token[] {
  const tokenizer = new PhpTokenizer(code, errorHandler);
  return tokenizer.tokenize();
}

const enum LexerState {
  INITIAL,
  IN_SCRIPTING,
  IN_DOUBLE_QUOTED_STRING,
  IN_SINGLE_QUOTED_STRING,
  IN_HEREDOC,
  IN_NOWDOC,
  IN_BACKTICK,
  LOOKING_FOR_PROPERTY,
  LOOKING_FOR_VARNAME,
  VAR_OFFSET,
}

class PhpTokenizer {
  private code: string;
  private pos: number = 0;
  private line: number = 1;
  private tokens: Token[] = [];
  private stateStack: LexerState[] = [LexerState.INITIAL];
  private heredocLabel: string = '';
  private heredocIndentation: number = 0;
  private heredocContainsIndentation: boolean = false;
  private errorHandler: ErrorHandler;

  constructor(code: string, errorHandler: ErrorHandler) {
    this.code = code;
    this.errorHandler = errorHandler;
  }

  private get state(): LexerState {
    return this.stateStack[this.stateStack.length - 1];
  }

  private pushState(state: LexerState): void {
    this.stateStack.push(state);
  }

  private popState(): void {
    if (this.stateStack.length > 1) {
      this.stateStack.pop();
    }
  }

  private setState(state: LexerState): void {
    this.stateStack[this.stateStack.length - 1] = state;
  }

  private peek(offset: number = 0): string {
    return this.code[this.pos + offset] ?? '';
  }

  private remaining(): string {
    return this.code.substring(this.pos);
  }

  private isIntOverflow(str: string): boolean {
    const clean = str.replace(/_/g, '');
    // PHP_INT_MAX = 9223372036854775807 (2^63-1)
    // Parse via BigInt to detect overflow
    try {
      let val: bigint;
      if (clean.startsWith('0x') || clean.startsWith('0X')) {
        val = BigInt('0x' + clean.substring(2));
      } else if (clean.startsWith('0b') || clean.startsWith('0B')) {
        val = BigInt('0b' + clean.substring(2));
      } else if (clean.startsWith('0o') || clean.startsWith('0O')) {
        val = BigInt('0o' + clean.substring(2));
      } else if (clean.startsWith('0') && clean.length > 1 && !/[89]/.test(clean)) {
        val = BigInt('0o' + clean.substring(1));
      } else {
        val = BigInt(clean);
      }
      return val > 9223372036854775807n;
    } catch {
      return false;
    }
  }

  private addToken(id: number, text: string): void {
    this.tokens.push(new Token(id, text, this.line, this.pos));
    for (let i = 0; i < text.length; i++) {
      if (text[i] === '\n') this.line++;
    }
    this.pos += text.length;
  }

  private isEof(): boolean {
    return this.pos >= this.code.length;
  }

  tokenize(): Token[] {
    while (!this.isEof()) {
      switch (this.state) {
        case LexerState.INITIAL:
          this.lexInitial();
          break;
        case LexerState.IN_SCRIPTING:
          this.lexScripting();
          break;
        case LexerState.IN_DOUBLE_QUOTED_STRING:
          this.lexDoubleQuotedString();
          break;
        case LexerState.IN_SINGLE_QUOTED_STRING:
          this.lexSingleQuotedString();
          break;
        case LexerState.IN_HEREDOC:
          this.lexHeredoc();
          break;
        case LexerState.IN_NOWDOC:
          this.lexNowdoc();
          break;
        case LexerState.IN_BACKTICK:
          this.lexBacktick();
          break;
        case LexerState.LOOKING_FOR_PROPERTY:
          this.lexLookingForProperty();
          break;
        case LexerState.LOOKING_FOR_VARNAME:
          this.lexLookingForVarname();
          break;
        case LexerState.VAR_OFFSET:
          this.lexVarOffset();
          break;
      }
    }
    return this.tokens;
  }

  private lexInitial(): void {
    const rest = this.remaining();

    // Look for <?php or <?= or <?
    const openTagMatch = rest.match(/^<\?(?:php(?:\s|$)|\=|\s)/i);
    if (openTagMatch) {
      if (this.pos > 0 || !openTagMatch) {
        // Inline HTML before open tag
        const htmlEnd = this.code.indexOf('<?', this.pos);
        if (htmlEnd === -1) {
          this.addToken(T.T_INLINE_HTML, rest);
          return;
        }
        if (htmlEnd > this.pos) {
          this.addToken(T.T_INLINE_HTML, this.code.substring(this.pos, htmlEnd));
          return;
        }
      }

      if (rest.startsWith('<?=')) {
        this.addToken(T.T_OPEN_TAG_WITH_ECHO, '<?=');
        this.setState(LexerState.IN_SCRIPTING);
        return;
      }

      const phpMatch = rest.match(/^<\?php(?:\s|$)/i);
      if (phpMatch) {
        // Match the open tag including one whitespace character
        const tagText = rest.match(/^<\?php(?:[ \t\n\r]|$)/i)!;
        this.addToken(T.T_OPEN_TAG, tagText[0]);
        this.setState(LexerState.IN_SCRIPTING);
        return;
      }
    }

    // All inline HTML
    const phpOpen = this.code.indexOf('<?', this.pos);
    if (phpOpen === -1) {
      this.addToken(T.T_INLINE_HTML, rest);
    } else if (phpOpen === this.pos) {
      // Short open tag <? without php
      this.addToken(T.T_OPEN_TAG, '<?');
      this.setState(LexerState.IN_SCRIPTING);
    } else {
      this.addToken(T.T_INLINE_HTML, this.code.substring(this.pos, phpOpen));
    }
  }

  private lexScripting(): void {
    this.skipWhitespace();
    if (this.isEof()) return;

    const rest = this.remaining();
    const ch = this.peek();

    // Close tag ?>
    if (rest.startsWith('?>')) {
      const closeTag = rest.startsWith('?>\n') ? '?>\n' : rest.startsWith('?>\r\n') ? '?>\r\n' : '?>';
      this.addToken(T.T_CLOSE_TAG, closeTag);
      this.setState(LexerState.INITIAL);
      return;
    }

    // Variable $foo
    if (ch === '$' && this.isIdentStart(this.peek(1))) {
      const match = rest.match(/^\$[a-zA-Z_\x80-\xff][a-zA-Z0-9_\x80-\xff]*/);
      if (match) {
        this.addToken(T.T_VARIABLE, match[0]);
        return;
      }
    }

    // Numbers
    if (this.isDigit(ch) || (ch === '.' && this.isDigit(this.peek(1)))) {
      this.lexNumber();
      return;
    }

    // Binary string prefix b"..." and b'...' and b<<<HEREDOC (must be before identifier check)
    if ((ch === 'b' || ch === 'B') && rest.length > 1) {
      if (rest[1] === '"') {
        this.lexDoubleQuotedStringStart(ch);
        return;
      }
      if (rest[1] === "'") {
        this.lexSingleQuotedStringFull(ch);
        return;
      }
      if (rest.startsWith('<<<', 1)) {
        this.lexHeredocStart();
        return;
      }
    }

    // Identifiers and keywords
    if (this.isIdentStart(ch)) {
      const match = rest.match(/^[a-zA-Z_\x80-\xff][a-zA-Z0-9_\x80-\xff]*/);
      if (match) {
        const word = match[0];
        const lower = word.toLowerCase();

        // Check for yield from
        if (lower === 'yield') {
          const afterYield = this.code.substring(this.pos + word.length);
          const yieldFromMatch = afterYield.match(/^([ \t\n\r]+)from(?![a-zA-Z0-9_\x80-\xff])/);
          if (yieldFromMatch) {
            this.addToken(T.T_YIELD_FROM, word + yieldFromMatch[0]);
            return;
          }
        }

        // Check for namespace-qualified names
        const nsMatch = rest.match(/^[a-zA-Z_\x80-\xff][a-zA-Z0-9_\x80-\xff]*(?:\\[a-zA-Z_\x80-\xff][a-zA-Z0-9_\x80-\xff]*)*/);
        if (nsMatch && nsMatch[0].includes('\\')) {
          // Check for namespace\Name
          if (lower === 'namespace' && nsMatch[0].includes('\\')) {
            this.addToken(T.T_NAME_RELATIVE, nsMatch[0]);
            return;
          }
          this.addToken(T.T_NAME_QUALIFIED, nsMatch[0]);
          return;
        }

        // Keyword lookup
        const tokenId = T.keywords[lower];
        if (tokenId !== undefined) {
          this.addToken(tokenId, word);
          return;
        }

        this.addToken(T.T_STRING, word);
        return;
      }
    }

    // Fully qualified name
    if (ch === '\\') {
      const nsMatch = rest.match(/^\\[a-zA-Z_\x80-\xff][a-zA-Z0-9_\x80-\xff]*(?:\\[a-zA-Z_\x80-\xff][a-zA-Z0-9_\x80-\xff]*)*/);
      if (nsMatch) {
        this.addToken(T.T_NAME_FULLY_QUALIFIED, nsMatch[0]);
        return;
      }
    }

    // String literals
    if (ch === '"') {
      this.lexDoubleQuotedStringStart();
      return;
    }
    if (ch === "'") {
      this.lexSingleQuotedStringFull();
      return;
    }

    // Backtick
    if (ch === '`') {
      this.addToken('`'.charCodeAt(0), '`');
      this.pushState(LexerState.IN_BACKTICK);
      return;
    }

    // Heredoc/Nowdoc (optionally prefixed with b/B for binary)
    if (rest.startsWith('<<<') || ((rest[0] === 'b' || rest[0] === 'B') && rest.startsWith('<<<', 1))) {
      this.lexHeredocStart();
      return;
    }

    // Multi-character operators
    if (this.lexOperator()) return;

    // Comments
    // Attribute #[ (must be checked before # line comment)
    if (rest.startsWith('#[')) {
      this.addToken(T.T_ATTRIBUTE, '#[');
      return;
    }

    if (rest.startsWith('//') || rest.startsWith('#')) {
      this.lexLineComment();
      return;
    }
    if (rest.startsWith('/*')) {
      this.lexBlockComment();
      return;
    }

    // Handle closing brace - pop state if we're in a nested scripting context
    // (e.g., inside {$var} in a double-quoted string)
    if (ch === '}' && this.stateStack.length > 1) {
      this.addToken(ch.charCodeAt(0), ch);
      this.popState();
      return;
    }

    // Single character tokens
    this.addToken(ch.charCodeAt(0), ch);
  }

  private skipWhitespace(): void {
    const rest = this.remaining();
    const match = rest.match(/^[ \t\n\r]+/);
    if (match) {
      this.addToken(T.T_WHITESPACE, match[0]);
    }
  }

  private isDigit(ch: string): boolean {
    return ch >= '0' && ch <= '9';
  }

  private isIdentStart(ch: string): boolean {
    return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || ch === '_'
      || (ch.charCodeAt(0) >= 0x80 && ch.charCodeAt(0) <= 0xff);
  }

  private lexNumber(): void {
    const rest = this.remaining();

    // Hex
    let match = rest.match(/^0[xX][0-9a-fA-F]+(?:_[0-9a-fA-F]+)*/);
    if (match) {
      this.addToken(this.isIntOverflow(match[0]) ? T.T_DNUMBER : T.T_LNUMBER, match[0]);
      return;
    }

    // Binary
    match = rest.match(/^0[bB][01]+(?:_[01]+)*/);
    if (match) {
      this.addToken(this.isIntOverflow(match[0]) ? T.T_DNUMBER : T.T_LNUMBER, match[0]);
      return;
    }

    // Octal with explicit prefix
    match = rest.match(/^0[oO][0-7]+(?:_[0-7]+)*/);
    if (match) {
      this.addToken(this.isIntOverflow(match[0]) ? T.T_DNUMBER : T.T_LNUMBER, match[0]);
      return;
    }

    // Float or integer
    // Note: trailing dot without digits (e.g., "1.") and leading dot (e.g., ".5") are both valid floats
    match = rest.match(/^[0-9]+(?:_[0-9]+)*(?:\.(?:[0-9]+(?:_[0-9]+)*)?)?(?:[eE][+-]?[0-9]+(?:_[0-9]+)*)?/);
    if (match) {
      const hasDecimalOrExp = match[0].includes('.') || match[0].includes('e') || match[0].includes('E');
      this.addToken(hasDecimalOrExp || this.isIntOverflow(match[0]) ? T.T_DNUMBER : T.T_LNUMBER, match[0]);
      return;
    }

    // Float starting with .
    match = rest.match(/^\.[0-9]+(?:_[0-9]+)*(?:[eE][+-]?[0-9]+(?:_[0-9]+)*)?/);
    if (match) {
      this.addToken(T.T_DNUMBER, match[0]);
      return;
    }
  }

  private lexOperator(): boolean {
    const rest = this.remaining();

    // Three-character operators
    const three = rest.substring(0, 3);
    switch (three) {
      case '<=>': this.addToken(T.T_SPACESHIP, '<=>'); return true;
      case '===': this.addToken(T.T_IS_IDENTICAL, '==='); return true;
      case '!==': this.addToken(T.T_IS_NOT_IDENTICAL, '!=='); return true;
      case '**=': this.addToken(T.T_POW_EQUAL, '**='); return true;
      case '<<=': this.addToken(T.T_SL_EQUAL, '<<='); return true;
      case '>>=': this.addToken(T.T_SR_EQUAL, '>>='); return true;
      case '??=': this.addToken(T.T_COALESCE_EQUAL, '??='); return true;
      case '...': this.addToken(T.T_ELLIPSIS, '...'); return true;
      case '|>': /* pipe is only 2 chars, handled below */ break;
    }

    // Two-character operators
    const two = rest.substring(0, 2);
    switch (two) {
      case '++': this.addToken(T.T_INC, '++'); return true;
      case '--': this.addToken(T.T_DEC, '--'); return true;
      case '||': this.addToken(T.T_BOOLEAN_OR, '||'); return true;
      case '&&': this.addToken(T.T_BOOLEAN_AND, '&&'); return true;
      case '==': this.addToken(T.T_IS_EQUAL, '=='); return true;
      case '!=': this.addToken(T.T_IS_NOT_EQUAL, '!='); return true;
      case '<>': this.addToken(T.T_IS_NOT_EQUAL, '<>'); return true;
      case '<=': this.addToken(T.T_IS_SMALLER_OR_EQUAL, '<='); return true;
      case '>=': this.addToken(T.T_IS_GREATER_OR_EQUAL, '>='); return true;
      case '<<': this.addToken(T.T_SL, '<<'); return true;
      case '>>': this.addToken(T.T_SR, '>>'); return true;
      case '**': this.addToken(T.T_POW, '**'); return true;
      case '??': this.addToken(T.T_COALESCE, '??'); return true;
      case '::': this.addToken(T.T_DOUBLE_COLON, '::'); return true;
      case '->': this.addToken(T.T_OBJECT_OPERATOR, '->'); return true;
      case '=>': this.addToken(T.T_DOUBLE_ARROW, '=>'); return true;
      case '+=': this.addToken(T.T_PLUS_EQUAL, '+='); return true;
      case '-=': this.addToken(T.T_MINUS_EQUAL, '-='); return true;
      case '*=': this.addToken(T.T_MUL_EQUAL, '*='); return true;
      case '/=': this.addToken(T.T_DIV_EQUAL, '/='); return true;
      case '.=': this.addToken(T.T_CONCAT_EQUAL, '.='); return true;
      case '%=': this.addToken(T.T_MOD_EQUAL, '%='); return true;
      case '&=': this.addToken(T.T_AND_EQUAL, '&='); return true;
      case '|=': this.addToken(T.T_OR_EQUAL, '|='); return true;
      case '^=': this.addToken(T.T_XOR_EQUAL, '^='); return true;
      case '\\': this.addToken(T.T_NS_SEPARATOR, '\\'); return true;
      case '?-':
        if (this.peek(2) === '>') {
          this.addToken(T.T_NULLSAFE_OBJECT_OPERATOR, '?->');
          return true;
        }
        break;
      case '|>': this.addToken(T.T_PIPE, '|>'); return true;
    }

    // Cast operators
    const castMatch = rest.match(/^\(\s*(int|integer|float|double|real|string|binary|array|object|bool|boolean|unset|void)\s*\)/i);
    if (castMatch) {
      const castType = castMatch[1].toLowerCase();
      let tokenId: number;
      switch (castType) {
        case 'int': case 'integer': tokenId = T.T_INT_CAST; break;
        case 'float': case 'double': case 'real': tokenId = T.T_DOUBLE_CAST; break;
        case 'string': case 'binary': tokenId = T.T_STRING_CAST; break;
        case 'array': tokenId = T.T_ARRAY_CAST; break;
        case 'object': tokenId = T.T_OBJECT_CAST; break;
        case 'bool': case 'boolean': tokenId = T.T_BOOL_CAST; break;
        case 'unset': tokenId = T.T_UNSET_CAST; break;
        case 'void': tokenId = T.T_VOID_CAST; break;
        default: return false;
      }
      this.addToken(tokenId, castMatch[0]);
      return true;
    }

    return false;
  }

  private lexLineComment(): void {
    const rest = this.remaining();
    // Match to end of line (but not including the newline itself if followed by ?>)
    const match = rest.match(/^(?:\/\/|#(?!\[))[^\n\r]*(?:\r\n|\n|\r)?/);
    if (match) {
      // Check if comment ends with ?> - don't include the ?>
      const closingTag = match[0].indexOf('?>');
      if (closingTag !== -1) {
        this.addToken(T.T_COMMENT, match[0].substring(0, closingTag));
      } else {
        this.addToken(T.T_COMMENT, match[0]);
      }
    }
  }

  private lexBlockComment(): void {
    const rest = this.remaining();
    const end = rest.indexOf('*/', 2);
    if (end === -1) {
      // Unterminated comment
      const isDoc = rest.startsWith('/**') && rest.length > 3;
      this.addToken(isDoc ? T.T_DOC_COMMENT : T.T_COMMENT, rest);
      return;
    }
    const comment = rest.substring(0, end + 2);
    const isDoc = comment.startsWith('/**') && comment.length > 4;
    this.addToken(isDoc ? T.T_DOC_COMMENT : T.T_COMMENT, comment);
  }

  private lexDoubleQuotedStringStart(prefix: string = ''): void {
    const rest = this.remaining();
    const offset = prefix ? 1 : 0; // skip 'b' prefix if present

    // Check if the string contains any interpolation
    // Simple case: no interpolation - lex as constant encapsed string
    let i = 1 + offset; // skip prefix + opening "
    let hasInterpolation = false;
    while (i < rest.length) {
      const ch = rest[i];
      if (ch === '\\') {
        i += 2; // skip escaped char
        continue;
      }
      if (ch === '"') {
        break;
      }
      if (ch === '$' && i + 1 < rest.length && (this.isIdentStart(rest[i + 1]) || rest[i + 1] === '{')) {
        hasInterpolation = true;
        break;
      }
      if (ch === '{' && i + 1 < rest.length && rest[i + 1] === '$') {
        hasInterpolation = true;
        break;
      }
      i++;
    }

    if (!hasInterpolation) {
      // Simple string with no interpolation
      if (i < rest.length && rest[i] === '"') {
        this.addToken(T.T_CONSTANT_ENCAPSED_STRING, rest.substring(0, i + 1));
        return;
      }
      // Unterminated string
      this.addToken(T.T_CONSTANT_ENCAPSED_STRING, rest);
      return;
    }

    // Complex string with interpolation
    if (prefix) {
      this.addToken('"'.charCodeAt(0), prefix + '"');
    } else {
      this.addToken('"'.charCodeAt(0), '"');
    }
    this.pushState(LexerState.IN_DOUBLE_QUOTED_STRING);
  }

  private lexSingleQuotedStringFull(prefix: string = ''): void {
    const rest = this.remaining();
    const offset = prefix ? 1 : 0;
    let i = 1 + offset; // skip prefix + opening '
    while (i < rest.length) {
      if (rest[i] === '\\' && i + 1 < rest.length && (rest[i + 1] === '\\' || rest[i + 1] === "'")) {
        i += 2;
        continue;
      }
      if (rest[i] === "'") {
        this.addToken(T.T_CONSTANT_ENCAPSED_STRING, rest.substring(0, i + 1));
        return;
      }
      i++;
    }
    // Unterminated
    this.addToken(T.T_CONSTANT_ENCAPSED_STRING, rest);
  }

  private lexDoubleQuotedString(): void {
    const rest = this.remaining();

    if (rest[0] === '"') {
      this.addToken('"'.charCodeAt(0), '"');
      this.popState();
      return;
    }

    if (rest[0] === '$') {
      if (this.isIdentStart(rest[1] ?? '')) {
        this.lexVariable();
        return;
      }
      if (rest[1] === '{') {
        this.addToken(T.T_DOLLAR_OPEN_CURLY_BRACES, '${');
        this.pushState(LexerState.LOOKING_FOR_VARNAME);
        return;
      }
    }

    if (rest[0] === '{' && rest[1] === '$') {
      this.addToken(T.T_CURLY_OPEN, '{');
      this.pushState(LexerState.IN_SCRIPTING);
      return;
    }

    // Regular string content
    this.lexEncapsedStringContent('"');
  }

  private lexBacktick(): void {
    const rest = this.remaining();

    if (rest[0] === '`') {
      this.addToken('`'.charCodeAt(0), '`');
      this.popState();
      return;
    }

    if (rest[0] === '$') {
      if (this.isIdentStart(rest[1] ?? '')) {
        this.lexVariable();
        return;
      }
      if (rest[1] === '{') {
        this.addToken(T.T_DOLLAR_OPEN_CURLY_BRACES, '${');
        this.pushState(LexerState.LOOKING_FOR_VARNAME);
        return;
      }
    }

    if (rest[0] === '{' && rest[1] === '$') {
      this.addToken(T.T_CURLY_OPEN, '{');
      this.pushState(LexerState.IN_SCRIPTING);
      return;
    }

    this.lexEncapsedStringContent('`');
  }

  private lexVariable(): void {
    const rest = this.remaining();
    const match = rest.match(/^\$[a-zA-Z_\x80-\xff][a-zA-Z0-9_\x80-\xff]*/);
    if (match) {
      this.addToken(T.T_VARIABLE, match[0]);
      // Check for ->identifier or [
      const after = this.remaining();
      if (after.startsWith('->') && this.isIdentStart(after[2] ?? '')) {
        this.addToken(T.T_OBJECT_OPERATOR, '->');
        this.pushState(LexerState.LOOKING_FOR_PROPERTY);
        return;
      }
      if (after.startsWith('?->') && this.isIdentStart(after[3] ?? '')) {
        this.addToken(T.T_NULLSAFE_OBJECT_OPERATOR, '?->');
        this.pushState(LexerState.LOOKING_FOR_PROPERTY);
        return;
      }
      if (after[0] === '[') {
        this.addToken('['.charCodeAt(0), '[');
        this.pushState(LexerState.VAR_OFFSET);
        return;
      }
    }
  }

  private lexEncapsedStringContent(endChar: string): void {
    const rest = this.remaining();
    let i = 0;
    while (i < rest.length) {
      const ch = rest[i];
      if (ch === '\\') {
        i += 2;
        continue;
      }
      if (ch === endChar) {
        break;
      }
      if (ch === '$' && i + 1 < rest.length) {
        if (this.isIdentStart(rest[i + 1]) || rest[i + 1] === '{') {
          break;
        }
      }
      if (ch === '{' && i + 1 < rest.length && rest[i + 1] === '$') {
        break;
      }
      i++;
    }
    if (i > 0) {
      this.addToken(T.T_ENCAPSED_AND_WHITESPACE, rest.substring(0, i));
    }
  }

  private lexHeredocStart(): void {
    const rest = this.remaining();
    // Match [b]<<<LABEL or [b]<<<"LABEL" or [b]<<<'LABEL'
    const match = rest.match(/^[bB]?<<<[ \t]*(?:"([a-zA-Z_\x80-\xff][a-zA-Z0-9_\x80-\xff]*)"|'([a-zA-Z_\x80-\xff][a-zA-Z0-9_\x80-\xff]*)'|([a-zA-Z_\x80-\xff][a-zA-Z0-9_\x80-\xff]*))\r?\n/);
    if (!match) {
      this.addToken(T.T_SL, '<<');
      return;
    }

    const isNowdoc = match[2] !== undefined;
    this.heredocLabel = match[1] || match[2] || match[3];

    this.addToken(T.T_START_HEREDOC, match[0]);

    if (isNowdoc) {
      this.pushState(LexerState.IN_NOWDOC);
    } else {
      this.pushState(LexerState.IN_HEREDOC);
    }
  }

  private lexHeredoc(): void {
    const rest = this.remaining();
    const label = this.heredocLabel;

    // Check for end label
    const endPattern = new RegExp(`^([ \\t]*)${escapeRegExp(label)}(?=;?\\r?\\n|;?$)`);
    const endMatch = rest.match(endPattern);
    if (endMatch) {
      this.addToken(T.T_END_HEREDOC, endMatch[0]);
      this.popState();
      return;
    }

    if (rest[0] === '$') {
      if (this.isIdentStart(rest[1] ?? '')) {
        this.lexVariable();
        return;
      }
      if (rest[1] === '{') {
        this.addToken(T.T_DOLLAR_OPEN_CURLY_BRACES, '${');
        this.pushState(LexerState.LOOKING_FOR_VARNAME);
        return;
      }
    }

    if (rest[0] === '{' && rest[1] === '$') {
      this.addToken(T.T_CURLY_OPEN, '{');
      this.pushState(LexerState.IN_SCRIPTING);
      return;
    }

    // Regular heredoc content - read until interpolation or end label
    let i = 0;
    while (i < rest.length) {
      if (rest[i] === '\\') {
        i += 2;
        continue;
      }
      if (rest[i] === '$' && i + 1 < rest.length) {
        if (this.isIdentStart(rest[i + 1]) || rest[i + 1] === '{') {
          break;
        }
      }
      if (rest[i] === '{' && i + 1 < rest.length && rest[i + 1] === '$') {
        break;
      }
      if (rest[i] === '\n') {
        i++;
        // Check for end label after newline
        const afterNewline = rest.substring(i);
        const endMatch2 = afterNewline.match(endPattern);
        if (endMatch2) {
          break;
        }
        continue;
      }
      i++;
    }
    if (i > 0) {
      this.addToken(T.T_ENCAPSED_AND_WHITESPACE, rest.substring(0, i));
    }
  }

  private lexNowdoc(): void {
    const rest = this.remaining();
    const label = this.heredocLabel;
    const endPattern = new RegExp(`^([ \\t]*)${escapeRegExp(label)}(?=;?\\r?\\n|;?$)`, 'm');

    const endMatch = rest.match(endPattern);
    if (!endMatch) {
      // Unterminated nowdoc
      this.addToken(T.T_ENCAPSED_AND_WHITESPACE, rest);
      return;
    }

    const contentEnd = rest.indexOf(endMatch[0]);
    if (contentEnd > 0) {
      this.addToken(T.T_ENCAPSED_AND_WHITESPACE, rest.substring(0, contentEnd));
    }
    this.addToken(T.T_END_HEREDOC, endMatch[0]);
    this.popState();
  }

  private lexLookingForProperty(): void {
    const rest = this.remaining();

    // Skip whitespace
    const wsMatch = rest.match(/^[ \t\n\r]+/);
    if (wsMatch) {
      this.addToken(T.T_WHITESPACE, wsMatch[0]);
      return;
    }

    // Property name
    const identMatch = rest.match(/^[a-zA-Z_\x80-\xff][a-zA-Z0-9_\x80-\xff]*/);
    if (identMatch) {
      this.addToken(T.T_STRING, identMatch[0]);
      this.popState();
      return;
    }

    // Not a property name, pop state and re-lex
    this.popState();
  }

  private lexLookingForVarname(): void {
    const rest = this.remaining();
    const match = rest.match(/^[a-zA-Z_\x80-\xff][a-zA-Z0-9_\x80-\xff]*(?=[}\[])/);
    if (match) {
      this.addToken(T.T_STRING_VARNAME, match[0]);
      this.popState();
      this.pushState(LexerState.IN_SCRIPTING);
      return;
    }
    // Not a var name, pop and re-lex as scripting
    this.popState();
    this.pushState(LexerState.IN_SCRIPTING);
  }

  private lexVarOffset(): void {
    const rest = this.remaining();

    if (rest[0] === ']') {
      this.addToken(']'.charCodeAt(0), ']');
      this.popState();
      return;
    }

    // Integer (including hex, octal, binary)
    const numMatch = rest.match(/^0[xX][0-9a-fA-F]+|^0[bB][01]+|^0[oO][0-7]+|^[0-9]+/);
    if (numMatch) {
      this.addToken(T.T_NUM_STRING, numMatch[0]);
      return;
    }

    // Variable
    const varMatch = rest.match(/^\$[a-zA-Z_\x80-\xff][a-zA-Z0-9_\x80-\xff]*/);
    if (varMatch) {
      this.addToken(T.T_VARIABLE, varMatch[0]);
      return;
    }

    // Minus (for negative offsets)
    if (rest[0] === '-') {
      this.addToken('-'.charCodeAt(0), '-');
      return;
    }

    // Bareword identifier
    const identMatch = rest.match(/^[a-zA-Z_\x80-\xff][a-zA-Z0-9_\x80-\xff]*/);
    if (identMatch) {
      this.addToken(T.T_STRING, identMatch[0]);
      return;
    }

    // Anything else, pop state
    this.popState();
  }

  private lexSingleQuotedString(): void {
    // This state shouldn't be reached - single quoted strings are handled completely in lexSingleQuotedStringFull
    const rest = this.remaining();
    if (rest[0] === "'") {
      this.addToken("'".charCodeAt(0), "'");
      this.popState();
      return;
    }
  }
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
