import { ChatDocument } from './chat.schema';
import GetMessageDto from './_utils/dto/response/get-message.dto';
import LocationsMapper from '../locations/locations.mapper';
import UsersMapper from '../users/users.mapper';

export default class ChatMapper {
  static toGetMessageDto = (chat: ChatDocument): GetMessageDto => ({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, no-underscore-dangle
    id: chat._id,
    message: chat.message,
    location: LocationsMapper.toGetLocationDto(chat.location),
    user: UsersMapper.toGetUserLightDto(chat.user),
    date: chat.createdAt,
  });
}
