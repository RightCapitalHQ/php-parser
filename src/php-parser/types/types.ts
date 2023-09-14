
import type { FullyQualifiedArg } from './node/arg';
import type { NodeAbstract } from './node';
import type { FullyQualifiedAttribute } from './node/attribute';
import type { FullyQualifiedAttributeGroup } from './node/attribute-group';
import type { FullyQualifiedComplexType } from './node/complex-type';
import type { FullyQualifiedConst } from './node/const';
import type { FullyQualifiedExprArrayDimFetch } from './node/expr/array-dim-fetch';
import type { FullyQualifiedExpr } from './node/expr';
import type { FullyQualifiedExprArrayItem } from './node/expr/array-item';
import type { FullyQualifiedExprArray } from './node/expr/array';
import type { FullyQualifiedExprArrowFunction } from './node/expr/arrow-function';
import type { FullyQualifiedExprAssign } from './node/expr/assign';
import type { FullyQualifiedExprAssignOpBitwiseAnd } from './node/expr/assign-op/bitwise-and';
import type { FullyQualifiedExprAssignOp } from './node/expr/assign-op';
import type { FullyQualifiedExprAssignOpBitwiseOr } from './node/expr/assign-op/bitwise-or';
import type { FullyQualifiedExprAssignOpBitwiseXor } from './node/expr/assign-op/bitwise-xor';
import type { FullyQualifiedExprAssignOpCoalesce } from './node/expr/assign-op/coalesce';
import type { FullyQualifiedExprAssignOpConcat } from './node/expr/assign-op/concat';
import type { FullyQualifiedExprAssignOpDiv } from './node/expr/assign-op/div';
import type { FullyQualifiedExprAssignOpMinus } from './node/expr/assign-op/minus';
import type { FullyQualifiedExprAssignOpMod } from './node/expr/assign-op/mod';
import type { FullyQualifiedExprAssignOpMul } from './node/expr/assign-op/mul';
import type { FullyQualifiedExprAssignOpPlus } from './node/expr/assign-op/plus';
import type { FullyQualifiedExprAssignOpPow } from './node/expr/assign-op/pow';
import type { FullyQualifiedExprAssignOpShiftLeft } from './node/expr/assign-op/shift-left';
import type { FullyQualifiedExprAssignOpShiftRight } from './node/expr/assign-op/shift-right';
import type { FullyQualifiedExprAssignRef } from './node/expr/assign-ref';
import type { FullyQualifiedExprBinaryOpBitwiseAnd } from './node/expr/binary-op/bitwise-and';
import type { FullyQualifiedExprBinaryOp } from './node/expr/binary-op';
import type { FullyQualifiedExprBinaryOpBitwiseOr } from './node/expr/binary-op/bitwise-or';
import type { FullyQualifiedExprBinaryOpBitwiseXor } from './node/expr/binary-op/bitwise-xor';
import type { FullyQualifiedExprBinaryOpBooleanAnd } from './node/expr/binary-op/boolean-and';
import type { FullyQualifiedExprBinaryOpBooleanOr } from './node/expr/binary-op/boolean-or';
import type { FullyQualifiedExprBinaryOpCoalesce } from './node/expr/binary-op/coalesce';
import type { FullyQualifiedExprBinaryOpConcat } from './node/expr/binary-op/concat';
import type { FullyQualifiedExprBinaryOpDiv } from './node/expr/binary-op/div';
import type { FullyQualifiedExprBinaryOpEqual } from './node/expr/binary-op/equal';
import type { FullyQualifiedExprBinaryOpGreater } from './node/expr/binary-op/greater';
import type { FullyQualifiedExprBinaryOpGreaterOrEqual } from './node/expr/binary-op/greater-or-equal';
import type { FullyQualifiedExprBinaryOpIdentical } from './node/expr/binary-op/identical';
import type { FullyQualifiedExprBinaryOpLogicalAnd } from './node/expr/binary-op/logical-and';
import type { FullyQualifiedExprBinaryOpLogicalOr } from './node/expr/binary-op/logical-or';
import type { FullyQualifiedExprBinaryOpLogicalXor } from './node/expr/binary-op/logical-xor';
import type { FullyQualifiedExprBinaryOpMinus } from './node/expr/binary-op/minus';
import type { FullyQualifiedExprBinaryOpMod } from './node/expr/binary-op/mod';
import type { FullyQualifiedExprBinaryOpMul } from './node/expr/binary-op/mul';
import type { FullyQualifiedExprBinaryOpNotEqual } from './node/expr/binary-op/not-equal';
import type { FullyQualifiedExprBinaryOpNotIdentical } from './node/expr/binary-op/not-identical';
import type { FullyQualifiedExprBinaryOpPlus } from './node/expr/binary-op/plus';
import type { FullyQualifiedExprBinaryOpPow } from './node/expr/binary-op/pow';
import type { FullyQualifiedExprBinaryOpShiftLeft } from './node/expr/binary-op/shift-left';
import type { FullyQualifiedExprBinaryOpShiftRight } from './node/expr/binary-op/shift-right';
import type { FullyQualifiedExprBinaryOpSmaller } from './node/expr/binary-op/smaller';
import type { FullyQualifiedExprBinaryOpSmallerOrEqual } from './node/expr/binary-op/smaller-or-equal';
import type { FullyQualifiedExprBinaryOpSpaceship } from './node/expr/binary-op/spaceship';
import type { FullyQualifiedExprBitwiseNot } from './node/expr/bitwise-not';
import type { FullyQualifiedExprBooleanNot } from './node/expr/boolean-not';
import type { FullyQualifiedExprCallLike } from './node/expr/call-like';
import type { FullyQualifiedExprCastArray } from './node/expr/cast/array';
import type { FullyQualifiedExprCast } from './node/expr/cast';
import type { FullyQualifiedExprCastBool } from './node/expr/cast/bool';
import type { FullyQualifiedExprCastDouble } from './node/expr/cast/double';
import type { FullyQualifiedExprCastInt } from './node/expr/cast/int';
import type { FullyQualifiedExprCastObject } from './node/expr/cast/object';
import type { FullyQualifiedExprCastString } from './node/expr/cast/string';
import type { FullyQualifiedExprCastUnset } from './node/expr/cast/unset';
import type { FullyQualifiedExprClassConstFetch } from './node/expr/class-const-fetch';
import type { FullyQualifiedExprClone } from './node/expr/clone';
import type { FullyQualifiedExprClosure } from './node/expr/closure';
import type { FullyQualifiedExprClosureUse } from './node/expr/closure-use';
import type { FullyQualifiedExprConstFetch } from './node/expr/const-fetch';
import type { FullyQualifiedExprEmpty } from './node/expr/empty';
import type { FullyQualifiedExprError } from './node/expr/error';
import type { FullyQualifiedExprErrorSuppress } from './node/expr/error-suppress';
import type { FullyQualifiedExprEval } from './node/expr/eval';
import type { FullyQualifiedExprExit } from './node/expr/exit';
import type { FullyQualifiedExprFuncCall } from './node/expr/func-call';
import type { FullyQualifiedExprInclude } from './node/expr/include';
import type { FullyQualifiedExprInstanceof } from './node/expr/instanceof';
import type { FullyQualifiedExprIsset } from './node/expr/isset';
import type { FullyQualifiedExprList } from './node/expr/list';
import type { FullyQualifiedExprMatch } from './node/expr/match';
import type { FullyQualifiedExprMethodCall } from './node/expr/method-call';
import type { FullyQualifiedExprNew } from './node/expr/new';
import type { FullyQualifiedExprNullsafeMethodCall } from './node/expr/nullsafe-method-call';
import type { FullyQualifiedExprNullsafePropertyFetch } from './node/expr/nullsafe-property-fetch';
import type { FullyQualifiedExprPostDec } from './node/expr/post-dec';
import type { FullyQualifiedExprPostInc } from './node/expr/post-inc';
import type { FullyQualifiedExprPreDec } from './node/expr/pre-dec';
import type { FullyQualifiedExprPreInc } from './node/expr/pre-inc';
import type { FullyQualifiedExprPrint } from './node/expr/print';
import type { FullyQualifiedExprPropertyFetch } from './node/expr/property-fetch';
import type { FullyQualifiedExprShellExec } from './node/expr/shell-exec';
import type { FullyQualifiedExprStaticCall } from './node/expr/static-call';
import type { FullyQualifiedExprStaticPropertyFetch } from './node/expr/static-property-fetch';
import type { FullyQualifiedExprTernary } from './node/expr/ternary';
import type { FullyQualifiedExprThrow } from './node/expr/throw';
import type { FullyQualifiedExprUnaryMinus } from './node/expr/unary-minus';
import type { FullyQualifiedExprUnaryPlus } from './node/expr/unary-plus';
import type { FullyQualifiedExprVariable } from './node/expr/variable';
import type { FullyQualifiedExprYieldFrom } from './node/expr/yield-from';
import type { FullyQualifiedExprYield } from './node/expr/yield';
import type { FullyQualifiedIdentifier } from './node/identifier';
import type { FullyQualifiedIntersectionType } from './node/intersection-type';
import type { FullyQualifiedMatchArm } from './node/match-arm';
import type { FullyQualifiedNameFullyQualified } from './node/name/fully-qualified';
import type { FullyQualifiedName } from './node/name';
import type { FullyQualifiedNameRelative } from './node/name/relative';
import type { FullyQualifiedNullableType } from './node/nullable-type';
import type { FullyQualifiedParam } from './node/param';
import type { FullyQualifiedScalarDNumber } from './node/scalar/d-number';
import type { FullyQualifiedScalar } from './node/scalar';
import type { FullyQualifiedScalarEncapsed } from './node/scalar/encapsed';
import type { FullyQualifiedScalarEncapsedStringPart } from './node/scalar/encapsed-string-part';
import type { FullyQualifiedScalarLNumber } from './node/scalar/l-number';
import type { FullyQualifiedScalarMagicConstClass } from './node/scalar/magic-const/class';
import type { FullyQualifiedScalarMagicConst } from './node/scalar/magic-const';
import type { FullyQualifiedScalarMagicConstDir } from './node/scalar/magic-const/dir';
import type { FullyQualifiedScalarMagicConstFile } from './node/scalar/magic-const/file';
import type { FullyQualifiedScalarMagicConstFunction } from './node/scalar/magic-const/function';
import type { FullyQualifiedScalarMagicConstLine } from './node/scalar/magic-const/line';
import type { FullyQualifiedScalarMagicConstMethod } from './node/scalar/magic-const/method';
import type { FullyQualifiedScalarMagicConstNamespace } from './node/scalar/magic-const/namespace';
import type { FullyQualifiedScalarMagicConstTrait } from './node/scalar/magic-const/trait';
import type { FullyQualifiedScalarString } from './node/scalar/string';
import type { FullyQualifiedStmtBreak } from './node/stmt/break';
import type { FullyQualifiedStmt } from './node/stmt';
import type { FullyQualifiedStmtCase } from './node/stmt/case';
import type { FullyQualifiedStmtCatch } from './node/stmt/catch';
import type { FullyQualifiedStmtClassConst } from './node/stmt/class-const';
import type { FullyQualifiedStmtClassLike } from './node/stmt/class-like';
import type { FullyQualifiedStmtClassMethod } from './node/stmt/class-method';
import type { FullyQualifiedStmtClass } from './node/stmt/class';
import type { FullyQualifiedStmtConst } from './node/stmt/const';
import type { FullyQualifiedStmtContinue } from './node/stmt/continue';
import type { FullyQualifiedStmtDeclareDeclare } from './node/stmt/declare-declare';
import type { FullyQualifiedStmtDeclare } from './node/stmt/declare';
import type { FullyQualifiedStmtDo } from './node/stmt/do';
import type { FullyQualifiedStmtEcho } from './node/stmt/echo';
import type { FullyQualifiedStmtElseIf } from './node/stmt/else-if';
import type { FullyQualifiedStmtElse } from './node/stmt/else';
import type { FullyQualifiedStmtEnumCase } from './node/stmt/enum-case';
import type { FullyQualifiedStmtEnum } from './node/stmt/enum';
import type { FullyQualifiedStmtExpression } from './node/stmt/expression';
import type { FullyQualifiedStmtFinally } from './node/stmt/finally';
import type { FullyQualifiedStmtFor } from './node/stmt/for';
import type { FullyQualifiedStmtForeach } from './node/stmt/foreach';
import type { FullyQualifiedStmtFunction } from './node/stmt/function';
import type { FullyQualifiedStmtGlobal } from './node/stmt/global';
import type { FullyQualifiedStmtGoto } from './node/stmt/goto';
import type { FullyQualifiedStmtGroupUse } from './node/stmt/group-use';
import type { FullyQualifiedStmtHaltCompiler } from './node/stmt/halt-compiler';
import type { FullyQualifiedStmtIf } from './node/stmt/if';
import type { FullyQualifiedStmtInlineHtml } from './node/stmt/inline-html';
import type { FullyQualifiedStmtInterface } from './node/stmt/interface';
import type { FullyQualifiedStmtLabel } from './node/stmt/label';
import type { FullyQualifiedStmtNamespace } from './node/stmt/namespace';
import type { FullyQualifiedStmtNop } from './node/stmt/nop';
import type { FullyQualifiedStmtProperty } from './node/stmt/property';
import type { FullyQualifiedStmtPropertyProperty } from './node/stmt/property-property';
import type { FullyQualifiedStmtReturn } from './node/stmt/return';
import type { FullyQualifiedStmtStaticVar } from './node/stmt/static-var';
import type { FullyQualifiedStmtStatic } from './node/stmt/static';
import type { FullyQualifiedStmtSwitch } from './node/stmt/switch';
import type { FullyQualifiedStmtThrow } from './node/stmt/throw';
import type { FullyQualifiedStmtTraitUse } from './node/stmt/trait-use';
import type { FullyQualifiedStmtTraitUseAdaptationAlias } from './node/stmt/trait-use-adaptation/alias';
import type { FullyQualifiedStmtTraitUseAdaptation } from './node/stmt/trait-use-adaptation';
import type { FullyQualifiedStmtTraitUseAdaptationPrecedence } from './node/stmt/trait-use-adaptation/precedence';
import type { FullyQualifiedStmtTrait } from './node/stmt/trait';
import type { FullyQualifiedStmtTryCatch } from './node/stmt/try-catch';
import type { FullyQualifiedStmtUnset } from './node/stmt/unset';
import type { FullyQualifiedStmtUseUse } from './node/stmt/use-use';
import type { FullyQualifiedStmtUse } from './node/stmt/use';
import type { FullyQualifiedStmtWhile } from './node/stmt/while';
import type { FullyQualifiedUnionType } from './node/union-type';
import type { FullyQualifiedVarLikeIdentifier } from './node/var-like-identifier';
import type { FullyQualifiedVariadicPlaceholder } from './node/variadic-placeholder';      

