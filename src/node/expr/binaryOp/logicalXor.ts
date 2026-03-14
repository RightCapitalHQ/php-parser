import { BinaryOp } from '../binaryOp';

export class LogicalXor extends BinaryOp {
    getOperatorSigil(): string {
        return 'xor';
    }

    getType(): string {
        return 'Expr_BinaryOp_LogicalXor';
    }
}
