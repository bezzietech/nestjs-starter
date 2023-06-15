import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { ObjectId } from 'bson';

export function IsMongoIdObject(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsMongoIdObject',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: 'invalid id provider',
        ...validationOptions,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          return ObjectId.isValid(value);
        },
      },
    });
  };
}
