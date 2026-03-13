import { BinaryOp } from '../binary-op';

export class Smaller extends BinaryOp {
    getOperatorSigil(): string {
        return '<';
    }

    getType(): string {
        return 'Expr_BinaryOp_Smaller';
    }
}
