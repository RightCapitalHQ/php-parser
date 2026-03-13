import { Expr } from '../expr';

export class ShellExec extends Expr {
    /** Interpolated string array (Expr|InterpolatedStringPart)[] */
    public parts: any[];

    constructor(parts: any[], attributes: Record<string, any> = {}) {
        super(attributes);
        this.parts = parts;
    }

    getSubNodeNames(): string[] {
        return ['parts'];
    }

    getType(): string {
        return 'Expr_ShellExec';
    }
}
