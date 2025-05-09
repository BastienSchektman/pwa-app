import {
  ConflictException, Injectable, NotFoundException, UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import UsersRepository from '../users/users.repository';
import { UserDocument } from '../users/user.schema';
import LoginDto from './_utils/dto/request/login.dto';
import UsersService from '../users/users.service';

@Injectable()
export default class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateLoginUser(username: string, pass: string): Promise<UserDocument> {
    const user = await this.usersRepository.findOneByUsername(username);
    if (!user) throw new NotFoundException('User not exist');
    if (user && compareSync(pass, user.password)) return user;
    throw new UnauthorizedException('WRONG_CREDENTIALS');
  }

  async validateRegisterUser(username: string, pass: string): Promise<UserDocument> {
    let user = await this.usersRepository.findOneByUsername(username);
    if (user) throw new ConflictException('User already exist');
    user = await this.usersRepository.create(username, pass);
    if (user && compareSync(pass, user.password)) return user;
    throw new UnauthorizedException('WRONG_CREDENTIALS');
  }

  async login(login: LoginDto) {
    const user = await this.validateLoginUser(login.username, login.password);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, no-underscore-dangle
    const payload = { id: user._id };
    return {
      accessToken: this.jwtService.sign(payload),
      user: this.usersService.getCurrentUser(user),
    };
  }

  async register(register: LoginDto) {
    const user = await this.validateRegisterUser(register.username, register.password);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, no-underscore-dangle
    const payload = { id: user._id };
    return {
      accessToken: this.jwtService.sign(payload),
      user: this.usersService.getCurrentUser(user),
    };
  }
}
