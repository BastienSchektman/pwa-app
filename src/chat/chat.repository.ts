import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from './chat.schema';
import { LocationDocument } from '../locations/locations.schema';
import { UserDocument } from '../users/user.schema';

@Injectable()
export default class ChatRepository {
  constructor(@InjectModel(Chat.name) private model: Model<ChatDocument>) {}

  private readonly fullPopulate = ['user', 'location'];

  findAll = (): Promise<ChatDocument[]> => this.model.find().exec();

  findOneById = (id: string) => this.model.findOne({ _id: id }).exec();

  findAllByLocation = (location: LocationDocument) => this.model.find({ location })
    .populate(this.fullPopulate).exec();
  //   findOneByIdOrThrow = (id: string) => this.findOneById(id).then(this.orThrow);

  send = (user: UserDocument, message: string, location: LocationDocument) => this.model.create({
    user,
    message,
    location,
  })
    .then((x) => x.populate(this.fullPopulate));
}
