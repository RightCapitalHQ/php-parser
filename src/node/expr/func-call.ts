import { Node } from '../../node';
import { CallLike } from './call-like';

export class FuncCall extends CallLike {
    /** Function name (Name|Expr) */
    public name: Node;
    /** Arguments (Arg|VariadicPlaceholder)[] */
    public args: any[];

    constructor(name: Node, args: any[] = [], attributes: Record<string, any> = {}) {
        super(attributes);
        this.name = name;
        this.args = args;
    }

    getSubNodeNames(): string[] {
        return ['name', 'args'];
    }

    getType(): string {
        return 'Expr_FuncCall';
    }

    getRawArgs(): any[] {
        return this.args;
    }
}
