import { AssignOp } from '../assignOp';

export class Concat extends AssignOp {
    getType(): string {
        return 'Expr_AssignOp_Concat';
    }
}
