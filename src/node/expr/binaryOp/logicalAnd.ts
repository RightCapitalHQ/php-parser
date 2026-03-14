import { BinaryOp } from '../binaryOp';

export class LogicalAnd extends BinaryOp {
    getOperatorSigil(): string {
        return 'and';
    }

    getType(): string {
        return 'Expr_BinaryOp_LogicalAnd';
    }
}
