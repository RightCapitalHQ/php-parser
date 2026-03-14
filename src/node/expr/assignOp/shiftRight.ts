import { AssignOp } from '../assignOp';

export class ShiftRight extends AssignOp {
    getType(): string {
        return 'Expr_AssignOp_ShiftRight';
    }
}
