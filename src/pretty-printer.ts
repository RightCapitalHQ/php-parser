import { Node } from './node';
import { Comment, DocComment } from './comment';

export interface PrettyPrinterOptions {
  shortArraySyntax?: boolean;
  newline?: string;
  indent?: string;
}

export class PrettyPrinter {
  protected nl: string;
  protected indent: string;
  protected indentLevel: number = 0;
  protected shortArraySyntax: boolean;

  constructor(options: PrettyPrinterOptions = {}) {
    this.nl = options.newline ?? '\n';
    this.indent = options.indent ?? '    ';
    this.shortArraySyntax = options.shortArraySyntax ?? true;
  }

  prettyPrint(stmts: Node[]): string {
    this.indentLevel = 0;
    return this.pStmts(stmts, false);
  }

  prettyPrintExpr(node: Node): string {
    return this.p(node);
  }

  prettyPrintFile(stmts: Node[]): string {
    if (stmts.length === 0) return "<?php\n\n";

    const p = this.prettyPrint(stmts);
    if (stmts[0].getType() === 'Stmt_InlineHTML') {
      // File starts with inline HTML
      const firstNl = p.indexOf('\n');
      if (firstNl === -1) return p;
      return p;
    }
    return "<?php\n\n" + p + "\n";
  }

  // ─── Core dispatch ────────────────────────────────────────────

  protected p(node: Node): string {
    const type = node.getType();
    const method = 'p' + type.replace(/_/g, '_') as keyof this;
    if (typeof (this as any)[method] === 'function') {
      return (this as any)[method](node);
    }
    // Generic fallback
    return `/* unknown: ${type} */`;
  }

  protected pStmts(stmts: Node[], indent: boolean = true): string {
    if (indent) this.indentLevel++;
    let result = '';
    for (const stmt of stmts) {
      const comments = this.pComments(stmt.getAttribute('comments') ?? []);
      if (comments) {
        result += this.nl + this.currentIndent() + comments;
        if (stmt.getType() !== 'Stmt_Nop') {
          result += this.nl + this.currentIndent();
        }
      } else {
        result += this.nl + this.currentIndent();
      }
      result += this.p(stmt);
    }
    if (indent) this.indentLevel--;
    return result;
  }

  protected currentIndent(): string {
    return this.indent.repeat(this.indentLevel);
  }

  protected pComments(comments: Comment[]): string {
    if (!comments || comments.length === 0) return '';
    return comments.map(c => c.getReformattedText()).join(this.nl + this.currentIndent());
  }

  // ─── Stmt nodes ───────────────────────────────────────────────

  protected pStmt_Expression(node: any): string {
    return this.p(node.expr) + ';';
  }

  protected pStmt_Return(node: any): string {
    if (node.expr === null) return 'return;';
    return 'return ' + this.p(node.expr) + ';';
  }

  protected pStmt_Echo(node: any): string {
    return 'echo ' + this.pCommaSeparated(node.exprs) + ';';
  }

  protected pStmt_InlineHTML(node: any): string {
    return '?>' + node.value + '<?php ';
  }

  protected pStmt_Nop(_node: any): string {
    return '';
  }

  protected pStmt_Block(node: any): string {
    return '{' + this.pStmts(node.stmts) + this.nl + this.currentIndent() + '}';
  }

  protected pStmt_If(node: any): string {
    let result = 'if (' + this.p(node.cond) + ') {' + this.pStmts(node.stmts) + this.nl + this.currentIndent() + '}';
    for (const elseif of (node.elseifs ?? [])) {
      result += ' elseif (' + this.p(elseif.cond) + ') {' + this.pStmts(elseif.stmts) + this.nl + this.currentIndent() + '}';
    }
    const elseNode = node.else ?? node.else_;
    if (elseNode) {
      result += ' else {' + this.pStmts(elseNode.stmts) + this.nl + this.currentIndent() + '}';
    }
    return result;
  }

  protected pStmt_While(node: any): string {
    return 'while (' + this.p(node.cond) + ') {' + this.pStmts(node.stmts) + this.nl + this.currentIndent() + '}';
  }

  protected pStmt_Do(node: any): string {
    return 'do {' + this.pStmts(node.stmts) + this.nl + this.currentIndent() + '} while (' + this.p(node.cond) + ');';
  }

