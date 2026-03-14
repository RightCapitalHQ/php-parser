import { Expr } from '../expr';

export class Include_ extends Expr {
    static readonly TYPE_INCLUDE = 1;
    static readonly TYPE_INCLUDE_ONCE = 2;
    static readonly TYPE_REQUIRE = 3;
    static readonly TYPE_REQUIRE_ONCE = 4;

    /** Expression */
    public expr: Expr;
    /** Type of include */
    public type: number;

    constructor(expr: Expr, type: number, attributes: Record<string, any> = {}) {
        super(attributes);
        this.expr = expr;
        this.type = type;
    }

    getSubNodeNames(): string[] {
        return ['expr', 'type'];
    }

    getType(): string {
        return 'Expr_Include';
    }
}
