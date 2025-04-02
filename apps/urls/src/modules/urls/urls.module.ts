import { Module } from '@nestjs/common';
import { ModelsModule } from './infrastructure/database/models/models.module';

import {
  gatewayProviders,
  repositoryProviders,
  serviceProviders,
  usecaseProviders,
} from './infrastructure/providers';
import { AccessController, UrlsController } from './presentation/controller';

@Module({
  imports: [ModelsModule],
  controllers: [AccessController, UrlsController],
  providers: [
    ...repositoryProviders,
    ...usecaseProviders,
    ...serviceProviders,
    ...gatewayProviders,
  ],
})
export class UrlsModule {}
