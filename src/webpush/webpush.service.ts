/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import * as webpush from 'web-push';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../_utils/config/env.config';
import { UserDocument } from '../users/user.schema';
import GetRumorDto from 'src/rumors/_utils/dto/response/get-rumor.dto';

@Injectable()
export default class WebpushService {
  constructor(private readonly config: ConfigService<EnvironmentVariables, true>) {
    webpush.setVapidDetails(
      'mailto:example@atiteux.fr',
      this.config.get('WEBPUSH_PUBLIC_KEY'),
      this.config.get('WEBPUSH_PRIVATE_KEY'),
    );
  }

  getWebPushPublicKey = () => ({ publicKey: this.config.get<unknown>('WEBPUSH_PUBLIC_KEY') });

  sendNotificationPush(user: UserDocument, rumor: GetRumorDto) {
    if (!user.webpush) return;
    const pushSubscription = {
      endpoint: user.webpush.endpoint,
      keys: {
        auth: user.webpush.auth,
        p256dh: user.webpush.token,
      },
    };
    // eslint-disable-next-line consistent-return
    return webpush.sendNotification(pushSubscription, JSON.stringify(rumor)).catch((e) => e);
  }
}
