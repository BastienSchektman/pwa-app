import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import AuthService from './auth.service';
import LoginDto from './_utils/dto/request/login.dto';

@ApiTags('Auth')
@Controller('auth')
export default class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('register')
  register(@Body() body: LoginDto) {
    return this.authService.register(body);
  }
}
