import { Module } from '@nestjs/common';
import { ModelsModule } from './infrastructure/database/models/models.module';

import {
  gatewayProviders,
  repositoryProviders,
  serviceProviders,
  usecaseProviders,
} from './infrastructure/providers';
import { UrlsController } from './presentation/controller/urls.controller';

@Module({
  imports: [ModelsModule],
  controllers: [UrlsController],
  providers: [
    ...repositoryProviders,
    ...usecaseProviders,
    ...serviceProviders,
    ...gatewayProviders,
  ],
})
export class UrlsModule {}
