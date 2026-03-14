import { BinaryOp } from '../binary-op';

export class Mod extends BinaryOp {
    getOperatorSigil(): string {
        return '%';
    }

    getType(): string {
        return 'Expr_BinaryOp_Mod';
    }
}
