import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AppModule from './app.module';
import { EnvironmentVariables } from './_utils/config/env.config';
import SocketIOAdapter from './socket-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableCors();
  // app.useWebSocketAdapter(new IoAdapter(app));
  app.setGlobalPrefix('api');
  // app.useWebSocketAdapter(new SocketAdapter(app));

  const config = new DocumentBuilder()
    .setTitle('PWA')
    .setDescription('The PWA API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const configService = app.get(ConfigService<EnvironmentVariables, true>);
  const configService2 = app.get(ConfigService);
  app.useWebSocketAdapter(new SocketIOAdapter(app, configService2));
  await app.listen(process.env.PORT || configService.get('PORT'));
}
// eslint-disable-next-line no-void
void bootstrap();
