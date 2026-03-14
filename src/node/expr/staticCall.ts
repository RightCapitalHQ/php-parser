import { Node } from '../../node';
import { CallLike } from './callLike';

export class StaticCall extends CallLike {
    /** Class name (Name|Expr) */
    public class_: Node;
    /** Method name (Identifier|Expr) */
    public name: Node;
    /** Arguments (Arg|VariadicPlaceholder)[] */
    public args: any[];

    constructor(class_: Node, name: Node, args: any[] = [], attributes: Record<string, any> = {}) {
        super(attributes);
        this.class_ = class_;
        this.name = name;
        this.args = args;
    }

    getSubNodeNames(): string[] {
        return ['class', 'name', 'args'];
    }

    getType(): string {
        return 'Expr_StaticCall';
    }

    getRawArgs(): any[] {
        return this.args;
    }
}
