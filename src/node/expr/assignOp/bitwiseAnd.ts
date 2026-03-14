import { AssignOp } from '../assignOp';

export class BitwiseAnd extends AssignOp {
    getType(): string {
        return 'Expr_AssignOp_BitwiseAnd';
    }
}
