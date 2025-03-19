import { MongooseModule } from '@ez-shortener/databases/nestjs-mongoose';
import { Module } from '@nestjs/common';
import { Url, UrlSchema, Access, AccessSchema } from './infrastructure/schemas';
import {
  gatewayProviders,
  repositoryProviders,
  serviceProviders,
  usecaseProviders,
} from './infrastructure/providers';
import { UrlsController } from './presentation/controller/urls.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Access.name, schema: AccessSchema, collection: 'access' },
      { name: Url.name, schema: UrlSchema, collection: 'urls' },
    ]),
  ],
  controllers: [UrlsController],
  providers: [
    ...repositoryProviders,
    ...usecaseProviders,
    ...serviceProviders,
    ...gatewayProviders,
  ],
})
export class UrlsModule {}
