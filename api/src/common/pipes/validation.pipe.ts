import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from '@mardari/class-validator';
import { plainToClass } from 'class-transformer';

import { Container } from 'typedi';
import * as ClassValidator from '@mardari/class-validator';

// TODO: This validation pipe currently uses class-validator to
//
// GH Issue Ticket: https://github.com/typestack/class-validator/issues/261
// Open PR: https://github.com/typestack/class-validator/pull/335

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value, { metatype }: ArgumentMetadata) {
    ClassValidator.useContainer(Container);

    if (!metatype || !this.isValidMetatype(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }

    return value;
  }

  private isValidMetatype(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }
}
