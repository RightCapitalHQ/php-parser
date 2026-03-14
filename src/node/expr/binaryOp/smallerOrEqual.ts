import { BinaryOp } from '../binaryOp';

export class SmallerOrEqual extends BinaryOp {
    getOperatorSigil(): string {
        return '<=';
    }

    getType(): string {
        return 'Expr_BinaryOp_SmallerOrEqual';
    }
}
