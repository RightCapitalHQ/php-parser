import { Expr } from '../expr';

export class Yield_ extends Expr {
    /** Key expression */
    public key: Expr | null;
    /** Value expression */
    public value: Expr | null;

    constructor(value: Expr | null = null, key: Expr | null = null, attributes: Record<string, any> = {}) {
        super(attributes);
        this.key = key;
        this.value = value;
    }

    getSubNodeNames(): string[] {
        return ['key', 'value'];
    }

    getType(): string {
        return 'Expr_Yield';
    }
}
