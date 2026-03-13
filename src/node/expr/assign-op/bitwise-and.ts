import { AssignOp } from '../assign-op';

export class BitwiseAnd extends AssignOp {
    getType(): string {
        return 'Expr_AssignOp_BitwiseAnd';
    }
}
