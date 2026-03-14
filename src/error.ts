export class PhpParserError extends Error {
  public rawMessage: string;
  public attributes: Record<string, any>;

  constructor(message: string, attributes: Record<string, any> = {}) {
    super(message);
    this.rawMessage = message;
    this.attributes = attributes;
    this.updateMessage();
    Object.setPrototypeOf(this, PhpParserError.prototype);
  }

  getRawMessage(): string {
    return this.rawMessage;
  }

  getStartLine(): number {
    return this.attributes['startLine'] ?? -1;
  }

  getEndLine(): number {
    return this.attributes['endLine'] ?? -1;
  }

  getAttributes(): Record<string, any> {
    return this.attributes;
  }

  setAttributes(attributes: Record<string, any>): void {
    this.attributes = attributes;
    this.updateMessage();
  }

  setRawMessage(message: string): void {
    this.rawMessage = message;
    this.updateMessage();
  }

  setStartLine(line: number): void {
    this.attributes['startLine'] = line;
    this.updateMessage();
  }

  hasColumnInfo(): boolean {
    return 'startFilePos' in this.attributes && 'endFilePos' in this.attributes;
  }

  getStartColumn(code: string): number {
    if (!this.hasColumnInfo()) {
      throw new Error('Error does not have column information');
    }
    return this.toColumn(code, this.attributes['startFilePos']);
  }

  getEndColumn(code: string): number {
    if (!this.hasColumnInfo()) {
      throw new Error('Error does not have column information');
    }
    return this.toColumn(code, this.attributes['endFilePos']);
  }

  getMessageWithColumnInfo(code: string): string {
    return `${this.getRawMessage()} from ${this.getStartLine()}:${this.getStartColumn(code)} to ${this.getEndLine()}:${this.getEndColumn(code)}`;
  }

  private toColumn(code: string, pos: number): number {
    if (pos > code.length) {
      throw new Error('Invalid position information');
    }
    const lineStartPos = code.lastIndexOf('\n', pos - 1);
    return pos - lineStartPos;
  }

  protected updateMessage(): void {
    this.message = this.rawMessage;
    if (this.getStartLine() === -1) {
      this.message += ' on unknown line';
    } else {
      this.message += ' on line ' + this.getStartLine();
    }
  }
}
