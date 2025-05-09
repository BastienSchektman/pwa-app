import { RumorDocument } from './rumors.schema';
import GetRumorDto from './_utils/dto/response/get-rumor.dto';
import LocationsMapper from '../locations/locations.mapper';
import UsersMapper from '../users/users.mapper';

export default class RumorsMapper {
  static toGetRumorDto = (rumor: RumorDocument): GetRumorDto => ({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, no-underscore-dangle
    id: rumor._id,
    content: rumor.content,
    location: LocationsMapper.toGetLocationDto(rumor.location),
    user: UsersMapper.toGetUserLightDto(rumor.user),
    date: rumor.createdAt,
  });
}
