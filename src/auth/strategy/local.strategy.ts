import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import AuthService from '../auth.service';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validateRegister(email: string, password: string): Promise<unknown> {
    const user = await this.authService.validateRegisterUser(email, password);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
