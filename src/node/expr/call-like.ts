import { Expr } from '../expr';

export abstract class CallLike extends Expr {
    /**
     * Return raw arguments, which may be actual Args, or VariadicPlaceholders for first-class
     * callables.
     */
    abstract getRawArgs(): any[];

    /**
     * Returns whether this call expression is actually a first class callable.
     */
    isFirstClassCallable(): boolean {
        const rawArgs = this.getRawArgs();
        return rawArgs.length === 1 && rawArgs[0]?.nodeType === 'VariadicPlaceholder';
    }

    /**
     * Assert that this is not a first-class callable and return only ordinary Args.
     */
    getArgs(): any[] {
        return this.getRawArgs();
    }

    /**
     * Retrieves a specific argument from the raw arguments.
     */
    getArg(name: string, position: number): any | null {
        if (this.isFirstClassCallable()) {
            return null;
        }
        const rawArgs = this.getRawArgs();
        for (let i = 0; i < rawArgs.length; i++) {
            const arg = rawArgs[i];
            if (arg.unpack) {
                continue;
            }
            if (
                (arg.name !== null && arg.name !== undefined && arg.name.toString() === name) ||
                (arg.name === null || arg.name === undefined) && i === position
            ) {
                return arg;
            }
        }
        return null;
    }
}
