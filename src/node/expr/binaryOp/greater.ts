import { BinaryOp } from '../binaryOp';

export class Greater extends BinaryOp {
    getOperatorSigil(): string {
        return '>';
    }

    getType(): string {
        return 'Expr_BinaryOp_Greater';
    }
}
