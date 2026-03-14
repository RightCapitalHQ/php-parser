import { AssignOp } from '../assignOp';

export class Div extends AssignOp {
    getType(): string {
        return 'Expr_AssignOp_Div';
    }
}
