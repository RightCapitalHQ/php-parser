import { Expr } from '../expr';

export class List_ extends Expr {
    static readonly KIND_LIST = 1;
    static readonly KIND_ARRAY = 2;

    /** List of items to assign to (ArrayItem|null)[] */
    public items: any[];

    constructor(items: any[], attributes: Record<string, any> = {}) {
        super(attributes);
        this.items = items;
    }

    getSubNodeNames(): string[] {
        return ['items'];
    }

    getType(): string {
        return 'Expr_List';
    }
}