  protected pStmt_For(node: any): string {
    return 'for (' + this.pCommaSeparated(node.init) + ';' +
      (node.cond.length > 0 ? ' ' : '') + this.pCommaSeparated(node.cond) + ';' +
      (node.loop.length > 0 ? ' ' : '') + this.pCommaSeparated(node.loop) +
      ') {' + this.pStmts(node.stmts) + this.nl + this.currentIndent() + '}';
  }

  protected pStmt_Foreach(node: any): string {
    return 'foreach (' + this.p(node.expr) + ' as ' +
      (node.keyVar ? this.p(node.keyVar) + ' => ' : '') +
      (node.byRef ? '&' : '') + this.p(node.valueVar) +
      ') {' + this.pStmts(node.stmts) + this.nl + this.currentIndent() + '}';
  }

  protected pStmt_Switch(node: any): string {
    return 'switch (' + this.p(node.cond) + ') {' +
      this.pStmts(node.cases) + this.nl + this.currentIndent() + '}';
  }

  protected pStmt_Case(node: any): string {
    return (node.cond !== null ? 'case ' + this.p(node.cond) : 'default') + ':' +
      this.pStmts(node.stmts);
  }

  protected pStmt_Break(node: any): string {
    return 'break' + (node.num !== null ? ' ' + this.p(node.num) : '') + ';';
  }

  protected pStmt_Continue(node: any): string {
    return 'continue' + (node.num !== null ? ' ' + this.p(node.num) : '') + ';';
  }

  protected pStmt_Function(node: any): string {
    return 'function ' + (node.byRef ? '&' : '') + node.name +
      '(' + this.pCommaSeparated(node.params) + ')' +
      (node.returnType !== null ? ': ' + this.p(node.returnType) : '') +
      ' {' + this.pStmts(node.stmts) + this.nl + this.currentIndent() + '}';
  }

  protected pStmt_Class(node: any): string {
    return this.pAttrGroups(node.attrGroups) +
      this.pModifiers(node.flags) +
      'class' + (node.name !== null ? ' ' + node.name : '') +
      (node.extends !== null ? ' extends ' + this.p(node.extends) : '') +
      (node.implements && node.implements.length > 0 ? ' implements ' + this.pCommaSeparated(node.implements) : '') +
      ' {' + this.pStmts(node.stmts) + this.nl + this.currentIndent() + '}';
  }

  protected pStmt_Interface(node: any): string {
    return 'interface ' + node.name +
      (node.extends && node.extends.length > 0 ? ' extends ' + this.pCommaSeparated(node.extends) : '') +
      ' {' + this.pStmts(node.stmts) + this.nl + this.currentIndent() + '}';
  }

  protected pStmt_Trait(node: any): string {
    return 'trait ' + node.name +
      ' {' + this.pStmts(node.stmts) + this.nl + this.currentIndent() + '}';
  }

  protected pStmt_Enum(node: any): string {
    return 'enum ' + node.name +
      (node.scalarType !== null ? ': ' + this.p(node.scalarType) : '') +
      (node.implements && node.implements.length > 0 ? ' implements ' + this.pCommaSeparated(node.implements) : '') +
      ' {' + this.pStmts(node.stmts) + this.nl + this.currentIndent() + '}';
  }

  protected pStmt_EnumCase(node: any): string {
    return this.pAttrGroups(node.attrGroups ?? []) +
      'case ' + (typeof node.name === 'string' ? node.name : node.name?.name ?? node.name) +
      (node.expr !== null && node.expr !== undefined ? ' = ' + this.p(node.expr) : '') + ';';
  }

  protected pStmt_Namespace(node: any): string {
    if (node.stmts === null) {
      return 'namespace ' + this.p(node.name) + ';';
    }
    if (node.name === null) {
      return 'namespace {' + this.pStmts(node.stmts) + this.nl + '}';
    }
    return 'namespace ' + this.p(node.name) + ' {' + this.pStmts(node.stmts) + this.nl + '}';
  }

  protected pStmt_Use(node: any): string {
    return 'use ' + this.pUseType(node.type) + this.pCommaSeparated(node.uses) + ';';
  }

  protected pStmt_GroupUse(node: any): string {
    return 'use ' + this.pUseType(node.type) + this.p(node.prefix) + '\\{' + this.pCommaSeparated(node.uses) + '};';
  }

  protected pStmt_Const(node: any): string {
    return 'const ' + this.pCommaSeparated(node.consts) + ';';
  }

  protected pStmt_ClassConst(node: any): string {
    return this.pAttrGroups(node.attrGroups) +
      this.pModifiers(node.flags) +
      'const ' +
      (node.type ? this.p(node.type) + ' ' : '') +
      this.pCommaSeparated(node.consts) + ';';
  }

