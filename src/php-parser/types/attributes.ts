import type { IComment } from './comment';

export interface IAttributes {
  startLine: number;
  startFilePos: number;
  endLine: number;
  endFilePos: number;
  comments?: IComment[];
}
