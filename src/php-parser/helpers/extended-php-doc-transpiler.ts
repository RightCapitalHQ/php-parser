import {
  type NameNodePathResolver,
  PhpDocTypeNodeToTypescriptTypeNodeTranspiler,
} from '@rightcapital/phpdoc-parser/dist/phpdoc-parser/transpiler/php-doc-to-typescript-type-transpiler';

export class ExtendedTranspiler extends PhpDocTypeNodeToTypescriptTypeNodeTranspiler {
  constructor(public resolver: NameNodePathResolver<ExtendedTranspiler>) {
    super(
      (nodeParts: string[]) =>
        resolver.call(this, nodeParts) as {
          path: string;
          name: string;
          isTypeOnly: boolean;
        },
    );
  }
}
