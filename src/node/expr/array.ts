import { Expr } from '../expr';

export class Array_ extends Expr {
    static readonly KIND_LONG = 1;
    static readonly KIND_SHORT = 2;

    /** Items (ArrayItem[]) */
    public items: any[];

    constructor(items: any[] = [], attributes: Record<string, any> = {}) {
        super(attributes);
        this.items = items;
    }

    getSubNodeNames(): string[] {
        return ['items'];
    }

    getType(): string {
        return 'Expr_Array';
    }
}
