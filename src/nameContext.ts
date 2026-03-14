import { Name, FullyQualified } from './node/name';
import { PhpParserError } from './error';

export class NameContext {
  private namespace: Name | null = null;
  private aliases: Map<string, Map<string, Name>> = new Map();

  static readonly TYPE_NORMAL = 1;
  static readonly TYPE_FUNCTION = 2;
  static readonly TYPE_CONSTANT = 3;

  constructor() {
    this.aliases.set(String(NameContext.TYPE_NORMAL), new Map());
    this.aliases.set(String(NameContext.TYPE_FUNCTION), new Map());
    this.aliases.set(String(NameContext.TYPE_CONSTANT), new Map());
  }

  startNamespace(namespace: Name | null = null): void {
    this.namespace = namespace;
    this.aliases.set(String(NameContext.TYPE_NORMAL), new Map());
    this.aliases.set(String(NameContext.TYPE_FUNCTION), new Map());
    this.aliases.set(String(NameContext.TYPE_CONSTANT), new Map());
  }

  addAlias(name: Name, alias: string, type: number = NameContext.TYPE_NORMAL): void {
    const typeKey = String(type);
    const map = this.aliases.get(typeKey);
    if (!map) return;

    const normalizedAlias = type === NameContext.TYPE_CONSTANT ? alias : alias.toLowerCase();
    if (map.has(normalizedAlias)) {
      throw new PhpParserError(
        `Cannot use ${name.toString()} as ${alias} because the name is already in use`,
        {}
      );
    }
    map.set(normalizedAlias, name);
  }

  getNamespace(): Name | null {
    return this.namespace;
  }

  getResolvedName(name: Name, type: number): Name {
    // Fully qualified names need no resolution
    if (name.isFullyQualified()) {
      return name;
    }

    // Relative names are resolved relative to the current namespace
    if (name.isRelative()) {
      return this.resolveRelativeName(name);
    }

    // Try alias resolution for unqualified names
    if (name.isUnqualified()) {
      const typeKey = String(type);
      const map = this.aliases.get(typeKey);
      const normalizedName = type === NameContext.TYPE_CONSTANT ? name.toString() : name.toLowerString();
      if (map && map.has(normalizedName)) {
        return new FullyQualified(
          map.get(normalizedName)!.toString(),
          name.getAttributes()
        );
      }

      // For class-like names, check the normal alias map too
      if (type === NameContext.TYPE_NORMAL) {
        // Not aliased, resolve relative to namespace
        return this.resolveRelativeName(name);
      }

      // For functions and constants, leave as unresolved
      return this.resolveRelativeName(name);
    }

    // Qualified names: check first component for alias
    const parts = name.getParts();
    const first = parts[0].toLowerCase();
    const normalMap = this.aliases.get(String(NameContext.TYPE_NORMAL));
    if (normalMap && normalMap.has(first)) {
      const aliasTarget = normalMap.get(first)!;
      const rest = parts.slice(1);
      return new FullyQualified(
        aliasTarget.toString() + '\\' + rest.join('\\'),
        name.getAttributes()
      );
    }

    // No alias found, resolve relative to namespace
    return this.resolveRelativeName(name);
  }

  getResolvedClassName(name: Name): Name {
    return this.getResolvedName(name, NameContext.TYPE_NORMAL);
  }

  getPossibleNames(name: string, type: number): Name[] {
    const result: Name[] = [];
    // Return the name as fully qualified
    result.push(new FullyQualified(name));
    return result;
  }

  getShortName(name: string, type: number): Name {
    return new Name(name);
  }

  private resolveRelativeName(name: Name): Name {
    if (this.namespace !== null) {
      return new FullyQualified(
        this.namespace.toString() + '\\' + name.toString(),
        name.getAttributes()
      );
    }
    return new FullyQualified(name.toString(), name.getAttributes());
  }
}
