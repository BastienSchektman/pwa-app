/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import GetUserDto from './_utils/dto/response/get-user.dto';
import { UserDocument } from './user.schema';
import LocationsMapper from '../locations/locations.mapper';
import GetUserLightDto from './_utils/dto/response/get-user-light.dto';

export default class UsersMapper {
  static toGetUserDto = (user: UserDocument): GetUserDto => ({
    id: user.id,
    username: user.username,
    locations: user.locations.map(LocationsMapper.toGetLocationDto),
  });

  static toGetUserLightDto = (user: UserDocument): GetUserLightDto => ({
    id: user.id,
    username: user.username,
  });
}
