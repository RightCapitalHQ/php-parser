#!/usr/bin/env ts-node

import {
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'fs';
import { resolve } from 'path';
import * as path from 'path';
import * as _ from 'lodash';
import * as Mustache from 'mustache';
import { CliHelpers } from './helpers/cli-helpers';
import { FilePathHelpers } from './helpers/file-path-helpers';
import {
  IProperty,
  IUses,
  NodeRetrieverHelpers,
} from './helpers/node-retriever-helpers';
import { TypeGenerationHelpers } from './helpers/type-generation-helpers';
import { PROJECT_ROOT, SRC_ROOT } from '../constants';

const PHP_PARSER_ROOT_PATH = resolve(
  PROJECT_ROOT,
  'vendor/nikic/php-parser/lib/PhpParser',
);
const PHP_PARSER_NODE_DIRECTORY_PATH = resolve(PHP_PARSER_ROOT_PATH, 'Node');

export interface INodeOutput {
  nodeName: string;
  fullyQualifiedNodeName: string;
  fullyQualifiedParentNodeName: string;
  parentNodeParts: string[];
  parentNodeName: string;
  parentNodeFilePath: string;
  properties: IProperty[];
  nodeType: string;
  fileName: string;
  filePath: string;
  filePathParts: string[];
  uses: IUses;
  uniqueImportDeclarationGeneratedStrings: string[];
}

export interface IContextNodeItem {
  name: string;
  nodeType: string;
  subNodeNames: string[];
  parentNodeName: string;
  filePath: string;
  properties: IProperty[];
}

export interface ICliContext {
  allNodeNames: string[];
  allNodes: {
    [nodeType: string]: IContextNodeItem;
  };
}

class GenerateType {
  /**
   * This context is a global context available on whole cli running process
   */
  private static cliContext: ICliContext = {
    allNodeNames: [],
    allNodes: {},
  };

  public static main(): void {
    const typesRootPath = FilePathHelpers.getTypesRootPath();
    const nodeTypeRootPath = resolve(typesRootPath, 'node');

    // Remove and create a node root path first
    rmSync(nodeTypeRootPath, { recursive: true, force: true });
    mkdirSync(nodeTypeRootPath, { recursive: true });

    GenerateType.walkSync(
      PHP_PARSER_NODE_DIRECTORY_PATH,
      // eslint-disable-next-line @typescript-eslint/unbound-method
      GenerateType.generateTypeForNodeByFile,
    );

    const typesFileName = resolve(typesRootPath, 'types.ts');
    writeFileSync(
      typesFileName,
      TypeGenerationHelpers.generateCombinationTypesFromNodes(
        GenerateType.cliContext,
      ),
      { encoding: 'utf-8' },
    );
  }

  private static generateTypeForNodeByFile(filePath: string): void {
    const fileRelativePath = path.relative(
      PHP_PARSER_NODE_DIRECTORY_PATH,
      filePath,
    );
    const filePathParts: string[] = filePath.split('/');
    const directoryRelativePath = fileRelativePath
      .split('/')
      .slice(0, -1)
      .map((part) => _.kebabCase(part))
      .join('/');
    const fileName = _.kebabCase(
      fileRelativePath
        .split('/')
        .pop()
        .replace(/\.php$/, ''),
    );
    const ast = CliHelpers.parsePhpFileToAst(filePath);

    const classNode = NodeRetrieverHelpers.getRootClassNode(ast);
    const uses = NodeRetrieverHelpers.getUsesMap(ast);

    if (classNode) {
      const properties = NodeRetrieverHelpers.getPropertiesFromClassNode(
        classNode,
        filePathParts,
        fileRelativePath,
        uses,
      );

      const uniqueImportDeclarationGeneratedStrings = [
        ...new Set(
          properties
            .map(
              (property) =>
                property.typeGenerationPackage
                  .importDeclarationGeneratedStrings,
            )
            .flat(),
        ),
      ];
      const parentNodeFilePath = FilePathHelpers.getFilePathFromNameNodeParts(
        classNode.extends.parts,
        classNode.extends.nodeType,
        filePathParts,
        uses,
      );

      const fullyQualifiedNodeName =
        FilePathHelpers.getFullyQualifiedNodeNameByFilePath(fileRelativePath);

      const parentNodeName = classNode.extends.parts.at(-1);

      const fullyQualifiedParentNodeName =
        FilePathHelpers.getFullyQualifiedParentNodeNameByFilePath(
          fileRelativePath,
          parentNodeFilePath,
          parentNodeName,
        );

      const nodeOutput: INodeOutput = {
        fileName,
        filePath: path.join(directoryRelativePath, fileName),
        filePathParts,
        fullyQualifiedNodeName,
        fullyQualifiedParentNodeName,
        nodeName: classNode.name.name,
        parentNodeParts: classNode.extends.parts,
        parentNodeName,
        parentNodeFilePath,
        properties,
        uniqueImportDeclarationGeneratedStrings,
        nodeType: NodeRetrieverHelpers.getGetTypeFunctionReturnValue(classNode),
        uses,
      };

      GenerateType.appendNodeToContext(nodeOutput);

      const templateFileName = path.resolve(
        SRC_ROOT,
        'templates/php-parser-node.mustache',
      );
      const typesRootPath = FilePathHelpers.getTypesRootPath();
      const nodeTypeRootPath = resolve(typesRootPath, 'node');
      const templateFileContent = readFileSync(templateFileName, 'utf-8');

      try {
        if (directoryRelativePath) {
          mkdirSync(path.resolve(nodeTypeRootPath, directoryRelativePath), {
            recursive: true,
          });
        }
      } finally {
        writeFileSync(
          resolve(nodeTypeRootPath, directoryRelativePath, `${fileName}.ts`),

          Mustache.render(templateFileContent, nodeOutput),
        );
      }
    }
  }

  private static walkSync(
    directoryPath: string,
    callback: typeof GenerateType.generateTypeForNodeByFile,
  ): void {
    const fileNames = readdirSync(directoryPath);
    fileNames.forEach((fileName) => {
      const filePath = path.join(directoryPath, fileName);
      const stats = statSync(filePath);
      if (stats.isDirectory()) {
        GenerateType.walkSync(filePath, callback);
      } else if (stats.isFile()) {
        callback(filePath);
      }
    });
  }

  private static appendNodeToContext(node: INodeOutput) {
    GenerateType.cliContext.allNodeNames.push(node.nodeName);

    if (!(node.fullyQualifiedNodeName in GenerateType.cliContext.allNodes)) {
      GenerateType.cliContext.allNodes[node.fullyQualifiedNodeName] = {
        name: node.fullyQualifiedNodeName,
        subNodeNames: [],
        parentNodeName: '',
        filePath: '',
        properties: [],
        nodeType: '',
      };
    }

    if (
      !(node.fullyQualifiedParentNodeName in GenerateType.cliContext.allNodes)
    ) {
      GenerateType.cliContext.allNodes[node.fullyQualifiedParentNodeName] = {
        name: node.fullyQualifiedParentNodeName,
        subNodeNames: [],
        parentNodeName: '',
        filePath: '',
        properties: [],
        nodeType: '',
      };
    }

    GenerateType.cliContext.allNodes[
      node.fullyQualifiedParentNodeName
    ].subNodeNames.push(node.fullyQualifiedNodeName);

    GenerateType.cliContext.allNodes[
      node.fullyQualifiedNodeName
    ].parentNodeName = node.fullyQualifiedParentNodeName;

    GenerateType.cliContext.allNodes[node.fullyQualifiedNodeName].filePath =
      node.filePath;

    GenerateType.cliContext.allNodes[node.fullyQualifiedNodeName].properties =
      node.properties;

    GenerateType.cliContext.allNodes[node.fullyQualifiedNodeName].nodeType =
      node.nodeType;
  }
}

GenerateType.main();
