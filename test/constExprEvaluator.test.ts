import { describe, it, expect } from 'vitest';
import { ConstExprEvaluator } from '../src/constExprEvaluator';
import { ConstExprEvaluationException } from '../src/constExprEvaluationException';

import { Int_ } from '../src/node/scalar/int';
import { Float_ } from '../src/node/scalar/float';
import { String_ } from '../src/node/scalar/string';

import { UnaryMinus } from '../src/node/expr/unaryMinus';
import { UnaryPlus } from '../src/node/expr/unaryPlus';
import { BooleanNot } from '../src/node/expr/booleanNot';
import { BitwiseNot } from '../src/node/expr/bitwiseNot';

import { Plus } from '../src/node/expr/binaryOp/plus';
import { Minus } from '../src/node/expr/binaryOp/minus';
import { Mul } from '../src/node/expr/binaryOp/mul';
import { Div } from '../src/node/expr/binaryOp/div';
import { Mod } from '../src/node/expr/binaryOp/mod';
import { Pow } from '../src/node/expr/binaryOp/pow';
import { Concat } from '../src/node/expr/binaryOp/concat';
import { BitwiseAnd } from '../src/node/expr/binaryOp/bitwiseAnd';
import { BitwiseOr } from '../src/node/expr/binaryOp/bitwiseOr';
import { BitwiseXor } from '../src/node/expr/binaryOp/bitwiseXor';
import { ShiftLeft } from '../src/node/expr/binaryOp/shiftLeft';
import { ShiftRight } from '../src/node/expr/binaryOp/shiftRight';
import { BooleanAnd } from '../src/node/expr/binaryOp/booleanAnd';
import { BooleanOr } from '../src/node/expr/binaryOp/booleanOr';
import { LogicalAnd } from '../src/node/expr/binaryOp/logicalAnd';
import { LogicalOr } from '../src/node/expr/binaryOp/logicalOr';
import { LogicalXor } from '../src/node/expr/binaryOp/logicalXor';
import { Equal } from '../src/node/expr/binaryOp/equal';
import { NotEqual } from '../src/node/expr/binaryOp/notEqual';
import { Identical } from '../src/node/expr/binaryOp/identical';
import { NotIdentical } from '../src/node/expr/binaryOp/notIdentical';
import { Greater } from '../src/node/expr/binaryOp/greater';
import { GreaterOrEqual } from '../src/node/expr/binaryOp/greaterOrEqual';
import { Smaller } from '../src/node/expr/binaryOp/smaller';
import { SmallerOrEqual } from '../src/node/expr/binaryOp/smallerOrEqual';
import { Spaceship } from '../src/node/expr/binaryOp/spaceship';
import { Coalesce } from '../src/node/expr/binaryOp/coalesce';

import { Array_ } from '../src/node/expr/array';
import { ArrayItem } from '../src/node/arrayItem';
import { ConstFetch } from '../src/node/expr/constFetch';
import { Ternary } from '../src/node/expr/ternary';
import { Name } from '../src/node/name';
import { Expr } from '../src/node/expr';

