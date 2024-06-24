import { join } from 'node:path';

import type { ICliContext, IContextNodeItem } from '../generate-types';

export class TypeGenerationHelpers {
  public static getGroupedTypeNameForNode(nodeName: string) {
    return `NodeTypeInheritingFrom${nodeName}`;
  }

  public static generateCombinationTypesFromNodes(
    cliContext: ICliContext,
  ): string {
    const { allNodes } = cliContext;

    /**
     * This file is under types directory
     */

    const importNodeNamesPart = Object.entries(allNodes)
      .map(([name, nodeItem]) => {
        const importPath = join('node', nodeItem.filePath);
        return `import type { ${name} } from './${importPath}';`;
      })
      .join('\n');

    const exportNodeNamesPart = Object.entries(allNodes)
      .map(([name, nodeItem]) => {
        const exportPath = join('node', nodeItem.filePath);
        return `export { ${name} } from './${exportPath}';`;
      })
      .join('\n');

    const combinationTypesPart = Object.entries(allNodes)
      .map(([name, nodeItem]) => {
        return `export type ${TypeGenerationHelpers.getGroupedTypeNameForNode(
          name,
        )} = ${[
          name,
          ...nodeItem.subNodeNames.map((subNodeName) =>
            TypeGenerationHelpers.getGroupedTypeNameForNode(subNodeName),
          ),
        ].join(' | ')};`;
      })
      .join('\n');

    return `
${importNodeNamesPart}      

${combinationTypesPart}

${exportNodeNamesPart}

${TypeGenerationHelpers.generateNodeTypeEnum(cliContext)}
      `;
  }

  public static generateNodeTypeEnum(cliContext: ICliContext): string {
    const { allNodes } = cliContext;

    const nodesThatHasNodeType: [string, IContextNodeItem][] = Object.values(
      allNodes,
    )
      .filter((node) => node.nodeType !== undefined && node.nodeType !== '')
      .map((node) => [node.nodeType, node]);
    const nodeEnum = `export enum NodeType {
${nodesThatHasNodeType
  .map(([nodeType, _]) => {
    return `  ${nodeType} = '${nodeType}',`;
  })
  .join('\n')}
}
`;

    const nodeTypeToInterfaceMap = `
export interface NodeTypeToInterfaceMap {
${nodesThatHasNodeType
  .map(([nodeType, node]) => {
    return `  [NodeType.${nodeType}]: ${node.name};`;
  })
  .join('\n')}
}
    `;

    return `
${nodeEnum};
${nodeTypeToInterfaceMap}
`;
  }
}
