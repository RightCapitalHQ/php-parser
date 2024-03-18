import {
  type NameNodePathResolver,
  PhpDocTypeNodeToTypescriptTypeNodeTranspiler,
} from '@rightcapital/phpdoc-parser';

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
