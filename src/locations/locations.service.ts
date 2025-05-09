import { Injectable } from '@nestjs/common';
import CreateLocationDto from './_utils/dto/request/create-location.dto';
import LocationsRepository from './locations.repository';
import LocationsMapper from './locations.mapper';

@Injectable()
export default class LocationsService {
  constructor(private readonly locationsRepository: LocationsRepository) {}

  createLocation = (createLocation: CreateLocationDto) => this.locationsRepository.create(
    createLocation,
  ).then(this.getLocation);

  getAllLocation = () => this.locationsRepository.findAll().then((x) => x.map(this.getLocation));

  getLocation = LocationsMapper.toGetLocationDto;
}
