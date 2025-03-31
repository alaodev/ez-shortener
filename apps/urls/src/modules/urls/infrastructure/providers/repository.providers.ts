import { Provider } from '@nestjs/common';
import {
  MongoCountUrlsRepository,
  MongoCreateAccessRepository,
  MongoCreateUrlRepository,
  MongoDeleteUrlOwnerMatchRepository,
  MongoFindAllUrlsByOwnerRepository,
  MongoFindAllUserUrlAccessRepository,
  MongoFindUrlByShortIdRepository,
} from '../repositories';
import { NanoidGenerateIdentifierService } from '../services/nanoid-generate-identifier.service';

export const repositoryProviders: Provider[] = [
  {
    provide: 'CreateAccessRepository',
    useClass: MongoCreateAccessRepository,
  },
  {
    provide: 'FindAllUrlsByOwnerRepository',
    useClass: MongoFindAllUrlsByOwnerRepository,
  },
  {
    provide: 'FindAllUserUrlAccessRepository',
    useClass: MongoFindAllUserUrlAccessRepository,
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
    provide: 'DeleteUrlOwnerMatchRepository',
    useClass: MongoDeleteUrlOwnerMatchRepository,
  },
  {
    provide: 'CountUrlsRepository',
    useClass: MongoCountUrlsRepository,
  },
  {
    provide: 'GenerateIdentifierService',
    useClass: NanoidGenerateIdentifierService,
  },
];
