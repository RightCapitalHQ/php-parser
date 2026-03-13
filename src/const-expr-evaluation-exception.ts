export class ConstExprEvaluationException extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, ConstExprEvaluationException.prototype);
    }
}
