import type { IComment } from './comment';

export interface IAttributes {
  startLine: number;
  startFilePos: number;
  startTokenPos: number;
  endLine: number;
  endFilePos: number;
  endTokenPos: number;
  comments?: IComment[];
}
