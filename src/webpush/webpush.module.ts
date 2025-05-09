import { Module } from '@nestjs/common';
import WebpushService from './webpush.service';
import WebpushController from './webpush.controller';

@Module({
  controllers: [WebpushController],
  providers: [WebpushService],
  exports: [WebpushService],
})
export default class WebpushModule {}
