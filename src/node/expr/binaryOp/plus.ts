import { BinaryOp } from '../binaryOp';

export class Plus extends BinaryOp {
    getOperatorSigil(): string {
        return '+';
    }

    getType(): string {
        return 'Expr_BinaryOp_Plus';
    }
}
