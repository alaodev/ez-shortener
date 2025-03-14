import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthController } from './presentation/auth.controller';
import {
  AuthenticateUserUseCaseImpl,
  RegisterUserUseCaseImpl,
} from './application/use-cases';
import { BcryptCompareService } from './infrastructure/bcrypt-compare.service';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AuthenticateUserUseCase',
      useClass: AuthenticateUserUseCaseImpl,
    },
    {
      provide: 'RegisterUserUseCase',
      useClass: RegisterUserUseCaseImpl,
    },
    { provide: 'CompareService', useClass: BcryptCompareService },
  ],
})
export class AuthModule {}
