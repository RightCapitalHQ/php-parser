import { Expr } from '../expr';

export class ConstFetch extends Expr {
    /** Constant name (Name) */
    public name: any;

    constructor(name: any, attributes: Record<string, any> = {}) {
        super(attributes);
        this.name = name;
    }

    getSubNodeNames(): string[] {
        return ['name'];
    }

    getType(): string {
        return 'Expr_ConstFetch';
    }
}
