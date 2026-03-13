import { BinaryOp } from '../binary-op';

export class GreaterOrEqual extends BinaryOp {
    getOperatorSigil(): string {
        return '>=';
    }

    getType(): string {
        return 'Expr_BinaryOp_GreaterOrEqual';
    }
}
