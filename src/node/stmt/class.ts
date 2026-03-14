import { Modifiers } from '../../modifiers';
import { ClassLike } from './classLike';

export class Class_ extends ClassLike {
  public flags: number;
  public extends: any | null;
  public implements: any[];

  constructor(
    name: any | null,
    subNodes: {
      flags?: number;
      extends?: any | null;
      implements?: any[];
      stmts?: any[];
      attrGroups?: any[];
    } = {},
    attributes: Record<string, any> = {}
  ) {
    super(attributes);
    this.flags = subNodes.flags ?? 0;
    this.name = name;
    this.extends = subNodes.extends ?? null;
    this.implements = subNodes.implements ?? [];
    this.stmts = subNodes.stmts ?? [];
    this.attrGroups = subNodes.attrGroups ?? [];
  }

  getSubNodeNames(): string[] {
    return ['attrGroups', 'flags', 'name', 'extends', 'implements', 'stmts'];
  }

  isAbstract(): boolean {
    return !!(this.flags & Modifiers.ABSTRACT);
  }

  isFinal(): boolean {
    return !!(this.flags & Modifiers.FINAL);
  }

  isReadonly(): boolean {
    return !!(this.flags & Modifiers.READONLY);
  }

  isAnonymous(): boolean {
    return this.name === null;
  }

  getType(): string {
    return 'Stmt_Class';
  }
}