  protected pStmt_ClassMethod(node: any): string {
    return this.pAttrGroups(node.attrGroups) +
      this.pModifiers(node.flags) +
      'function ' + (node.byRef ? '&' : '') + node.name +
      '(' + this.pCommaSeparated(node.params) + ')' +
      (node.returnType !== null && node.returnType !== undefined ? ': ' + this.p(node.returnType) : '') +
      (node.stmts !== null && node.stmts !== undefined
        ? ' {' + this.pStmts(node.stmts) + this.nl + this.currentIndent() + '}'
        : ';');
  }

  protected pStmt_Property(node: any): string {
    return this.pAttrGroups(node.attrGroups) +
      this.pModifiers(node.flags) +
      (node.type ? this.p(node.type) + ' ' : '') +
      this.pCommaSeparated(node.props) + ';';
  }

  protected pStmt_TraitUse(node: any): string {
    return 'use ' + this.pCommaSeparated(node.traits) +
      (node.adaptations.length > 0
        ? ' {' + this.pStmts(node.adaptations) + this.nl + this.currentIndent() + '}'
        : ';');
  }

  protected pStmt_TraitUseAdaptation_Precedence(node: any): string {
    return (node.trait !== null ? this.p(node.trait) + '::' : '') +
      node.method + ' insteadof ' + this.pCommaSeparated(node.insteadof) + ';';
  }

  protected pStmt_TraitUseAdaptation_Alias(node: any): string {
    return (node.trait !== null ? this.p(node.trait) + '::' : '') +
      node.method + ' as' +
      (node.newModifier !== null ? ' ' + this.pModifiers(node.newModifier).trim() : '') +
      (node.newName !== null ? ' ' + node.newName : '') + ';';
  }

  protected pStmt_TryCatch(node: any): string {
    let result = 'try {' + this.pStmts(node.stmts) + this.nl + this.currentIndent() + '}';
    for (const catchNode of node.catches) {
      const catchTypes = catchNode.types;
      const catchVar = catchNode.var ?? catchNode.var_;
      result += ' catch (' + this.pImplode(catchTypes, '|') +
        (catchVar !== null && catchVar !== undefined ? ' ' + this.p(catchVar) : '') +
        ') {' + this.pStmts(catchNode.stmts) + this.nl + this.currentIndent() + '}';
    }
    const finallyNode = node.finally ?? node.finally_;
    if (finallyNode !== null && finallyNode !== undefined) {
      result += ' finally {' + this.pStmts(finallyNode.stmts) + this.nl + this.currentIndent() + '}';
    }
    return result;
  }

  protected pStmt_Throw(node: any): string {
    return 'throw ' + this.p(node.expr) + ';';
  }

  protected pStmt_Declare(node: any): string {
    return 'declare(' + this.pCommaSeparated(node.declares) + ')' +
      (node.stmts !== null
        ? ' {' + this.pStmts(node.stmts) + this.nl + this.currentIndent() + '}'
        : ';');
  }

  protected pStmt_Global(node: any): string {
    return 'global ' + this.pCommaSeparated(node.vars) + ';';
  }

  protected pStmt_Static(node: any): string {
    return 'static ' + this.pCommaSeparated(node.vars) + ';';
  }

  protected pStmt_Unset(node: any): string {
    return 'unset(' + this.pCommaSeparated(node.vars) + ');';
  }

  protected pStmt_Label(node: any): string {
    return node.name + ':';
  }

  protected pStmt_Goto(node: any): string {
    return 'goto ' + node.name + ';';
  }

  protected pStmt_HaltCompiler(_node: any): string {
    return '__halt_compiler();';
  }

  // ─── Expr nodes ───────────────────────────────────────────────

  protected pExpr_Variable(node: any): string {
    if (typeof node.name === 'string') {
      return '$' + node.name;
    }
    return '${' + this.p(node.name) + '}';
  }

  protected pExpr_Assign(node: any): string {
    return this.pInfixOp('Expr_Assign', node.var ?? node.var_, ' = ', node.expr);
  }

  protected pExpr_AssignRef(node: any): string {
    return this.pInfixOp('Expr_AssignRef', node.var ?? node.var_, ' =& ', node.expr);
  }

