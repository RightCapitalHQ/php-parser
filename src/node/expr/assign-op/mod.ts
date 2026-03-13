import { AssignOp } from '../assign-op';

export class Mod extends AssignOp {
    getType(): string {
        return 'Expr_AssignOp_Mod';
    }
}
