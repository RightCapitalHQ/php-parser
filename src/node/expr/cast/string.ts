import { Cast } from '../cast';

export class String_ extends Cast {
    static readonly KIND_STRING = 1;
    static readonly KIND_BINARY = 2;

    getType(): string {
        return 'Expr_Cast_String';
    }
}
