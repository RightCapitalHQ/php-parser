import { BinaryOp } from '../binaryOp';

export class LogicalOr extends BinaryOp {
    getOperatorSigil(): string {
        return 'or';
    }

    getType(): string {
        return 'Expr_BinaryOp_LogicalOr';
    }
}