describe('ConstExprEvaluator', () => {
    const evaluator = new ConstExprEvaluator();

    describe('scalar values', () => {
        it('should evaluate Int_ to number', () => {
            expect(evaluator.evaluate(new Int_(42))).toBe(42);
            expect(evaluator.evaluate(new Int_(0))).toBe(0);
            expect(evaluator.evaluate(new Int_(-1))).toBe(-1);
        });

        it('should evaluate Float_ to number', () => {
            expect(evaluator.evaluate(new Float_(3.14))).toBe(3.14);
            expect(evaluator.evaluate(new Float_(0.0))).toBe(0.0);
        });

        it('should evaluate String_ to string', () => {
            expect(evaluator.evaluate(new String_('hello'))).toBe('hello');
            expect(evaluator.evaluate(new String_(''))).toBe('');
        });
    });

    describe('unary operators', () => {
        it('should evaluate UnaryMinus', () => {
            expect(evaluator.evaluate(new UnaryMinus(new Int_(5)))).toBe(-5);
            expect(evaluator.evaluate(new UnaryMinus(new Float_(2.5)))).toBe(-2.5);
        });

        it('should evaluate UnaryPlus', () => {
            expect(evaluator.evaluate(new UnaryPlus(new Int_(5)))).toBe(5);
            expect(evaluator.evaluate(new UnaryPlus(new Float_(2.5)))).toBe(2.5);
        });

        it('should evaluate BooleanNot', () => {
            const trueNode = new ConstFetch(new Name('true'));
            const falseNode = new ConstFetch(new Name('false'));
            expect(evaluator.evaluate(new BooleanNot(trueNode))).toBe(false);
            expect(evaluator.evaluate(new BooleanNot(falseNode))).toBe(true);
        });

        it('should evaluate BitwiseNot', () => {
            expect(evaluator.evaluate(new BitwiseNot(new Int_(0)))).toBe(~0);
            expect(evaluator.evaluate(new BitwiseNot(new Int_(5)))).toBe(~5);
        });
    });

    describe('binary operators - arithmetic', () => {
        it('should evaluate Plus', () => {
            expect(evaluator.evaluate(new Plus(new Int_(2), new Int_(3)))).toBe(5);
        });

        it('should evaluate Minus', () => {
            expect(evaluator.evaluate(new Minus(new Int_(10), new Int_(3)))).toBe(7);
        });

        it('should evaluate Mul', () => {
            expect(evaluator.evaluate(new Mul(new Int_(4), new Int_(5)))).toBe(20);
        });

        it('should evaluate Div', () => {
            expect(evaluator.evaluate(new Div(new Int_(10), new Int_(2)))).toBe(5);
        });

        it('should evaluate Mod', () => {
            expect(evaluator.evaluate(new Mod(new Int_(10), new Int_(3)))).toBe(1);
        });

        it('should evaluate Pow', () => {
            expect(evaluator.evaluate(new Pow(new Int_(2), new Int_(10)))).toBe(1024);
        });
    });

    describe('binary operators - string', () => {
        it('should evaluate Concat', () => {
            expect(evaluator.evaluate(new Concat(new String_('hello'), new String_(' world')))).toBe('hello world');
        });

        it('should coerce values to string for Concat', () => {
            expect(evaluator.evaluate(new Concat(new String_('num: '), new Int_(42)))).toBe('num: 42');
        });
    });

    describe('binary operators - bitwise', () => {
        it('should evaluate BitwiseAnd', () => {
            expect(evaluator.evaluate(new BitwiseAnd(new Int_(0b1100), new Int_(0b1010)))).toBe(0b1000);
        });

        it('should evaluate BitwiseOr', () => {
            expect(evaluator.evaluate(new BitwiseOr(new Int_(0b1100), new Int_(0b1010)))).toBe(0b1110);
        });

        it('should evaluate BitwiseXor', () => {
            expect(evaluator.evaluate(new BitwiseXor(new Int_(0b1100), new Int_(0b1010)))).toBe(0b0110);
        });

        it('should evaluate ShiftLeft', () => {
            expect(evaluator.evaluate(new ShiftLeft(new Int_(1), new Int_(4)))).toBe(16);
        });

        it('should evaluate ShiftRight', () => {
            expect(evaluator.evaluate(new ShiftRight(new Int_(16), new Int_(2)))).toBe(4);
        });
    });

    describe('binary operators - boolean/logical', () => {
        it('should evaluate BooleanAnd with short-circuit', () => {
            const falseNode = new ConstFetch(new Name('false'));
            const trueNode = new ConstFetch(new Name('true'));
            expect(evaluator.evaluate(new BooleanAnd(falseNode, trueNode))).toBe(false);
            expect(evaluator.evaluate(new BooleanAnd(trueNode, trueNode))).toBe(true);
        });

        it('should evaluate BooleanOr with short-circuit', () => {
            const falseNode = new ConstFetch(new Name('false'));
            const trueNode = new ConstFetch(new Name('true'));
            expect(evaluator.evaluate(new BooleanOr(trueNode, falseNode))).toBe(true);
            expect(evaluator.evaluate(new BooleanOr(falseNode, falseNode))).toBe(false);
        });

        it('should evaluate LogicalAnd', () => {
            const trueNode = new ConstFetch(new Name('true'));
            const falseNode = new ConstFetch(new Name('false'));
            expect(evaluator.evaluate(new LogicalAnd(trueNode, trueNode))).toBe(true);
            expect(evaluator.evaluate(new LogicalAnd(trueNode, falseNode))).toBe(false);
        });

        it('should evaluate LogicalOr', () => {
            const trueNode = new ConstFetch(new Name('true'));
            const falseNode = new ConstFetch(new Name('false'));
            expect(evaluator.evaluate(new LogicalOr(falseNode, trueNode))).toBe(true);
        });

        it('should evaluate LogicalXor', () => {
            const trueNode = new ConstFetch(new Name('true'));
            const falseNode = new ConstFetch(new Name('false'));
            expect(evaluator.evaluate(new LogicalXor(trueNode, falseNode))).toBe(true);
            expect(evaluator.evaluate(new LogicalXor(trueNode, trueNode))).toBe(false);
        });
    });

    describe('binary operators - comparison', () => {
        it('should evaluate Equal', () => {
            expect(evaluator.evaluate(new Equal(new Int_(1), new Int_(1)))).toBe(true);
            expect(evaluator.evaluate(new Equal(new Int_(1), new Int_(2)))).toBe(false);
        });

        it('should evaluate NotEqual', () => {
            expect(evaluator.evaluate(new NotEqual(new Int_(1), new Int_(2)))).toBe(true);
            expect(evaluator.evaluate(new NotEqual(new Int_(1), new Int_(1)))).toBe(false);
        });

        it('should evaluate Identical', () => {
            expect(evaluator.evaluate(new Identical(new Int_(1), new Int_(1)))).toBe(true);
            expect(evaluator.evaluate(new Identical(new Int_(1), new Int_(2)))).toBe(false);
        });

        it('should evaluate NotIdentical', () => {
            expect(evaluator.evaluate(new NotIdentical(new Int_(1), new Int_(2)))).toBe(true);
        });

        it('should evaluate Greater', () => {
            expect(evaluator.evaluate(new Greater(new Int_(5), new Int_(3)))).toBe(true);
            expect(evaluator.evaluate(new Greater(new Int_(3), new Int_(5)))).toBe(false);
        });

        it('should evaluate GreaterOrEqual', () => {
            expect(evaluator.evaluate(new GreaterOrEqual(new Int_(5), new Int_(5)))).toBe(true);
            expect(evaluator.evaluate(new GreaterOrEqual(new Int_(3), new Int_(5)))).toBe(false);
        });

        it('should evaluate Smaller', () => {
            expect(evaluator.evaluate(new Smaller(new Int_(3), new Int_(5)))).toBe(true);
            expect(evaluator.evaluate(new Smaller(new Int_(5), new Int_(3)))).toBe(false);
        });

        it('should evaluate SmallerOrEqual', () => {
            expect(evaluator.evaluate(new SmallerOrEqual(new Int_(5), new Int_(5)))).toBe(true);
            expect(evaluator.evaluate(new SmallerOrEqual(new Int_(6), new Int_(5)))).toBe(false);
        });

        it('should evaluate Spaceship', () => {
            expect(evaluator.evaluate(new Spaceship(new Int_(1), new Int_(2)))).toBe(-1);
            expect(evaluator.evaluate(new Spaceship(new Int_(2), new Int_(2)))).toBe(0);
            expect(evaluator.evaluate(new Spaceship(new Int_(3), new Int_(2)))).toBe(1);
        });
    });

    describe('Coalesce', () => {
        it('should return left if not null', () => {
            expect(evaluator.evaluate(new Coalesce(new Int_(5), new Int_(10)))).toBe(5);
        });

        it('should return right if left is null', () => {
            const nullNode = new ConstFetch(new Name('null'));
            expect(evaluator.evaluate(new Coalesce(nullNode, new Int_(10)))).toBe(10);
        });
    });

    describe('Array', () => {
        it('should evaluate empty array', () => {
            expect(evaluator.evaluate(new Array_([]))).toEqual({});
        });

        it('should evaluate array with numeric auto-indexing', () => {
            const items = [
                new ArrayItem(new Int_(10)),
                new ArrayItem(new Int_(20)),
                new ArrayItem(new Int_(30)),
            ];
            expect(evaluator.evaluate(new Array_(items))).toEqual({ 0: 10, 1: 20, 2: 30 });
        });

        it('should evaluate array with string keys', () => {
            const items = [
                new ArrayItem(new Int_(1), new String_('a')),
                new ArrayItem(new Int_(2), new String_('b')),
            ];
            expect(evaluator.evaluate(new Array_(items))).toEqual({ a: 1, b: 2 });
        });

        it('should evaluate array with explicit integer keys', () => {
            const items = [
                new ArrayItem(new String_('foo'), new Int_(5)),
                new ArrayItem(new String_('bar')),
            ];
            const result = evaluator.evaluate(new Array_(items));
            expect(result[5]).toBe('foo');
            expect(result[6]).toBe('bar');
        });

        it('should skip null items', () => {
            const items = [
                new ArrayItem(new Int_(1)),
                null,
                new ArrayItem(new Int_(2)),
            ];
            expect(evaluator.evaluate(new Array_(items))).toEqual({ 0: 1, 1: 2 });
        });
    });

    describe('ConstFetch', () => {
        it('should evaluate true', () => {
            expect(evaluator.evaluate(new ConstFetch(new Name('true')))).toBe(true);
        });

        it('should evaluate TRUE (case-insensitive)', () => {
            expect(evaluator.evaluate(new ConstFetch(new Name('TRUE')))).toBe(true);
        });

        it('should evaluate false', () => {
            expect(evaluator.evaluate(new ConstFetch(new Name('false')))).toBe(false);
        });

        it('should evaluate null', () => {
            expect(evaluator.evaluate(new ConstFetch(new Name('null')))).toBe(null);
        });

        it('should throw for unknown constant', () => {
            expect(() => evaluator.evaluate(new ConstFetch(new Name('SOME_CONST')))).toThrow(
                ConstExprEvaluationException
            );
        });
    });

    describe('Ternary', () => {
        it('should evaluate full ternary (true branch)', () => {
            const trueNode = new ConstFetch(new Name('true'));
            const ternary = new Ternary(trueNode, new Int_(1), new Int_(2));
            expect(evaluator.evaluate(ternary)).toBe(1);
        });

        it('should evaluate full ternary (false branch)', () => {
            const falseNode = new ConstFetch(new Name('false'));
            const ternary = new Ternary(falseNode, new Int_(1), new Int_(2));
            expect(evaluator.evaluate(ternary)).toBe(2);
        });

        it('should evaluate short ternary (truthy)', () => {
            const ternary = new Ternary(new Int_(42), null, new Int_(0));
            expect(evaluator.evaluate(ternary)).toBe(42);
        });

        it('should evaluate short ternary (falsy)', () => {
            const ternary = new Ternary(new Int_(0), null, new Int_(99));
            expect(evaluator.evaluate(ternary)).toBe(99);
        });
    });

    describe('nested expressions', () => {
        it('should evaluate nested arithmetic', () => {
            // (2 + 3) * 4 = 20
            const inner = new Plus(new Int_(2), new Int_(3));
            const outer = new Mul(inner, new Int_(4));
            expect(evaluator.evaluate(outer)).toBe(20);
        });

        it('should evaluate unary minus of expression', () => {
            // -(3 + 2) = -5
            const sum = new Plus(new Int_(3), new Int_(2));
            expect(evaluator.evaluate(new UnaryMinus(sum))).toBe(-5);
        });
    });

    describe('fallback evaluator', () => {
        it('should use fallback for unknown expressions', () => {
            class CustomExpr extends Expr {
                getSubNodeNames(): string[] { return []; }
                getType(): string { return 'Custom'; }
            }

            const customEval = new ConstExprEvaluator((expr: Expr) => {
                if (expr instanceof CustomExpr) {
                    return 'custom-value';
                }
                throw new ConstExprEvaluationException('Unknown expression');
            });

            expect(customEval.evaluate(new CustomExpr())).toBe('custom-value');
        });

        it('should use fallback for unknown ConstFetch', () => {
            const fallback = new ConstExprEvaluator((expr: Expr) => {
                if (expr instanceof ConstFetch) {
                    return 42;
                }
                throw new ConstExprEvaluationException('Unknown');
            });

            expect(fallback.evaluate(new ConstFetch(new Name('MY_CONST')))).toBe(42);
        });
    });

    describe('error handling', () => {
        it('should throw ConstExprEvaluationException for unsupported expressions', () => {
            class UnsupportedExpr extends Expr {
                getSubNodeNames(): string[] { return []; }
                getType(): string { return 'Unsupported'; }
            }

            expect(() => evaluator.evaluate(new UnsupportedExpr())).toThrow(ConstExprEvaluationException);
        });

        it('should throw an error with a descriptive message', () => {
            class FooExpr extends Expr {
                getSubNodeNames(): string[] { return []; }
                getType(): string { return 'Expr_Foo'; }
            }

            expect(() => evaluator.evaluate(new FooExpr())).toThrow(
                'Expression of type Expr_Foo cannot be evaluated'
            );
        });
    });
});
