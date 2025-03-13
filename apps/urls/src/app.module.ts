import * as path from 'path';
import { DatabasesModule } from '@ez-shortener/databases';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UrlsModule } from './modules/urls/urls.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(__dirname, '..', '..', '..', '.env'),
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
    UrlsModule,
  ],
})
export class AppModule {}
