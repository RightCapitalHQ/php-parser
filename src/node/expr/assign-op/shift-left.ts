import { AssignOp } from '../assign-op';

export class ShiftLeft extends AssignOp {
    getType(): string {
        return 'Expr_AssignOp_ShiftLeft';
    }
}
