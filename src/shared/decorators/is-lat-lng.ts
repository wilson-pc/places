import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function latLng(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,

      validator: latLngConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'latLng' })
export class latLngConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const parts = value.split(',');
    if (parts.length == 2) {
      if (Number(parts[0] && Number(parts[1]))) {
        true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
