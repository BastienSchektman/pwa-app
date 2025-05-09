import { Injectable } from '@nestjs/common';
import RumorsRepository from './rumors.repository';
import CreateRumorDto from './_utils/dto/request/create-rumor.dto';
import { LocationDocument } from '../locations/locations.schema';
import { UserDocument } from '../users/user.schema';
import RumorsMapper from './rumors.mapper';
import UsersRepository from '../users/users.repository';
import WebpushService from '../webpush/webpush.service';

@Injectable()
export default class RumorsService {
  constructor(
    private readonly rumorsRepository: RumorsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly webpushService: WebpushService,
  ) {}

  async createRumor(user: UserDocument, createRumor: CreateRumorDto, location: LocationDocument) {
    const rumor = await this.rumorsRepository.createRumor(user, createRumor, location).then(this.getRumor);
    const userSubscribedToLocation = await this.usersRepository.findAllByLocation(location);
    userSubscribedToLocation.map((x) => this.webpushService.sendNotificationPush(x, rumor));
    return rumor;
  }

  getRumor = RumorsMapper.toGetRumorDto;

  getAllRumorInLocation = (location: LocationDocument) =>
    this.rumorsRepository.findAllByLocation(location).then((x) => x.map(this.getRumor));

  getAllRumor = () => this.rumorsRepository.findAllrumors().then((x) => x.map(this.getRumor));
}
