import { Expr } from '../expr';

export abstract class BinaryOp extends Expr {
    /** The left hand side expression */
    public left: Expr;
    /** The right hand side expression */
    public right: Expr;

    constructor(left: Expr, right: Expr, attributes: Record<string, any> = {}) {
        super(attributes);
        this.left = left;
        this.right = right;
    }

    getSubNodeNames(): string[] {
        return ['left', 'right'];
    }

    abstract getOperatorSigil(): string;
}
