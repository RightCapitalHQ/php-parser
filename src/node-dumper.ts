import { Node } from './node';
import { Comment } from './comment';
import { Modifiers } from './modifiers';

export interface NodeDumperOptions {
  dumpComments?: boolean;
  dumpPositions?: boolean;
  dumpOtherAttributes?: boolean;
}

const IGNORE_ATTRIBUTES: Record<string, boolean> = {
  'comments': true,
  'startLine': true,
  'endLine': true,
  'startFilePos': true,
  'endFilePos': true,
  'startTokenPos': true,
  'endTokenPos': true,
};

export class NodeDumper {
  private dumpComments: boolean;
  private dumpPositions: boolean;
  private dumpOtherAttributes: boolean;
  private code: string | null = null;
  private res: string = '';
  private nl: string = '\n';

  constructor(options: NodeDumperOptions = {}) {
    this.dumpComments = !!options.dumpComments;
    this.dumpPositions = !!options.dumpPositions;
    this.dumpOtherAttributes = !!options.dumpOtherAttributes;
  }

  dump(node: any, code: string | null = null): string {
    this.code = code;
    this.res = '';
    this.nl = '\n';
    this.dumpRecursive(node, false);
    return this.res;
  }

  protected dumpRecursive(node: any, indent: boolean = true): void {
    if (indent) {
      this.nl += '    ';
    }

    if (node !== null && typeof node === 'object' && typeof node.getType === 'function' && typeof node.getSubNodeNames === 'function') {
      // It's a Node
      this.res += node.getType();
      if (this.dumpPositions) {
        const p = this.dumpPosition(node);
        if (p !== null) this.res += p;
      }
      this.res += '(';

      for (const key of node.getSubNodeNames()) {
        this.res += `${this.nl}    ${key}: `;
        // Some properties use trailing underscore to avoid reserved word conflicts (e.g., class_)
        const value = node[key] !== undefined ? node[key] : node[key + '_'];
        if (typeof value === 'number' && (key === 'flags' || key === 'newModifier')) {
          this.res += this.dumpFlags(value);
          continue;
        }
        // Include type constants
        if (key === 'type' && node.getType() === 'Expr_Include') {
          this.res += this.dumpIncludeType(value as number);
          continue;
        }
        // Use type constants
        if (key === 'type' && (node.getType() === 'Stmt_Use' || node.getType() === 'Stmt_GroupUse' || node.getType() === 'UseItem')) {
          this.res += this.dumpUseType(value as number);
          continue;
        }
        this.dumpRecursive(value);
      }

      if (this.dumpComments) {
        const comments = node.getComments();
        if (comments && comments.length > 0) {
          this.res += `${this.nl}    comments: `;
          this.dumpRecursive(comments);
        }
      }

      if (this.dumpOtherAttributes) {
        const attrs = node.getAttributes();
        for (const key of Object.keys(attrs)) {
          if (IGNORE_ATTRIBUTES[key]) continue;
          this.res += `${this.nl}    ${key}: `;
          this.dumpRecursive(attrs[key]);
        }
      }

      this.res += `${this.nl})`;
    } else if (Array.isArray(node)) {
      this.res += 'array(';
      for (let i = 0; i < node.length; i++) {
        this.res += `${this.nl}    ${i}: `;
        this.dumpRecursive(node[i]);
      }
      this.res += `${this.nl})`;
    } else if (node instanceof Comment) {
      this.res += node.getReformattedText().replace(/\n/g, this.nl);
    } else if (typeof node === 'string') {
      this.res += node.replace(/\n/g, this.nl);
    } else if (typeof node === 'number') {
      this.res += this.formatNumber(node);
    } else if (node === null) {
      this.res += 'null';
    } else if (node === false) {
      this.res += 'false';
    } else if (node === true) {
      this.res += 'true';
    } else if (typeof node === 'undefined') {
      this.res += 'null';
    } else if (typeof node === 'object') {
      // Generic object - dump as string
      this.res += String(node);
    } else {
      throw new Error('Can only dump nodes and arrays.');
    }

    if (indent) {
      this.nl = this.nl.substring(0, this.nl.length - 4);
    }
  }

