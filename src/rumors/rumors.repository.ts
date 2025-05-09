import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rumor, RumorDocument } from './rumors.schema';
import { LocationDocument } from '../locations/locations.schema';
import { UserDocument } from '../users/user.schema';
import CreateRumorDto from './_utils/dto/request/create-rumor.dto';

@Injectable()
export default class RumorsRepository {
  constructor(@InjectModel(Rumor.name) private model: Model<RumorDocument>) {}

  private orThrow<T>(x: T | null | undefined): T {
    if (!x) throw new NotFoundException('RUMOR_NOT_FOUND');
    return x;
  }

  private readonly fullPopulate = ['user', 'location'];

  findOneById = (id: string) => this.model.findOne({ _id: id }).populate(this.fullPopulate).exec();

  findAllByLocation = (location: LocationDocument) =>
    this.model
      .find({
        location,
      })
      .populate(this.fullPopulate)
      .exec();

  findAllrumors = () => this.model.find().populate(this.fullPopulate).exec();

  // eslint-disable-next-line @typescript-eslint/unbound-method
  findOneByIdOrThrow = (id: string) => this.findOneById(id).then(this.orThrow);

  createRumor = (user: UserDocument, createRumor: CreateRumorDto, location: LocationDocument) =>
    this.model
      .create({
        user,
        content: createRumor.content,
        location,
      })
      .then((x) => x.populate(this.fullPopulate));
}