  protected pExpr_AssignOp_Plus(node: any): string { return this.pAssignOp(node, '+='); }
  protected pExpr_AssignOp_Minus(node: any): string { return this.pAssignOp(node, '-='); }
  protected pExpr_AssignOp_Mul(node: any): string { return this.pAssignOp(node, '*='); }
  protected pExpr_AssignOp_Div(node: any): string { return this.pAssignOp(node, '/='); }
  protected pExpr_AssignOp_Concat(node: any): string { return this.pAssignOp(node, '.='); }
  protected pExpr_AssignOp_Mod(node: any): string { return this.pAssignOp(node, '%='); }
  protected pExpr_AssignOp_BitwiseAnd(node: any): string { return this.pAssignOp(node, '&='); }
  protected pExpr_AssignOp_BitwiseOr(node: any): string { return this.pAssignOp(node, '|='); }
  protected pExpr_AssignOp_BitwiseXor(node: any): string { return this.pAssignOp(node, '^='); }
  protected pExpr_AssignOp_ShiftLeft(node: any): string { return this.pAssignOp(node, '<<='); }
  protected pExpr_AssignOp_ShiftRight(node: any): string { return this.pAssignOp(node, '>>='); }
  protected pExpr_AssignOp_Pow(node: any): string { return this.pAssignOp(node, '**='); }
  protected pExpr_AssignOp_Coalesce(node: any): string { return this.pAssignOp(node, '??='); }

  private pAssignOp(node: any, op: string): string {
    return this.pInfixOp(node.getType(), node.var ?? node.var_, ' ' + op + ' ', node.expr);
  }

  protected pExpr_BinaryOp_Plus(node: any): string { return this.pBinaryOp(node, ' + '); }
  protected pExpr_BinaryOp_Minus(node: any): string { return this.pBinaryOp(node, ' - '); }
  protected pExpr_BinaryOp_Mul(node: any): string { return this.pBinaryOp(node, ' * '); }
  protected pExpr_BinaryOp_Div(node: any): string { return this.pBinaryOp(node, ' / '); }
  protected pExpr_BinaryOp_Concat(node: any): string { return this.pBinaryOp(node, ' . '); }
  protected pExpr_BinaryOp_Mod(node: any): string { return this.pBinaryOp(node, ' % '); }
  protected pExpr_BinaryOp_BooleanAnd(node: any): string { return this.pBinaryOp(node, ' && '); }
  protected pExpr_BinaryOp_BooleanOr(node: any): string { return this.pBinaryOp(node, ' || '); }
  protected pExpr_BinaryOp_BitwiseAnd(node: any): string { return this.pBinaryOp(node, ' & '); }
  protected pExpr_BinaryOp_BitwiseOr(node: any): string { return this.pBinaryOp(node, ' | '); }
  protected pExpr_BinaryOp_BitwiseXor(node: any): string { return this.pBinaryOp(node, ' ^ '); }
  protected pExpr_BinaryOp_ShiftLeft(node: any): string { return this.pBinaryOp(node, ' << '); }
  protected pExpr_BinaryOp_ShiftRight(node: any): string { return this.pBinaryOp(node, ' >> '); }
  protected pExpr_BinaryOp_Pow(node: any): string { return this.pBinaryOp(node, ' ** '); }
  protected pExpr_BinaryOp_LogicalAnd(node: any): string { return this.pBinaryOp(node, ' and '); }
  protected pExpr_BinaryOp_LogicalOr(node: any): string { return this.pBinaryOp(node, ' or '); }
  protected pExpr_BinaryOp_LogicalXor(node: any): string { return this.pBinaryOp(node, ' xor '); }
  protected pExpr_BinaryOp_Equal(node: any): string { return this.pBinaryOp(node, ' == '); }
  protected pExpr_BinaryOp_NotEqual(node: any): string { return this.pBinaryOp(node, ' != '); }
  protected pExpr_BinaryOp_Identical(node: any): string { return this.pBinaryOp(node, ' === '); }
  protected pExpr_BinaryOp_NotIdentical(node: any): string { return this.pBinaryOp(node, ' !== '); }
  protected pExpr_BinaryOp_Smaller(node: any): string { return this.pBinaryOp(node, ' < '); }
  protected pExpr_BinaryOp_SmallerOrEqual(node: any): string { return this.pBinaryOp(node, ' <= '); }
  protected pExpr_BinaryOp_Greater(node: any): string { return this.pBinaryOp(node, ' > '); }
  protected pExpr_BinaryOp_GreaterOrEqual(node: any): string { return this.pBinaryOp(node, ' >= '); }
  protected pExpr_BinaryOp_Spaceship(node: any): string { return this.pBinaryOp(node, ' <=> '); }
  protected pExpr_BinaryOp_Coalesce(node: any): string { return this.pBinaryOp(node, ' ?? '); }
  protected pExpr_BinaryOp_Instanceof(node: any): string { return this.pBinaryOp(node, ' instanceof '); }

