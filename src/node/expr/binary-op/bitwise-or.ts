import { BinaryOp } from '../binary-op';

export class BitwiseOr extends BinaryOp {
    getOperatorSigil(): string {
        return '|';
    }

    getType(): string {
        return 'Expr_BinaryOp_BitwiseOr';
    }
}
