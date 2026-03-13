import { Node } from '../../node';
import { Expr } from '../expr';

export class PropertyFetch extends Expr {
    /** Variable holding object */
    public var: Expr;
    /** Property name (Identifier|Expr) */
    public name: Node;

    constructor(var_: Expr, name: Node, attributes: Record<string, any> = {}) {
        super(attributes);
        this.var = var_;
        this.name = name;
    }

    getSubNodeNames(): string[] {
        return ['var', 'name'];
    }

    getType(): string {
        return 'Expr_PropertyFetch';
    }
}
