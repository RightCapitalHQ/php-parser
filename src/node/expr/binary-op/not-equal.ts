import { BinaryOp } from '../binary-op';

export class NotEqual extends BinaryOp {
    getOperatorSigil(): string {
        return '!=';
    }

    getType(): string {
        return 'Expr_BinaryOp_NotEqual';
    }
}
