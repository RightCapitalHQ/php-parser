import { PhpParserError } from './error';

export interface ErrorHandler {
  handleError(error: PhpParserError): void;
}

export class ThrowingErrorHandler implements ErrorHandler {
  handleError(error: PhpParserError): void {
    throw error;
  }
}

export class CollectingErrorHandler implements ErrorHandler {
  private errors: PhpParserError[] = [];

  handleError(error: PhpParserError): void {
    this.errors.push(error);
  }

  getErrors(): PhpParserError[] {
    return this.errors;
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  clearErrors(): void {
    this.errors = [];
  }
}
