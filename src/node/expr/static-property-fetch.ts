import { Node } from '../../node';
import { Expr } from '../expr';

export class StaticPropertyFetch extends Expr {
    /** Class name (Name|Expr) */
    public class_: Node;
    /** Property name (VarLikeIdentifier|Expr) */
    public name: Node;

    constructor(class_: Node, name: Node, attributes: Record<string, any> = {}) {
        super(attributes);
        this.class_ = class_;
        this.name = name;
    }

    getSubNodeNames(): string[] {
        return ['class', 'name'];
    }

    getType(): string {
        return 'Expr_StaticPropertyFetch';
    }
}
