import { Expr } from '../expr';

export class AssignRef extends Expr {
    /** Variable reference is assigned to */
    public var: Expr;
    /** Variable which is referenced */
    public expr: Expr;

    constructor(var_: Expr, expr: Expr, attributes: Record<string, any> = {}) {
        super(attributes);
        this.var = var_;
        this.expr = expr;
    }

    getSubNodeNames(): string[] {
        return ['var', 'expr'];
    }

    getType(): string {
        return 'Expr_AssignRef';
    }
}