export type NodeTypeInheritingFromFullyQualifiedArg = FullyQualifiedArg;
export type NodeTypeInheritingFromNodeAbstract = NodeAbstract | NodeTypeInheritingFromFullyQualifiedArg | NodeTypeInheritingFromFullyQualifiedAttribute | NodeTypeInheritingFromFullyQualifiedAttributeGroup | NodeTypeInheritingFromFullyQualifiedComplexType | NodeTypeInheritingFromFullyQualifiedConst | NodeTypeInheritingFromFullyQualifiedExpr | NodeTypeInheritingFromFullyQualifiedIdentifier | NodeTypeInheritingFromFullyQualifiedMatchArm | NodeTypeInheritingFromFullyQualifiedName | NodeTypeInheritingFromFullyQualifiedParam | NodeTypeInheritingFromFullyQualifiedStmt | NodeTypeInheritingFromFullyQualifiedVariadicPlaceholder;
export type NodeTypeInheritingFromFullyQualifiedAttribute = FullyQualifiedAttribute;
export type NodeTypeInheritingFromFullyQualifiedAttributeGroup = FullyQualifiedAttributeGroup;
export type NodeTypeInheritingFromFullyQualifiedComplexType = FullyQualifiedComplexType | NodeTypeInheritingFromFullyQualifiedIntersectionType | NodeTypeInheritingFromFullyQualifiedNullableType | NodeTypeInheritingFromFullyQualifiedUnionType;
export type NodeTypeInheritingFromFullyQualifiedConst = FullyQualifiedConst;
export type NodeTypeInheritingFromFullyQualifiedExprArrayDimFetch = FullyQualifiedExprArrayDimFetch;
export type NodeTypeInheritingFromFullyQualifiedExpr = FullyQualifiedExpr | NodeTypeInheritingFromFullyQualifiedExprArrayDimFetch | NodeTypeInheritingFromFullyQualifiedExprArrayItem | NodeTypeInheritingFromFullyQualifiedExprArray | NodeTypeInheritingFromFullyQualifiedExprArrowFunction | NodeTypeInheritingFromFullyQualifiedExprAssign | NodeTypeInheritingFromFullyQualifiedExprAssignOp | NodeTypeInheritingFromFullyQualifiedExprAssignRef | NodeTypeInheritingFromFullyQualifiedExprBinaryOp | NodeTypeInheritingFromFullyQualifiedExprBitwiseNot | NodeTypeInheritingFromFullyQualifiedExprBooleanNot | NodeTypeInheritingFromFullyQualifiedExprCallLike | NodeTypeInheritingFromFullyQualifiedExprCast | NodeTypeInheritingFromFullyQualifiedExprClassConstFetch | NodeTypeInheritingFromFullyQualifiedExprClone | NodeTypeInheritingFromFullyQualifiedExprClosure | NodeTypeInheritingFromFullyQualifiedExprClosureUse | NodeTypeInheritingFromFullyQualifiedExprConstFetch | NodeTypeInheritingFromFullyQualifiedExprEmpty | NodeTypeInheritingFromFullyQualifiedExprError | NodeTypeInheritingFromFullyQualifiedExprErrorSuppress | NodeTypeInheritingFromFullyQualifiedExprEval | NodeTypeInheritingFromFullyQualifiedExprExit | NodeTypeInheritingFromFullyQualifiedExprInclude | NodeTypeInheritingFromFullyQualifiedExprInstanceof | NodeTypeInheritingFromFullyQualifiedExprIsset | NodeTypeInheritingFromFullyQualifiedExprList | NodeTypeInheritingFromFullyQualifiedExprMatch | NodeTypeInheritingFromFullyQualifiedExprNullsafePropertyFetch | NodeTypeInheritingFromFullyQualifiedExprPostDec | NodeTypeInheritingFromFullyQualifiedExprPostInc | NodeTypeInheritingFromFullyQualifiedExprPreDec | NodeTypeInheritingFromFullyQualifiedExprPreInc | NodeTypeInheritingFromFullyQualifiedExprPrint | NodeTypeInheritingFromFullyQualifiedExprPropertyFetch | NodeTypeInheritingFromFullyQualifiedExprShellExec | NodeTypeInheritingFromFullyQualifiedExprStaticPropertyFetch | NodeTypeInheritingFromFullyQualifiedExprTernary | NodeTypeInheritingFromFullyQualifiedExprThrow | NodeTypeInheritingFromFullyQualifiedExprUnaryMinus | NodeTypeInheritingFromFullyQualifiedExprUnaryPlus | NodeTypeInheritingFromFullyQualifiedExprVariable | NodeTypeInheritingFromFullyQualifiedExprYieldFrom | NodeTypeInheritingFromFullyQualifiedExprYield | NodeTypeInheritingFromFullyQualifiedScalar;
export type NodeTypeInheritingFromFullyQualifiedExprArrayItem = FullyQualifiedExprArrayItem;
export type NodeTypeInheritingFromFullyQualifiedExprArray = FullyQualifiedExprArray;
export type NodeTypeInheritingFromFullyQualifiedExprArrowFunction = FullyQualifiedExprArrowFunction;
export type NodeTypeInheritingFromFullyQualifiedExprAssign = FullyQualifiedExprAssign;
export type NodeTypeInheritingFromFullyQualifiedExprAssignOpBitwiseAnd = FullyQualifiedExprAssignOpBitwiseAnd;
export type NodeTypeInheritingFromFullyQualifiedExprAssignOp = FullyQualifiedExprAssignOp | NodeTypeInheritingFromFullyQualifiedExprAssignOpBitwiseAnd | NodeTypeInheritingFromFullyQualifiedExprAssignOpBitwiseOr | NodeTypeInheritingFromFullyQualifiedExprAssignOpBitwiseXor | NodeTypeInheritingFromFullyQualifiedExprAssignOpCoalesce | NodeTypeInheritingFromFullyQualifiedExprAssignOpConcat | NodeTypeInheritingFromFullyQualifiedExprAssignOpDiv | NodeTypeInheritingFromFullyQualifiedExprAssignOpMinus | NodeTypeInheritingFromFullyQualifiedExprAssignOpMod | NodeTypeInheritingFromFullyQualifiedExprAssignOpMul | NodeTypeInheritingFromFullyQualifiedExprAssignOpPlus | NodeTypeInheritingFromFullyQualifiedExprAssignOpPow | NodeTypeInheritingFromFullyQualifiedExprAssignOpShiftLeft | NodeTypeInheritingFromFullyQualifiedExprAssignOpShiftRight;
export type NodeTypeInheritingFromFullyQualifiedExprAssignOpBitwiseOr = FullyQualifiedExprAssignOpBitwiseOr;
export type NodeTypeInheritingFromFullyQualifiedExprAssignOpBitwiseXor = FullyQualifiedExprAssignOpBitwiseXor;
export type NodeTypeInheritingFromFullyQualifiedExprAssignOpCoalesce = FullyQualifiedExprAssignOpCoalesce;
export type NodeTypeInheritingFromFullyQualifiedExprAssignOpConcat = FullyQualifiedExprAssignOpConcat;
export type NodeTypeInheritingFromFullyQualifiedExprAssignOpDiv = FullyQualifiedExprAssignOpDiv;
export type NodeTypeInheritingFromFullyQualifiedExprAssignOpMinus = FullyQualifiedExprAssignOpMinus;
export type NodeTypeInheritingFromFullyQualifiedExprAssignOpMod = FullyQualifiedExprAssignOpMod;
export type NodeTypeInheritingFromFullyQualifiedExprAssignOpMul = FullyQualifiedExprAssignOpMul;
export type NodeTypeInheritingFromFullyQualifiedExprAssignOpPlus = FullyQualifiedExprAssignOpPlus;
export type NodeTypeInheritingFromFullyQualifiedExprAssignOpPow = FullyQualifiedExprAssignOpPow;
export type NodeTypeInheritingFromFullyQualifiedExprAssignOpShiftLeft = FullyQualifiedExprAssignOpShiftLeft;
export type NodeTypeInheritingFromFullyQualifiedExprAssignOpShiftRight = FullyQualifiedExprAssignOpShiftRight;
export type NodeTypeInheritingFromFullyQualifiedExprAssignRef = FullyQualifiedExprAssignRef;
export type NodeTypeInheritingFromFullyQualifiedExprBinaryOpBitwiseAnd = FullyQualifiedExprBinaryOpBitwiseAnd;
export type NodeTypeInheritingFromFullyQualifiedExprBinaryOp = FullyQualifiedExprBinaryOp | NodeTypeInheritingFromFullyQualifiedExprBinaryOpBitwiseAnd | NodeTypeInheritingFromFullyQualifiedExprBinaryOpBitwiseOr | NodeTypeInheritingFromFullyQualifiedExprBinaryOpBitwiseXor | NodeTypeInheritingFromFullyQualifiedExprBinaryOpBooleanAnd | NodeTypeInheritingFromFullyQualifiedExprBinaryOpBooleanOr | NodeTypeInheritingFromFullyQualifiedExprBinaryOpCoalesce | NodeTypeInheritingFromFullyQualifiedExprBinaryOpConcat | NodeTypeInheritingFromFullyQualifiedExprBinaryOpDiv | NodeTypeInheritingFromFullyQualifiedExprBinaryOpEqual | NodeTypeInheritingFromFullyQualifiedExprBinaryOpGreater | NodeTypeInheritingFromFullyQualifiedExprBinaryOpGreaterOrEqual | NodeTypeInheritingFromFullyQualifiedExprBinaryOpIdentical | NodeTypeInheritingFromFullyQualifiedExprBinaryOpLogicalAnd | NodeTypeInheritingFromFullyQualifiedExprBinaryOpLogicalOr | NodeTypeInheritingFromFullyQualifiedExprBinaryOpLogicalXor | NodeTypeInheritingFromFullyQualifiedExprBinaryOpMinus | NodeTypeInheritingFromFullyQualifiedExprBinaryOpMod | NodeTypeInheritingFromFullyQualifiedExprBinaryOpMul | NodeTypeInheritingFromFullyQualifiedExprBinaryOpNotEqual | NodeTypeInheritingFromFullyQualifiedExprBinaryOpNotIdentical | NodeTypeInheritingFromFullyQualifiedExprBinaryOpPlus | NodeTypeInheritingFromFullyQualifiedExprBinaryOpPow | NodeTypeInheritingFromFullyQualifiedExprBinaryOpShiftLeft | NodeTypeInheritingFromFullyQualifiedExprBinaryOpShiftRight | NodeTypeInheritingFromFullyQualifiedExprBinaryOpSmaller | NodeTypeInheritingFromFullyQualifiedExprBinaryOpSmallerOrEqual | NodeTypeInheritingFromFullyQualifiedExprBinaryOpSpaceship;
export type NodeTypeInheritingFromFullyQualifiedExprBinaryOpBitwiseOr = FullyQualifiedExprBinaryOpBitwiseOr;
export type NodeTypeInheritingFromFullyQualifiedExprBinaryOpBitwiseXor = FullyQualifiedExprBinaryOpBitwiseXor;
export type NodeTypeInheritingFromFullyQualifiedExprBinaryOpBooleanAnd = FullyQualifiedExprBinaryOpBooleanAnd;
export type NodeTypeInheritingFromFullyQualifiedExprBinaryOpBooleanOr = FullyQualifiedExprBinaryOpBooleanOr;
export type NodeTypeInheritingFromFullyQualifiedExprBinaryOpCoalesce = FullyQualifiedExprBinaryOpCoalesce;
export type NodeTypeInheritingFromFullyQualifiedExprBinaryOpConcat = FullyQualifiedExprBinaryOpConcat;
export type NodeTypeInheritingFromFullyQualifiedExprBinaryOpDiv = FullyQualifiedExprBinaryOpDiv;
export type NodeTypeInheritingFromFullyQualifiedExprBinaryOpEqual = FullyQualifiedExprBinaryOpEqual;
export type NodeTypeInheritingFromFullyQualifiedExprBinaryOpGreater = FullyQualifiedExprBinaryOpGreater;
export type NodeTypeInheritingFromFullyQualifiedExprBinaryOpGreaterOrEqual = FullyQualifiedExprBinaryOpGreaterOrEqual;
export type NodeTypeInheritingFromFullyQualifiedExprBinaryOpIdentical = FullyQualifiedExprBinaryOpIdentical;
export type NodeTypeInheritingFromFullyQualifiedExprBinaryOpLogicalAnd = FullyQualifiedExprBinaryOpLogicalAnd;
export type NodeTypeInheritingFromFullyQualifiedExprBinaryOpLogicalOr = FullyQualifiedExprBinaryOpLogicalOr;
export type NodeTypeInheritingFromFullyQualifiedExprBinaryOpLogicalXor = FullyQualifiedExprBinaryOpLogicalXor;
export type NodeTypeInheritingFromFullyQualifiedExprBinaryOpMinus = FullyQualifiedExprBinaryOpMinus;
export type NodeTypeInheritingFromFullyQualifiedExprBinaryOpMod = FullyQualifiedExprBinaryOpMod;
export type NodeTypeInheritingFromFullyQualifiedExprBinaryOpMul = FullyQualifiedExprBinaryOpMul;
export type NodeTypeInheritingFromFullyQualifiedExprBinaryOpNotEqual = FullyQualifiedExprBinaryOpNotEqual;
export type NodeTypeInheritingFromFullyQualifiedExprBinaryOpNotIdentical = FullyQualifiedExprBinaryOpNotIdentical;
export type NodeTypeInheritingFromFullyQualifiedExprBinaryOpPlus = FullyQualifiedExprBinaryOpPlus;
export type NodeTypeInheritingFromFullyQualifiedExprBinaryOpPow = FullyQualifiedExprBinaryOpPow;
export type NodeTypeInheritingFromFullyQualifiedExprBinaryOpShiftLeft = FullyQualifiedExprBinaryOpShiftLeft;
export type NodeTypeInheritingFromFullyQualifiedExprBinaryOpShiftRight = FullyQualifiedExprBinaryOpShiftRight;
export type NodeTypeInheritingFromFullyQualifiedExprBinaryOpSmaller = FullyQualifiedExprBinaryOpSmaller;
export type NodeTypeInheritingFromFullyQualifiedExprBinaryOpSmallerOrEqual = FullyQualifiedExprBinaryOpSmallerOrEqual;
export type NodeTypeInheritingFromFullyQualifiedExprBinaryOpSpaceship = FullyQualifiedExprBinaryOpSpaceship;
export type NodeTypeInheritingFromFullyQualifiedExprBitwiseNot = FullyQualifiedExprBitwiseNot;
export type NodeTypeInheritingFromFullyQualifiedExprBooleanNot = FullyQualifiedExprBooleanNot;
export type NodeTypeInheritingFromFullyQualifiedExprCallLike = FullyQualifiedExprCallLike | NodeTypeInheritingFromFullyQualifiedExprFuncCall | NodeTypeInheritingFromFullyQualifiedExprMethodCall | NodeTypeInheritingFromFullyQualifiedExprNew | NodeTypeInheritingFromFullyQualifiedExprNullsafeMethodCall | NodeTypeInheritingFromFullyQualifiedExprStaticCall;
export type NodeTypeInheritingFromFullyQualifiedExprCastArray = FullyQualifiedExprCastArray;
export type NodeTypeInheritingFromFullyQualifiedExprCast = FullyQualifiedExprCast | NodeTypeInheritingFromFullyQualifiedExprCastArray | NodeTypeInheritingFromFullyQualifiedExprCastBool | NodeTypeInheritingFromFullyQualifiedExprCastDouble | NodeTypeInheritingFromFullyQualifiedExprCastInt | NodeTypeInheritingFromFullyQualifiedExprCastObject | NodeTypeInheritingFromFullyQualifiedExprCastString | NodeTypeInheritingFromFullyQualifiedExprCastUnset;
export type NodeTypeInheritingFromFullyQualifiedExprCastBool = FullyQualifiedExprCastBool;
export type NodeTypeInheritingFromFullyQualifiedExprCastDouble = FullyQualifiedExprCastDouble;
export type NodeTypeInheritingFromFullyQualifiedExprCastInt = FullyQualifiedExprCastInt;
export type NodeTypeInheritingFromFullyQualifiedExprCastObject = FullyQualifiedExprCastObject;
export type NodeTypeInheritingFromFullyQualifiedExprCastString = FullyQualifiedExprCastString;
export type NodeTypeInheritingFromFullyQualifiedExprCastUnset = FullyQualifiedExprCastUnset;
export type NodeTypeInheritingFromFullyQualifiedExprClassConstFetch = FullyQualifiedExprClassConstFetch;
export type NodeTypeInheritingFromFullyQualifiedExprClone = FullyQualifiedExprClone;
export type NodeTypeInheritingFromFullyQualifiedExprClosure = FullyQualifiedExprClosure;
export type NodeTypeInheritingFromFullyQualifiedExprClosureUse = FullyQualifiedExprClosureUse;
export type NodeTypeInheritingFromFullyQualifiedExprConstFetch = FullyQualifiedExprConstFetch;
export type NodeTypeInheritingFromFullyQualifiedExprEmpty = FullyQualifiedExprEmpty;
export type NodeTypeInheritingFromFullyQualifiedExprError = FullyQualifiedExprError;
export type NodeTypeInheritingFromFullyQualifiedExprErrorSuppress = FullyQualifiedExprErrorSuppress;
export type NodeTypeInheritingFromFullyQualifiedExprEval = FullyQualifiedExprEval;
export type NodeTypeInheritingFromFullyQualifiedExprExit = FullyQualifiedExprExit;
export type NodeTypeInheritingFromFullyQualifiedExprFuncCall = FullyQualifiedExprFuncCall;
export type NodeTypeInheritingFromFullyQualifiedExprInclude = FullyQualifiedExprInclude;
export type NodeTypeInheritingFromFullyQualifiedExprInstanceof = FullyQualifiedExprInstanceof;
export type NodeTypeInheritingFromFullyQualifiedExprIsset = FullyQualifiedExprIsset;
export type NodeTypeInheritingFromFullyQualifiedExprList = FullyQualifiedExprList;
export type NodeTypeInheritingFromFullyQualifiedExprMatch = FullyQualifiedExprMatch;
export type NodeTypeInheritingFromFullyQualifiedExprMethodCall = FullyQualifiedExprMethodCall;
export type NodeTypeInheritingFromFullyQualifiedExprNew = FullyQualifiedExprNew;
export type NodeTypeInheritingFromFullyQualifiedExprNullsafeMethodCall = FullyQualifiedExprNullsafeMethodCall;
export type NodeTypeInheritingFromFullyQualifiedExprNullsafePropertyFetch = FullyQualifiedExprNullsafePropertyFetch;
export type NodeTypeInheritingFromFullyQualifiedExprPostDec = FullyQualifiedExprPostDec;
export type NodeTypeInheritingFromFullyQualifiedExprPostInc = FullyQualifiedExprPostInc;
export type NodeTypeInheritingFromFullyQualifiedExprPreDec = FullyQualifiedExprPreDec;
export type NodeTypeInheritingFromFullyQualifiedExprPreInc = FullyQualifiedExprPreInc;
export type NodeTypeInheritingFromFullyQualifiedExprPrint = FullyQualifiedExprPrint;
export type NodeTypeInheritingFromFullyQualifiedExprPropertyFetch = FullyQualifiedExprPropertyFetch;
export type NodeTypeInheritingFromFullyQualifiedExprShellExec = FullyQualifiedExprShellExec;
export type NodeTypeInheritingFromFullyQualifiedExprStaticCall = FullyQualifiedExprStaticCall;
export type NodeTypeInheritingFromFullyQualifiedExprStaticPropertyFetch = FullyQualifiedExprStaticPropertyFetch;
export type NodeTypeInheritingFromFullyQualifiedExprTernary = FullyQualifiedExprTernary;
export type NodeTypeInheritingFromFullyQualifiedExprThrow = FullyQualifiedExprThrow;
export type NodeTypeInheritingFromFullyQualifiedExprUnaryMinus = FullyQualifiedExprUnaryMinus;
export type NodeTypeInheritingFromFullyQualifiedExprUnaryPlus = FullyQualifiedExprUnaryPlus;
export type NodeTypeInheritingFromFullyQualifiedExprVariable = FullyQualifiedExprVariable;
export type NodeTypeInheritingFromFullyQualifiedExprYieldFrom = FullyQualifiedExprYieldFrom;
export type NodeTypeInheritingFromFullyQualifiedExprYield = FullyQualifiedExprYield;
export type NodeTypeInheritingFromFullyQualifiedIdentifier = FullyQualifiedIdentifier | NodeTypeInheritingFromFullyQualifiedVarLikeIdentifier;
export type NodeTypeInheritingFromFullyQualifiedIntersectionType = FullyQualifiedIntersectionType;
export type NodeTypeInheritingFromFullyQualifiedMatchArm = FullyQualifiedMatchArm;
export type NodeTypeInheritingFromFullyQualifiedNameFullyQualified = FullyQualifiedNameFullyQualified;
export type NodeTypeInheritingFromFullyQualifiedName = FullyQualifiedName | NodeTypeInheritingFromFullyQualifiedNameFullyQualified | NodeTypeInheritingFromFullyQualifiedNameRelative;
export type NodeTypeInheritingFromFullyQualifiedNameRelative = FullyQualifiedNameRelative;
export type NodeTypeInheritingFromFullyQualifiedNullableType = FullyQualifiedNullableType;
export type NodeTypeInheritingFromFullyQualifiedParam = FullyQualifiedParam;
export type NodeTypeInheritingFromFullyQualifiedScalarDNumber = FullyQualifiedScalarDNumber;
export type NodeTypeInheritingFromFullyQualifiedScalar = FullyQualifiedScalar | NodeTypeInheritingFromFullyQualifiedScalarDNumber | NodeTypeInheritingFromFullyQualifiedScalarEncapsed | NodeTypeInheritingFromFullyQualifiedScalarEncapsedStringPart | NodeTypeInheritingFromFullyQualifiedScalarLNumber | NodeTypeInheritingFromFullyQualifiedScalarMagicConst | NodeTypeInheritingFromFullyQualifiedScalarString;
export type NodeTypeInheritingFromFullyQualifiedScalarEncapsed = FullyQualifiedScalarEncapsed;
export type NodeTypeInheritingFromFullyQualifiedScalarEncapsedStringPart = FullyQualifiedScalarEncapsedStringPart;
export type NodeTypeInheritingFromFullyQualifiedScalarLNumber = FullyQualifiedScalarLNumber;
export type NodeTypeInheritingFromFullyQualifiedScalarMagicConstClass = FullyQualifiedScalarMagicConstClass;
export type NodeTypeInheritingFromFullyQualifiedScalarMagicConst = FullyQualifiedScalarMagicConst | NodeTypeInheritingFromFullyQualifiedScalarMagicConstClass | NodeTypeInheritingFromFullyQualifiedScalarMagicConstDir | NodeTypeInheritingFromFullyQualifiedScalarMagicConstFile | NodeTypeInheritingFromFullyQualifiedScalarMagicConstFunction | NodeTypeInheritingFromFullyQualifiedScalarMagicConstLine | NodeTypeInheritingFromFullyQualifiedScalarMagicConstMethod | NodeTypeInheritingFromFullyQualifiedScalarMagicConstNamespace | NodeTypeInheritingFromFullyQualifiedScalarMagicConstTrait;
export type NodeTypeInheritingFromFullyQualifiedScalarMagicConstDir = FullyQualifiedScalarMagicConstDir;
export type NodeTypeInheritingFromFullyQualifiedScalarMagicConstFile = FullyQualifiedScalarMagicConstFile;
export type NodeTypeInheritingFromFullyQualifiedScalarMagicConstFunction = FullyQualifiedScalarMagicConstFunction;
export type NodeTypeInheritingFromFullyQualifiedScalarMagicConstLine = FullyQualifiedScalarMagicConstLine;
export type NodeTypeInheritingFromFullyQualifiedScalarMagicConstMethod = FullyQualifiedScalarMagicConstMethod;
export type NodeTypeInheritingFromFullyQualifiedScalarMagicConstNamespace = FullyQualifiedScalarMagicConstNamespace;
export type NodeTypeInheritingFromFullyQualifiedScalarMagicConstTrait = FullyQualifiedScalarMagicConstTrait;
export type NodeTypeInheritingFromFullyQualifiedScalarString = FullyQualifiedScalarString;
export type NodeTypeInheritingFromFullyQualifiedStmtBreak = FullyQualifiedStmtBreak;
export type NodeTypeInheritingFromFullyQualifiedStmt = FullyQualifiedStmt | NodeTypeInheritingFromFullyQualifiedStmtBreak | NodeTypeInheritingFromFullyQualifiedStmtCase | NodeTypeInheritingFromFullyQualifiedStmtCatch | NodeTypeInheritingFromFullyQualifiedStmtClassConst | NodeTypeInheritingFromFullyQualifiedStmtClassLike | NodeTypeInheritingFromFullyQualifiedStmtClassMethod | NodeTypeInheritingFromFullyQualifiedStmtConst | NodeTypeInheritingFromFullyQualifiedStmtContinue | NodeTypeInheritingFromFullyQualifiedStmtDeclareDeclare | NodeTypeInheritingFromFullyQualifiedStmtDeclare | NodeTypeInheritingFromFullyQualifiedStmtDo | NodeTypeInheritingFromFullyQualifiedStmtEcho | NodeTypeInheritingFromFullyQualifiedStmtElseIf | NodeTypeInheritingFromFullyQualifiedStmtElse | NodeTypeInheritingFromFullyQualifiedStmtEnumCase | NodeTypeInheritingFromFullyQualifiedStmtExpression | NodeTypeInheritingFromFullyQualifiedStmtFinally | NodeTypeInheritingFromFullyQualifiedStmtFor | NodeTypeInheritingFromFullyQualifiedStmtForeach | NodeTypeInheritingFromFullyQualifiedStmtFunction | NodeTypeInheritingFromFullyQualifiedStmtGlobal | NodeTypeInheritingFromFullyQualifiedStmtGoto | NodeTypeInheritingFromFullyQualifiedStmtGroupUse | NodeTypeInheritingFromFullyQualifiedStmtHaltCompiler | NodeTypeInheritingFromFullyQualifiedStmtIf | NodeTypeInheritingFromFullyQualifiedStmtInlineHtml | NodeTypeInheritingFromFullyQualifiedStmtLabel | NodeTypeInheritingFromFullyQualifiedStmtNamespace | NodeTypeInheritingFromFullyQualifiedStmtNop | NodeTypeInheritingFromFullyQualifiedStmtProperty | NodeTypeInheritingFromFullyQualifiedStmtPropertyProperty | NodeTypeInheritingFromFullyQualifiedStmtReturn | NodeTypeInheritingFromFullyQualifiedStmtStaticVar | NodeTypeInheritingFromFullyQualifiedStmtStatic | NodeTypeInheritingFromFullyQualifiedStmtSwitch | NodeTypeInheritingFromFullyQualifiedStmtThrow | NodeTypeInheritingFromFullyQualifiedStmtTraitUse | NodeTypeInheritingFromFullyQualifiedStmtTraitUseAdaptation | NodeTypeInheritingFromFullyQualifiedStmtTryCatch | NodeTypeInheritingFromFullyQualifiedStmtUnset | NodeTypeInheritingFromFullyQualifiedStmtUseUse | NodeTypeInheritingFromFullyQualifiedStmtUse | NodeTypeInheritingFromFullyQualifiedStmtWhile;
export type NodeTypeInheritingFromFullyQualifiedStmtCase = FullyQualifiedStmtCase;
export type NodeTypeInheritingFromFullyQualifiedStmtCatch = FullyQualifiedStmtCatch;
export type NodeTypeInheritingFromFullyQualifiedStmtClassConst = FullyQualifiedStmtClassConst;
export type NodeTypeInheritingFromFullyQualifiedStmtClassLike = FullyQualifiedStmtClassLike | NodeTypeInheritingFromFullyQualifiedStmtClass | NodeTypeInheritingFromFullyQualifiedStmtEnum | NodeTypeInheritingFromFullyQualifiedStmtInterface | NodeTypeInheritingFromFullyQualifiedStmtTrait;
export type NodeTypeInheritingFromFullyQualifiedStmtClassMethod = FullyQualifiedStmtClassMethod;
export type NodeTypeInheritingFromFullyQualifiedStmtClass = FullyQualifiedStmtClass;
export type NodeTypeInheritingFromFullyQualifiedStmtConst = FullyQualifiedStmtConst;
export type NodeTypeInheritingFromFullyQualifiedStmtContinue = FullyQualifiedStmtContinue;
export type NodeTypeInheritingFromFullyQualifiedStmtDeclareDeclare = FullyQualifiedStmtDeclareDeclare;
export type NodeTypeInheritingFromFullyQualifiedStmtDeclare = FullyQualifiedStmtDeclare;
export type NodeTypeInheritingFromFullyQualifiedStmtDo = FullyQualifiedStmtDo;
export type NodeTypeInheritingFromFullyQualifiedStmtEcho = FullyQualifiedStmtEcho;
export type NodeTypeInheritingFromFullyQualifiedStmtElseIf = FullyQualifiedStmtElseIf;
export type NodeTypeInheritingFromFullyQualifiedStmtElse = FullyQualifiedStmtElse;
export type NodeTypeInheritingFromFullyQualifiedStmtEnumCase = FullyQualifiedStmtEnumCase;
export type NodeTypeInheritingFromFullyQualifiedStmtEnum = FullyQualifiedStmtEnum;
export type NodeTypeInheritingFromFullyQualifiedStmtExpression = FullyQualifiedStmtExpression;
export type NodeTypeInheritingFromFullyQualifiedStmtFinally = FullyQualifiedStmtFinally;
export type NodeTypeInheritingFromFullyQualifiedStmtFor = FullyQualifiedStmtFor;
export type NodeTypeInheritingFromFullyQualifiedStmtForeach = FullyQualifiedStmtForeach;
export type NodeTypeInheritingFromFullyQualifiedStmtFunction = FullyQualifiedStmtFunction;
export type NodeTypeInheritingFromFullyQualifiedStmtGlobal = FullyQualifiedStmtGlobal;
export type NodeTypeInheritingFromFullyQualifiedStmtGoto = FullyQualifiedStmtGoto;
export type NodeTypeInheritingFromFullyQualifiedStmtGroupUse = FullyQualifiedStmtGroupUse;
export type NodeTypeInheritingFromFullyQualifiedStmtHaltCompiler = FullyQualifiedStmtHaltCompiler;
export type NodeTypeInheritingFromFullyQualifiedStmtIf = FullyQualifiedStmtIf;
export type NodeTypeInheritingFromFullyQualifiedStmtInlineHtml = FullyQualifiedStmtInlineHtml;
export type NodeTypeInheritingFromFullyQualifiedStmtInterface = FullyQualifiedStmtInterface;
export type NodeTypeInheritingFromFullyQualifiedStmtLabel = FullyQualifiedStmtLabel;
export type NodeTypeInheritingFromFullyQualifiedStmtNamespace = FullyQualifiedStmtNamespace;
export type NodeTypeInheritingFromFullyQualifiedStmtNop = FullyQualifiedStmtNop;
export type NodeTypeInheritingFromFullyQualifiedStmtProperty = FullyQualifiedStmtProperty;
export type NodeTypeInheritingFromFullyQualifiedStmtPropertyProperty = FullyQualifiedStmtPropertyProperty;
export type NodeTypeInheritingFromFullyQualifiedStmtReturn = FullyQualifiedStmtReturn;
export type NodeTypeInheritingFromFullyQualifiedStmtStaticVar = FullyQualifiedStmtStaticVar;
export type NodeTypeInheritingFromFullyQualifiedStmtStatic = FullyQualifiedStmtStatic;
export type NodeTypeInheritingFromFullyQualifiedStmtSwitch = FullyQualifiedStmtSwitch;
export type NodeTypeInheritingFromFullyQualifiedStmtThrow = FullyQualifiedStmtThrow;
export type NodeTypeInheritingFromFullyQualifiedStmtTraitUse = FullyQualifiedStmtTraitUse;
export type NodeTypeInheritingFromFullyQualifiedStmtTraitUseAdaptationAlias = FullyQualifiedStmtTraitUseAdaptationAlias;
export type NodeTypeInheritingFromFullyQualifiedStmtTraitUseAdaptation = FullyQualifiedStmtTraitUseAdaptation | NodeTypeInheritingFromFullyQualifiedStmtTraitUseAdaptationAlias | NodeTypeInheritingFromFullyQualifiedStmtTraitUseAdaptationPrecedence;
export type NodeTypeInheritingFromFullyQualifiedStmtTraitUseAdaptationPrecedence = FullyQualifiedStmtTraitUseAdaptationPrecedence;
export type NodeTypeInheritingFromFullyQualifiedStmtTrait = FullyQualifiedStmtTrait;
export type NodeTypeInheritingFromFullyQualifiedStmtTryCatch = FullyQualifiedStmtTryCatch;
export type NodeTypeInheritingFromFullyQualifiedStmtUnset = FullyQualifiedStmtUnset;
export type NodeTypeInheritingFromFullyQualifiedStmtUseUse = FullyQualifiedStmtUseUse;
export type NodeTypeInheritingFromFullyQualifiedStmtUse = FullyQualifiedStmtUse;
export type NodeTypeInheritingFromFullyQualifiedStmtWhile = FullyQualifiedStmtWhile;
export type NodeTypeInheritingFromFullyQualifiedUnionType = FullyQualifiedUnionType;
export type NodeTypeInheritingFromFullyQualifiedVarLikeIdentifier = FullyQualifiedVarLikeIdentifier;
export type NodeTypeInheritingFromFullyQualifiedVariadicPlaceholder = FullyQualifiedVariadicPlaceholder;

