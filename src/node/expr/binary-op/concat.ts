import { BinaryOp } from '../binary-op';

export class Concat extends BinaryOp {
    getOperatorSigil(): string {
        return '.';
    }

    getType(): string {
        return 'Expr_BinaryOp_Concat';
    }
}
