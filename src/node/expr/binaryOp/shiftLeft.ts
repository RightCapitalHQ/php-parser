import { BinaryOp } from '../binaryOp';

export class ShiftLeft extends BinaryOp {
    getOperatorSigil(): string {
        return '<<';
    }

    getType(): string {
        return 'Expr_BinaryOp_ShiftLeft';
    }
}
