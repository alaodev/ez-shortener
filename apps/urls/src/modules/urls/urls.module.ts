import { MongooseModule } from '@ez-shortener/databases/nestjs-mongoose';
import { Module } from '@nestjs/common';
import { ShortenUrlUseCaseImpl } from './application/use-cases/shorten-url.usecase.impl';
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
      provide: 'ShortenUrlUseCase',
      useClass: ShortenUrlUseCaseImpl,
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
