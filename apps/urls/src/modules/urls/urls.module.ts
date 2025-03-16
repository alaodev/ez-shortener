import { MongooseModule } from '@ez-shortener/databases/nestjs-mongoose';
import { Module } from '@nestjs/common';
import {
  ShortenUserUrlUseCaseImpl,
  FindAllUserUrlsUseCaseImpl,
} from './application/use-cases';
import { Url, UrlSchema } from './infrastructure/schemas/url.schema';
import { UrlsController } from './presentation/urls.controller';
import {
  MongoCreateUrlRepository,
  MongoFindAllUrlsByOwnerRepository,
  MongoFindUrlByShortIdRepository,
} from './infrastructure/repositories';
import { NanoidGenerateIdentifierService } from './infrastructure/services/nanoid-generate-identifier.service';
import { FindAllUrlsByOwnerRepository } from './domain/repositories/find-all-urls-by-owner.repository';
import { GenerateIdentifierService } from './domain/services/ generate-identifier.service';
import {
  CreateUrlRepository,
  FindUrlByShortIdRepository,
} from './domain/repositories';

@Module({
  imports: [MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }])],
  controllers: [UrlsController],
  providers: [
    {
      provide: 'FindAllUrlsByOwnerRepository',
      useClass: MongoFindAllUrlsByOwnerRepository,
    },
    {
      provide: 'CreateUrlRepository',
      useClass: MongoCreateUrlRepository,
    },
    {
      provide: 'FindUrlByShortIdRepository',
      useClass: MongoFindUrlByShortIdRepository,
    },
    {
      provide: 'GenerateIdentifierService',
      useClass: NanoidGenerateIdentifierService,
    },
    {
      provide: 'FindAllUserUrlsUseCase',
      useFactory: (
        findAllUrlsByOwnerRepository: FindAllUrlsByOwnerRepository,
      ) => {
        return new FindAllUserUrlsUseCaseImpl(findAllUrlsByOwnerRepository);
      },
      inject: ['FindAllUrlsByOwnerRepository'],
    },
    {
      provide: 'ShortenUserUrlUseCase',
      useFactory: (
        generateIdentifierService: GenerateIdentifierService,
        findUrlByShortIdRepository: FindUrlByShortIdRepository,
        createUrlRepository: CreateUrlRepository,
      ) => {
        return new ShortenUserUrlUseCaseImpl(
          generateIdentifierService,
          findUrlByShortIdRepository,
          createUrlRepository,
        );
      },
      inject: [
        'GenerateIdentifierService',
        'FindUrlByShortIdRepository',
        'CreateUrlRepository',
      ],
    },
  ],
})
export class UrlsModule {}
