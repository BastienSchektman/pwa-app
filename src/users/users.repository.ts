import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hashSync } from 'bcrypt';
import { User, UserDocument } from './user.schema';
import UpdateUserDto from './_utils/dto/request/update-user.dto';
import { LocationDocument } from '../locations/locations.schema';

@Injectable()
export default class UsersRepository {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

  private orThrow<T>(x: T | null | undefined): T {
    if (!x) throw new NotFoundException('USER_NOT_FOUND');
    return x;
  }

  private readonly fullPopulate = ['locations'];

  findOneById = (id: string) => this.model.findOne({ _id: id }).exec();

  findOneByIdAndRename = (id: string) =>
    this.model
      .findOne({ _id: id })
      .exec()
      // eslint-disable-next-line @typescript-eslint/unbound-method
      .then(this.orThrow);

  findOneByUsername = (username: string) => this.model.findOne({ username }).exec();

  // eslint-disable-next-line @typescript-eslint/unbound-method
  findOneByIdOrThrow = (id: string) => this.findOneById(id).then(this.orThrow);

  findAllByLocation = (location: LocationDocument) =>
    this.model
      .find({
        locations: location,
      })
      .exec();

  create = (username: string, password: string) => this.model.create({ username, password: hashSync(password, 12) });

  update = (user: UserDocument, updateUser: UpdateUserDto) =>
    this.model
      .findByIdAndUpdate(
        // eslint-disable-next-line no-underscore-dangle
        user._id,
        {
          username: updateUser.username,
          locations: updateUser.locations,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          webpush: updateUser.webpush,
        },
        { returnDocument: 'after', populate: this.fullPopulate },
      )
      .exec()
      // eslint-disable-next-line @typescript-eslint/unbound-method
      .then(this.orThrow);
}
