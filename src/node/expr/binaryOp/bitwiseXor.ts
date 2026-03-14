import { BinaryOp } from '../binaryOp';

export class BitwiseXor extends BinaryOp {
    getOperatorSigil(): string {
        return '^';
    }

    getType(): string {
        return 'Expr_BinaryOp_BitwiseXor';
    }
}
