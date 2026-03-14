import { AssignOp } from '../assign-op';

export class Coalesce extends AssignOp {
    getType(): string {
        return 'Expr_AssignOp_Coalesce';
    }
}
