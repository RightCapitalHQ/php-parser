import { BinaryOp } from '../binary-op';

export class Coalesce extends BinaryOp {
    getOperatorSigil(): string {
        return '??';
    }

    getType(): string {
        return 'Expr_BinaryOp_Coalesce';
    }
}
