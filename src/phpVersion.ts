export class PhpVersion {
  public readonly id: number;

  private static readonly BUILTIN_TYPE_VERSIONS: Record<string, number> = {
    'array': 50100,
    'callable': 50400,
    'bool': 70000,
    'int': 70000,
    'float': 70000,
    'string': 70000,
    'iterable': 70100,
    'void': 70100,
    'object': 70200,
    'null': 80000,
    'false': 80000,
    'mixed': 80000,
    'never': 80100,
    'true': 80200,
  };

  private constructor(id: number) {
    this.id = id;
  }

  static fromComponents(major: number, minor: number): PhpVersion {
    return new PhpVersion(major * 10000 + minor * 100);
  }

  static getNewestSupported(): PhpVersion {
    return PhpVersion.fromComponents(8, 5);
  }

  static getHostVersion(): PhpVersion {
    return PhpVersion.fromComponents(8, 4);
  }

  static fromString(version: string): PhpVersion {
    const match = version.match(/^(\d+)\.(\d+)/);
    if (!match) {
      throw new Error(`Invalid PHP version "${version}"`);
    }
    return PhpVersion.fromComponents(parseInt(match[1]), parseInt(match[2]));
  }

  equals(other: PhpVersion): boolean {
    return this.id === other.id;
  }

  newerOrEqual(other: PhpVersion): boolean {
    return this.id >= other.id;
  }

  older(other: PhpVersion): boolean {
    return this.id < other.id;
  }

  isHostVersion(): boolean {
    return this.equals(PhpVersion.getHostVersion());
  }

  supportsBuiltinType(type: string): boolean {
    const minVersion = PhpVersion.BUILTIN_TYPE_VERSIONS[type];
    return minVersion !== undefined && this.id >= minVersion;
  }

  supportsShortArraySyntax(): boolean { return this.id >= 50400; }
  supportsShortArrayDestructuring(): boolean { return this.id >= 70100; }
  supportsFlexibleHeredoc(): boolean { return this.id >= 70300; }
  supportsTrailingCommaInParamList(): boolean { return this.id >= 80000; }
  allowsAssignNewByReference(): boolean { return this.id < 70000; }
  allowsInvalidOctals(): boolean { return this.id < 70000; }
  allowsDelInIdentifiers(): boolean { return this.id < 70100; }
  supportsYieldWithoutParentheses(): boolean { return this.id >= 70000; }
  supportsUnicodeEscapes(): boolean { return this.id >= 70000; }
  supportsAttributes(): boolean { return this.id >= 80000; }
  supportsNewDereferenceWithoutParentheses(): boolean { return this.id >= 80400; }
}
