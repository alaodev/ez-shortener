import { AuthGuardModule } from '@ez-shortener/auth-guard';
import { DatabasesModule } from '@ez-shortener/databases';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UrlsModule } from './modules/urls/urls.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabasesModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URLS_URI');
        if (!uri) throw new Error('MONGO_URLS_URI must be provided');
        return {
          uri,
          dbName: 'urls',
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
        };
      },
      inject: [ConfigService],
    }),
    UrlsModule,
  ],
})
export class AppModule {}
