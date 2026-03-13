import { Node } from '../../node';
import { Expr } from '../expr';

export class ArrowFunction extends Expr {
    /** Whether the closure is static */
    public static_: boolean;
    /** Whether to return by reference */
    public byRef: boolean;
    /** Parameters (Param[]) */
    public params: any[];
    /** Return type (Identifier|Name|ComplexType|null) */
    public returnType: Node | null;
    /** Expression body */
    public expr: Expr;
    /** PHP attribute groups (AttributeGroup[]) */
    public attrGroups: any[];

    constructor(
        subNodes: {
            expr: Expr;
            static?: boolean;
            byRef?: boolean;
            params?: any[];
            returnType?: Node | null;
            attrGroups?: any[];
        },
        attributes: Record<string, any> = {}
    ) {
        super(attributes);
        this.static_ = subNodes.static ?? false;
        this.byRef = subNodes.byRef ?? false;
        this.params = subNodes.params ?? [];
        this.returnType = subNodes.returnType ?? null;
        this.expr = subNodes.expr;
        this.attrGroups = subNodes.attrGroups ?? [];
    }

    getSubNodeNames(): string[] {
        return ['attrGroups', 'static', 'byRef', 'params', 'returnType', 'expr'];
    }

    returnsByRef(): boolean {
        return this.byRef;
    }

    getParams(): any[] {
        return this.params;
    }

    getReturnType(): Node | null {
        return this.returnType;
    }

    getAttrGroups(): any[] {
        return this.attrGroups;
    }

    getType(): string {
        return 'Expr_ArrowFunction';
    }
}
