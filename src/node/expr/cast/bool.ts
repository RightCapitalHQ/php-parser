import { Cast } from '../cast';

export class Bool_ extends Cast {
    static readonly KIND_BOOL = 1;
    static readonly KIND_BOOLEAN = 2;

    getType(): string {
        return 'Expr_Cast_Bool';
    }
}
