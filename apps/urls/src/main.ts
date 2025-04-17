import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from '@ez-shortener/exceptions';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Urls');
  const port = process.env.URLS_PORT;
  if (!port) {
    logger.error('MONGO_USERS_URI must be provided');
    process.exit(1);
  }
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(cookieParser());
  app.set('trust proxy', true);
  await app.listen(port, () => logger.log(`Server running on port ${port}`));
}
bootstrap();
