import { AssignOp } from '../assignOp';

export class Plus extends AssignOp {
    getType(): string {
        return 'Expr_AssignOp_Plus';
    }
}
