import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ValidationOptions } from 'class-validator/types/decorator/ValidationOptions';

// eslint-disable-next-line @typescript-eslint/ban-types
export default function Validate(f: Function, validationOptions?: ValidationOptions) {
  return applyDecorators(
    IsNotEmpty(),
    ValidateNested(validationOptions),
    Type(() => f),
  );
}
