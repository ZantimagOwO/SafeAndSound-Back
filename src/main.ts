import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('C:/Users/kills/Documents/_.myeventz.es_private_key.key'),
    cert: fs.readFileSync('C:/Users/kills/Documents/myeventz.es_combined.cer')
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.enableCors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
  });

  await app.listen(3000);
}
bootstrap();
