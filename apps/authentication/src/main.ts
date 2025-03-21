import { HttpExceptionFilter } from '@ez-shortener/exceptions';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Authentication');
  const port = process.env.AUTHENTICATION_PORT;
  if (!port) {
    logger.error('MONGO_USERS_URI must be provided');
    process.exit(1);
  }
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(port, () => logger.log(`Server running on port ${port}`));
}
bootstrap();
