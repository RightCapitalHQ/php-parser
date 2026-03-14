import { Comment, DocComment } from './comment';

export interface Node {
  getType(): string;
  getSubNodeNames(): string[];
  getLine(): number;
  getStartLine(): number;
  getEndLine(): number;
  getStartTokenPos(): number;
  getEndTokenPos(): number;
  getStartFilePos(): number;
  getEndFilePos(): number;
  getComments(): Comment[];
  getDocComment(): DocComment | null;
  setDocComment(docComment: DocComment): void;
  setAttribute(key: string, value: any): void;
  hasAttribute(key: string): boolean;
  getAttribute(key: string, defaultValue?: any): any;
  getAttributes(): Record<string, any>;
  setAttributes(attributes: Record<string, any>): void;
  [key: string]: any;
}

export abstract class NodeAbstract implements Node {
  protected attributes: Record<string, any>;
  [key: string]: any;

  constructor(attributes: Record<string, any> = {}) {
    this.attributes = attributes;
  }

  abstract getType(): string;
  abstract getSubNodeNames(): string[];

  getLine(): number {
    return this.attributes['startLine'] ?? -1;
  }

  getStartLine(): number {
    return this.attributes['startLine'] ?? -1;
  }

  getEndLine(): number {
    return this.attributes['endLine'] ?? -1;
  }

  getStartTokenPos(): number {
    return this.attributes['startTokenPos'] ?? -1;
  }

  getEndTokenPos(): number {
    return this.attributes['endTokenPos'] ?? -1;
  }

  getStartFilePos(): number {
    return this.attributes['startFilePos'] ?? -1;
  }

  getEndFilePos(): number {
    return this.attributes['endFilePos'] ?? -1;
  }

  getComments(): Comment[] {
    return this.attributes['comments'] ?? [];
  }

  getDocComment(): DocComment | null {
    const comments = this.getComments();
    for (let i = comments.length - 1; i >= 0; i--) {
      if (comments[i] instanceof DocComment) {
        return comments[i] as DocComment;
      }
    }
    return null;
  }

  setDocComment(docComment: DocComment): void {
    const comments = this.getComments();
    for (let i = comments.length - 1; i >= 0; i--) {
      if (comments[i] instanceof DocComment) {
        comments[i] = docComment;
        this.setAttribute('comments', comments);
        return;
      }
    }
    comments.push(docComment);
    this.setAttribute('comments', comments);
  }

  setAttribute(key: string, value: any): void {
    this.attributes[key] = value;
  }

  hasAttribute(key: string): boolean {
    return key in this.attributes;
  }

  getAttribute(key: string, defaultValue: any = null): any {
    if (key in this.attributes) {
      return this.attributes[key];
    }
    return defaultValue;
  }

  getAttributes(): Record<string, any> {
    return this.attributes;
  }

  setAttributes(attributes: Record<string, any>): void {
    this.attributes = attributes;
  }

  toJSON(): Record<string, any> {
    const result: Record<string, any> = { nodeType: this.getType() };
    for (const name of this.getSubNodeNames()) {
      result[name] = (this as any)[name];
    }
    result['attributes'] = this.attributes;
    return result;
  }
}
