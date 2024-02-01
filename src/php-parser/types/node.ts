import type { IAttributes } from './attributes';

export interface INode {
  nodeType?: string;
  attributes: IAttributes;
}

export type NodeAbstract = INode;