export { FullyQualifiedArg } from './node/arg';
export { NodeAbstract } from './node';
export { FullyQualifiedAttribute } from './node/attribute';
export { FullyQualifiedAttributeGroup } from './node/attribute-group';
export { FullyQualifiedComplexType } from './node/complex-type';
export { FullyQualifiedConst } from './node/const';
export { FullyQualifiedExprArrayDimFetch } from './node/expr/array-dim-fetch';
export { FullyQualifiedExpr } from './node/expr';
export { FullyQualifiedExprArrayItem } from './node/expr/array-item';
export { FullyQualifiedExprArray } from './node/expr/array';
export { FullyQualifiedExprArrowFunction } from './node/expr/arrow-function';
export { FullyQualifiedExprAssign } from './node/expr/assign';
export { FullyQualifiedExprAssignOpBitwiseAnd } from './node/expr/assign-op/bitwise-and';
export { FullyQualifiedExprAssignOp } from './node/expr/assign-op';
export { FullyQualifiedExprAssignOpBitwiseOr } from './node/expr/assign-op/bitwise-or';
export { FullyQualifiedExprAssignOpBitwiseXor } from './node/expr/assign-op/bitwise-xor';
export { FullyQualifiedExprAssignOpCoalesce } from './node/expr/assign-op/coalesce';
export { FullyQualifiedExprAssignOpConcat } from './node/expr/assign-op/concat';
export { FullyQualifiedExprAssignOpDiv } from './node/expr/assign-op/div';
export { FullyQualifiedExprAssignOpMinus } from './node/expr/assign-op/minus';
export { FullyQualifiedExprAssignOpMod } from './node/expr/assign-op/mod';
export { FullyQualifiedExprAssignOpMul } from './node/expr/assign-op/mul';
export { FullyQualifiedExprAssignOpPlus } from './node/expr/assign-op/plus';
export { FullyQualifiedExprAssignOpPow } from './node/expr/assign-op/pow';
export { FullyQualifiedExprAssignOpShiftLeft } from './node/expr/assign-op/shift-left';
export { FullyQualifiedExprAssignOpShiftRight } from './node/expr/assign-op/shift-right';
export { FullyQualifiedExprAssignRef } from './node/expr/assign-ref';
export { FullyQualifiedExprBinaryOpBitwiseAnd } from './node/expr/binary-op/bitwise-and';
export { FullyQualifiedExprBinaryOp } from './node/expr/binary-op';
export { FullyQualifiedExprBinaryOpBitwiseOr } from './node/expr/binary-op/bitwise-or';
export { FullyQualifiedExprBinaryOpBitwiseXor } from './node/expr/binary-op/bitwise-xor';
export { FullyQualifiedExprBinaryOpBooleanAnd } from './node/expr/binary-op/boolean-and';
export { FullyQualifiedExprBinaryOpBooleanOr } from './node/expr/binary-op/boolean-or';
export { FullyQualifiedExprBinaryOpCoalesce } from './node/expr/binary-op/coalesce';
export { FullyQualifiedExprBinaryOpConcat } from './node/expr/binary-op/concat';
export { FullyQualifiedExprBinaryOpDiv } from './node/expr/binary-op/div';
export { FullyQualifiedExprBinaryOpEqual } from './node/expr/binary-op/equal';
export { FullyQualifiedExprBinaryOpGreater } from './node/expr/binary-op/greater';
export { FullyQualifiedExprBinaryOpGreaterOrEqual } from './node/expr/binary-op/greater-or-equal';
export { FullyQualifiedExprBinaryOpIdentical } from './node/expr/binary-op/identical';
export { FullyQualifiedExprBinaryOpLogicalAnd } from './node/expr/binary-op/logical-and';
export { FullyQualifiedExprBinaryOpLogicalOr } from './node/expr/binary-op/logical-or';
export { FullyQualifiedExprBinaryOpLogicalXor } from './node/expr/binary-op/logical-xor';
export { FullyQualifiedExprBinaryOpMinus } from './node/expr/binary-op/minus';
export { FullyQualifiedExprBinaryOpMod } from './node/expr/binary-op/mod';
export { FullyQualifiedExprBinaryOpMul } from './node/expr/binary-op/mul';
export { FullyQualifiedExprBinaryOpNotEqual } from './node/expr/binary-op/not-equal';
export { FullyQualifiedExprBinaryOpNotIdentical } from './node/expr/binary-op/not-identical';
export { FullyQualifiedExprBinaryOpPlus } from './node/expr/binary-op/plus';
export { FullyQualifiedExprBinaryOpPow } from './node/expr/binary-op/pow';
export { FullyQualifiedExprBinaryOpShiftLeft } from './node/expr/binary-op/shift-left';
export { FullyQualifiedExprBinaryOpShiftRight } from './node/expr/binary-op/shift-right';
export { FullyQualifiedExprBinaryOpSmaller } from './node/expr/binary-op/smaller';
export { FullyQualifiedExprBinaryOpSmallerOrEqual } from './node/expr/binary-op/smaller-or-equal';
export { FullyQualifiedExprBinaryOpSpaceship } from './node/expr/binary-op/spaceship';
export { FullyQualifiedExprBitwiseNot } from './node/expr/bitwise-not';
export { FullyQualifiedExprBooleanNot } from './node/expr/boolean-not';
export { FullyQualifiedExprCallLike } from './node/expr/call-like';
export { FullyQualifiedExprCastArray } from './node/expr/cast/array';
export { FullyQualifiedExprCast } from './node/expr/cast';
export { FullyQualifiedExprCastBool } from './node/expr/cast/bool';
export { FullyQualifiedExprCastDouble } from './node/expr/cast/double';
export { FullyQualifiedExprCastInt } from './node/expr/cast/int';
export { FullyQualifiedExprCastObject } from './node/expr/cast/object';
export { FullyQualifiedExprCastString } from './node/expr/cast/string';
export { FullyQualifiedExprCastUnset } from './node/expr/cast/unset';
export { FullyQualifiedExprClassConstFetch } from './node/expr/class-const-fetch';
export { FullyQualifiedExprClone } from './node/expr/clone';
export { FullyQualifiedExprClosure } from './node/expr/closure';
export { FullyQualifiedExprClosureUse } from './node/expr/closure-use';
export { FullyQualifiedExprConstFetch } from './node/expr/const-fetch';
export { FullyQualifiedExprEmpty } from './node/expr/empty';
export { FullyQualifiedExprError } from './node/expr/error';
export { FullyQualifiedExprErrorSuppress } from './node/expr/error-suppress';
export { FullyQualifiedExprEval } from './node/expr/eval';
export { FullyQualifiedExprExit } from './node/expr/exit';
export { FullyQualifiedExprFuncCall } from './node/expr/func-call';
export { FullyQualifiedExprInclude } from './node/expr/include';
export { FullyQualifiedExprInstanceof } from './node/expr/instanceof';
export { FullyQualifiedExprIsset } from './node/expr/isset';
export { FullyQualifiedExprList } from './node/expr/list';
export { FullyQualifiedExprMatch } from './node/expr/match';
export { FullyQualifiedExprMethodCall } from './node/expr/method-call';
export { FullyQualifiedExprNew } from './node/expr/new';
export { FullyQualifiedExprNullsafeMethodCall } from './node/expr/nullsafe-method-call';
export { FullyQualifiedExprNullsafePropertyFetch } from './node/expr/nullsafe-property-fetch';
export { FullyQualifiedExprPostDec } from './node/expr/post-dec';
export { FullyQualifiedExprPostInc } from './node/expr/post-inc';
export { FullyQualifiedExprPreDec } from './node/expr/pre-dec';
export { FullyQualifiedExprPreInc } from './node/expr/pre-inc';
export { FullyQualifiedExprPrint } from './node/expr/print';
export { FullyQualifiedExprPropertyFetch } from './node/expr/property-fetch';
export { FullyQualifiedExprShellExec } from './node/expr/shell-exec';
export { FullyQualifiedExprStaticCall } from './node/expr/static-call';
export { FullyQualifiedExprStaticPropertyFetch } from './node/expr/static-property-fetch';
export { FullyQualifiedExprTernary } from './node/expr/ternary';
export { FullyQualifiedExprThrow } from './node/expr/throw';
export { FullyQualifiedExprUnaryMinus } from './node/expr/unary-minus';
export { FullyQualifiedExprUnaryPlus } from './node/expr/unary-plus';
export { FullyQualifiedExprVariable } from './node/expr/variable';
export { FullyQualifiedExprYieldFrom } from './node/expr/yield-from';
export { FullyQualifiedExprYield } from './node/expr/yield';
export { FullyQualifiedIdentifier } from './node/identifier';
export { FullyQualifiedIntersectionType } from './node/intersection-type';
export { FullyQualifiedMatchArm } from './node/match-arm';
export { FullyQualifiedNameFullyQualified } from './node/name/fully-qualified';
export { FullyQualifiedName } from './node/name';
export { FullyQualifiedNameRelative } from './node/name/relative';
export { FullyQualifiedNullableType } from './node/nullable-type';
export { FullyQualifiedParam } from './node/param';
export { FullyQualifiedScalarDNumber } from './node/scalar/d-number';
export { FullyQualifiedScalar } from './node/scalar';
export { FullyQualifiedScalarEncapsed } from './node/scalar/encapsed';
export { FullyQualifiedScalarEncapsedStringPart } from './node/scalar/encapsed-string-part';
export { FullyQualifiedScalarLNumber } from './node/scalar/l-number';
export { FullyQualifiedScalarMagicConstClass } from './node/scalar/magic-const/class';
export { FullyQualifiedScalarMagicConst } from './node/scalar/magic-const';
export { FullyQualifiedScalarMagicConstDir } from './node/scalar/magic-const/dir';
export { FullyQualifiedScalarMagicConstFile } from './node/scalar/magic-const/file';
export { FullyQualifiedScalarMagicConstFunction } from './node/scalar/magic-const/function';
export { FullyQualifiedScalarMagicConstLine } from './node/scalar/magic-const/line';
export { FullyQualifiedScalarMagicConstMethod } from './node/scalar/magic-const/method';
export { FullyQualifiedScalarMagicConstNamespace } from './node/scalar/magic-const/namespace';
export { FullyQualifiedScalarMagicConstTrait } from './node/scalar/magic-const/trait';
export { FullyQualifiedScalarString } from './node/scalar/string';
export { FullyQualifiedStmtBreak } from './node/stmt/break';
export { FullyQualifiedStmt } from './node/stmt';
export { FullyQualifiedStmtCase } from './node/stmt/case';
export { FullyQualifiedStmtCatch } from './node/stmt/catch';
export { FullyQualifiedStmtClassConst } from './node/stmt/class-const';
export { FullyQualifiedStmtClassLike } from './node/stmt/class-like';
export { FullyQualifiedStmtClassMethod } from './node/stmt/class-method';
export { FullyQualifiedStmtClass } from './node/stmt/class';
export { FullyQualifiedStmtConst } from './node/stmt/const';
export { FullyQualifiedStmtContinue } from './node/stmt/continue';
export { FullyQualifiedStmtDeclareDeclare } from './node/stmt/declare-declare';
export { FullyQualifiedStmtDeclare } from './node/stmt/declare';
export { FullyQualifiedStmtDo } from './node/stmt/do';
export { FullyQualifiedStmtEcho } from './node/stmt/echo';
export { FullyQualifiedStmtElseIf } from './node/stmt/else-if';
export { FullyQualifiedStmtElse } from './node/stmt/else';
export { FullyQualifiedStmtEnumCase } from './node/stmt/enum-case';
export { FullyQualifiedStmtEnum } from './node/stmt/enum';
export { FullyQualifiedStmtExpression } from './node/stmt/expression';
export { FullyQualifiedStmtFinally } from './node/stmt/finally';
export { FullyQualifiedStmtFor } from './node/stmt/for';
export { FullyQualifiedStmtForeach } from './node/stmt/foreach';
export { FullyQualifiedStmtFunction } from './node/stmt/function';
export { FullyQualifiedStmtGlobal } from './node/stmt/global';
export { FullyQualifiedStmtGoto } from './node/stmt/goto';
export { FullyQualifiedStmtGroupUse } from './node/stmt/group-use';
export { FullyQualifiedStmtHaltCompiler } from './node/stmt/halt-compiler';
export { FullyQualifiedStmtIf } from './node/stmt/if';
export { FullyQualifiedStmtInlineHtml } from './node/stmt/inline-html';
export { FullyQualifiedStmtInterface } from './node/stmt/interface';
export { FullyQualifiedStmtLabel } from './node/stmt/label';
export { FullyQualifiedStmtNamespace } from './node/stmt/namespace';
export { FullyQualifiedStmtNop } from './node/stmt/nop';
export { FullyQualifiedStmtProperty } from './node/stmt/property';
export { FullyQualifiedStmtPropertyProperty } from './node/stmt/property-property';
export { FullyQualifiedStmtReturn } from './node/stmt/return';
export { FullyQualifiedStmtStaticVar } from './node/stmt/static-var';
export { FullyQualifiedStmtStatic } from './node/stmt/static';
export { FullyQualifiedStmtSwitch } from './node/stmt/switch';
export { FullyQualifiedStmtThrow } from './node/stmt/throw';
export { FullyQualifiedStmtTraitUse } from './node/stmt/trait-use';
export { FullyQualifiedStmtTraitUseAdaptationAlias } from './node/stmt/trait-use-adaptation/alias';
export { FullyQualifiedStmtTraitUseAdaptation } from './node/stmt/trait-use-adaptation';
export { FullyQualifiedStmtTraitUseAdaptationPrecedence } from './node/stmt/trait-use-adaptation/precedence';
export { FullyQualifiedStmtTrait } from './node/stmt/trait';
export { FullyQualifiedStmtTryCatch } from './node/stmt/try-catch';
export { FullyQualifiedStmtUnset } from './node/stmt/unset';
export { FullyQualifiedStmtUseUse } from './node/stmt/use-use';
export { FullyQualifiedStmtUse } from './node/stmt/use';
export { FullyQualifiedStmtWhile } from './node/stmt/while';
export { FullyQualifiedUnionType } from './node/union-type';
export { FullyQualifiedVarLikeIdentifier } from './node/var-like-identifier';
export { FullyQualifiedVariadicPlaceholder } from './node/variadic-placeholder';


