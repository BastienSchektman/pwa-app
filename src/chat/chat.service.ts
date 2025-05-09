import { Injectable } from '@nestjs/common';
import ChatRepository from './chat.repository';
import { LocationDocument } from '../locations/locations.schema';
import { UserDocument } from '../users/user.schema';
import ChatMapper from './chat.mapper';

@Injectable()
export default class ChatService {
  constructor(
    private readonly chatRepository: ChatRepository,
  ) {}

  getMessage = ChatMapper.toGetMessageDto;

  sendMessage = (
    user: UserDocument,
    message: string,
    location: LocationDocument,
  ) => this.chatRepository.send(user, message, location);

  getAllMessageInLocation = (
    location: LocationDocument,
  ) => this.chatRepository.findAllByLocation(location).then((x) => x.map(this.getMessage));
}
