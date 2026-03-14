import { BinaryOp } from '../binaryOp';

export class Equal extends BinaryOp {
    getOperatorSigil(): string {
        return '==';
    }

    getType(): string {
        return 'Expr_BinaryOp_Equal';
    }
}
