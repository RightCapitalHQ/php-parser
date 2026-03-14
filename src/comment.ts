export class Comment {
  protected text: string;
  protected startLine: number;
  protected startFilePos: number;
  protected startTokenPos: number;
  protected endLine: number;
  protected endFilePos: number;
  protected endTokenPos: number;

  constructor(
    text: string,
    startLine: number = -1,
    startFilePos: number = -1,
    startTokenPos: number = -1,
    endLine: number = -1,
    endFilePos: number = -1,
    endTokenPos: number = -1,
  ) {
    this.text = text;
    this.startLine = startLine;
    this.startFilePos = startFilePos;
    this.startTokenPos = startTokenPos;
    this.endLine = endLine;
    this.endFilePos = endFilePos;
    this.endTokenPos = endTokenPos;
  }

  getText(): string {
    return this.text;
  }

  getStartLine(): number {
    return this.startLine;
  }

  getStartFilePos(): number {
    return this.startFilePos;
  }

  getStartTokenPos(): number {
    return this.startTokenPos;
  }

  getEndLine(): number {
    return this.endLine;
  }

  getEndFilePos(): number {
    return this.endFilePos;
  }

  getEndTokenPos(): number {
    return this.endTokenPos;
  }

  toString(): string {
    return this.text;
  }

  getReformattedText(): string {
    let text = this.text.replace(/\r\n/g, '\n');
    const newlinePos = text.indexOf('\n');
    if (newlinePos === -1) {
      return text;
    }

    if (/^.*(?:\n\s+\*.*)+$/.test(text)) {
      return text.replace(/^\s+\*/gm, ' *');
    }

    const closeMatch = text.match(/\n(\s*)\*\/$/);
    if (/^\/\*\*?\s*\n/.test(text) && closeMatch) {
      const indent = closeMatch[1];
      return text.replace(new RegExp('^' + escapeRegExp(indent), 'gm'), '');
    }

    const openMatch = text.match(/^\/\*\*?\s*(?!\s)/);
    if (openMatch) {
      const afterNewline = text.substring(newlinePos + 1);
      const prefixLen = getShortestWhitespacePrefixLen(afterNewline);
      const removeLen = prefixLen - openMatch[0].length;
      if (removeLen > 0) {
        return text.replace(new RegExp('^\\s{' + removeLen + '}', 'gm'), '');
      }
    }

    return text;
  }

  toJSON(): Record<string, any> {
    const type = this instanceof DocComment ? 'Comment_Doc' : 'Comment';
    return {
      nodeType: type,
      text: this.text,
      line: this.startLine,
      filePos: this.startFilePos,
      tokenPos: this.startTokenPos,
      endLine: this.endLine,
      endFilePos: this.endFilePos,
      endTokenPos: this.endTokenPos,
    };
  }
}

export class DocComment extends Comment {
  constructor(
    text: string,
    startLine: number = -1,
    startFilePos: number = -1,
    startTokenPos: number = -1,
    endLine: number = -1,
    endFilePos: number = -1,
    endTokenPos: number = -1,
  ) {
    super(text, startLine, startFilePos, startTokenPos, endLine, endFilePos, endTokenPos);
  }
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getShortestWhitespacePrefixLen(str: string): number {
  const lines = str.split('\n');
  let shortest = Infinity;
  for (const line of lines) {
    const match = line.match(/^\s*/);
    const prefixLen = match ? match[0].length : 0;
    if (prefixLen < shortest) {
      shortest = prefixLen;
    }
  }
  return shortest;
}
