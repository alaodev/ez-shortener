import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthController } from './presentation/auth.controller';
import { RegisterUserUseCaseImpl } from './application/use-cases/register-user.usecase.impl';
import { AuthenticateUserUseCaseImpl } from './application/use-cases/authenticate-user.usecase.impl';
import { BcryptEncryptionService } from '../../common/infrastructure/services/bcrypt-encryption.service';

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
    { provide: 'EncryptionService', useClass: BcryptEncryptionService },
  ],
})
export class AuthModule {}
