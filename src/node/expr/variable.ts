import { Expr } from '../expr';

export class Variable extends Expr {
    /** Name */
    public name: string | Expr;

    constructor(name: string | Expr, attributes: Record<string, any> = {}) {
        super(attributes);
        this.name = name;
    }

    getSubNodeNames(): string[] {
        return ['name'];
    }

    getType(): string {
        return 'Expr_Variable';
    }
}
