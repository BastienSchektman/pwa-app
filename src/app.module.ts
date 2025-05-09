import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentVariables, validateEnv } from './_utils/config/env.config';
import UsersModule from './users/users.module';
import AuthModule from './auth/auth.module';
import WebpushModule from './webpush/webpush.module';
import RumorsModule from './rumors/rumors.module';
import ChatModule from './chat/chat.module';
import LocationsModule from './locations/locations.module';
import ChatGateway from './chat/chat.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({ validate: validateEnv, isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<EnvironmentVariables, true>) => ({
        uri: configService.get<unknown>('MONGODB_URL'),
      }),
    }),
    UsersModule,
    AuthModule,
    WebpushModule,
    RumorsModule,
    ChatModule,
    LocationsModule,
  ],
  providers: [ChatGateway],
})
export default class AppModule {}
