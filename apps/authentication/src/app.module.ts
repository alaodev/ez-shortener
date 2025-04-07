import { DatabasesModule } from '@ez-shortener/databases';
import { AuthGuardModule } from '@ez-shortener/auth-guard';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabasesModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_USERS_URI');
        if (!uri) throw new Error('MONGO_USERS_URI must be provided');
        return {
          uri,
          dbName: 'users',
        };
      },
      inject: [ConfigService],
    }),
    AuthGuardModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const jwtSecret = configService.get<string>('JWT_SECRET');
        if (!jwtSecret) throw new Error('JWT_SECRET must be provided');
        return {
          secret: jwtSecret,
          signOptions: { expiresIn: '1d' },
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
