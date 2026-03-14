import { BinaryOp } from '../binaryOp';

export class Minus extends BinaryOp {
    getOperatorSigil(): string {
        return '-';
    }

    getType(): string {
        return 'Expr_BinaryOp_Minus';
    }
}
