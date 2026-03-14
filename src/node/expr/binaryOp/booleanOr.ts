import { BinaryOp } from '../binaryOp';

export class BooleanOr extends BinaryOp {
    getOperatorSigil(): string {
        return '||';
    }

    getType(): string {
        return 'Expr_BinaryOp_BooleanOr';
    }
}
