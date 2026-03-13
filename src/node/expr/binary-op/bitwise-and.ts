import { BinaryOp } from '../binary-op';

export class BitwiseAnd extends BinaryOp {
    getOperatorSigil(): string {
        return '&';
    }

    getType(): string {
        return 'Expr_BinaryOp_BitwiseAnd';
    }
}
