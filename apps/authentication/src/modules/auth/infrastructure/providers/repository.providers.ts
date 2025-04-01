import { Provider } from '@nestjs/common';
import { MongoFindUserByEmailRepository } from '../../../users/infrastructure/repositories/mongo-find-user-by-email.repository';

export const repositoryProviders: Provider[] = [
  {
    provide: 'FindUserByEmailRepository',
    useClass: MongoFindUserByEmailRepository,
  },
];
