import { BinaryOp } from '../binary-op';

export class NotIdentical extends BinaryOp {
    getOperatorSigil(): string {
        return '!==';
    }

    getType(): string {
        return 'Expr_BinaryOp_NotIdentical';
    }
}
