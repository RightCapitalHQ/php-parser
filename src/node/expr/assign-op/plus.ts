import { AssignOp } from '../assign-op';

export class Plus extends AssignOp {
    getType(): string {
        return 'Expr_AssignOp_Plus';
    }
}
