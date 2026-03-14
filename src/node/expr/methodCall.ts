import { Node } from '../../node';
import { Expr } from '../expr';
import { CallLike } from './callLike';

export class MethodCall extends CallLike {
    /** Variable holding object */
    public var: Expr;
    /** Method name (Identifier|Expr) */
    public name: Node;
    /** Arguments (Arg|VariadicPlaceholder)[] */
    public args: any[];

    constructor(var_: Expr, name: Node, args: any[] = [], attributes: Record<string, any> = {}) {
        super(attributes);
        this.var = var_;
        this.name = name;
        this.args = args;
    }

    getSubNodeNames(): string[] {
        return ['var', 'name', 'args'];
    }

    getType(): string {
        return 'Expr_MethodCall';
    }

    getRawArgs(): any[] {
        return this.args;
    }
}