export enum NodeType {
  Arg = 'Arg',
  Attribute = 'Attribute',
  AttributeGroup = 'AttributeGroup',
  Const = 'Const',
  Expr_ArrayDimFetch = 'Expr_ArrayDimFetch',
  Expr_ArrayItem = 'Expr_ArrayItem',
  Expr_Array = 'Expr_Array',
  Expr_ArrowFunction = 'Expr_ArrowFunction',
  Expr_Assign = 'Expr_Assign',
  Expr_AssignOp_BitwiseAnd = 'Expr_AssignOp_BitwiseAnd',
  Expr_AssignOp_BitwiseOr = 'Expr_AssignOp_BitwiseOr',
  Expr_AssignOp_BitwiseXor = 'Expr_AssignOp_BitwiseXor',
  Expr_AssignOp_Coalesce = 'Expr_AssignOp_Coalesce',
  Expr_AssignOp_Concat = 'Expr_AssignOp_Concat',
  Expr_AssignOp_Div = 'Expr_AssignOp_Div',
  Expr_AssignOp_Minus = 'Expr_AssignOp_Minus',
  Expr_AssignOp_Mod = 'Expr_AssignOp_Mod',
  Expr_AssignOp_Mul = 'Expr_AssignOp_Mul',
  Expr_AssignOp_Plus = 'Expr_AssignOp_Plus',
  Expr_AssignOp_Pow = 'Expr_AssignOp_Pow',
  Expr_AssignOp_ShiftLeft = 'Expr_AssignOp_ShiftLeft',
  Expr_AssignOp_ShiftRight = 'Expr_AssignOp_ShiftRight',
  Expr_AssignRef = 'Expr_AssignRef',
  Expr_BinaryOp_BitwiseAnd = 'Expr_BinaryOp_BitwiseAnd',
  Expr_BinaryOp_BitwiseOr = 'Expr_BinaryOp_BitwiseOr',
  Expr_BinaryOp_BitwiseXor = 'Expr_BinaryOp_BitwiseXor',
  Expr_BinaryOp_BooleanAnd = 'Expr_BinaryOp_BooleanAnd',
  Expr_BinaryOp_BooleanOr = 'Expr_BinaryOp_BooleanOr',
  Expr_BinaryOp_Coalesce = 'Expr_BinaryOp_Coalesce',
  Expr_BinaryOp_Concat = 'Expr_BinaryOp_Concat',
  Expr_BinaryOp_Div = 'Expr_BinaryOp_Div',
  Expr_BinaryOp_Equal = 'Expr_BinaryOp_Equal',
  Expr_BinaryOp_Greater = 'Expr_BinaryOp_Greater',
  Expr_BinaryOp_GreaterOrEqual = 'Expr_BinaryOp_GreaterOrEqual',
  Expr_BinaryOp_Identical = 'Expr_BinaryOp_Identical',
  Expr_BinaryOp_LogicalAnd = 'Expr_BinaryOp_LogicalAnd',
  Expr_BinaryOp_LogicalOr = 'Expr_BinaryOp_LogicalOr',
  Expr_BinaryOp_LogicalXor = 'Expr_BinaryOp_LogicalXor',
  Expr_BinaryOp_Minus = 'Expr_BinaryOp_Minus',
  Expr_BinaryOp_Mod = 'Expr_BinaryOp_Mod',
  Expr_BinaryOp_Mul = 'Expr_BinaryOp_Mul',
  Expr_BinaryOp_NotEqual = 'Expr_BinaryOp_NotEqual',
  Expr_BinaryOp_NotIdentical = 'Expr_BinaryOp_NotIdentical',
  Expr_BinaryOp_Plus = 'Expr_BinaryOp_Plus',
  Expr_BinaryOp_Pow = 'Expr_BinaryOp_Pow',
  Expr_BinaryOp_ShiftLeft = 'Expr_BinaryOp_ShiftLeft',
  Expr_BinaryOp_ShiftRight = 'Expr_BinaryOp_ShiftRight',
  Expr_BinaryOp_Smaller = 'Expr_BinaryOp_Smaller',
  Expr_BinaryOp_SmallerOrEqual = 'Expr_BinaryOp_SmallerOrEqual',
  Expr_BinaryOp_Spaceship = 'Expr_BinaryOp_Spaceship',
  Expr_BitwiseNot = 'Expr_BitwiseNot',
  Expr_BooleanNot = 'Expr_BooleanNot',
  Expr_Cast_Array = 'Expr_Cast_Array',
  Expr_Cast_Bool = 'Expr_Cast_Bool',
  Expr_Cast_Double = 'Expr_Cast_Double',
  Expr_Cast_Int = 'Expr_Cast_Int',
  Expr_Cast_Object = 'Expr_Cast_Object',
  Expr_Cast_String = 'Expr_Cast_String',
  Expr_Cast_Unset = 'Expr_Cast_Unset',
  Expr_ClassConstFetch = 'Expr_ClassConstFetch',
  Expr_Clone = 'Expr_Clone',
  Expr_Closure = 'Expr_Closure',
  Expr_ClosureUse = 'Expr_ClosureUse',
  Expr_ConstFetch = 'Expr_ConstFetch',
  Expr_Empty = 'Expr_Empty',
  Expr_Error = 'Expr_Error',
  Expr_ErrorSuppress = 'Expr_ErrorSuppress',
  Expr_Eval = 'Expr_Eval',
  Expr_Exit = 'Expr_Exit',
  Expr_FuncCall = 'Expr_FuncCall',
  Expr_Include = 'Expr_Include',
  Expr_Instanceof = 'Expr_Instanceof',
  Expr_Isset = 'Expr_Isset',
  Expr_List = 'Expr_List',
  Expr_Match = 'Expr_Match',
  Expr_MethodCall = 'Expr_MethodCall',
  Expr_New = 'Expr_New',
  Expr_NullsafeMethodCall = 'Expr_NullsafeMethodCall',
  Expr_NullsafePropertyFetch = 'Expr_NullsafePropertyFetch',
  Expr_PostDec = 'Expr_PostDec',
  Expr_PostInc = 'Expr_PostInc',
  Expr_PreDec = 'Expr_PreDec',
  Expr_PreInc = 'Expr_PreInc',
  Expr_Print = 'Expr_Print',
  Expr_PropertyFetch = 'Expr_PropertyFetch',
  Expr_ShellExec = 'Expr_ShellExec',
  Expr_StaticCall = 'Expr_StaticCall',
  Expr_StaticPropertyFetch = 'Expr_StaticPropertyFetch',
  Expr_Ternary = 'Expr_Ternary',
  Expr_Throw = 'Expr_Throw',
  Expr_UnaryMinus = 'Expr_UnaryMinus',
  Expr_UnaryPlus = 'Expr_UnaryPlus',
  Expr_Variable = 'Expr_Variable',
  Expr_YieldFrom = 'Expr_YieldFrom',
  Expr_Yield = 'Expr_Yield',
  Identifier = 'Identifier',
  IntersectionType = 'IntersectionType',
  MatchArm = 'MatchArm',
  Name_FullyQualified = 'Name_FullyQualified',
  Name = 'Name',
  Name_Relative = 'Name_Relative',
  NullableType = 'NullableType',
  Param = 'Param',
  Scalar_DNumber = 'Scalar_DNumber',
  Scalar_Encapsed = 'Scalar_Encapsed',
  Scalar_EncapsedStringPart = 'Scalar_EncapsedStringPart',
  Scalar_LNumber = 'Scalar_LNumber',
  Scalar_MagicConst_Class = 'Scalar_MagicConst_Class',
  Scalar_MagicConst_Dir = 'Scalar_MagicConst_Dir',
  Scalar_MagicConst_File = 'Scalar_MagicConst_File',
  Scalar_MagicConst_Function = 'Scalar_MagicConst_Function',
  Scalar_MagicConst_Line = 'Scalar_MagicConst_Line',
  Scalar_MagicConst_Method = 'Scalar_MagicConst_Method',
  Scalar_MagicConst_Namespace = 'Scalar_MagicConst_Namespace',
  Scalar_MagicConst_Trait = 'Scalar_MagicConst_Trait',
  Scalar_String = 'Scalar_String',
  Stmt_Break = 'Stmt_Break',
  Stmt_Case = 'Stmt_Case',
  Stmt_Catch = 'Stmt_Catch',
  Stmt_ClassConst = 'Stmt_ClassConst',
  Stmt_ClassMethod = 'Stmt_ClassMethod',
  Stmt_Class = 'Stmt_Class',
  Stmt_Const = 'Stmt_Const',
  Stmt_Continue = 'Stmt_Continue',
  Stmt_DeclareDeclare = 'Stmt_DeclareDeclare',
  Stmt_Declare = 'Stmt_Declare',
  Stmt_Do = 'Stmt_Do',
  Stmt_Echo = 'Stmt_Echo',
  Stmt_ElseIf = 'Stmt_ElseIf',
  Stmt_Else = 'Stmt_Else',
  Stmt_EnumCase = 'Stmt_EnumCase',
  Stmt_Enum = 'Stmt_Enum',
  Stmt_Expression = 'Stmt_Expression',
  Stmt_Finally = 'Stmt_Finally',
  Stmt_For = 'Stmt_For',
  Stmt_Foreach = 'Stmt_Foreach',
  Stmt_Function = 'Stmt_Function',
  Stmt_Global = 'Stmt_Global',
  Stmt_Goto = 'Stmt_Goto',
  Stmt_GroupUse = 'Stmt_GroupUse',
  Stmt_HaltCompiler = 'Stmt_HaltCompiler',
  Stmt_If = 'Stmt_If',
  Stmt_InlineHTML = 'Stmt_InlineHTML',
  Stmt_Interface = 'Stmt_Interface',
  Stmt_Label = 'Stmt_Label',
  Stmt_Namespace = 'Stmt_Namespace',
  Stmt_Nop = 'Stmt_Nop',
  Stmt_Property = 'Stmt_Property',
  Stmt_PropertyProperty = 'Stmt_PropertyProperty',
  Stmt_Return = 'Stmt_Return',
  Stmt_StaticVar = 'Stmt_StaticVar',
  Stmt_Static = 'Stmt_Static',
  Stmt_Switch = 'Stmt_Switch',
  Stmt_Throw = 'Stmt_Throw',
  Stmt_TraitUse = 'Stmt_TraitUse',
  Stmt_TraitUseAdaptation_Alias = 'Stmt_TraitUseAdaptation_Alias',
  Stmt_TraitUseAdaptation_Precedence = 'Stmt_TraitUseAdaptation_Precedence',
  Stmt_Trait = 'Stmt_Trait',
  Stmt_TryCatch = 'Stmt_TryCatch',
  Stmt_Unset = 'Stmt_Unset',
  Stmt_UseUse = 'Stmt_UseUse',
  Stmt_Use = 'Stmt_Use',
  Stmt_While = 'Stmt_While',
  UnionType = 'UnionType',
  VarLikeIdentifier = 'VarLikeIdentifier',
  VariadicPlaceholder = 'VariadicPlaceholder',
}
;

