import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  constructor() {
    //
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new HttpException(
        'Validation Failed. No Body provided.',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (value.data) {
      value = JSON.parse(value.data);
    }
    if (value instanceof Object && this.isEmptyObject(value)) {
      throw new HttpException(
        'Validation Failed. No Body provided.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    let errors: any;
    try {
      errors = await validate(object, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });
    } catch (error) {
      return value;
    }
    if (errors.length > 0) {
      throw new HttpException(
        `${this.formatErrors(errors)}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatErrorsRecursively = (errors: any): string => {
    if (errors.children?.length > 0) {
      return errors.children
        .map((err) => this.formatErrorsRecursively(err))
        .join(' ');
    } else {
      let res = '';
      for (const property in errors.constraints) {
        res += errors.constraints[property] += ',';
      }
      return res;
    }
  };

  private formatErrors = (errors: any[]) =>
    errors.map((err) => {
      if (err.children?.length) {
        // For Metadat Validation
        return this.formatErrorsRecursively(err);
      } else {
        for (const property in err.constraints) {
          return err.constraints[property];
        }
      }
    });

  private isEmptyObject = (object: any) => Object.keys(object).length === 0;
}
