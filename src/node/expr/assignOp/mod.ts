import { AssignOp } from '../assignOp';

export class Mod extends AssignOp {
    getType(): string {
        return 'Expr_AssignOp_Mod';
    }
}
