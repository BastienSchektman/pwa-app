import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import UsersRepository from './users.repository';
import { User, UserSchema } from './user.schema';
import UsersController from './users.controller';
import UsersService from './users.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  exports: [UsersService, UsersRepository],
})
export default class UsersModule {}
