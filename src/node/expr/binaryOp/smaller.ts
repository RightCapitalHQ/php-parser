import { BinaryOp } from '../binaryOp';

export class Smaller extends BinaryOp {
    getOperatorSigil(): string {
        return '<';
    }

    getType(): string {
        return 'Expr_BinaryOp_Smaller';
    }
}
