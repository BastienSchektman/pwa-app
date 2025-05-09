import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import ChatService from './chat.service';
import { Chat, ChatSchema } from './chat.schema';
import ChatRepository from './chat.repository';
import UsersModule from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    forwardRef(() => UsersModule),
  ],
  providers: [ChatService, ChatRepository],
  exports: [ChatService, ChatRepository],
})
export default class ChatModule {}
