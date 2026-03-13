import { Expr } from './node/expr';
import { ConstExprEvaluationException } from './const-expr-evaluation-exception';

// Scalar types
import { Int_ } from './node/scalar/int';
import { Float_ } from './node/scalar/float';
import { String_ } from './node/scalar/string';

// Unary operators
import { UnaryMinus } from './node/expr/unary-minus';
import { UnaryPlus } from './node/expr/unary-plus';
import { BooleanNot } from './node/expr/boolean-not';
import { BitwiseNot } from './node/expr/bitwise-not';

// Binary operators
import { BinaryOp } from './node/expr/binary-op';
import { Plus } from './node/expr/binary-op/plus';
import { Minus } from './node/expr/binary-op/minus';
import { Mul } from './node/expr/binary-op/mul';
import { Div } from './node/expr/binary-op/div';
import { Mod } from './node/expr/binary-op/mod';
import { Pow } from './node/expr/binary-op/pow';
import { Concat } from './node/expr/binary-op/concat';
import { BitwiseAnd } from './node/expr/binary-op/bitwise-and';
import { BitwiseOr } from './node/expr/binary-op/bitwise-or';
import { BitwiseXor } from './node/expr/binary-op/bitwise-xor';
import { ShiftLeft } from './node/expr/binary-op/shift-left';
import { ShiftRight } from './node/expr/binary-op/shift-right';
import { BooleanAnd } from './node/expr/binary-op/boolean-and';
import { BooleanOr } from './node/expr/binary-op/boolean-or';
import { LogicalAnd } from './node/expr/binary-op/logical-and';
import { LogicalOr } from './node/expr/binary-op/logical-or';
import { LogicalXor } from './node/expr/binary-op/logical-xor';
import { Equal } from './node/expr/binary-op/equal';
import { NotEqual } from './node/expr/binary-op/not-equal';
import { Identical } from './node/expr/binary-op/identical';
import { NotIdentical } from './node/expr/binary-op/not-identical';
import { Greater } from './node/expr/binary-op/greater';
import { GreaterOrEqual } from './node/expr/binary-op/greater-or-equal';
import { Smaller } from './node/expr/binary-op/smaller';
import { SmallerOrEqual } from './node/expr/binary-op/smaller-or-equal';
import { Spaceship } from './node/expr/binary-op/spaceship';
import { Coalesce } from './node/expr/binary-op/coalesce';

// Array
import { Array_ } from './node/expr/array';
import { ArrayItem } from './node/array-item';

// ConstFetch
import { ConstFetch } from './node/expr/const-fetch';

// Ternary
import { Ternary } from './node/expr/ternary';

// Name
import { Name } from './node/name';

/**
 * Evaluates constant expressions from AST nodes to their runtime JS values.
 *
 * An optional fallback evaluator function can be provided for handling
 * nodes that are not natively supported (e.g., class constant fetches).
 */
export class ConstExprEvaluator {
    private fallbackEvaluator: ((expr: Expr) => any) | null;

    constructor(fallbackEvaluator: ((expr: Expr) => any) | null = null) {
        this.fallbackEvaluator = fallbackEvaluator;
    }

    /**
     * Evaluate a constant expression AST node and return its value.
     */
    evaluate(expr: Expr): any {
        // Scalars
        if (expr instanceof Int_) {
            return expr.value;
        }
        if (expr instanceof Float_) {
            return expr.value;
        }
        if (expr instanceof String_) {
            return expr.value;
        }

        // Unary operators
        if (expr instanceof UnaryMinus) {
            return -this.evaluate(expr.expr);
        }
        if (expr instanceof UnaryPlus) {
            return +this.evaluate(expr.expr);
        }
        if (expr instanceof BooleanNot) {
            return !this.evaluate(expr.expr);
        }
        if (expr instanceof BitwiseNot) {
            return ~this.evaluate(expr.expr);
        }

        // Binary operators
        if (expr instanceof BinaryOp) {
            return this.evaluateBinaryOp(expr);
        }

        // Array
        if (expr instanceof Array_) {
            return this.evaluateArray(expr);
        }

        // ConstFetch (true, false, null)
        if (expr instanceof ConstFetch) {
            return this.evaluateConstFetch(expr);
        }

        // Ternary
        if (expr instanceof Ternary) {
            return this.evaluateTernary(expr);
        }

        // Fallback evaluator
        if (this.fallbackEvaluator !== null) {
            return this.fallbackEvaluator(expr);
        }

        throw new ConstExprEvaluationException(
            `Expression of type ${expr.getType()} cannot be evaluated`
        );
    }

