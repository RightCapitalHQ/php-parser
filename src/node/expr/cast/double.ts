import { Cast } from '../cast';

export class Double extends Cast {
    static readonly KIND_DOUBLE = 1;
    static readonly KIND_FLOAT = 2;
    static readonly KIND_REAL = 3;

    getType(): string {
        return 'Expr_Cast_Double';
    }
}
