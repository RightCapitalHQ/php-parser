import { AssignOp } from '../assignOp';

export class Pow extends AssignOp {
    getType(): string {
        return 'Expr_AssignOp_Pow';
    }
}
