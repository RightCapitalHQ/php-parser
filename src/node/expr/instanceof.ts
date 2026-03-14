import { Node } from '../../node';
import { Expr } from '../expr';

export class Instanceof_ extends Expr {
    /** Expression */
    public expr: Expr;
    /** Class name (Name|Expr) */
    public class_: Node;

    constructor(expr: Expr, class_: Node, attributes: Record<string, any> = {}) {
        super(attributes);
        this.expr = expr;
        this.class_ = class_;
    }

    getSubNodeNames(): string[] {
        return ['expr', 'class'];
    }

    getType(): string {
        return 'Expr_Instanceof';
    }
}