export interface NodeTypeToInterfaceMap {
  [NodeType.Arg]: FullyQualifiedArg;
  [NodeType.Attribute]: FullyQualifiedAttribute;
  [NodeType.AttributeGroup]: FullyQualifiedAttributeGroup;
  [NodeType.Const]: FullyQualifiedConst;
  [NodeType.Expr_ArrayDimFetch]: FullyQualifiedExprArrayDimFetch;
  [NodeType.Expr_ArrayItem]: FullyQualifiedExprArrayItem;
  [NodeType.Expr_Array]: FullyQualifiedExprArray;
  [NodeType.Expr_ArrowFunction]: FullyQualifiedExprArrowFunction;
  [NodeType.Expr_Assign]: FullyQualifiedExprAssign;
  [NodeType.Expr_AssignOp_BitwiseAnd]: FullyQualifiedExprAssignOpBitwiseAnd;
  [NodeType.Expr_AssignOp_BitwiseOr]: FullyQualifiedExprAssignOpBitwiseOr;
  [NodeType.Expr_AssignOp_BitwiseXor]: FullyQualifiedExprAssignOpBitwiseXor;
  [NodeType.Expr_AssignOp_Coalesce]: FullyQualifiedExprAssignOpCoalesce;
  [NodeType.Expr_AssignOp_Concat]: FullyQualifiedExprAssignOpConcat;
  [NodeType.Expr_AssignOp_Div]: FullyQualifiedExprAssignOpDiv;
  [NodeType.Expr_AssignOp_Minus]: FullyQualifiedExprAssignOpMinus;
  [NodeType.Expr_AssignOp_Mod]: FullyQualifiedExprAssignOpMod;
  [NodeType.Expr_AssignOp_Mul]: FullyQualifiedExprAssignOpMul;
  [NodeType.Expr_AssignOp_Plus]: FullyQualifiedExprAssignOpPlus;
  [NodeType.Expr_AssignOp_Pow]: FullyQualifiedExprAssignOpPow;
  [NodeType.Expr_AssignOp_ShiftLeft]: FullyQualifiedExprAssignOpShiftLeft;
  [NodeType.Expr_AssignOp_ShiftRight]: FullyQualifiedExprAssignOpShiftRight;
  [NodeType.Expr_AssignRef]: FullyQualifiedExprAssignRef;
  [NodeType.Expr_BinaryOp_BitwiseAnd]: FullyQualifiedExprBinaryOpBitwiseAnd;
  [NodeType.Expr_BinaryOp_BitwiseOr]: FullyQualifiedExprBinaryOpBitwiseOr;
  [NodeType.Expr_BinaryOp_BitwiseXor]: FullyQualifiedExprBinaryOpBitwiseXor;
  [NodeType.Expr_BinaryOp_BooleanAnd]: FullyQualifiedExprBinaryOpBooleanAnd;
  [NodeType.Expr_BinaryOp_BooleanOr]: FullyQualifiedExprBinaryOpBooleanOr;
  [NodeType.Expr_BinaryOp_Coalesce]: FullyQualifiedExprBinaryOpCoalesce;
  [NodeType.Expr_BinaryOp_Concat]: FullyQualifiedExprBinaryOpConcat;
  [NodeType.Expr_BinaryOp_Div]: FullyQualifiedExprBinaryOpDiv;
  [NodeType.Expr_BinaryOp_Equal]: FullyQualifiedExprBinaryOpEqual;
  [NodeType.Expr_BinaryOp_Greater]: FullyQualifiedExprBinaryOpGreater;
  [NodeType.Expr_BinaryOp_GreaterOrEqual]: FullyQualifiedExprBinaryOpGreaterOrEqual;
  [NodeType.Expr_BinaryOp_Identical]: FullyQualifiedExprBinaryOpIdentical;
  [NodeType.Expr_BinaryOp_LogicalAnd]: FullyQualifiedExprBinaryOpLogicalAnd;
  [NodeType.Expr_BinaryOp_LogicalOr]: FullyQualifiedExprBinaryOpLogicalOr;
  [NodeType.Expr_BinaryOp_LogicalXor]: FullyQualifiedExprBinaryOpLogicalXor;
  [NodeType.Expr_BinaryOp_Minus]: FullyQualifiedExprBinaryOpMinus;
  [NodeType.Expr_BinaryOp_Mod]: FullyQualifiedExprBinaryOpMod;
  [NodeType.Expr_BinaryOp_Mul]: FullyQualifiedExprBinaryOpMul;
  [NodeType.Expr_BinaryOp_NotEqual]: FullyQualifiedExprBinaryOpNotEqual;
  [NodeType.Expr_BinaryOp_NotIdentical]: FullyQualifiedExprBinaryOpNotIdentical;
  [NodeType.Expr_BinaryOp_Plus]: FullyQualifiedExprBinaryOpPlus;
  [NodeType.Expr_BinaryOp_Pow]: FullyQualifiedExprBinaryOpPow;
  [NodeType.Expr_BinaryOp_ShiftLeft]: FullyQualifiedExprBinaryOpShiftLeft;
  [NodeType.Expr_BinaryOp_ShiftRight]: FullyQualifiedExprBinaryOpShiftRight;
  [NodeType.Expr_BinaryOp_Smaller]: FullyQualifiedExprBinaryOpSmaller;
  [NodeType.Expr_BinaryOp_SmallerOrEqual]: FullyQualifiedExprBinaryOpSmallerOrEqual;
  [NodeType.Expr_BinaryOp_Spaceship]: FullyQualifiedExprBinaryOpSpaceship;
  [NodeType.Expr_BitwiseNot]: FullyQualifiedExprBitwiseNot;
  [NodeType.Expr_BooleanNot]: FullyQualifiedExprBooleanNot;
  [NodeType.Expr_Cast_Array]: FullyQualifiedExprCastArray;
  [NodeType.Expr_Cast_Bool]: FullyQualifiedExprCastBool;
  [NodeType.Expr_Cast_Double]: FullyQualifiedExprCastDouble;
  [NodeType.Expr_Cast_Int]: FullyQualifiedExprCastInt;
  [NodeType.Expr_Cast_Object]: FullyQualifiedExprCastObject;
  [NodeType.Expr_Cast_String]: FullyQualifiedExprCastString;
  [NodeType.Expr_Cast_Unset]: FullyQualifiedExprCastUnset;
  [NodeType.Expr_ClassConstFetch]: FullyQualifiedExprClassConstFetch;
  [NodeType.Expr_Clone]: FullyQualifiedExprClone;
  [NodeType.Expr_Closure]: FullyQualifiedExprClosure;
  [NodeType.Expr_ClosureUse]: FullyQualifiedExprClosureUse;
  [NodeType.Expr_ConstFetch]: FullyQualifiedExprConstFetch;
  [NodeType.Expr_Empty]: FullyQualifiedExprEmpty;
  [NodeType.Expr_Error]: FullyQualifiedExprError;
  [NodeType.Expr_ErrorSuppress]: FullyQualifiedExprErrorSuppress;
  [NodeType.Expr_Eval]: FullyQualifiedExprEval;
  [NodeType.Expr_Exit]: FullyQualifiedExprExit;
  [NodeType.Expr_FuncCall]: FullyQualifiedExprFuncCall;
  [NodeType.Expr_Include]: FullyQualifiedExprInclude;
  [NodeType.Expr_Instanceof]: FullyQualifiedExprInstanceof;
  [NodeType.Expr_Isset]: FullyQualifiedExprIsset;
  [NodeType.Expr_List]: FullyQualifiedExprList;
  [NodeType.Expr_Match]: FullyQualifiedExprMatch;
  [NodeType.Expr_MethodCall]: FullyQualifiedExprMethodCall;
  [NodeType.Expr_New]: FullyQualifiedExprNew;
  [NodeType.Expr_NullsafeMethodCall]: FullyQualifiedExprNullsafeMethodCall;
  [NodeType.Expr_NullsafePropertyFetch]: FullyQualifiedExprNullsafePropertyFetch;
  [NodeType.Expr_PostDec]: FullyQualifiedExprPostDec;
  [NodeType.Expr_PostInc]: FullyQualifiedExprPostInc;
  [NodeType.Expr_PreDec]: FullyQualifiedExprPreDec;
  [NodeType.Expr_PreInc]: FullyQualifiedExprPreInc;
  [NodeType.Expr_Print]: FullyQualifiedExprPrint;
  [NodeType.Expr_PropertyFetch]: FullyQualifiedExprPropertyFetch;
  [NodeType.Expr_ShellExec]: FullyQualifiedExprShellExec;
  [NodeType.Expr_StaticCall]: FullyQualifiedExprStaticCall;
  [NodeType.Expr_StaticPropertyFetch]: FullyQualifiedExprStaticPropertyFetch;
  [NodeType.Expr_Ternary]: FullyQualifiedExprTernary;
  [NodeType.Expr_Throw]: FullyQualifiedExprThrow;
  [NodeType.Expr_UnaryMinus]: FullyQualifiedExprUnaryMinus;
  [NodeType.Expr_UnaryPlus]: FullyQualifiedExprUnaryPlus;
  [NodeType.Expr_Variable]: FullyQualifiedExprVariable;
  [NodeType.Expr_YieldFrom]: FullyQualifiedExprYieldFrom;
  [NodeType.Expr_Yield]: FullyQualifiedExprYield;
  [NodeType.Identifier]: FullyQualifiedIdentifier;
  [NodeType.IntersectionType]: FullyQualifiedIntersectionType;
  [NodeType.MatchArm]: FullyQualifiedMatchArm;
  [NodeType.Name_FullyQualified]: FullyQualifiedNameFullyQualified;
  [NodeType.Name]: FullyQualifiedName;
  [NodeType.Name_Relative]: FullyQualifiedNameRelative;
  [NodeType.NullableType]: FullyQualifiedNullableType;
  [NodeType.Param]: FullyQualifiedParam;
  [NodeType.Scalar_DNumber]: FullyQualifiedScalarDNumber;
  [NodeType.Scalar_Encapsed]: FullyQualifiedScalarEncapsed;
  [NodeType.Scalar_EncapsedStringPart]: FullyQualifiedScalarEncapsedStringPart;
  [NodeType.Scalar_LNumber]: FullyQualifiedScalarLNumber;
  [NodeType.Scalar_MagicConst_Class]: FullyQualifiedScalarMagicConstClass;
  [NodeType.Scalar_MagicConst_Dir]: FullyQualifiedScalarMagicConstDir;
  [NodeType.Scalar_MagicConst_File]: FullyQualifiedScalarMagicConstFile;
  [NodeType.Scalar_MagicConst_Function]: FullyQualifiedScalarMagicConstFunction;
  [NodeType.Scalar_MagicConst_Line]: FullyQualifiedScalarMagicConstLine;
  [NodeType.Scalar_MagicConst_Method]: FullyQualifiedScalarMagicConstMethod;
  [NodeType.Scalar_MagicConst_Namespace]: FullyQualifiedScalarMagicConstNamespace;
  [NodeType.Scalar_MagicConst_Trait]: FullyQualifiedScalarMagicConstTrait;
  [NodeType.Scalar_String]: FullyQualifiedScalarString;
  [NodeType.Stmt_Break]: FullyQualifiedStmtBreak;
  [NodeType.Stmt_Case]: FullyQualifiedStmtCase;
  [NodeType.Stmt_Catch]: FullyQualifiedStmtCatch;
  [NodeType.Stmt_ClassConst]: FullyQualifiedStmtClassConst;
  [NodeType.Stmt_ClassMethod]: FullyQualifiedStmtClassMethod;
  [NodeType.Stmt_Class]: FullyQualifiedStmtClass;
  [NodeType.Stmt_Const]: FullyQualifiedStmtConst;
  [NodeType.Stmt_Continue]: FullyQualifiedStmtContinue;
  [NodeType.Stmt_DeclareDeclare]: FullyQualifiedStmtDeclareDeclare;
  [NodeType.Stmt_Declare]: FullyQualifiedStmtDeclare;
  [NodeType.Stmt_Do]: FullyQualifiedStmtDo;
  [NodeType.Stmt_Echo]: FullyQualifiedStmtEcho;
  [NodeType.Stmt_ElseIf]: FullyQualifiedStmtElseIf;
  [NodeType.Stmt_Else]: FullyQualifiedStmtElse;
  [NodeType.Stmt_EnumCase]: FullyQualifiedStmtEnumCase;
  [NodeType.Stmt_Enum]: FullyQualifiedStmtEnum;
  [NodeType.Stmt_Expression]: FullyQualifiedStmtExpression;
  [NodeType.Stmt_Finally]: FullyQualifiedStmtFinally;
  [NodeType.Stmt_For]: FullyQualifiedStmtFor;
  [NodeType.Stmt_Foreach]: FullyQualifiedStmtForeach;
  [NodeType.Stmt_Function]: FullyQualifiedStmtFunction;
  [NodeType.Stmt_Global]: FullyQualifiedStmtGlobal;
  [NodeType.Stmt_Goto]: FullyQualifiedStmtGoto;
  [NodeType.Stmt_GroupUse]: FullyQualifiedStmtGroupUse;
  [NodeType.Stmt_HaltCompiler]: FullyQualifiedStmtHaltCompiler;
  [NodeType.Stmt_If]: FullyQualifiedStmtIf;
  [NodeType.Stmt_InlineHTML]: FullyQualifiedStmtInlineHtml;
  [NodeType.Stmt_Interface]: FullyQualifiedStmtInterface;
  [NodeType.Stmt_Label]: FullyQualifiedStmtLabel;
  [NodeType.Stmt_Namespace]: FullyQualifiedStmtNamespace;
  [NodeType.Stmt_Nop]: FullyQualifiedStmtNop;
  [NodeType.Stmt_Property]: FullyQualifiedStmtProperty;
  [NodeType.Stmt_PropertyProperty]: FullyQualifiedStmtPropertyProperty;
  [NodeType.Stmt_Return]: FullyQualifiedStmtReturn;
  [NodeType.Stmt_StaticVar]: FullyQualifiedStmtStaticVar;
  [NodeType.Stmt_Static]: FullyQualifiedStmtStatic;
  [NodeType.Stmt_Switch]: FullyQualifiedStmtSwitch;
  [NodeType.Stmt_Throw]: FullyQualifiedStmtThrow;
  [NodeType.Stmt_TraitUse]: FullyQualifiedStmtTraitUse;
  [NodeType.Stmt_TraitUseAdaptation_Alias]: FullyQualifiedStmtTraitUseAdaptationAlias;
  [NodeType.Stmt_TraitUseAdaptation_Precedence]: FullyQualifiedStmtTraitUseAdaptationPrecedence;
  [NodeType.Stmt_Trait]: FullyQualifiedStmtTrait;
  [NodeType.Stmt_TryCatch]: FullyQualifiedStmtTryCatch;
  [NodeType.Stmt_Unset]: FullyQualifiedStmtUnset;
  [NodeType.Stmt_UseUse]: FullyQualifiedStmtUseUse;
  [NodeType.Stmt_Use]: FullyQualifiedStmtUse;
  [NodeType.Stmt_While]: FullyQualifiedStmtWhile;
  [NodeType.UnionType]: FullyQualifiedUnionType;
  [NodeType.VarLikeIdentifier]: FullyQualifiedVarLikeIdentifier;
  [NodeType.VariadicPlaceholder]: FullyQualifiedVariadicPlaceholder;
}
    

      