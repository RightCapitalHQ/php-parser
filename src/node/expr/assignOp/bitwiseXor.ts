import { AssignOp } from '../assignOp';

export class BitwiseXor extends AssignOp {
    getType(): string {
        return 'Expr_AssignOp_BitwiseXor';
    }
}
