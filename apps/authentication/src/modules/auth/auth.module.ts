import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './presentation/auth.controller';
import { RegisterUserUseCaseImpl } from './application/use-cases/register-user.usecase.impl';
import { AuthenticateUserUseCaseImpl } from './application/use-cases/authenticate-user.usecase.impl';
import { BcryptEncryptionService } from '../../common/infrastructure/services/bcrypt-encryption.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const jwtSecret = configService.get<string>('JWT_SECRET');
        if (!jwtSecret) throw new Error('JWT_SECRET must be provided');
        return {
          global: true,
          secret: jwtSecret,
          signOptions: { expiresIn: '60s' },
        };
      },
      inject: [ConfigService],
    }),
  ],
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
