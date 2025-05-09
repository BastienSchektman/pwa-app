import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import WebpushService from './webpush.service';

@Controller('webpush')
@ApiTags('Webpush')
export default class WebpushController {
  constructor(private readonly webpushService: WebpushService) {}

  @Get()
  @ApiOperation({ summary: 'Récupére la clef publique webpush' })
  getWebPushPublicKey() {
    return this.webpushService.getWebPushPublicKey();
  }
}
