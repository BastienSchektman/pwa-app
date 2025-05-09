import { LocationDocument } from './locations.schema';
import GetLocationDto from './_utils/dto/response/get-location.dto';

export default class LocationsMapper {
  static toGetLocationDto = (location: LocationDocument): GetLocationDto => ({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, no-underscore-dangle
    id: location._id,
    location: location.location,
  });
}
