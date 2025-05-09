import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';
import { LocationDocument } from '../locations.schema';
import LocationsRepository from '../locations.repository';

@Injectable()
export default class LocationByIdPipe implements PipeTransform<string, Promise<LocationDocument>> {
  constructor(private locationsRepository: LocationsRepository) {}

  transform(locationId: string) {
    if (!Types.ObjectId.isValid(locationId)) throw new BadRequestException('INVALID_LOCATION_ID');
    return this.locationsRepository.findOneByIdOrThrow(locationId);
  }
}
