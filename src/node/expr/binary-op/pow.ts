import { BinaryOp } from '../binary-op';

export class Pow extends BinaryOp {
    getOperatorSigil(): string {
        return '**';
    }

    getType(): string {
        return 'Expr_BinaryOp_Pow';
    }
}
