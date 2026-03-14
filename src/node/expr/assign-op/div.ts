import { AssignOp } from '../assign-op';

export class Div extends AssignOp {
    getType(): string {
        return 'Expr_AssignOp_Div';
    }
}
