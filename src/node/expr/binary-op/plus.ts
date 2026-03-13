import { BinaryOp } from '../binary-op';

export class Plus extends BinaryOp {
    getOperatorSigil(): string {
        return '+';
    }

    getType(): string {
        return 'Expr_BinaryOp_Plus';
    }
}
