import { PhpParserError } from './error';

export const Modifiers = {
  PUBLIC: 1,
  PROTECTED: 2,
  PRIVATE: 4,
  STATIC: 8,
  ABSTRACT: 16,
  FINAL: 32,
  READONLY: 64,
  PUBLIC_SET: 128,
  PROTECTED_SET: 256,
  PRIVATE_SET: 512,

  VISIBILITY_MASK: 1 | 2 | 4,
  VISIBILITY_SET_MASK: 128 | 256 | 512,

  toString(modifier: number): string {
    const map: Record<number, string> = {
      1: 'public',
      2: 'protected',
      4: 'private',
      8: 'static',
      16: 'abstract',
      32: 'final',
      64: 'readonly',
      128: 'public(set)',
      256: 'protected(set)',
      512: 'private(set)',
    };
    if (!(modifier in map)) {
      throw new Error(`Unknown modifier ${modifier}`);
    }
    return map[modifier];
  },

  verifyClassModifier(a: number, b: number): void {
    if ((a & b) !== 0) {
      throw new PhpParserError('Multiple ' + Modifiers.toString(b) + ' modifiers are not allowed');
    }
    if ((a & 48) && (b & 48)) {
      throw new PhpParserError('Cannot use the final modifier on an abstract class');
    }
  },

  verifyModifier(a: number, b: number): void {
    if (
      (a & Modifiers.VISIBILITY_MASK && b & Modifiers.VISIBILITY_MASK) ||
      (a & Modifiers.VISIBILITY_SET_MASK && b & Modifiers.VISIBILITY_SET_MASK)
    ) {
      throw new PhpParserError('Multiple access type modifiers are not allowed');
    }
    if ((a & b) !== 0) {
      throw new PhpParserError('Multiple ' + Modifiers.toString(b) + ' modifiers are not allowed');
    }
    if ((a & 48) && (b & 48)) {
      throw new PhpParserError('Cannot use the final modifier on an abstract class member');
    }
  },
} as const;