  private pBinaryOp(node: any, op: string): string {
    return this.pInfixOp(node.getType(), node.left, op, node.right);
  }

  protected pExpr_Instanceof(node: any): string {
    return this.pInfixOp('Expr_Instanceof', node.expr, ' instanceof ', node.class_ ?? node.class);
  }

  protected pExpr_BooleanNot(node: any): string {
    return this.pPrefixOp('Expr_BooleanNot', '!', node.expr);
  }

  protected pExpr_BitwiseNot(node: any): string {
    return this.pPrefixOp('Expr_BitwiseNot', '~', node.expr);
  }

  protected pExpr_UnaryMinus(node: any): string {
    return this.pPrefixOp('Expr_UnaryMinus', '-', node.expr);
  }

  protected pExpr_UnaryPlus(node: any): string {
    return this.pPrefixOp('Expr_UnaryPlus', '+', node.expr);
  }

  protected pExpr_PreInc(node: any): string {
    return this.pPrefixOp('Expr_PreInc', '++', node.var ?? node.var_);
  }

  protected pExpr_PreDec(node: any): string {
    return this.pPrefixOp('Expr_PreDec', '--', node.var ?? node.var_);
  }

  protected pExpr_PostInc(node: any): string {
    return this.pPostfixOp('Expr_PostInc', node.var ?? node.var_, '++');
  }

  protected pExpr_PostDec(node: any): string {
    return this.pPostfixOp('Expr_PostDec', node.var ?? node.var_, '--');
  }

  protected pExpr_ErrorSuppress(node: any): string {
    return this.pPrefixOp('Expr_ErrorSuppress', '@', node.expr);
  }

  protected pExpr_Cast_Int(node: any): string { return this.pPrefixOp('Expr_Cast_Int', '(int) ', node.expr); }
  protected pExpr_Cast_Double(node: any): string { return this.pPrefixOp('Expr_Cast_Double', '(double) ', node.expr); }
  protected pExpr_Cast_String(node: any): string { return this.pPrefixOp('Expr_Cast_String', '(string) ', node.expr); }
  protected pExpr_Cast_Array(node: any): string { return this.pPrefixOp('Expr_Cast_Array', '(array) ', node.expr); }
  protected pExpr_Cast_Object(node: any): string { return this.pPrefixOp('Expr_Cast_Object', '(object) ', node.expr); }
  protected pExpr_Cast_Bool(node: any): string { return this.pPrefixOp('Expr_Cast_Bool', '(bool) ', node.expr); }
  protected pExpr_Cast_Unset(node: any): string { return this.pPrefixOp('Expr_Cast_Unset', '(unset) ', node.expr); }

  protected pExpr_FuncCall(node: any): string {
    return this.pCallLhs(node.name) + '(' + this.pMaybeMultiline(node.args) + ')';
  }

  protected pExpr_MethodCall(node: any): string {
    return this.pDereferenceLhs(node.var ?? node.var_) + '->' + this.pObjectProperty(node.name) + '(' + this.pMaybeMultiline(node.args) + ')';
  }

  protected pExpr_NullsafeMethodCall(node: any): string {
    return this.pDereferenceLhs(node.var ?? node.var_) + '?->' + this.pObjectProperty(node.name) + '(' + this.pMaybeMultiline(node.args) + ')';
  }

  protected pExpr_StaticCall(node: any): string {
    return this.pDereferenceLhs(node.class_ ?? node.class) + '::' + this.pObjectProperty(node.name) + '(' + this.pMaybeMultiline(node.args) + ')';
  }

  protected pExpr_PropertyFetch(node: any): string {
    return this.pDereferenceLhs(node.var ?? node.var_) + '->' + this.pObjectProperty(node.name);
  }

  protected pExpr_NullsafePropertyFetch(node: any): string {
    return this.pDereferenceLhs(node.var ?? node.var_) + '?->' + this.pObjectProperty(node.name);
  }

