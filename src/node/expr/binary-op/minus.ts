import { BinaryOp } from '../binary-op';

export class Minus extends BinaryOp {
    getOperatorSigil(): string {
        return '-';
    }

    getType(): string {
        return 'Expr_BinaryOp_Minus';
    }
}
