import { BinaryOp } from '../binary-op';

export class BooleanOr extends BinaryOp {
    getOperatorSigil(): string {
        return '||';
    }

    getType(): string {
        return 'Expr_BinaryOp_BooleanOr';
    }
}
