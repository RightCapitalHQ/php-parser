import { BinaryOp } from '../binary-op';

export class Spaceship extends BinaryOp {
    getOperatorSigil(): string {
        return '<=>';
    }

    getType(): string {
        return 'Expr_BinaryOp_Spaceship';
    }
}
