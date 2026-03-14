import { BinaryOp } from '../binary-op';

export class Pipe extends BinaryOp {
    getOperatorSigil(): string {
        return '|>';
    }

    getType(): string {
        return 'Expr_BinaryOp_Pipe';
    }
}