  protected dumpFlags(flags: number): string {
    const strs: string[] = [];
    if (flags & Modifiers.PUBLIC) strs.push('PUBLIC');
    if (flags & Modifiers.PROTECTED) strs.push('PROTECTED');
    if (flags & Modifiers.PRIVATE) strs.push('PRIVATE');
    if (flags & Modifiers.ABSTRACT) strs.push('ABSTRACT');
    if (flags & Modifiers.STATIC) strs.push('STATIC');
    if (flags & Modifiers.FINAL) strs.push('FINAL');
    if (flags & Modifiers.READONLY) strs.push('READONLY');
    if (flags & Modifiers.PUBLIC_SET) strs.push('PUBLIC_SET');
    if (flags & Modifiers.PROTECTED_SET) strs.push('PROTECTED_SET');
    if (flags & Modifiers.PRIVATE_SET) strs.push('PRIVATE_SET');

    if (strs.length > 0) {
      return strs.join(' | ') + ' (' + flags + ')';
    }
    return String(flags);
  }

  protected dumpIncludeType(type: number): string {
    const names: Record<number, string> = {
      1: 'TYPE_INCLUDE',
      2: 'TYPE_INCLUDE_ONCE',
      3: 'TYPE_REQUIRE',
      4: 'TYPE_REQUIRE_ONCE',
    };
    const name = names[type];
    return name ? `${name} (${type})` : String(type);
  }

  protected dumpUseType(type: number): string {
    const names: Record<number, string> = {
      0: 'TYPE_UNKNOWN',
      1: 'TYPE_NORMAL',
      2: 'TYPE_FUNCTION',
      3: 'TYPE_CONSTANT',
    };
    const name = names[type];
    if (name) return `${name} (${type})`;
    return String(type);
  }

  protected dumpPosition(node: Node): string | null {
    if (!node.hasAttribute('startLine') || !node.hasAttribute('endLine')) {
      return null;
    }

    let start: string = String(node.getStartLine());
    let end: string = String(node.getEndLine());

    if (node.hasAttribute('startFilePos') && node.hasAttribute('endFilePos') && this.code !== null) {
      start += ':' + this.toColumn(this.code, node.getStartFilePos());
      end += ':' + this.toColumn(this.code, node.getEndFilePos());
    }

    return `[${start} - ${end}]`;
  }

  private formatNumber(n: number): string {
    if (!Number.isFinite(n)) {
      if (n === Infinity) return 'INF';
      if (n === -Infinity) return '-INF';
      return 'NAN';
    }
    // Check if this is a float that should use PHP-style formatting
    if (!Number.isInteger(n) || Math.abs(n) >= 1e15) {
      // Format like PHP's serialize_precision (14 significant digits)
      const phpStr = this.formatPhpFloat(n);
      return phpStr;
    }
    return String(n);
  }

  private formatPhpFloat(n: number): string {
    // PHP uses 14 significant digits with uppercase E
    const s = n.toPrecision(14);
    // Split on e/E to handle mantissa and exponent separately
    const eIdx = s.search(/[eE]/);
    if (eIdx >= 0) {
      let mantissa = s.substring(0, eIdx);
      const exponent = s.substring(eIdx);
      // Remove trailing zeros from mantissa (after decimal point)
      mantissa = mantissa.replace(/\.?0+$/, '');
      return mantissa + exponent.toUpperCase();
    }
    // No exponent - remove trailing zeros
    let result = s.replace(/\.?0+$/, '');
    if (!result.includes('.') && !Number.isInteger(n)) {
      result += '.0';
    }
    return result;
  }

  private toColumn(code: string, pos: number): number {
    if (pos > code.length) {
      throw new Error('Invalid position information');
    }
    const lineStartPos = code.lastIndexOf('\n', pos - 1);
    return pos - lineStartPos;
  }
}
