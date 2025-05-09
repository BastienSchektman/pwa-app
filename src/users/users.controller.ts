import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import UsersService from './users.service';
import { User } from './_utils/decorator/user.decorator';
import { UserDocument } from './user.schema';
import Protect from '../auth/_utils/decorator/protect.decorator';
import GetUserDto from './_utils/dto/response/get-user.dto';
import UpdateUserDto from './_utils/dto/request/update-user.dto';

@ApiTags('Users')
@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Protect()
  @Get('me')
  @ApiOperation({ summary: "Récupére les information de l'utilisateur connecter" })
  @ApiOkResponse({ type: GetUserDto })
  getUserMe(@User() user: UserDocument) {
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return this.usersService.getCurrentUser(user);
  }

  @Protect()
  @Patch()
  @ApiOperation({ summary: "Modifie les information de l'utilisateur connecter" })
  @ApiOkResponse({ type: GetUserDto })
  updateUser(@User() user: UserDocument, @Body() updateUser: UpdateUserDto) {
    return this.usersService.updateUser(user, updateUser);
  }
}
