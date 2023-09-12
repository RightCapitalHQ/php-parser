/**
 * Comment Node is not a typical node, it is a node alike structure
 */
export type CommentNodeType = 'Comment_Doc' | 'Comment';

export interface IComment {
  nodeType: CommentNodeType;
  text: string;
  line: number;
  filePos: number;
  tokenPos: number;
  endLine: number;
  endFilePos: number;
  endTokenPos: number;
}
