import { Expr } from '../expr';

export class Match_ extends Expr {
    /** Condition */
    public cond: Expr;
    /** Match arms (MatchArm[]) */
    public arms: any[];

    constructor(cond: Expr, arms: any[] = [], attributes: Record<string, any> = {}) {
        super(attributes);
        this.cond = cond;
        this.arms = arms;
    }

    getSubNodeNames(): string[] {
        return ['cond', 'arms'];
    }

    getType(): string {
        return 'Expr_Match';
    }
}
