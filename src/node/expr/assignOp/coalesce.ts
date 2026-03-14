import { AssignOp } from '../assignOp';

export class Coalesce extends AssignOp {
    getType(): string {
        return 'Expr_AssignOp_Coalesce';
    }
}
