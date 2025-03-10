import { PipeTransform, HttpException, HttpStatus } from '@nestjs/common';
import { ZodSchema, SafeParseReturnType, ZodError } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    const result: SafeParseReturnType<unknown, unknown> =
      this.schema.safeParse(value);
    const { success, error, data } = result;
    if (success) return data;
    const zodErrorsMessage = (error as ZodError).errors
      .map((error) => `${error.path.join(', ')}: ${error.message}`)
      .join('\n');
    throw new HttpException(zodErrorsMessage, HttpStatus.BAD_REQUEST, {
      cause: error,
    });
  }
}
