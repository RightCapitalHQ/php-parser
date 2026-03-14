import { BinaryOp } from '../binary-op';

export class Mul extends BinaryOp {
    getOperatorSigil(): string {
        return '*';
    }

    getType(): string {
        return 'Expr_BinaryOp_Mul';
    }
}
