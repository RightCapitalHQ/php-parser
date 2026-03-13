import { Expr } from '../expr';

export class UnaryMinus extends Expr {
    /** Expression */
    public expr: Expr;

    constructor(expr: Expr, attributes: Record<string, any> = {}) {
        super(attributes);
        this.expr = expr;
    }

    getSubNodeNames(): string[] {
        return ['expr'];
    }

    getType(): string {
        return 'Expr_UnaryMinus';
    }
}
