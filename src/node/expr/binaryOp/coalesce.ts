import { BinaryOp } from '../binaryOp';

export class Coalesce extends BinaryOp {
    getOperatorSigil(): string {
        return '??';
    }

    getType(): string {
        return 'Expr_BinaryOp_Coalesce';
    }
}
