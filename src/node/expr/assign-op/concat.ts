import { AssignOp } from '../assign-op';

export class Concat extends AssignOp {
    getType(): string {
        return 'Expr_AssignOp_Concat';
    }
}
