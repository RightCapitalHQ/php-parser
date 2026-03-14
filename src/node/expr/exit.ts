import { Expr } from '../expr';

export class Exit_ extends Expr {
    static readonly KIND_EXIT = 1;
    static readonly KIND_DIE = 2;

    /** Expression */
    public expr: Expr | null;

    constructor(expr: Expr | null = null, attributes: Record<string, any> = {}) {
        super(attributes);
        this.expr = expr;
    }

    getSubNodeNames(): string[] {
        return ['expr'];
    }

    getType(): string {
        return 'Expr_Exit';
    }
}
