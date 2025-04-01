import { Module } from '@nestjs/common';
import { CreateUserUseCaseImpl } from './application/usecases/create-user.usecase.impl';
import {
  MongoCreateUserRepository,
  MongoFindUserByEmailRepository,
} from './infrastructure/repositories';
import { UserModelModule } from './infrastructure/database/models/user.model.module';
import { BcryptHashingService } from './infrastructure/services/bcrypt-hashing.service';
import {
  CreateUserRepository,
  FindUserByEmailRepository,
} from './domain/repositories';
import { HashingService } from './domain/services/hashing.service';

@Module({
  imports: [UserModelModule],
  providers: [
    {
      provide: 'FindUserByEmailRepository',
      useClass: MongoFindUserByEmailRepository,
    },
    { provide: 'CreateUserRepository', useClass: MongoCreateUserRepository },
    { provide: 'HashingService', useClass: BcryptHashingService },
    {
      provide: 'CreateUserUseCase',
      useFactory: (
        findUserByEmailRepository: FindUserByEmailRepository,
        createUserRepository: CreateUserRepository,
        hashingService: HashingService,
      ) => {
        return new CreateUserUseCaseImpl(
          findUserByEmailRepository,
          createUserRepository,
          hashingService,
        );
      },
      inject: [
        'FindUserByEmailRepository',
        'CreateUserRepository',
        'HashingService',
      ],
    },
  ],
  exports: ['CreateUserUseCase'],
})
export class UsersModule {}
