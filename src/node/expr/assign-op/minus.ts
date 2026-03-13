import { AssignOp } from '../assign-op';

export class Minus extends AssignOp {
    getType(): string {
        return 'Expr_AssignOp_Minus';
    }
}
