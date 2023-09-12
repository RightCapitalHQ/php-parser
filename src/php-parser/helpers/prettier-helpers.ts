import { join } from 'path';
import * as prettier from 'prettier';
import { PROJECT_ROOT } from '../../constants';

export class PrettierHelpers {
  public static async prettierTypescript(source: string): Promise<string> {
    return prettier.format(source, {
      filepath: join(PROJECT_ROOT, 'prettier.config.js'),
    });
  }
}
