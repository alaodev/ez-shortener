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
import { BcryptHashingService } from '../../common/infrastructure/services/bcrypt-hashing.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    { provide: 'CreateUserUseCase', useClass: CreateUserUseCaseImpl },
    { provide: 'FindUserByEmailUseCase', useClass: FindUserByEmailUseCaseImpl },
    { provide: 'CreateUserRepository', useClass: MongoCreateUserRepository },
    {
      provide: 'FindUserByEmailRepository',
      useClass: MongoFindUserByEmailRepository,
    },
    { provide: 'HashingService', useClass: BcryptHashingService },
  ],
  exports: ['CreateUserUseCase', 'FindUserByEmailUseCase'],
})
export class UsersModule {}
