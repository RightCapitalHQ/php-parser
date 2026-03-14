import { AssignOp } from '../assign-op';

export class Pow extends AssignOp {
    getType(): string {
        return 'Expr_AssignOp_Pow';
    }
}
