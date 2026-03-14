import { Cast } from '../cast';

export class Int_ extends Cast {
    static readonly KIND_INT = 1;
    static readonly KIND_INTEGER = 2;

    getType(): string {
        return 'Expr_Cast_Int';
    }
}
