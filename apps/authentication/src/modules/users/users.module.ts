import { MongooseModule } from '@ez-shortener/databases/nestjs-mongoose';
import { Module } from '@nestjs/common';
import {
  CreateUserUseCaseImpl,
  FindUserByEmailUseCaseImpl,
} from './application/use-cases';
import { User, UserSchema } from './infrastructure/schemas/user.schema';
import {
  MongoCreateUserRepository,
  MongoFindUserByEmailRepository,
} from './infrastructure/repositories';
import { BcryptHashingService } from './infrastructure/services/bcrypt-hashing.service';
import {
  CreateUserRepository,
  FindUserByEmailRepository,
} from './domain/repositories';
import { HashingService } from './domain/services/hashing.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
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
    {
      provide: 'FindUserByEmailUseCase',
      useFactory: (findUserByEmailRepository: FindUserByEmailRepository) => {
        return new FindUserByEmailUseCaseImpl(findUserByEmailRepository);
      },
      inject: ['FindUserByEmailRepository'],
    },
  ],
  exports: ['CreateUserUseCase', 'FindUserByEmailUseCase'],
})
export class UsersModule {}
