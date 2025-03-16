import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthController } from './presentation/auth.controller';
import {
  AuthenticateUserUseCaseImpl,
  RegisterUserUseCaseImpl,
} from './application/use-cases';
import {
  BcryptCompareService,
  JwtSignService,
} from './infrastructure/services';
import {
  CreateUserUseCase,
  FindUserByEmailUseCase,
} from '../users/domain/use-cases';
import { CompareService, SignService } from './domain/services';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    { provide: 'CompareService', useClass: BcryptCompareService },
    { provide: 'SignService', useClass: JwtSignService },
    {
      provide: 'AuthenticateUserUseCase',
      useFactory: (
        findUserByEmailUseCase: FindUserByEmailUseCase,
        compareService: CompareService,
        signService: SignService,
      ) => {
        return new AuthenticateUserUseCaseImpl(
          findUserByEmailUseCase,
          compareService,
          signService,
        );
      },
      inject: ['FindUserByEmailUseCase', 'CompareService', 'SignService'],
    },
    {
      provide: 'RegisterUserUseCase',
      useFactory: (createUserUseCase: CreateUserUseCase) => {
        return new RegisterUserUseCaseImpl(createUserUseCase);
      },
      inject: ['CreateUserUseCase'],
    },
  ],
})
export class AuthModule {}