  protected pExpr_StaticPropertyFetch(node: any): string {
    const cls = node.class_ ?? node.class;
    const name = node.name;
    // name is typically a VarLikeIdentifier which prints with $, or a Variable
    if (typeof name === 'object' && name !== null && typeof name.getType === 'function') {
      const nameType = name.getType();
      if (nameType === 'VarLikeIdentifier') {
        return this.pDereferenceLhs(cls) + '::$' + name.name;
      }
      if (nameType === 'Expr_Variable') {
        return this.pDereferenceLhs(cls) + '::' + this.p(name);
      }
    }
    return this.pDereferenceLhs(cls) + '::$' + this.pObjectProperty(name);
  }

  protected pExpr_ClassConstFetch(node: any): string {
    return this.pDereferenceLhs(node.class_ ?? node.class) + '::' + this.pObjectProperty(node.name);
  }

  protected pExpr_ArrayDimFetch(node: any): string {
    return this.pDereferenceLhs(node.var ?? node.var_) + '[' + (node.dim !== null ? this.p(node.dim) : '') + ']';
  }

  protected pExpr_ConstFetch(node: any): string {
    return this.p(node.name);
  }

  protected pExpr_Array(node: any): string {
    if (this.shortArraySyntax) {
      return '[' + this.pMaybeMultiline(node.items, true) + ']';
    }
    return 'array(' + this.pMaybeMultiline(node.items, true) + ')';
  }

  protected pExpr_List(node: any): string {
    return 'list(' + this.pCommaSeparated(node.items) + ')';
  }

  protected pExpr_New(node: any): string {
    const cls = node.class_ ?? node.class;
    if (cls.getType() === 'Stmt_Class') {
      const args = node.args.length > 0 ? '(' + this.pMaybeMultiline(node.args) + ')' : '';
      return 'new ' + args + ' ' + this.p(cls);
    }
    return 'new ' + this.pCallLhs(cls) + '(' + this.pMaybeMultiline(node.args) + ')';
  }

  protected pExpr_Clone(node: any): string {
    return 'clone ' + this.p(node.expr);
  }

  protected pExpr_Ternary(node: any): string {
    const ifExpr = node.if_ ?? node.if;
    const elseExpr = node.else_ ?? node.else;
    return this.p(node.cond) + (ifExpr !== null && ifExpr !== undefined ? ' ? ' + this.p(ifExpr) + ' : ' : ' ?: ') + this.p(elseExpr);
  }

  protected pExpr_Closure(node: any): string {
    return (node.static ? 'static ' : '') +
      'function ' + (node.byRef ? '&' : '') +
      '(' + this.pCommaSeparated(node.params) + ')' +
      (node.uses && node.uses.length > 0 ? ' use(' + this.pCommaSeparated(node.uses) + ')' : '') +
      (node.returnType !== null ? ': ' + this.p(node.returnType) : '') +
      ' {' + this.pStmts(node.stmts) + this.nl + this.currentIndent() + '}';
  }

  protected pExpr_ArrowFunction(node: any): string {
    return (node.static ? 'static ' : '') +
      'fn' + (node.byRef ? '&' : '') +
      '(' + this.pCommaSeparated(node.params) + ')' +
      (node.returnType !== null ? ': ' + this.p(node.returnType) : '') +
      ' => ' + this.p(node.expr);
  }

  protected pExpr_Match(node: any): string {
    return 'match (' + this.p(node.cond) + ') {' +
      this.pCommaSeparatedMultiline(node.arms, true) +
      this.nl + this.currentIndent() + '}';
  }

  protected pExpr_Throw(node: any): string {
    return 'throw ' + this.p(node.expr);
  }

  protected pExpr_Yield(node: any): string {
    if (node.value === null) return 'yield';
    if (node.key !== null) {
      return 'yield ' + this.p(node.key) + ' => ' + this.p(node.value);
    }
    return 'yield ' + this.p(node.value);
  }

  protected pExpr_YieldFrom(node: any): string {
    return 'yield from ' + this.p(node.expr);
  }

  protected pExpr_Print(node: any): string {
    return 'print ' + this.p(node.expr);
  }

  protected pExpr_Include(node: any): string {
    const types: Record<number, string> = { 1: 'include', 2: 'include_once', 3: 'require', 4: 'require_once' };
    return (types[node.type] ?? 'include') + ' ' + this.p(node.expr);
  }

  protected pExpr_Isset(node: any): string {
    return 'isset(' + this.pCommaSeparated(node.vars) + ')';
  }

  protected pExpr_Empty(node: any): string {
    return 'empty(' + this.p(node.expr) + ')';
  }

  protected pExpr_Eval(node: any): string {
    return 'eval(' + this.p(node.expr) + ')';
  }

