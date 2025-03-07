import { DynamicModule, Logger, Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

@Module({})
export class DatabasesModule {
  private static readonly logger = new Logger(DatabasesModule.name);

  static registerAsync(options: {
    useFactory: (
      ...args: unknown[]
    ) => Promise<MongooseModuleOptions> | MongooseModuleOptions;
    inject?: any[];
  }): DynamicModule {
    return {
      module: DatabasesModule,
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async (...args: unknown[]) => {
            const config = await options.useFactory(...args);
            const { dbName } = config;
            return {
              ...config,
              onConnectionCreate(connection) {
                connection.once('open', () => {
                  DatabasesModule.logger.log(
                    `Connection to the ${dbName} database successfully established`,
                  );
                });
                connection.on('disconnected', () => {
                  DatabasesModule.logger.warn(
                    `Disconnected from the ${dbName} database`,
                  );
                });
              },
            };
          },
          inject: options.inject || [],
        }),
      ],
    };
  }
}
