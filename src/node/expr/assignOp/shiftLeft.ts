import { AssignOp } from '../assignOp';

export class ShiftLeft extends AssignOp {
    getType(): string {
        return 'Expr_AssignOp_ShiftLeft';
    }
}