  protected pExpr_Exit(node: any): string {
    return 'exit' + (node.expr !== null ? '(' + this.p(node.expr) + ')' : '');
  }

  protected pExpr_ShellExec(node: any): string {
    return '`' + this.pEncapsList(node.parts, '`') + '`';
  }

  // ─── Scalar nodes ─────────────────────────────────────────────

  protected pScalar_String(node: any): string {
    const kind = node.getAttribute('kind') ?? 1;
    if (kind === 1) { // single-quoted
      return "'" + this.pNoIndent(this.escapeString(node.value, "'")) + "'";
    }
    return '"' + this.pNoIndent(this.escapeString(node.value, '"')) + '"';
  }

  protected pScalar_Int(node: any): string {
    // Check if the original format should be preserved
    const kind = node.getAttribute('kind');
    if (kind === 8) return '0' + node.value.toString(8);
    if (kind === 16) return '0x' + node.value.toString(16).toUpperCase();
    if (kind === 2) return '0b' + node.value.toString(2);
    return String(node.value);
  }

  protected pScalar_Float(node: any): string {
    const str = String(node.value);
    if (str.includes('.') || str.includes('e') || str.includes('E') || str.includes('INF') || str.includes('NAN')) {
      return str;
    }
    return str + '.0';
  }

  protected pScalar_InterpolatedString(node: any): string {
    const kind = node.getAttribute('kind') ?? 2;
    if (kind === 3) {
      // heredoc
      return '<<<' + (node.getAttribute('docLabel') ?? 'EOT') + '\n' +
        this.pEncapsList(node.parts, '\n') + '\n' +
        (node.getAttribute('docLabel') ?? 'EOT');
    }
    return '"' + this.pEncapsList(node.parts, '"') + '"';
  }

  protected pInterpolatedStringPart(node: any): string {
    return node.value;
  }

  // ─── Magic constants ──────────────────────────────────────────

  protected pScalar_MagicConst_Class(_node: any): string { return '__CLASS__'; }
  protected pScalar_MagicConst_Dir(_node: any): string { return '__DIR__'; }
  protected pScalar_MagicConst_File(_node: any): string { return '__FILE__'; }
  protected pScalar_MagicConst_Function(_node: any): string { return '__FUNCTION__'; }
  protected pScalar_MagicConst_Line(_node: any): string { return '__LINE__'; }
  protected pScalar_MagicConst_Method(_node: any): string { return '__METHOD__'; }
  protected pScalar_MagicConst_Namespace(_node: any): string { return '__NAMESPACE__'; }
  protected pScalar_MagicConst_Trait(_node: any): string { return '__TRAIT__'; }
  protected pScalar_MagicConst_Property(_node: any): string { return '__PROPERTY__'; }

  // ─── Helper nodes ─────────────────────────────────────────────

  protected pName(node: any): string {
    return node.name;
  }

  protected pName_FullyQualified(node: any): string {
    return '\\' + node.name;
  }

  protected pName_Relative(node: any): string {
    return 'namespace\\' + node.name;
  }

  protected pIdentifier(node: any): string {
    return node.name;
  }

  protected pVarLikeIdentifier(node: any): string {
    return '$' + node.name;
  }

  protected pParam(node: any): string {
    return this.pAttrGroups(node.attrGroups, true) +
      this.pModifiers(node.flags) +
      (node.type !== null ? this.p(node.type) + ' ' : '') +
      (node.byRef ? '&' : '') +
      (node.variadic ? '...' : '') +
      this.p(node.var ?? node.var_) +
      (node.default !== null ? ' = ' + this.p(node.default) : '');
  }

  protected pArg(node: any): string {
    return (node.name ? node.name.name + ': ' : '') +
      (node.byRef ? '&' : '') +
      (node.unpack ? '...' : '') +
      this.p(node.value);
  }

  protected pVariadicPlaceholder(_node: any): string {
    return '...';
  }

  protected pConst(node: any): string {
    return node.name + ' = ' + this.p(node.value);
  }

  protected pUseItem(node: any): string {
    return this.pUseType(node.type) +
      this.p(node.name) +
      (node.alias !== null ? ' as ' + node.alias : '');
  }

  protected pPropertyItem(node: any): string {
    return '$' + node.name + (node.default !== null ? ' = ' + this.p(node.default) : '');
  }

  protected pStaticVar(node: any): string {
    return this.p(node.var ?? node.var_) + (node.default !== null ? ' = ' + this.p(node.default) : '');
  }

