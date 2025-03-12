import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthController } from './presentation/auth.controller';
import { RegisterUserUseCaseImpl } from './application/use-cases/register-user.usecase.impl';
import { AuthenticateUserUseCaseImpl } from './application/use-cases/authenticate-user.usecase.impl';
import { BcryptCompareService } from '../../common/infrastructure/services/bcrypt-compare.service';

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
