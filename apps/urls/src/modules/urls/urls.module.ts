import { MongooseModule } from '@ez-shortener/databases/nestjs-mongoose';
import { Module } from '@nestjs/common';
import { ShortenUserUrlUseCaseImpl } from './application/use-cases/shorten-user-url.usecase.impl';
import { Url, UrlSchema } from './infrastructure/schemas/url.schema';
import { UrlsController } from './presentation/urls.controller';
import {
  MongoCreateUrlRepository,
  MongoFindUrlByShortIdRepository,
} from './infrastructure/repositories';
import { NanoidGenerateIdentifierService } from './infrastructure/services/nanoid-generate-identifier.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }])],
  controllers: [UrlsController],
  providers: [
    {
      provide: 'ShortenUserUrlUseCase',
      useClass: ShortenUserUrlUseCaseImpl,
    },
    {
      provide: 'GenerateIdentifierService',
      useClass: NanoidGenerateIdentifierService,
    },
    {
      provide: 'CreateUrlRepository',
      useClass: MongoCreateUrlRepository,
    },
    {
      provide: 'FindUrlByShortIdRepository',
      useClass: MongoFindUrlByShortIdRepository,
    },
  ],
})
export class UrlsModule {}
