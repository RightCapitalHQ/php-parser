import { Expr } from '../expr';

export class ArrayDimFetch extends Expr {
    /** Variable */
    public var: Expr;
    /** Array index / dim */
    public dim: Expr | null;

    constructor(var_: Expr, dim: Expr | null = null, attributes: Record<string, any> = {}) {
        super(attributes);
        this.var = var_;
        this.dim = dim;
    }

    getSubNodeNames(): string[] {
        return ['var', 'dim'];
    }

    getType(): string {
        return 'Expr_ArrayDimFetch';
    }
}
