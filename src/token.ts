export class Token {
  public id: number;
  public text: string;
  public line: number;
  public pos: number;

  constructor(id: number, text: string, line: number, pos: number) {
    this.id = id;
    this.text = text;
    this.line = line;
    this.pos = pos;
  }

  is(ids: number | number[]): boolean {
    if (Array.isArray(ids)) {
      return ids.includes(this.id);
    }
    return this.id === ids;
  }

  getEndPos(): number {
    return this.pos + this.text.length;
  }

  getEndLine(): number {
    let count = 0;
    for (let i = 0; i < this.text.length; i++) {
      if (this.text[i] === '\n') count++;
    }
    return this.line + count;
  }
}
