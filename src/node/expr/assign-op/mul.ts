import { AssignOp } from '../assign-op';

export class Mul extends AssignOp {
    getType(): string {
        return 'Expr_AssignOp_Mul';
    }
}
