import { Expr } from '../expr';

export class PreInc extends Expr {
    /** Variable */
    public var: Expr;

    constructor(var_: Expr, attributes: Record<string, any> = {}) {
        super(attributes);
        this.var = var_;
    }

    getSubNodeNames(): string[] {
        return ['var'];
    }

    getType(): string {
        return 'Expr_PreInc';
    }
}
