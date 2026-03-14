import { BinaryOp } from '../binary-op';

export class SmallerOrEqual extends BinaryOp {
    getOperatorSigil(): string {
        return '<=';
    }

    getType(): string {
        return 'Expr_BinaryOp_SmallerOrEqual';
    }
}
