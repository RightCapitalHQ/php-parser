import { Expr } from '../expr';

export class Isset_ extends Expr {
    /** Variables (Expr[]) */
    public vars: Expr[];

    constructor(vars: Expr[], attributes: Record<string, any> = {}) {
        super(attributes);
        this.vars = vars;
    }

    getSubNodeNames(): string[] {
        return ['vars'];
    }

    getType(): string {
        return 'Expr_Isset';
    }
}
