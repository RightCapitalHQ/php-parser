import { Expr } from '../expr';

export class Ternary extends Expr {
    /** Condition */
    public cond: Expr;
    /** Expression for true */
    public if_: Expr | null;
    /** Expression for false */
    public else_: Expr;

    constructor(cond: Expr, if_: Expr | null, else_: Expr, attributes: Record<string, any> = {}) {
        super(attributes);
        this.cond = cond;
        this.if_ = if_;
        this.else_ = else_;
    }

    getSubNodeNames(): string[] {
        return ['cond', 'if', 'else'];
    }

    getType(): string {
        return 'Expr_Ternary';
    }
}
