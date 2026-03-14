import { BinaryOp } from '../binaryOp';

export class Mul extends BinaryOp {
    getOperatorSigil(): string {
        return '*';
    }

    getType(): string {
        return 'Expr_BinaryOp_Mul';
    }
}
