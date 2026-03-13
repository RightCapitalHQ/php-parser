import { Node } from '../../node';
import { Expr } from '../expr';

export class ClassConstFetch extends Expr {
    /** Class name (Name|Expr) */
    public class_: Node;
    /** Constant name (Identifier|Expr|Error) */
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
        return 'Expr_ClassConstFetch';
    }
}
