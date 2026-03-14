import { AssignOp } from '../assign-op';

export class ShiftRight extends AssignOp {
    getType(): string {
        return 'Expr_AssignOp_ShiftRight';
    }
}
