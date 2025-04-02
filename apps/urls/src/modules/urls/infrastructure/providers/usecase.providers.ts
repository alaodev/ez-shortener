import { Provider } from '@nestjs/common';
import {
  CountUrlsRepository,
  CreateAccessRepository,
  CreateUrlRepository,
  DeleteUrlOwnerMatchRepository,
  FindAllUserAccessRepository,
  FindAllUserUrlAccessRepository,
  FindUrlByShortIdRepository,
} from '../../domain/repositories';
import { FindAllUrlsByOwnerRepository } from '../../domain/repositories/find-all-urls-by-owner.repository';
import { GenerateIdentifierService } from '../../domain/services/ generate-identifier.service';
import {
  CountUrlsUseCaseImpl,
  DeleteUserUrlUseCaseImpl,
  FindAllUserAccessUseCaseImpl,
  FindAllUserUrlAccessUseCaseImpl,
  FindAllUserUrlsUseCaseImpl,
  ResolveShortenedUrlUseCaseImpl,
  ShortenUserUrlUseCaseImpl,
  TrackUrlAccessUseCaseImpl,
} from '../../application/usecases';

export const usecaseProviders: Provider[] = [
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
    provide: 'FindAllUserAccessUseCase',
    useFactory: (findAllUserAccessRepository: FindAllUserAccessRepository) => {
      return new FindAllUserAccessUseCaseImpl(findAllUserAccessRepository);
    },
    inject: ['FindAllUserAccessRepository'],
  },
  {
    provide: 'FindAllUserUrlAccessUseCase',
    useFactory: (
      findAllUserUrlAccessRepository: FindAllUserUrlAccessRepository,
    ) => {
      return new FindAllUserUrlAccessUseCaseImpl(
        findAllUserUrlAccessRepository,
      );
    },
    inject: ['FindAllUserUrlAccessRepository'],
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
    provide: 'DeleteUserUrlUseCase',
    useFactory: (
      deleteUrlOwnerMatchRepository: DeleteUrlOwnerMatchRepository,
    ) => {
      return new DeleteUserUrlUseCaseImpl(deleteUrlOwnerMatchRepository);
    },
    inject: ['DeleteUrlOwnerMatchRepository'],
  },
  {
    provide: 'CountUrlsUseCase',
    useFactory: (countUrlsRepository: CountUrlsRepository) => {
      return new CountUrlsUseCaseImpl(countUrlsRepository);
    },
    inject: ['CountUrlsRepository'],
  },
];
