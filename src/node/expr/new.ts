import { Node } from '../../node';
import { CallLike } from './call-like';

export class New_ extends CallLike {
    /** Class name (Name|Expr|Class_) */
    public class_: Node;
    /** Arguments (Arg|VariadicPlaceholder)[] */
    public args: any[];

    constructor(class_: Node, args: any[] = [], attributes: Record<string, any> = {}) {
        super(attributes);
        this.class_ = class_;
        this.args = args;
    }

    getSubNodeNames(): string[] {
        return ['class', 'args'];
    }

    getType(): string {
        return 'Expr_New';
    }

    getRawArgs(): any[] {
        return this.args;
    }
}
