import { BinaryOp } from '../binaryOp';

export class ShiftRight extends BinaryOp {
    getOperatorSigil(): string {
        return '>>';
    }

    getType(): string {
        return 'Expr_BinaryOp_ShiftRight';
    }
}
