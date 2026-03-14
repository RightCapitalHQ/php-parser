import { BinaryOp } from '../binaryOp';

export class BooleanAnd extends BinaryOp {
    getOperatorSigil(): string {
        return '&&';
    }

    getType(): string {
        return 'Expr_BinaryOp_BooleanAnd';
    }
}
