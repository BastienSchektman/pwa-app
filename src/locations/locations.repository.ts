import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location, LocationDocument } from './locations.schema';
import CreateLocationDto from './_utils/dto/request/create-location.dto';

@Injectable()
export default class LocationsRepository {
  constructor(@InjectModel(Location.name) private model: Model<LocationDocument>) {}

  private orThrow<T>(x: T | null | undefined): T {
    if (!x) throw new NotFoundException('LOCATION_NOT_FOUND');
    return x;
  }

  findAll = (): Promise<LocationDocument[]> => this.model.find().exec();

  findOneById = (id: string) => this.model.findOne({ _id: id }).exec();

  // eslint-disable-next-line @typescript-eslint/unbound-method
  findOneByIdOrThrow = (id: string) => this.findOneById(id).then(this.orThrow);

  create = (createLocation: CreateLocationDto) => this.model.create({
    location: createLocation.location,
  });
}