  protected pDeclareItem(node: any): string {
    return node.key + ' = ' + this.p(node.value);
  }

  protected pClosureUse(node: any): string {
    return (node.byRef ? '&' : '') + this.p(node.var ?? node.var_);
  }

  protected pArrayItem(node: any): string {
    return (node.unpack ? '...' : '') +
      (node.key !== null ? this.p(node.key) + ' => ' : '') +
      (node.byRef ? '&' : '') +
      this.p(node.value);
  }

  protected pMatchArm(node: any): string {
    if (node.conds === null) {
      return 'default => ' + this.p(node.body);
    }
    return this.pCommaSeparated(node.conds) + ' => ' + this.p(node.body);
  }

  protected pAttribute(node: any): string {
    return this.p(node.name) +
      (node.args.length > 0 ? '(' + this.pCommaSeparated(node.args) + ')' : '');
  }

  protected pAttributeGroup(node: any): string {
    return '#[' + this.pCommaSeparated(node.attrs) + ']';
  }

  protected pNullableType(node: any): string {
    return '?' + this.p(node.type);
  }

  protected pUnionType(node: any): string {
    return node.types.map((t: Node) => this.p(t)).join('|');
  }

  protected pIntersectionType(node: any): string {
    return node.types.map((t: Node) => this.p(t)).join('&');
  }

  // ─── Infrastructure ───────────────────────────────────────────

  protected pInfixOp(_type: string, left: Node, op: string, right: Node): string {
    return this.p(left) + op + this.p(right);
  }

  protected pPrefixOp(_type: string, op: string, node: Node): string {
    return op + this.p(node);
  }

  protected pPostfixOp(_type: string, node: Node, op: string): string {
    return this.p(node) + op;
  }

  protected pCommaSeparated(nodes: Node[]): string {
    if (!nodes || nodes.length === 0) return '';
    return nodes.map(n => n === null ? '' : this.p(n)).join(', ');
  }

  protected pCommaSeparatedMultiline(nodes: Node[], trailingComma: boolean = false): string {
    this.indentLevel++;
    let result = '';
    for (let i = 0; i < nodes.length; i++) {
      result += this.nl + this.currentIndent() + this.p(nodes[i]);
      if (i < nodes.length - 1 || trailingComma) {
        result += ',';
      }
    }
    this.indentLevel--;
    return result;
  }

  protected pImplode(nodes: Node[], glue: string): string {
    return nodes.map(n => this.p(n)).join(glue);
  }

  protected pMaybeMultiline(nodes: Node[], trailingComma: boolean = false): string {
    if (!nodes || nodes.length === 0) return '';
    return this.pCommaSeparated(nodes);
  }

  protected pCallLhs(node: Node): string {
    return this.p(node);
  }

  protected pDereferenceLhs(node: Node): string {
    return this.p(node);
  }

  protected pObjectProperty(node: Node | string): string {
    if (typeof node === 'string') return node;
    return this.p(node);
  }

  protected pEncapsList(parts: Node[], quote: string): string {
    return parts.map(p => {
      if (p.getType() === 'InterpolatedStringPart') {
        return (p as any).value;
      }
      return '{' + this.p(p) + '}';
    }).join('');
  }

  protected pNoIndent(s: string): string {
    return s;
  }

  protected pModifiers(flags: number): string {
    if (!flags) return '';
    const parts: string[] = [];
    if (flags & 16) parts.push('abstract');
    if (flags & 32) parts.push('final');
    if (flags & 1) parts.push('public');
    if (flags & 2) parts.push('protected');
    if (flags & 4) parts.push('private');
    if (flags & 8) parts.push('static');
    if (flags & 64) parts.push('readonly');
    return parts.length > 0 ? parts.join(' ') + ' ' : '';
  }

  protected pUseType(type: number): string {
    if (type === 2) return 'function ';
    if (type === 3) return 'const ';
    return '';
  }

  protected pAttrGroups(attrGroups: Node[], inline: boolean = false): string {
    if (!attrGroups || attrGroups.length === 0) return '';
    const separator = inline ? ' ' : this.nl + this.currentIndent();
    return attrGroups.map(g => this.p(g)).join(separator) + separator;
  }

  protected escapeString(value: string, quote: string): string {
    if (quote === "'") {
      return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    }
    return value
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\t/g, '\\t')
      .replace(/\0/g, '\\0')
      .replace(/\$/g, '\\$');
  }
}
