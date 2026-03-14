import { Node } from './node';
import { Token } from './token';

export interface Parser {
  parse(code: string): Node[] | null;
  getTokens(): Token[];
}
