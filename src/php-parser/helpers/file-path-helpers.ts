import { dirname, join, resolve } from 'node:path';

import * as _ from 'lodash';

import type { IUses } from './node-retriever-helpers';

export class FilePathHelpers {
  public static extendNameNodePartsByUses(
    nodeParts: string[],
    uses: IUses,
  ): string[] {
    const [firstNode, ...otherParts] = nodeParts;
    if (firstNode in uses) {
      return [...uses[firstNode], ...otherParts];
    }

    /**
     * If cannot find name in uses map,
     * the target Node might be in the same directory with the current Node, just return it directory
     */
    return nodeParts;
  }

  public static getFilePathFromNameNodeParts(
    nodeParts: string[],
    parentNodeType: 'Name' | 'Name_FullyQualified' | 'Name_Relative',
    filePathParts: string[],
    uses: IUses,
  ): string {
    const fullQualifiedNodeParts =
      parentNodeType === 'Name'
        ? FilePathHelpers.extendNameNodePartsByUses(nodeParts, uses)
        : nodeParts;

    const phpTypeRootDirectory =
      FilePathHelpers.getRelativePathToTypesRootPathByPhpFileParts(
        filePathParts,
      );
    const nodeTypeRootDirectory = join(phpTypeRootDirectory, 'node');
    const nodeInterfaceFilePath = join(phpTypeRootDirectory, 'node');

    if (fullQualifiedNodeParts.length === 1) {
      /**
       * Case 1: only 1 member
       * The parent node class is in the same directory with the current node.
       * like: ["ClassLike"] should be converted to "./class-like"
       */
      return `./${_.kebabCase(fullQualifiedNodeParts[0])}`;
    }

    if (fullQualifiedNodeParts.length > 1) {
      const [firstNode, secondNode, ...otherParts] = fullQualifiedNodeParts;

      /**
       * Case 2: only 1 member and not the member is NodeAbstract
       * The parent node should be Node interface we predefined
       * like: ["PhpParser", "NodeAbstract"] should be converted to `${nodeInterfaceFilePath}`
       */
      if (firstNode === 'PhpParser' && secondNode === 'NodeAbstract') {
        return nodeInterfaceFilePath;
      }

      /**
       * Case 3: more than 1 members
       * The parts should starts with "Node",
       * It represents a path from source root
       * like: ["PhpParser", "Node", "Stmt"] should be converted to `${nodeTypeRootDirectory}/stms.ts`
       */
      if (firstNode === 'PhpParser' && secondNode === 'Node') {
        return `${nodeTypeRootDirectory}/${otherParts
          .map((part) => _.kebabCase(part))
          .join('/')}`;
      }

      /**
       * Case 4:
       * Even the node parts is more than one, it is also possible a
       * relative path
       * like: [ 'Expr', 'Variable' ]  should be converted to `./expr/variable`
       */

      return `./${fullQualifiedNodeParts
        .map((part) => _.kebabCase(part))
        .join('/')}`;
    }
    throw new Error('Logic error, all nodes should have parent node parts');
  }

  public static getRelativePathBasePhpParserAutoloadRoot(fileParts: string[]) {
    // [
    //     "",
    //     "Users",
    //     "rainx",
    //     "Projects",
    //     "PHP-Parser",
    //     "lib",             <--- <RootPath>
    //     "PhpParser",
    //     "Node",
    //     "Stmt",
    //     "Else_.php"
    // ]
    const libPathIndex = fileParts.findIndex(
      (filePart: string, index: number) => {
        if (filePart === 'lib' && fileParts[index + 1] === 'PhpParser') {
          return true;
        }
        return false;
      },
    );

    if (libPathIndex === -1) {
      throw new Error(
        'Invalid Arguments, it should contains lib and PhpParser parts',
      );
    }

    return fileParts.slice(libPathIndex + 1);
  }

  /**
   * Get the relative path for the current generated file
   * to the types root path
   * The PHP PhpParser path should be mapped to types path
   * so
   * [ PhpParser, Node, Stmt, Else_.php ] should be "../../"
   * [ PhpParser, Node.php ] should be "./"
   * [ PhpParser, Node, Attr.php ] should be "../"
   *
   * @param fullFileParts like [ PhpParser, Node, Stmt, Else_.php ]
   */
  public static getRelativePathToTypesRootPathByPhpFileParts(
    fullFileParts: string[],
  ): string {
    const filePartsFromPhpParser =
      FilePathHelpers.getRelativePathBasePhpParserAutoloadRoot(fullFileParts);
    if (filePartsFromPhpParser.length === 2) {
      return './';
    }
    if (filePartsFromPhpParser.length > 2) {
      return '../'.repeat(filePartsFromPhpParser.length - 2);
    }

    throw Error(
      'fileParts must contains at least two items: PhpParser and Node',
    );
  }

  public static getTypesRootPath(): string {
    return resolve(__dirname, '..', 'types');
  }

  public static getFullyQualifiedNodeNameByFilePath(filePath: string) {
    return `FullyQualified${filePath
      .replace(/\.php$/, '')
      .split('/')
      .map((part) => _.camelCase(part))
      .map((part) => _.upperFirst(part))
      .join('')}`;
  }

  public static getFullyQualifiedParentNodeNameByFilePath(
    fileRelativePath: string,
    parentNodeFilePath: string,
    parentNodeName: string,
  ) {
    if (parentNodeName === 'NodeAbstract') {
      return 'NodeAbstract';
    }

    let relativeParentNodeFilePath: string;
    // Fix path
    /**
     * Case 1. parentNodeFilePath starts with ".."
     * {
     *  fileRelativePath: 'Expr/ClosureUse.php',
     *  parentNodeFilePath: '../../node/expr',
     *  relativeParentNodeFilePath: 'node/expr' --> 'expr'
     * }
     */
    if (parentNodeFilePath.startsWith('..')) {
      relativeParentNodeFilePath = join(
        fileRelativePath,
        parentNodeFilePath,
      ).replace(/^node\//, '');
    } else {
      /**
       * Case 2. parentNodeFilePath starts with "."
       * {
       *  fileRelativePath: 'Stmt/Enum_.php',
       *  parentNodeFilePath: './class-like',
       *  relativeParentNodeFilePath: 'Stmt/class-like'
       * }
       */

      relativeParentNodeFilePath = join(
        dirname(fileRelativePath),
        parentNodeFilePath,
      );
    }

    return FilePathHelpers.getFullyQualifiedNodeNameByFilePath(
      relativeParentNodeFilePath,
    );
  }
}
