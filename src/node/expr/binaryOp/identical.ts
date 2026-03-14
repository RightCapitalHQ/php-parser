import { BinaryOp } from '../binaryOp';

export class Identical extends BinaryOp {
    getOperatorSigil(): string {
        return '===';
    }

    getType(): string {
        return 'Expr_BinaryOp_Identical';
    }
}
