import { Expr } from '../expr';

export class Assign extends Expr {
    /** Variable */
    public var: Expr;
    /** Expression */
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
        return 'Expr_Assign';
    }
}
