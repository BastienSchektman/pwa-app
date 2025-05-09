import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import LocationsRepository from '../locations.repository';

@ValidatorConstraint({ name: 'LocationExists', async: true })
@Injectable()
export class LocationExistRule implements ValidatorConstraintInterface {
  constructor(private locationsRepository: LocationsRepository) {}

  async validate(id: string) {
    if (!Types.ObjectId.isValid(id)) return false;
    return !!(await this.locationsRepository.findOneById(id));
  }

  defaultMessage = (args: ValidationArguments) => `${args.property} didn't find`;
}

export function LocationExists(validationOptions?: ValidationOptions) {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      name: 'LocationExists',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: LocationExistRule,
    });
  };
}
