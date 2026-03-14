import { AssignOp } from '../assignOp';

export class Mul extends AssignOp {
    getType(): string {
        return 'Expr_AssignOp_Mul';
    }
}
