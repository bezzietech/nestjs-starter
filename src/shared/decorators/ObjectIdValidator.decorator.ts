import { registerDecorator, ValidationOptions } from 'class-validator';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ObjectId } from 'bson';

export function IsMongoIdObject(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'IsMongoIdObject',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: {
        message: 'invalid id provider',
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          return ObjectId.isValid(value);
        },
      },
    });
  };
}
