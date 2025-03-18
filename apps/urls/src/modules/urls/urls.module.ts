import { MongooseModule } from '@ez-shortener/databases/nestjs-mongoose';
import { Module } from '@nestjs/common';
import {
  CountUrlsUseCaseImpl,
  FindAllUserUrlsUseCaseImpl,
  ResolveShortenedUrlUseCaseImpl,
  ShortenUserUrlUseCaseImpl,
  TrackUrlAccessUseCaseImpl,
} from './application/use-cases';
import { Url, UrlSchema, Access, AccessSchema } from './infrastructure/schemas';
import { UrlsController } from './presentation/controller/urls.controller';
import { UrlsCountGateway } from './presentation/gateways/urls-count.gateway';
import {
  MongoCountUrlsRepository,
  MongoCreateAccessRepository,
  MongoCreateUrlRepository,
  MongoFindAllUrlsByOwnerRepository,
  MongoFindUrlByShortIdRepository,
} from './infrastructure/repositories';
import { NanoidGenerateIdentifierService } from './infrastructure/services/nanoid-generate-identifier.service';
import { FindAllUrlsByOwnerRepository } from './domain/repositories/find-all-urls-by-owner.repository';
import { GenerateIdentifierService } from './domain/services/ generate-identifier.service';
import {
  CountUrlsRepository,
  CreateAccessRepository,
  CreateUrlRepository,
  FindUrlByShortIdRepository,
} from './domain/repositories';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Access.name, schema: AccessSchema, collection: 'access' },
      { name: Url.name, schema: UrlSchema, collection: 'urls' },
    ]),
  ],
  controllers: [UrlsController],
  providers: [
    {
      provide: 'CreateAccessRepository',
      useClass: MongoCreateAccessRepository,
    },
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
      provide: 'CountUrlsRepository',
      useClass: MongoCountUrlsRepository,
    },
    {
      provide: 'GenerateIdentifierService',
      useClass: NanoidGenerateIdentifierService,
    },
    {
      provide: 'ResolveShortenedUrlUseCase',
      useFactory: (findUrlByShortIdRepository: FindUrlByShortIdRepository) => {
        return new ResolveShortenedUrlUseCaseImpl(findUrlByShortIdRepository);
      },
      inject: ['FindUrlByShortIdRepository'],
    },
    {
      provide: 'TrackUrlAccessUseCase',
      useFactory: (createAccessRepository: CreateAccessRepository) => {
        return new TrackUrlAccessUseCaseImpl(createAccessRepository);
      },
      inject: ['CreateAccessRepository'],
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
    {
      provide: 'CountUrlsUseCase',
      useFactory: (countUrlsRepository: CountUrlsRepository) => {
        return new CountUrlsUseCaseImpl(countUrlsRepository);
      },
      inject: ['CountUrlsRepository'],
    },
    UrlsCountGateway,
  ],
})
export class UrlsModule {}
