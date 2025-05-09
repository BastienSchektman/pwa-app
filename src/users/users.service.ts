import { ConflictException, Injectable } from '@nestjs/common';
import UsersRepository from './users.repository';
import UsersMapper from './users.mapper';
import { UserDocument } from './user.schema';
import UpdateUserDto from './_utils/dto/request/update-user.dto';

@Injectable()
export default class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async validateUniqueUser(username: string): Promise<void> {
    const user = await this.usersRepository.findOneByUsername(username);
    if (user) throw new ConflictException('User already exist');
  }

  getCurrentUser = UsersMapper.toGetUserDto;

  async updateUser(user: UserDocument, updateUser: UpdateUserDto) {
    await this.validateUniqueUser(updateUser.username);
    return this.usersRepository.update(user, updateUser).then(this.getCurrentUser);
  }

  getUser = (userId: string) => this.usersRepository.findOneByIdAndRename(userId).then(this.getCurrentUser);
}
