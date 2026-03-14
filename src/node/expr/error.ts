import { Expr } from '../expr';

/**
 * Error node used during parsing with error recovery.
 *
 * An error node may be placed at a position where an expression is required, but an error occurred.
 * Error nodes will not be present if the parser is run in throwOnError mode (the default).
 */
export class Error extends Expr {
    constructor(attributes: Record<string, any> = {}) {
        super(attributes);
    }

    getSubNodeNames(): string[] {
        return [];
    }

    getType(): string {
        return 'Expr_Error';
    }
}
