import { AssignOp } from '../assign-op';

export class BitwiseXor extends AssignOp {
    getType(): string {
        return 'Expr_AssignOp_BitwiseXor';
    }
}
