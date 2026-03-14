import { Node } from '../../node';
import { Expr } from '../expr';

export class Closure extends Expr {
    /** Whether the closure is static */
    public static_: boolean;
    /** Whether to return by reference */
    public byRef: boolean;
    /** Parameters (Param[]) */
    public params: any[];
    /** use()s (ClosureUse[]) */
    public uses: any[];
    /** Return type (Identifier|Name|ComplexType|null) */
    public returnType: Node | null;
    /** Statements (Stmt[]) */
    public stmts: any[];
    /** PHP attribute groups (AttributeGroup[]) */
    public attrGroups: any[];

    constructor(
        subNodes: {
            static?: boolean;
            byRef?: boolean;
            params?: any[];
            uses?: any[];
            returnType?: Node | null;
            stmts?: any[];
            attrGroups?: any[];
        } = {},
        attributes: Record<string, any> = {}
    ) {
        super(attributes);
        this.static_ = subNodes.static ?? false;
        this.byRef = subNodes.byRef ?? false;
        this.params = subNodes.params ?? [];
        this.uses = subNodes.uses ?? [];
        this.returnType = subNodes.returnType ?? null;
        this.stmts = subNodes.stmts ?? [];
        this.attrGroups = subNodes.attrGroups ?? [];
    }

    getSubNodeNames(): string[] {
        return ['attrGroups', 'static', 'byRef', 'params', 'uses', 'returnType', 'stmts'];
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

    getStmts(): any[] {
        return this.stmts;
    }

    getAttrGroups(): any[] {
        return this.attrGroups;
    }

    getType(): string {
        return 'Expr_Closure';
    }
}
