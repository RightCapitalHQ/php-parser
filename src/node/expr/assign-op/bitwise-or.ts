import { AssignOp } from '../assign-op';

export class BitwiseOr extends AssignOp {
    getType(): string {
        return 'Expr_AssignOp_BitwiseOr';
    }
}
