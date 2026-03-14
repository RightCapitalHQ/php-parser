import { AssignOp } from '../assignOp';

export class BitwiseOr extends AssignOp {
    getType(): string {
        return 'Expr_AssignOp_BitwiseOr';
    }
}