    private evaluateBinaryOp(expr: BinaryOp): any {
        // Short-circuit operators: Coalesce, BooleanAnd, BooleanOr, LogicalAnd, LogicalOr
        if (expr instanceof Coalesce) {
            const left = this.evaluate(expr.left);
            if (left !== null && left !== undefined) {
                return left;
            }
            return this.evaluate(expr.right);
        }
        if (expr instanceof BooleanAnd || expr instanceof LogicalAnd) {
            const left = this.evaluate(expr.left);
            if (!left) {
                return left;
            }
            return this.evaluate(expr.right);
        }
        if (expr instanceof BooleanOr || expr instanceof LogicalOr) {
            const left = this.evaluate(expr.left);
            if (left) {
                return left;
            }
            return this.evaluate(expr.right);
        }

        const left = this.evaluate(expr.left);
        const right = this.evaluate(expr.right);

        // Arithmetic
        if (expr instanceof Plus) return left + right;
        if (expr instanceof Minus) return left - right;
        if (expr instanceof Mul) return left * right;
        if (expr instanceof Div) return left / right;
        if (expr instanceof Mod) return left % right;
        if (expr instanceof Pow) return left ** right;

        // String concatenation
        if (expr instanceof Concat) return String(left) + String(right);

        // Bitwise
        if (expr instanceof BitwiseAnd) return left & right;
        if (expr instanceof BitwiseOr) return left | right;
        if (expr instanceof BitwiseXor) return left ^ right;
        if (expr instanceof ShiftLeft) return left << right;
        if (expr instanceof ShiftRight) return left >> right;

        // Logical XOR
        if (expr instanceof LogicalXor) return (left ? true : false) !== (right ? true : false);

        // Comparison
        if (expr instanceof Equal) return left == right;
        if (expr instanceof NotEqual) return left != right;
        if (expr instanceof Identical) return left === right;
        if (expr instanceof NotIdentical) return left !== right;
        if (expr instanceof Greater) return left > right;
        if (expr instanceof GreaterOrEqual) return left >= right;
        if (expr instanceof Smaller) return left < right;
        if (expr instanceof SmallerOrEqual) return left <= right;
        if (expr instanceof Spaceship) {
            if (left < right) return -1;
            if (left > right) return 1;
            return 0;
        }

        throw new ConstExprEvaluationException(
            `Binary operator ${expr.getType()} cannot be evaluated`
        );
    }

    private evaluateArray(expr: Array_): any {
        const result: Record<string | number, any> = {};
        let nextIndex = 0;

        for (const item of expr.items) {
            if (item === null) {
                continue;
            }

            // item should be an ArrayItem
            if (item instanceof ArrayItem) {
                let key: string | number;
                if (item.key !== null) {
                    key = this.evaluate(item.key as Expr);
                } else {
                    key = nextIndex;
                }

                const value = this.evaluate(item.value as Expr);

                if (item.unpack) {
                    // Spread operator: merge the evaluated value into result
                    if (Array.isArray(value)) {
                        for (const v of value) {
                            result[nextIndex] = v;
                            nextIndex++;
                        }
                    } else if (typeof value === 'object' && value !== null) {
                        for (const [k, v] of Object.entries(value)) {
                            result[k] = v;
                            // Track next integer index
                            const numKey = Number(k);
                            if (Number.isInteger(numKey) && numKey >= nextIndex) {
                                nextIndex = numKey + 1;
                            }
                        }
                    }
                } else {
                    result[key] = value;
                    // Track the next auto-index
                    if (typeof key === 'number' && Number.isInteger(key) && key >= nextIndex) {
                        nextIndex = key + 1;
                    }
                }
            }
        }

        return result;
    }

    private evaluateConstFetch(expr: ConstFetch): any {
        const name = expr.name;
        let nameStr: string;

        if (name instanceof Name) {
            nameStr = name.toLowerString();
        } else if (typeof name === 'string') {
            nameStr = name.toLowerCase();
        } else {
            nameStr = String(name).toLowerCase();
        }

        if (nameStr === 'true') {
            return true;
        }
        if (nameStr === 'false') {
            return false;
        }
        if (nameStr === 'null') {
            return null;
        }

        // Not a built-in constant, try fallback
        if (this.fallbackEvaluator !== null) {
            return this.fallbackEvaluator(expr);
        }

        throw new ConstExprEvaluationException(
            `Expression of type ${expr.getType()} cannot be evaluated`
        );
    }

    private evaluateTernary(expr: Ternary): any {
        const cond = this.evaluate(expr.cond);

        if (expr.if_ === null) {
            // Short ternary: $a ?: $b
            return cond ? cond : this.evaluate(expr.else_);
        }

        return cond ? this.evaluate(expr.if_) : this.evaluate(expr.else_);
    }
}
